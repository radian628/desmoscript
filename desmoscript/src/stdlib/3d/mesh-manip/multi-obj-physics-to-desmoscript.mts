import { ASTExpr, ASTNumber, ASTType } from "../../../ast/ast.mjs";
import { lastof } from "../../../compile/compile.mjs";
import { MacroAPI, ScopeContent } from "../../../semantic-analysis/analysis-types.mjs";
import { parseIdentSingleString, parseNoteString } from "../../macroutils.mjs";
import { AABB, getCombinedBounds } from "../bvh.mjs";
import { createDesmosCompoundDataTypeGetters, DesmosCompoundDataType, fillOutDesmosCompoundDataType } from "../data-packing/data-packing.mjs";
import { mean } from "../multi-obj-bvh-to-desmoscript.mjs";
import { ParsedMultiOBJ, parseMultiObj } from "../multi-obj-importer.mjs";
import { doDesmosMultiObjCelShading, Light, range } from "./multi-obj-cel-shading.mjs";
import { DesmosLightingModelMesh } from "./triangle.mjs";

export type PhysicsMesh = {
  vertices: [number, number, number][];
  triangles: {
    indices: [number, number, number],
  }[],
  aabb: AABB
};

function getMeshVertexStatistics(mesh: PhysicsMesh) {
  const averagePosition = [
    mean(mesh.vertices.map((v) => v[0])),
    mean(mesh.vertices.map((v) => v[1])),
    mean(mesh.vertices.map((v) => v[2])),
  ] as const;
  const largestScale = Math.max(
    ...mesh.vertices.map((v) => Math.abs(averagePosition[0] - v[0])),
    ...mesh.vertices.map((v) => Math.abs(averagePosition[1] - v[1])),
    ...mesh.vertices.map((v) => Math.abs(averagePosition[2] - v[2]))
  );
  return {
    averagePosition,
    largestScale
  };
}

