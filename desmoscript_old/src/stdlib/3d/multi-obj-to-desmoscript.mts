import { ASTExpr, ASTNumber, ASTType } from "../../ast/ast.mjs";
import { lastof } from "../../compile/compile.mjs";
import {
  MacroAPI,
  ScopeContent,
} from "../../semantic-analysis/analysis-types.mjs";
import { parseIdentSingleString, parseNoteString } from "../macroutils.mjs";
import { getBounds } from "./bvh.mjs";
import {
  desmosifyObjMesh,
  serializeForDesmos,
} from "./multi-obj-bvh-to-desmoscript.mjs";
import { ParsedMultiOBJ, parseMultiObj } from "./multi-obj-importer.mjs";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import { desmoscriptObjMaterials } from "./obj-to-desmoscript.mjs";

export function multiOBJToDesmoscriptInner(
  namespaceName: string,
  obj: ParsedMultiOBJ,
  a: MacroAPI
) {
  console.log("got here!!!!");
  const expressions: ASTExpr[] = [];
  const serializedMeshes = new Map(
    Array.from(obj.objects.entries()).map(
      ([name, mesh]) =>
        [
          name,
          {
            mesh: serializeForDesmos(desmosifyObjMesh(mesh)),
            aabb: getBounds(mesh),
          },
        ] as const
    )
  );

  type MeshIndex = {
    outerIndex: number; // zero-indexed
    innerIndex: number; // one-indexed
    size: number;
  };

  // aabb bounds
  const aabbs = Array.from(serializedMeshes.values()).map((mesh) => mesh.aabb);

  // mesh data locations
  const meshIndices: MeshIndex[] = [];

  // Mesh LUT
  const meshLUTExprData = [] as number[][];
  const meshLUTExprDataOffsetMap = new Map<string, MeshIndex>();
  for (const [meshName, serializedMesh] of serializedMeshes.entries()) {
    if (
      meshLUTExprData.length == 0 ||
      lastof(meshLUTExprData).length + serializedMesh.mesh.length > 10000
    ) {
      meshLUTExprData.push([]);
    }
    meshIndices.push({
      outerIndex: meshLUTExprData.length - 1,
      innerIndex: lastof(meshLUTExprData).length + 1,
      size: serializedMesh.mesh.length,
    });
    lastof(meshLUTExprData).push(...serializedMesh.mesh);
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
    a.fromstr(`fn doLookup(testxmin, testymin, testzmin, testxmax, testymax, testzmax) {
    (1 .. ${serializedMeshes.size})[
      rectRectIntersect(
        testxmin, testymin, testzmin,
        testxmax, testymax, testzmax,
        xmin, ymin, zmin,
        xmax, ymax, zmax
      ) == 1
    ]
  }`)
  );

  expressions.push(
    desmoscriptObjMaterials(obj.materials, a)
  );

  return a.ns(namespaceName, expressions);
}

export const multiObjToDesmoscript: ScopeContent.Macro["fn"] = async function (
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

  return multiOBJToDesmoscriptInner(namespace, obj, a);
};

export const lookupMesh: ScopeContent.Macro["fn"] = async function (
  expr,
  ctx,
  a
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
  const normalsNamespaceContents: ASTExpr[] = [];

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
              a.ident("bin", "getComponentOfVertexOfMesh"),
              a.ident(`mesh${i}`),
              a.number(componentIndex)
            );

            return ithMeshGetter(i, meshVertexGetter);
          })
        )
      )
    );

    normalsNamespaceContents.push(
      a.binop(
        a.ident(component),
        "=",
        a.fn(
          a.ident("join"),
          ...new Array(meshCount).fill(0).map((e, i) => {
            const meshNormalGetter = a.fn(
              a.ident("bin", "getComponentOfNormalOfMesh"),
              a.ident(`mesh${i}`),
              a.number(componentIndex)
            );

            return ithMeshGetter(i, meshNormalGetter)
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
      a.fromstr(`bin.getVertexCount(mesh${i}) + indexOffsetOf${i}`)
    ));
    for (let j = 0; j < 3; j++) {
      indexArrays[j].push(a.fromstr(`
        bin.getIndicesOfMesh(mesh${i}, ${j}) + indexOffsetOf${i}
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

  // load mesh materials
  expressions.push(a.binop(
    a.ident("materialIndices"),
    "=",
    a.fn(a.ident("join"),
      ...new Array(meshCount).fill(0)
      .map((e, i) => a.fromstr(`
        bin.getMaterialIndicesOfMesh(mesh${i})
      `))
    )
  ));

  expressions.push(a.ns("normal", normalsNamespaceContents))
  expressions.push(a.ns("vertexPosition", verticesNamespaceContents));
  expressions.push(a.ns("index", indicesNamespaceContents));

  return a.ns(outputNamespace, expressions);
};
