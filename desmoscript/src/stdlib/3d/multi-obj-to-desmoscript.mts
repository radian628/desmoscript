import { ASTExpr, ASTNumber, ASTType } from "../../ast/ast.mjs";
import { MacroAPI, ScopeContent } from "../../semantic-analysis/analysis-types.mjs";
import { AABB, BVHNode } from "./bvh.mjs";
import { bvhifyMultiObj, OBJSingleObject, ParsedMultiOBJ, parseMultiObj } from "./multi-obj-importer.mjs";
import {lastof} from "../../compile/compile.mjs";
import { parseIdentSingleString, parseNoteString } from "../macroutils.mjs";
import * as fs from "node:fs/promises";
import * as path from "node:path";

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
        obj.vertices[indices[i]-1],
        obj.vertices[indices[i + 1]-1],
        obj.vertices[indices[i + 2]-1],
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
    mean(mesh.vertices.map(v => v.position[0])),
    mean(mesh.vertices.map(v => v.position[1])),
    mean(mesh.vertices.map(v => v.position[2]))
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

  // x positions
  output.push(...binaryPackList(centeredMesh.vertices.map(v => v.position[0]), 16, 3));
  // y positions
  output.push(...binaryPackList(centeredMesh.vertices.map(v => v.position[1]), 16, 3));
  // z positions
  output.push(...binaryPackList(centeredMesh.vertices.map(v => v.position[2]), 16, 3));

  // materials
  output.push(...binaryPackList(centeredMesh.faces.map(f => f.material), 6, 8));

  // normals
  output.push(...binaryPackList(centeredMesh.faces.map(f => f.normal).flat(), 8, 6));

  // indices
  output.push(...binaryPackList(centeredMesh.indices, 10, 5));

  return output;
}

function getBVHLayers<T extends AABB>(bvh: BVHNode<T>) {
  let isLayerEmpty = false;
  function getAtLayer(node: BVHNode<T>, layersLeft: number, data: BVHNode<T>[]) {
    if (layersLeft == 0) {
      data.push(node);
      isLayerEmpty = false;
      return;
    }
    
    if (layersLeft == 1) {
      if (node.children.length == 0) {
        data.push(node);
        data.push({
          children: [],
          min: [0, 0, 0],
          max: [-1, -1, -1],
          data: []
        });
        return;
      }
      for (let i = 0; i < 2; i++) {
        let child = node.children[i];
        if (child) {
          data.push(child);
          isLayerEmpty = false;
        } else {
          data.push({
            children: [],
            min: [0, 0, 0],
            max: [-1, -1, -1],
            data: []
          });
        }
      }
    } else {
      for (let child of node.children) {
        getAtLayer(child, layersLeft - 1, data);
      }
    }
  }

  let layerIndex = 0;
  
  const layers: BVHNode<T>[][] = [];

  while (!isLayerEmpty) {
    isLayerEmpty = true;
    const layerList: BVHNode<T>[] = [];
    getAtLayer(bvh, layerIndex, layerList);
    layerIndex++;
    layers.push(layerList);
  }

  return layers.slice(0, -1);
}

export function getBinaryUnpacker(bitsPerNumber: number, numbersPerNumber: number, a: MacroAPI) {
  return a.fromstr(`
    fn binaryUnpack(list) {
      [mod(floor(listItem / (i * ${2 ** bitsPerNumber})), ${2 ** bitsPerNumber}) for i=(1 .. ${numbersPerNumber}); listItem=list]
    }
  `);
}

