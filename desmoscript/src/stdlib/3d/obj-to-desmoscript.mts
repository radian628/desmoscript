import * as fs from "node:fs/promises";
import * as path from "node:path";

import { ASTFunctionCall, ASTType } from "../../ast/ast.mjs";
import {
  parseIdentList,
  parseIdentSingleString,
  parseNoteString,
} from "../macroutils.mjs";
import { AABB } from "./bvh.mjs";
import {
  MacroAPI,
  ScopeContent,
} from "../../semantic-analysis/analysis-types.mjs";
import { ParsedOBJ, parseObjKey, tryParseObj } from "./obj-importer.mjs";
import { parsedOBJKeys } from "./obj-importer-helpers.mjs";

export let loadObj: ScopeContent.Macro["fn"] = async function (expr, ctx, a) {
  const namespace = parseIdentSingleString(expr.args[0], a, "argument 1");
  const filepathArg = parseNoteString(expr.args[1], a, "argument 2");
  const includeArg =
    expr.args.length == 2
      ? parsedOBJKeys
      : parseIdentList(expr.args[2], a, "argument 3").map((key) =>
          parseObjKey(key, a)
        );
  for (const arg of includeArg) {
    if (includeArg.indexOf(arg) != includeArg.lastIndexOf(arg)) {
      a.error(
        `'${arg}' has a duplicate at position ${includeArg.lastIndexOf(
          arg
        )} within the OBJ property array.`
      );
    }
  }

  let objFileStr = "";

  try {
    objFileStr = (await fs.readFile(filepathArg)).toString();
  } catch {
    a.error("Failed to get OBJ file.");
  }

  const obj = await tryParseObj(objFileStr, path.dirname(filepathArg), a);

  return a.ns(
    namespace,
    includeArg.map((arg) => {
      switch (arg) {
        case "vertices":
          return desmoscriptObjVertices(obj, a);
        case "normals":
          return desmoscriptObjNormals(obj, a);
        case "texcoords":
          return desmoscriptObjTexcoords(obj, a);
        case "vertexIndices":
          return desmoscriptObjVertexIndices(obj, a);
        case "normalIndices":
          return desmoscriptObjNormalIndices(obj, a);
        case "texcoordIndices":
          return desmoscriptObjTexcoordIndices(obj, a);
        case "materials":
          return desmoscriptObjMaterials(obj.materials, a);
        case "faceMaterials":
          return desmoscriptObjFaceMaterials(obj, a);
        default:
          return a.note("INVALID OBJ DATA");
      }
    })
  );
};

function desmoscriptObjVertices(obj: ParsedOBJ, a: MacroAPI) {
  return a.ns("vertices", [
    a.binop(
      a.ident("x"),
      "=",
      a.list(...obj.vertices.map((v) => a.number(v[0])))
    ),
    a.binop(
      a.ident("y"),
      "=",
      a.list(...obj.vertices.map((v) => a.number(v[1])))
    ),
    a.binop(
      a.ident("z"),
      "=",
      a.list(...obj.vertices.map((v) => a.number(v[2])))
    ),
  ]);
}

function desmoscriptObjNormals(obj: ParsedOBJ, a: MacroAPI) {
  return a.ns("normals", [
    a.binop(
      a.ident("x"),
      "=",
      a.list(...obj.normals.map((v) => a.number(isNaN(v[0]) ? 0 : v[0])))
    ),
    a.binop(
      a.ident("y"),
      "=",
      a.list(...obj.normals.map((v) => a.number(isNaN(v[1]) ? 0 : v[1])))
    ),
    a.binop(
      a.ident("z"),
      "=",
      a.list(...obj.normals.map((v) => a.number(isNaN(v[2]) ? 0 : v[2])))
    ),
  ]);
}

function desmoscriptObjTexcoords(obj: ParsedOBJ, a: MacroAPI) {
  return a.ns("texcoords", [
    a.binop(
      a.ident("x"),
      "=",
      a.list(...obj.texcoords.map((v) => a.number(v[0])))
    ),
    a.binop(
      a.ident("y"),
      "=",
      a.list(...obj.texcoords.map((v) => a.number(v[1])))
    ),
  ]);
}

function desmoscriptObjVertexIndices(obj: ParsedOBJ, a: MacroAPI) {
  return a.binop(
    a.ident("vertexIndices"),
    "=",
    a.list(...obj.vertexIndices.map((v) => a.number(v)))
  );
}

function desmoscriptObjNormalIndices(obj: ParsedOBJ, a: MacroAPI) {
  return a.binop(
    a.ident("normalIndices"),
    "=",
    a.list(...obj.normalIndices.map((v) => a.number(v)))
  );
}

function desmoscriptObjTexcoordIndices(obj: ParsedOBJ, a: MacroAPI) {
  return a.binop(
    a.ident("texcoordIndices"),
    "=",
    a.list(...obj.texcoordIndices.map((v) => a.number(v)))
  );
}

function desmoscriptObjFaceMaterials(obj: ParsedOBJ, a: MacroAPI) {
  return a.binop(
    a.ident("faceMaterials"),
    "=",
    a.list(...obj.faceMaterials.map((v) => a.number(v + 1)))
  );
}

export function desmoscriptObjMaterials(materials: ParsedOBJ["materials"], a: MacroAPI) {
  function rgbProperty(name: string, data: [number, number, number][]) {
    return a.ns(name, [
      a.binop(a.ident("r"), "=", a.list(...data.map((d) => a.number(d[0])))),
      a.binop(a.ident("g"), "=", a.list(...data.map((d) => a.number(d[1])))),
      a.binop(a.ident("b"), "=", a.list(...data.map((d) => a.number(d[2])))),
    ]);
  }

  const obj = { materials };

  return a.ns("materials", [
    rgbProperty(
      "diffuse",
      obj.materials.map((mat) => mat.diffuse ?? [-1, -1, -1])
    ),

    rgbProperty(
      "ambient",
      obj.materials.map((mat) => mat.ambient ?? [-1, -1, -1])
    ),

    rgbProperty(
      "specular",
      obj.materials.map((mat) => mat.specular ?? [-1, -1, -1])
    ),

    a.binop(
      a.ident("specularExponent"),
      "=",
      a.list(
        ...obj.materials.map((mat) => a.number(mat.specularExponent ?? -1))
      )
    ),

    a.binop(
      a.ident("illuminationModel"),
      "=",
      a.list(
        ...obj.materials.map((mat) => a.number(mat.illuminationModel ?? -1))
      )
    ),

    a.binop(
      a.ident("dissolve"),
      "=",
      a.list(...obj.materials.map((mat) => a.number(mat.dissolve ?? -1)))
    ),
  ]);
}
