import { MacroAPI } from "../../../semantic-analysis/analysis-types.mjs";
import { AABB, aabbIntersect, getCombinedBounds } from "../bvh.mjs";
import { OBJSingleObject, ParsedMultiOBJ } from "../multi-obj-importer.mjs";
import { center, DesmosLightingModelMesh, distance, getAABBOfTriangle, sphereIntersectTriangle } from "./triangle.mjs";

function range(end) {
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

  const type: LightType = lightTypeNameMap[nameSplit[5]];
  if (type === undefined) {
    a.error(`Invalid light name format '${meshName}': invalid type`);
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
      min: position.map(c => c - radius) as [number, number, number],
      max: position.map(c => c + radius) as [number, number, number]
    }
  }
}


const radiusMultipliers = [0.25, 1, 8];
export function lightMeshWithOneLight(mesh: DesmosLightingModelMesh, light: Light) {
  const newTriangles = [] as DesmosLightingModelMesh["triangles"];
  for (let i = 0; i < 3; i++) {

    const radius = radiusMultipliers[i] * light.radius;
    
    for (const triangle of mesh.triangles) {
      newTriangles.push(...sphereIntersectTriangle(triangle.vertices, light.position, radius)
        .map(tri => {
          return {
            color: triangle.color,
            vertices: tri,
            lighting: triangle.lighting
          }
        })
      );
    }
  }

  
  for (let i = 0; i < 3; i++) {
    const radius = radiusMultipliers[i] * light.radius;
    const lastRadius = (i == 0) ? 0 : radiusMultipliers[i - 1];

    for (const triangle of mesh.triangles) {
      const triCenter = center(triangle.vertices);
      const dist = distance(triCenter, light.position);

      if (dist > lastRadius && dist < radius) {
        triangle.lighting.push({
          color: light.color.map(c => c * 1 / (radius ** 2)) as [number, number, number],
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

export function doDesmosMultiObjCelShading(obj: ParsedMultiOBJ, a: MacroAPI) {
  let meshes: Map<string, DesmosLightingModelMesh> = new Map();
  const lights: Light[] = [];

  for (const [meshName, mesh] of obj.objects.entries()) {
    if (meshName.slice(0, 5) == "light") {
      lights.push(parseLightNameAndMesh(meshName, mesh, a));
    } else {
      meshes.set(meshName, {
        triangles: range(mesh.vertexIndices.length / 3).map(i => {
          return {
            vertices: [
              mesh.vertices[mesh.vertexIndices[i*3]],
              mesh.vertices[mesh.vertexIndices[i*3+1]],
              mesh.vertices[mesh.vertexIndices[i*3+1]],
            ],
            color: obj.materials[mesh.faceMaterials[i]].diffuse ?? [0,0,0],
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
      }
    }
    meshes = newMeshes;
  }

  return meshes;
}