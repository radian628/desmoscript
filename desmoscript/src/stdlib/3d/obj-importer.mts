
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { MacroAPI, ScopeContent } from "../../semantic-analysis/analysis-types.mjs";
import { is1long, is2long, is3long, parsedOBJKeys, rest2num } from "./obj-importer-helpers.mjs"

export type ParsedOBJ = {
  vertices: [number, number, number][];
  normals: [number, number, number][];
  texcoords: [number, number][];
  vertexIndices: number[];
  normalIndices: number[];
  texcoordIndices: number[];
  materials: MTLMaterial[];
  faceMaterials: number[];
  materialMap: {
    [str: string]: number;
  };
};

export type MTLMaterial = {
  ambient?: [number, number, number];
  diffuse?: [number, number, number];
  specular?: [number, number, number];
  specularExponent?: number;
  dissolve?: number;
  illuminationModel?: number;
};

export type ParsedMTL = {
  materials: {
    [materialName: string]: MTLMaterial;
  };
};

export function parseMtl(src: string) {
  const output: ParsedMTL = {
    materials: {},
  };
  let currentMaterial: MTLMaterial | undefined;

  const splitSrc = src.split("\n").map((s) => s.split(" "));
  for (let line of splitSrc) {
    switch (line[0]) {
      case "newmtl":
        currentMaterial = {};
        output.materials[line[1]] = currentMaterial;
        break;
    }

    if (!currentMaterial) continue;

    switch (line[0]) {
      case "Ns":
        currentMaterial.specularExponent = is1long(rest2num(line));
        break;
      case "d":
        currentMaterial.dissolve = is1long(rest2num(line));
        break;
      case "illum":
        currentMaterial.illuminationModel = is1long(rest2num(line));
        break;
      case "Ka":
        currentMaterial.ambient = is3long(rest2num(line));
        break;
      case "Kd":
        currentMaterial.diffuse = is3long(rest2num(line));
        break;
      case "Ks":
        currentMaterial.specular = is3long(rest2num(line));
        break;
    }
  }

  return output;
}

export async function parseObj(src: string, objdir: string) {
  const output: ParsedOBJ = {
    vertices: [],
    normals: [],
    texcoords: [],
    vertexIndices: [],
    normalIndices: [],
    texcoordIndices: [],
    faceMaterials: [],
    materials: [],
    materialMap: {},
  };
  let currentMaterial = -1;
  const splitSrc = src.split("\n").map((s) => s.split(" "));
  for (let line of splitSrc) {
    switch (line[0]) {
      case "v":
        output.vertices.push(is3long(rest2num(line)));
        break;
      case "vn":
        output.normals.push(is3long(rest2num(line)));
        break;
      case "vt":
        output.texcoords.push(is2long(rest2num(line)));
        break;
      case "f":
        const coords = line
          .slice(1)
          .map((s) => s.split("/").map((s) => Number(s)));
        output.vertexIndices.push(coords[0][0], coords[1][0], coords[2][0]);
        output.texcoordIndices.push(coords[0][1], coords[1][1], coords[2][1]);
        output.normalIndices.push(coords[0][2], coords[1][2], coords[2][2]);
        output.faceMaterials.push(currentMaterial);
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

export function tryParseObj(str: string, objdir: string, a: MacroAPI) {
  try {
    return parseObj(str, objdir);
  } catch (err) {
    a.error(`Failed to parse OBJ file: ${(err as Error).message}`);
  }
}

export function parseObjKey(key: string, a: MacroAPI): keyof ParsedOBJ {
  if (parsedOBJKeys.indexOf(key as keyof ParsedOBJ) == -1) {
    a.error(`'${key}' is not a valid OBJ property.`);
  }
  return key as keyof ParsedOBJ;
}
