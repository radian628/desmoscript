import { AABB, BVHNode } from "./bvh.mjs";
import { OBJSingleObject, ParsedMultiOBJ } from "./multi-obj-importer.mjs";

/*
Compact Desmos 3D Object Specification:
position: 
  x: double
  y: double
  z: double
scale factor: 
  sf: double
sizes:
  vertex size: 26 bits
  index size: 26 bits
vertices (array)
  one double:
    x y z position (16*3 = 48 bits), scaled by sf and then added to position
materials (array)
  one double:
    eight material indices (8*6 = 48); 64 material indices should be more than enough
normals (array)
  one double:
    six normals (6*8 = 48); 8-bit normals are fine
indices (array)
  one double:
    five indices (10*5 = 50 bits)
*/

function cross(a: [number, number, number], b: [number, number, number]): [number, number, number] {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function getNormal(a: [number, number, number], b: [number, number, number], c: [number, number, number]): [number, number, number] {
  return cross(
    b.map((e, i) => e - a[i]) as [number, number, number],
    c.map((e, i) => e - a[i]) as [number, number, number],
  );
}

export type DesmosifiedMesh = {
  vertices: {
    position: [number, number, number],
  }[],
  faces: {
    normal: [number, number, number],
    material: number
  }[],
  indices: number[]
}

// make data suitable for Desmos computation
function desmosify(obj: OBJSingleObject): DesmosifiedMesh {

  // normalize indices so that they start at 1 (as you would expect in Desmos)
  const lowestIndex = Math.min(...obj.vertexIndices);
  const indices = obj.vertexIndices.map(vindex => vindex - lowestIndex + 1);

  const vertices = obj.vertices.map((vertex, i) => {
    return {
      position: vertex
    }
  });

  const faces: { normal: [number, number, number], material: number }[] = [];
  for (let i = 0; i < obj.vertexIndices.length; i+=3) {
    faces.push({
      normal: getNormal(
        obj.vertices[obj.vertexIndices[i]],
        obj.vertices[obj.vertexIndices[i + 1]],
        obj.vertices[obj.vertexIndices[i + 2]],
      ),
      material: obj.faceMaterials[i / 3]
    });
  }

  return {
    indices,
    vertices,
    faces
  };
}

function mean(data: number[]) {
  return data.reduce((prev, curr) => prev + curr, 0) / data.length;
}

const BITS_PER_POS_COMPONENT = 16;
const POS_COMPONENT_RANGE = Math.pow(2, BITS_PER_POS_COMPONENT); 

const BITS_PER_NORMAL = 8;
const NORMAL_RANGE = Math.pow(2, BITS_PER_NORMAL);

function binaryPackList(list: number[], bitsPerElement: number, elementsPerNumber: number) {
  const outList = [] as number[];
  let addedToThisNum = elementsPerNumber;
  for (const num of list) {
    if (addedToThisNum >= elementsPerNumber) {
      addedToThisNum = 0;
      outList.push(0);
    }

    outList[outList.length - 1] += num * (2 ** (bitsPerElement * addedToThisNum));

    addedToThisNum += 1;
  }
  return outList;
}

function serializeForDesmos(mesh: DesmosifiedMesh) {
  const output: number[] = [];
  const averagePosition = [
    mean(mesh.vertices.map(v => v[0])),
    mean(mesh.vertices.map(v => v[1])),
    mean(mesh.vertices.map(v => v[2]))
  ];

  // create a copy of the mesh where vertices are centered
  const centeredMesh: DesmosifiedMesh = {
    ...mesh,
    vertices: mesh.vertices
      .map(v => {
        return {
          position: v.position.map((c, i) => c - averagePosition[i]) as [number, number, number]
        }
      })
  };

  // get farthest coordinate from 0
  const largestScale = Math.max(
    ...centeredMesh.vertices.map(v => Math.abs(v.position[0])),
    ...centeredMesh.vertices.map(v => Math.abs(v.position[1])),
    ...centeredMesh.vertices.map(v => Math.abs(v.position[2])),
  );

  // scale down mesh vertex positions to normalize them
  centeredMesh.vertices =
    centeredMesh.vertices.map(v => {
      return {
        position: v.position.map(c => Math.floor(c / largestScale * POS_COMPONENT_RANGE) + POS_COMPONENT_RANGE / 2) as [number, number, number]
      } 
    });

  // convert normals to fixed-point
  centeredMesh.faces =
    centeredMesh.faces.map(face => {
      return {
        ...face,
        normal: face.normal.map(c => {
          return Math.floor((c + 1) / 2 * NORMAL_RANGE)
        }) as [number, number, number]
      }
    });
  
  // average mesh position
  output.push(...averagePosition);
  
  // scale factor for mesh
  output.push(largestScale);

  // lengths of vertex and index list
  output.push(...binaryPackList([centeredMesh.vertices.length, centeredMesh.indices.length], 26, 2));

  // vertices
  output.push(...binaryPackList(centeredMesh.vertices.map(v => v.position).flat(), 16, 3));

  // materials
  output.push(...binaryPackList(centeredMesh.faces.map(f => f.material), 6, 8));

  // normals
  output.push(...binaryPackList(centeredMesh.faces.map(f => f.normal).flat(), 8, 6));

  // indices
  output.push(...binaryPackList(centeredMesh.indices, 10, 5));

  return output;
}

function multiOBJBVHToDesmoscript(bvh: BVHNode<AABB & ParsedMultiOBJ>) {
  // TODO: actually convert BVHs to desmoscript code
}