export function multiOBJBVHToDesmoscript(namespaceName: string, bvh: BVHNode<AABB & OBJSingleObject>, a: MacroAPI) {
  const expressions: ASTExpr[] = [];

  expressions.push(a.fromstr(`
  fn isOverlapping(amin, amax, bmin, bmax) {
    min(
      match { (amax >= bmin) => 1; 0; },
      match { (bmax >= amin) => 1; 0; }
    )
  }`));

  expressions.push(a.fromstr(`
    fn rectRectIntersect(axmin, aymin, azmin, axmax, aymax, azmax, bxmin, bymin, bzmin, bxmax, bymax, bzmax) {
      min(
        match { (axmax >= axmin ) => 1; 0; },
        isOverlapping(axmin, axmax, bxmin, bxmax),
        isOverlapping(aymin, aymax, bymin, bymax),
        isOverlapping(azmin, azmax, bzmin, bzmax)
      )
    }
  `));

  const lookupFunctionExpressions: ASTExpr[] = [];

  const layers = getBVHLayers(bvh);

  const layerNumbers = layers
    .map(l => l.map(n => [...n.min, ...n.max]).flat());

  // build up BVH bounding box layers
  let i = 0;
  for (const layer of layers) {
    expressions.push(a.binop(a.ident(`layer${i}`), '=',
      a.list(
        ...layerNumbers[i].map(n => a.number(n))
      ))
    );

    const prevMatchingLayer = (i == 0) ? a.list(a.number(1)) : a.fn(
      a.ident("join"),
      a.ident(`matchingLayer${i - 1}`),
      a.binop(a.ident(`matchingLayer${i - 1}`), "-", a.number(1))
    );

    lookupFunctionExpressions.push(
      a.binop(
        a.ident(`matchingLayerTemp${i}`),
        "=",
        prevMatchingLayer
      )
    )
    lookupFunctionExpressions.push(
      a.binop(
        a.ident(`matchingLayerAABBBaseIndex${i}`),
        "=",
        a.binop(a.binop(prevMatchingLayer, "*", a.number(6)), "-", a.number(5))
      )
    )
    lookupFunctionExpressions.push(
      a.binop(
        a.ident(`matchingLayer${i}`),
        '=',
        a.binop(
        a.binop(
          a.ident(`matchingLayerTemp${i}`),
          "[",
          a.binop(a.fn(a.ident("rectRectIntersect"), 
          a.binop(a.ident(`layer${i}`), '[', 
            a.binop(a.ident(`matchingLayerAABBBaseIndex${i}`), '+', a.number(0))),
          a.binop(a.ident(`layer${i}`), '[', 
            a.binop(a.ident(`matchingLayerAABBBaseIndex${i}`), '+', a.number(1))),
          a.binop(a.ident(`layer${i}`), '[', 
            a.binop(a.ident(`matchingLayerAABBBaseIndex${i}`), '+', a.number(2))),
          a.binop(a.ident(`layer${i}`), '[', 
            a.binop(a.ident(`matchingLayerAABBBaseIndex${i}`), '+', a.number(3))),
          a.binop(a.ident(`layer${i}`), '[', 
            a.binop(a.ident(`matchingLayerAABBBaseIndex${i}`), '+', a.number(4))),
          a.binop(a.ident(`layer${i}`), '[', 
            a.binop(a.ident(`matchingLayerAABBBaseIndex${i}`), '+', a.number(5))),
            a.ident("xmin"),
            a.ident("ymin"),
            a.ident("zmin"),
            a.ident("xmax"),
            a.ident("ymax"),
            a.ident("zmax"),
          ), "==", a.number(1))
        ), '*', a.number(2)
        )
      )
    );
    i++;
  }

  lookupFunctionExpressions.push(
    a.ident(`matchingLayer${i - 1}`)
  );

  type MeshIndex = { 
    outerIndex: number, // zero-indexed
    innerIndex: number, // one-indexed
    size: number 
  };

  // Mesh LUT
  const meshLUTExprData = [] as number[][];
  const meshLUTExprDataOffsetMap = new Map<string, MeshIndex>();
  for (const node of lastof(layers)) {
    if (node.data.length > 1) {
      a.error("INTERNAL ERROR: Mesh LUT should not have more than one mesh per node at lowest level.");
    }
    if (node.children.length > 0) {
      a.error("INTERNAL ERROR: Mesh LUT should not have any children at this level.")
    }
    const mesh = node.data[0];
    if (!mesh) continue;
    const serializedMesh = serializeForDesmos(desmosify(mesh));
    if ( meshLUTExprData.length == 0 || lastof(meshLUTExprData).length + serializedMesh.length > 10000) {
      meshLUTExprData.push([]);
    }
    meshLUTExprDataOffsetMap.set(mesh.name, {
      outerIndex: meshLUTExprData.length,
      innerIndex: lastof(meshLUTExprData).length,
      size: serializedMesh.length
    });
    lastof(meshLUTExprData).push(...serializedMesh);
  }

  // function that retrieves mesh data from one big "multi-list"
  expressions.push(
    a.fndef(
      // fn name
      "getMeshData",
      // fn params
      ["outerIndex", "innerIndex", "size"],
      // fn body
      [a.binop(
        //create lists
        a.match(meshLUTExprData.map((e, i) => {
          return [
            a.binop(a.ident("outerIndex"), "==", a.number(i)),
            a.list(...e.map(n => a.number(n)))
          ] as [ASTExpr, ASTExpr];
        }))
      , 
      // index the chosen list to get data
      "[", 
      a.binop(
        a.ident("innerIndex"), 
        "..", 
        a.binop(a.ident("innerIndex"), "+", a.ident("size"))
      ))]
    )
  )
  
  // Array to convert between BVH indices and mesh indexing information
  const bvhToMeshIndexLUT = [] as MeshIndex[];
  for (const layer of lastof(layers)) {
    if (layer.data.length == 1) {
      const meshIndex = meshLUTExprDataOffsetMap.get(layer.data[0].name);
      if (!meshIndex) {
        a.error("INTERNAL ERROR: Mesh should be in the mesh array when it isn't.");
      }
      bvhToMeshIndexLUT.push(meshIndex);
    } else {
      bvhToMeshIndexLUT.push({ outerIndex: 0, innerIndex: 0, size: 0 });
    }
  }

  expressions.push(
    a.binop(a.ident("outerIndex"), "=", a.list(...bvhToMeshIndexLUT.map(e => a.number(e.outerIndex))))
  );
  expressions.push(
    a.binop(a.ident("innerIndex"), "=", a.list(...bvhToMeshIndexLUT.map(e => a.number(e.innerIndex))))
  );
  expressions.push(
    a.binop(a.ident("size"), "=", a.list(...bvhToMeshIndexLUT.map(e => a.number(e.size))))
  );

  expressions.push(
    a.fndef("getMeshesInRect",
      ["xmin", "ymin", "zmin", "xmax", "ymax", "zmax"],
      lookupFunctionExpressions
    )
  );

  return a.ns(namespaceName, expressions);
}



