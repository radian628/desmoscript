import { MacroAPI } from "../../../semantic-analysis/analysis-types.mjs";
import { AABB, aabbIntersect, getCombinedBounds } from "../bvh.mjs";
import { getNormal } from "../multi-obj-bvh-to-desmoscript.mjs";
import { OBJSingleObject, ParsedMultiOBJ } from "../multi-obj-importer.mjs";
import { center, DesmosLightingModelMesh, distance, getAABBOfTriangle, sphereIntersectTriangle, Triangle } from "./triangle.mjs";

export function range(end: number) {
  const arr = [] as number[];
  for (let i = 0; i < end; i++) {
    arr.push(i);
  }
  return arr;
}

export type Light = {
  color: [number, number, number],
  position: [number, number, number],
  type: number,
  radius: number,
  aabb: AABB
}


export enum LightType {
  SOLID, 
  FLICKERING1,
  FLICKERING2,
  GLOWING1,
  GLOWING2
}

export const lightTypeNameMap = {
  "solid": LightType.SOLID,
  "flickering1": LightType.FLICKERING1,
  "flickering2": LightType.FLICKERING2,
  "glowing1": LightType.GLOWING1,
  "glowing2": LightType.GLOWING2
}

// light name format: light_r_g_b_power_type
function parseLightNameAndMesh(meshName: string, mesh: OBJSingleObject, a: MacroAPI): Light {
  const nameSplit = meshName.split("_");
  const color = nameSplit.slice(1, 4).map(s => Number(s));
  if (color.length != 3 || !color.every(n => !isNaN(n))) {
    a.error(`Invalid light name format '${meshName}': invalid color`);
  }

  const power = Number(nameSplit[4]);
  if (isNaN(power) || power < 0) {
    a.error(`Invalid light name format '${meshName}': invalid power`);
  }

  //@ts-ignore
  const type: LightType | undefined = lightTypeNameMap[nameSplit[5]];
  if (type === undefined) {
    a.error(`Invalid light name format '${meshName}': invalid type '${type}'`);
  }

  const position = [
    mesh.vertices.reduce((prev, curr) => prev + curr[0], 0) / mesh.vertices.length,
    mesh.vertices.reduce((prev, curr) => prev + curr[1], 0) / mesh.vertices.length,
    mesh.vertices.reduce((prev, curr) => prev + curr[2], 0) / mesh.vertices.length
  ] as [number, number, number];

  const radius = Math.sqrt(power);

  return {
    color: color as [number, number, number],
    position,
    type,
    radius,
    aabb: {
      min: position.map(c => c - radius * Math.max(...radiusMultipliers)) as [number, number, number],
      max: position.map(c => c + radius * Math.max(...radiusMultipliers)) as [number, number, number]
    }
  }
}

function dot(a: [number, number, number], b: [number, number, number]) {
  return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
}

function isAligned(tri: Triangle, normal: [number, number, number]) {
  return dot(getNormal(...tri), normal) > 0;
}

const radiusMultipliers = [0.5, 1, 1.5];
export function lightMeshWithOneLight(mesh: DesmosLightingModelMesh, light: Light) {
  let newTriangles = mesh.triangles as DesmosLightingModelMesh["triangles"];
  for (let i = 0; i < 3; i++) {

    const radius = radiusMultipliers[i] * light.radius;

    const newTriangles2 = [];

    for (const triangle of newTriangles) {
      const triCenter = center(triangle.vertices);
      const aligned = isAligned(triangle.vertices, triCenter.map((e, i) => light.position[i] - e) as [number, number, number]);
      
      newTriangles2.push(...(aligned ? sphereIntersectTriangle(triangle.vertices, light.position, radius) : [triangle.vertices])
        .map(tri => {
          return {
            color: triangle.color.concat() as [number, number, number],
            vertices: tri as Triangle,
            lighting: triangle.lighting.concat()
          }
        })
      );
    }

    newTriangles = newTriangles2;
  }

  
  for (let i = 0; i < 3; i++) {
    const radius = radiusMultipliers[i] * light.radius;
    const lastRadius = (i == 0) ? 0 : radiusMultipliers[i - 1] * light.radius;

    for (const triangle of newTriangles) {
      const triCenter = center(triangle.vertices);
      const aligned = isAligned(triangle.vertices, triCenter.map((e, i) => light.position[i] - e) as [number, number, number]);
      if (!aligned) continue;

      const dist = Math.max(
        ...triangle.vertices.map(v => distance(v, light.position) - 0.001)
      );

      if (dist > lastRadius && dist < radius) {
        triangle.lighting.push({
          color: light.color.map(c => c * 1 / (radiusMultipliers[i] ** 1)) as [number, number, number],
          type: light.type
        });
      }
    } 
  }

  return {
    ...mesh,
    triangles: newTriangles
  };
}

function posterizeColor(x: number) {
  if (x > 0.05) return 1;
  if (x < -0.05) return -1;
  return 0;
}

export function doDesmosMultiObjCelShading(obj: ParsedMultiOBJ, a: MacroAPI) {
  obj.objects = new Map(Array.from(obj.objects.entries()).sort(
    (a, b) => {
      return a[1].vertices.length - b[1].vertices.length
    }
  ))
  let meshes: Map<string, DesmosLightingModelMesh> = new Map();
  const lights: Light[] = [];


  for (const [meshName, mesh] of obj.objects.entries()) {
    const lowestIndex = mesh.vertexIndices.reduce((prev, curr) => Math.min(prev, curr), Infinity);
    if (meshName.slice(0, 3) == "ph_") continue;
    if (meshName.slice(0, 5) == "light") {
      lights.push(parseLightNameAndMesh(meshName, mesh, a));
    } else {
      meshes.set(meshName, {
        triangles: range(mesh.vertexIndices.length / 3).map(i => {
          const material = obj.materials[mesh.faceMaterials[i]];
          const vertices = [
            mesh.vertices[mesh.vertexIndices[i*3] - lowestIndex],
            mesh.vertices[mesh.vertexIndices[i*3+1] - lowestIndex],
            mesh.vertices[mesh.vertexIndices[i*3+2] - lowestIndex],
          ] as Triangle;
          const normal = getNormal(...vertices); 
          const isReflection = material.name.startsWith("reflect_");
          return {
            vertices,
            color: material.diffuse
            ?.map(channel => channel * (posterizeColor(normal[1]) * 0.25 * (isReflection ? -1 : 1) + 1)) as [number, number, number] 
            ?? [0,0,0],
            lighting: []
          }
        }),
        aabb: getCombinedBounds(mesh.vertices.map(v => {
          return {
            min: v,
            max: v
          } as AABB
        }))
      });
    }
  }

  for (const light of lights) {
    let newMeshes: typeof meshes = new Map();
    for (const [meshName, mesh] of meshes.entries()) {
      if (aabbIntersect(mesh.aabb, light.aabb)) {
        newMeshes.set(meshName, lightMeshWithOneLight(mesh, light));
      } else {
        newMeshes.set(meshName, mesh);
      }
    }
    meshes = newMeshes;
  }

  return meshes;
}