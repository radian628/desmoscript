import * as fs from "node:fs/promises";
import * as path from "node:path";
import { AABB, bvhify, getBounds } from "./bvh.mjs";
import { is2long, is3long, rest2num } from "./obj-importer-helpers.mjs";
import { MTLMaterial, parseMtl } from "./obj-importer.mjs";

export type OBJSingleObject = {
  vertices: [number, number, number][];
  normals: [number, number, number][];
  texcoords: [number, number][];
  vertexIndices: number[];
  normalIndices: number[];
  texcoordIndices: number[];
  faceMaterials: number[];
  name: string;
};
export type ParsedMultiOBJ = {
  objects: Map<string, OBJSingleObject>;
  materials: MTLMaterial[];
  materialMap: {
    [str: string]: number;
  };
};

// parse an obj composed of multiple objects (i.e. with the "o" command)
export async function parseMultiObj(src: string, objdir: string) {
  const output: ParsedMultiOBJ = {
    objects: new Map(),
    materials: [],
    materialMap: {},
  };
  let currentObject: OBJSingleObject | undefined = undefined;
  let currentMaterial = -1;

  const splitSrc = src.replace(/\r/g, "").split("\n").map((s) => s.split(" "));

  // read file line by line
  for (let line of splitSrc) {
    switch (line[0]) {
      case "o":
        const newObject: OBJSingleObject = {
          vertices: [],
          normals: [],
          texcoords: [],
          vertexIndices: [],
          normalIndices: [],
          texcoordIndices: [],
          faceMaterials: [],
          name: line[1],
        };
        output.objects.set(line[1], newObject);
        currentObject = newObject;
        break;
      case "v":
        currentObject?.vertices.push(is3long(rest2num(line)));
        break;
      case "vn":
        currentObject?.normals.push(is3long(rest2num(line)));
        break;
      case "vt":
        currentObject?.texcoords.push(is2long(rest2num(line)));
        break;
      case "f":
        const coords = line
          .slice(1)
          .map((s) => s.split("/").map((s) => Number(s)));
        currentObject?.vertexIndices.push(
          coords[0][0],
          coords[1][0],
          coords[2][0]
        );
        currentObject?.texcoordIndices.push(
          coords[0][1],
          coords[1][1],
          coords[2][1]
        );
        currentObject?.normalIndices.push(
          coords[0][2],
          coords[1][2],
          coords[2][2]
        );
        currentObject?.faceMaterials.push(currentMaterial);
        break;
      case "mtllib":
        let mtls = (
          await Promise.all(
            line
              .slice(1)
              .map(
                async (l) =>
                  await fs.readFile(path.join(objdir, l.replace(/\r/g, "")))
              )
          )
        )
          .map((mtl) => mtl.toString())
          .map((mtl) => parseMtl(mtl));
        for (let mtl of mtls) {
          for (let [mtlname, mtldata] of Object.entries(mtl.materials)) {
            output.materials.push(mtldata);
            output.materialMap[mtlname] = output.materials.length - 1;
          }
        }
        break;
      case "usemtl":
        currentMaterial = output.materialMap[line[1]] ?? -1;
        break;
    }
  }
  return output;
}

export function bvhifyMultiObj(obj: ParsedMultiOBJ) {
  const objChildrenWithBounds: (OBJSingleObject & AABB)[] = Array.from(
    obj.objects.values()
  ).map((child) => {
    return { ...child, ...getBounds(child) };
  });

  return bvhify(objChildrenWithBounds);
}