const physicsDesmosFormat: DesmosCompoundDataType<string> = new Map();
physicsDesmosFormat.set("xpos", { type: "single" });
physicsDesmosFormat.set("ypos", { type: "single" });
physicsDesmosFormat.set("zpos", { type: "single" });
physicsDesmosFormat.set("scale", { type: "single" });
physicsDesmosFormat.set("vertexCount", { type: "packed", bits: 26 });
physicsDesmosFormat.set("triCount", { type: "packed", bits: 26 });
const commonVertexInfo = {
  type: "array" as const,
  bitsPerNumber: 16,
  lengthVarName: "vertexCount",
  unpackerVarName: "v"
}
physicsDesmosFormat.set("xVertex", {
  ...commonVertexInfo,
  unpackerExprs: `(v / 32768 - 1) * scale(data) + xpos(data)`
});
physicsDesmosFormat.set("yVertex", {
  ...commonVertexInfo,
  unpackerExprs: `(v / 32768 - 1) * scale(data) + ypos(data)`
});
physicsDesmosFormat.set("zVertex", {
  ...commonVertexInfo,
  unpackerExprs: `(v / 32768 - 1) * scale(data) + zpos(data)`
});
const commonIndexInfo = {
  type: "array" as const,
  bitsPerNumber: 10,
  lengthVarName: "triCount",
  unpackerVarName: "i",
  unpackerExprs: "i"
}
physicsDesmosFormat.set("tri1", { ...commonIndexInfo });
physicsDesmosFormat.set("tri2", { ...commonIndexInfo });
physicsDesmosFormat.set("tri3", { ...commonIndexInfo });

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function multiObjPhysicsToDesmoscriptInner(
  namespaceName: string,
  meshes: Map<string, PhysicsMesh>,
  a: MacroAPI
) {
  const expressions: ASTExpr[] = [];

  const getters = createDesmosCompoundDataTypeGetters("getters", physicsDesmosFormat, a);
  expressions.push(getters);

  const normalizeVertex = (v: number) => Math.floor((v + 1) / 2 * (2 ** 16 - 1));

  type MeshIndex = {
    outerIndex: number; // zero-indexed
    innerIndex: number; // one-indexed
    size: number;
  };

  const meshIndices: MeshIndex[] = [];

  const aabbs = Array.from(meshes.values()).map(mesh => mesh.aabb);

  const meshLUTExprData = [] as number[][];
  for (const mesh of meshes.values()) {
    const meshStats = getMeshVertexStatistics(mesh);
    const serializedMesh = fillOutDesmosCompoundDataType(physicsDesmosFormat, {
      xpos: meshStats.averagePosition[0],
      ypos: meshStats.averagePosition[1],
      zpos: meshStats.averagePosition[2],
      scale: meshStats.largestScale,
      vertexCount: mesh.vertices.length,
      triCount: mesh.triangles.length,
      xVertex: mesh.vertices.map(
        v => clamp((v[0] - meshStats.averagePosition[0]) / meshStats.largestScale, -1, 1))
        .map(normalizeVertex),
      yVertex: mesh.vertices.map(
        v => clamp((v[1] - meshStats.averagePosition[1]) / meshStats.largestScale, -1, 1))
        .map(normalizeVertex),
      zVertex: mesh.vertices.map(
        v => clamp((v[2] - meshStats.averagePosition[2]) / meshStats.largestScale, -1, 1))
        .map(normalizeVertex),
      tri1: mesh.triangles.map(
        tri => tri.indices[0] + 1
      ),
      tri2: mesh.triangles.map(
        tri => tri.indices[1] + 1
      ),
      tri3: mesh.triangles.map(
        tri => tri.indices[2] + 1
      )
    });

    if (meshLUTExprData.length == 0 
      || lastof(meshLUTExprData).length + serializedMesh.length > 10000) {
      meshLUTExprData.push([]);
    }
    meshIndices.push({
      outerIndex: meshLUTExprData.length - 1,
      innerIndex: lastof(meshLUTExprData).length + 1,
      size: serializedMesh.length,
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
      [
        a.binop(
          //create lists
          a.match(
            meshLUTExprData.map((e, i) => {
              return [
                a.binop(a.ident("outerIndex"), "==", a.number(i)),
                a.list(...e.map((n) => a.number(n))),
              ] as [ASTExpr, ASTExpr];
            }),
            a.list()
          ),
          // index the chosen list to get data
          "[",
          a.binop(
            a.ident("innerIndex"),
            "..",
            a.binop(a.ident("innerIndex"), "+", a.ident("size"))
          )
        ),
      ]
    )
  );


  
  expressions.push(
    a.binop(
      a.ident("xmin"),
      "=",
      a.list(...aabbs.map((aabb) => a.number(aabb.min[0])))
    )
  );
  expressions.push(
    a.binop(
      a.ident("ymin"),
      "=",
      a.list(...aabbs.map((aabb) => a.number(aabb.min[1])))
    )
  );
  expressions.push(
    a.binop(
      a.ident("zmin"),
      "=",
      a.list(...aabbs.map((aabb) => a.number(aabb.min[2])))
    )
  );
  expressions.push(
    a.binop(
      a.ident("xmax"),
      "=",
      a.list(...aabbs.map((aabb) => a.number(aabb.max[0])))
    )
  );
  expressions.push(
    a.binop(
      a.ident("ymax"),
      "=",
      a.list(...aabbs.map((aabb) => a.number(aabb.max[1])))
    )
  );
  expressions.push(
    a.binop(
      a.ident("zmax"),
      "=",
      a.list(...aabbs.map((aabb) => a.number(aabb.max[2])))
    )
  );  
  expressions.push(
    a.binop(
      a.ident("outerIndex"),
      "=",
      a.list(...meshIndices.map((e) => a.number(e.outerIndex)))
    )
  );
  expressions.push(
    a.binop(
      a.ident("innerIndex"),
      "=",
      a.list(...meshIndices.map((e) => a.number(e.innerIndex)))
    )
  );
  expressions.push(
    a.binop(
      a.ident("size"),
      "=",
      a.list(...meshIndices.map((e) => a.number(e.size)))
    )
  );


  
  expressions.push(
    a.fromstr(`
  fn isOverlapping(amin, amax, bmin, bmax) {
    min(
      match { (amax >= bmin) => 1; 0; },
      match { (bmax >= amin) => 1; 0; }
    )
  }`)
  );

  expressions.push(
    a.fromstr(`
    fn rectRectIntersect(axmin, aymin, azmin, axmax, aymax, azmax, bxmin, bymin, bzmin, bxmax, bymax, bzmax) {
      min(
        isOverlapping(axmin, axmax, bxmin, bxmax),
        isOverlapping(aymin, aymax, bymin, bymax),
        isOverlapping(azmin, azmax, bzmin, bzmax)
      )
    }
  `)
  );

  expressions.push(
    a.fromstr(`fn doLookup(testxmin, testymin, testzmin, testxmax, testymax, testzmax) {
    (1 .. ${meshes.size})[
      rectRectIntersect(
        testxmin, testymin, testzmin,
        testxmax, testymax, testzmax,
        xmin, ymin, zmin,
        xmax, ymax, zmax
      ) == 1
    ]
  }`));

  return a.ns(namespaceName, expressions);
}



import * as fs from "node:fs/promises";
import * as path from "node:path";

export function multiObjToPhysicsObj(obj: ParsedMultiOBJ): Map<string, PhysicsMesh> {
  return new Map(Array.from(obj.objects.entries())
  .filter(([k,v]) => k.slice(0,3) == "ph_")
  .map(([meshName, oldmesh]) => {
    const mesh: PhysicsMesh = {
      triangles: [],
      vertices: [],
      aabb: getCombinedBounds(oldmesh.vertices.map(v => {
        return {
          min: v,
          max: v
        } as AABB
      }))
    };

    const lowestIndex = Math.min(...oldmesh.vertexIndices);
    
    for (let i = 0; i < oldmesh.vertexIndices.length; i+=3) {
      mesh.triangles.push({
        indices: [
          oldmesh.vertexIndices[i] - lowestIndex,
          oldmesh.vertexIndices[i+1] - lowestIndex,
          oldmesh.vertexIndices[i+2] - lowestIndex,
        ]
      });
    }

    mesh.vertices = oldmesh.vertices;

    return [meshName, mesh];
  }))
}

export const multiObjPhysicsToDesmoscript: ScopeContent.Macro["fn"] = async function (
  expr,
  ctx,
  a
) {
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

  return multiObjPhysicsToDesmoscriptInner(
    namespace, 
    multiObjToPhysicsObj(obj), 
    a
  );
};



export const lookupPhysicsMesh: ScopeContent.Macro["fn"] = async function (
  expr, ctx, a 
) {
  
  const outputNamespace = parseIdentSingleString(expr.args[0], a, "argument 1");
  const inputNamespace = parseIdentSingleString(expr.args[1], a, "argument 2");
  const xmin = expr.args[2];
  const ymin = expr.args[3];
  const zmin = expr.args[4];
  const xmax = expr.args[5];
  const ymax = expr.args[6];
  const zmax = expr.args[7];
  if (!xmin || !ymin || !zmin || !xmax || !ymax || !zmax) {
    a.error(
      "Arguments 3 through 8 all must exist, and should represent the bounds of the lookup rectangle."
    );
  }

  const meshCountExpr = expr.args[8];
  if (!meshCountExpr || meshCountExpr.type != ASTType.NUMBER) {
    a.error(
      "Argument 9 must be a constant positive integer number representing the number of meshes to load."
    );
  }
  const meshCount = (meshCountExpr as ASTNumber<{}, {}>).number;

  let expressions: ASTExpr[] = [];
  expressions.push(
    a.binop(
      a.ident("foundMeshIndices"),
      "=",
      a.fn(
        a.ident(inputNamespace, "doLookup"),
        xmin,
        ymin,
        zmin,
        xmax,
        ymax,
        zmax
      )
    )
  );

  expressions.push(
    a.fromstr(`
    meshIndices = join(
      foundMeshIndices,
      (1 .. ${meshCount} - length(foundMeshIndices)) * 0 + 1
    );
  `)
  );

  const verticesNamespaceContents: ASTExpr[] = [];
  
  // load mesh data
  new Array(meshCount).fill(0).map((e, i) => {
    expressions.push(
      a.binop(
        a.ident(`mesh${i}`),
        "=",
        a.fn(
          a.ident(inputNamespace, "getMeshData"),
          a.binop(
            a.ident(inputNamespace, "outerIndex"),
            "[",
            a.binop(a.ident("meshIndices"), "[", a.number(i + 1))
          ),
          a.binop(
            a.ident(inputNamespace, "innerIndex"),
            "[",
            a.binop(a.ident("meshIndices"), "[", a.number(i + 1))
          ),
          a.binop(
            a.ident(inputNamespace, "size"),
            "[",
            a.binop(a.ident("meshIndices"), "[", a.number(i + 1))
          )
        )
      )
    );
  });

  function ithMeshGetter(i: number, customFunction: ASTExpr) {
    return a.match(
      [
        [
          a.binop(
            a.fn(a.ident("length"), a.ident("foundMeshIndices")),
            ">=",
            a.number(i + 1)
          ),
          customFunction,
        ],
      ],
      a.list()
    );
  }

  // load mesh vertex positions and normals
  "xyz".split("").forEach((component, componentIndex) => {
    verticesNamespaceContents.push(
      a.binop(
        a.ident(component),
        "=",
        a.fn(
          a.ident("join"),
          ...new Array(meshCount).fill(0).map((e, i) => {
            const meshVertexGetter = a.fn(
              a.ident(inputNamespace, "getters", `${component}Vertex`),
              a.ident(`mesh${i}`)
            );

            return ithMeshGetter(i, meshVertexGetter);
          })
        )
      )
    );
  });

  const indicesNamespaceContents: ASTExpr[] = [];
  const indexArrays: [ASTExpr[], ASTExpr[], ASTExpr[]] = [[], [], []];

  // load mesh vertex indices
  indicesNamespaceContents.push(a.fromstr(`
  indexOffsetOf0 = 0;`))
  for (let i = 0; i < meshCount; i++) {
    indicesNamespaceContents.push(a.binop(
      a.ident(`indexOffsetOf${i+1}`),
      "=",
      a.fromstr(`${inputNamespace}.getters.vertexCount(mesh${i}) + indexOffsetOf${i}`)
    ));
    for (let j = 0; j < 3; j++) {
      indexArrays[j].push(a.fromstr(`
        ${inputNamespace}.getters.tri${j+1}(mesh${i}) + indexOffsetOf${i}
      `));
    }
  }

  indexArrays.forEach((ia, i) => {
    indicesNamespaceContents.push(a.binop(
      a.ident(`tri${i + 1}`),
      "=",
      a.fn(a.ident("join"), ...ia)
    ));
  });

  expressions.push(a.ns("vertexPosition", verticesNamespaceContents));
  expressions.push(a.ns("index", indicesNamespaceContents));

  return a.ns(outputNamespace, expressions);
}