export const multiObjToDesmoscriptBVH: ScopeContent.Macro["fn"] = async function (expr, ctx, a) {
  const namespace = parseIdentSingleString(expr.args[0], a, "argument 1");
  const filepathArg = parseNoteString(expr.args[1], a, "argument 2");

  let maybeObj: ParsedMultiOBJ | undefined = undefined;

  try {
    let objFileStr = (await fs.readFile(filepathArg)).toString();
    maybeObj = await parseMultiObj(objFileStr, path.dirname(filepathArg));
  } catch {
    a.error("Failed to get/load OBJ file.");
  }

  if (!maybeObj) a.error("Failed to load OBJ file.");
  let obj = maybeObj as ParsedMultiOBJ;

  const bvh = bvhifyMultiObj(obj);

  return multiOBJBVHToDesmoscript(namespace, bvh, a);
}


export const lookupMeshBVH: ScopeContent.Macro["fn"] = async function (expr, ctx, a) {
  const outputNamespace = parseIdentSingleString(expr.args[0], a, "argument 1");
  const inputNamespace = parseIdentSingleString(expr.args[1], a, "argument 2");
  const xmin = expr.args[2];
  const ymin = expr.args[3];
  const zmin = expr.args[4];
  const xmax = expr.args[5];
  const ymax = expr.args[6];
  const zmax = expr.args[7];
  if (!xmin || !ymin || !zmin || !xmax || !ymax || !zmax) {
    a.error("Arguments 3 through 8 all must exist, and should represent the bounds of the lookup rectangle.");
  }

  const meshCountExpr = expr.args[8];
  if (!meshCountExpr || meshCountExpr.type != ASTType.NUMBER) {
    a.error("Argument 9 must be a constant positive integer number representing the number of meshes to load.");
  }
  const meshCount = (meshCountExpr as ASTNumber<{}, {}>).number;


  let expressions: ASTExpr[] = [];
  expressions.push(a.binop(a.ident("meshIndices"),
    "=",
    a.binop(a.fn(a.ident(inputNamespace, "getMeshesInRect"),
      xmin, ymin, zmin, xmax, ymax, zmax
    ), "/", a.number(2))));

  "XYZ".split("")
  .forEach((component, componentIndex) => {
    expressions.push(a.binop(a.ident(`mesh${component}Positions`),
      "=",
      a.fn(a.ident("join"), 
        ...new Array(meshCount).fill(0)
        .map((e, i) => {
          return a.fn(a.ident("bin", "getComponentOfVertexOfMesh"),
            a.fn(a.ident(inputNamespace, "getMeshData"),
              a.binop(a.ident(inputNamespace, "outerIndex"), '[', 
                a.binop(a.ident("meshIndices"), "[", a.number(i + 1))
              )
            ),
            a.number(componentIndex + 1)
          );
        })
      )
    ));
  })
  
  return a.ns(outputNamespace, expressions);
}
