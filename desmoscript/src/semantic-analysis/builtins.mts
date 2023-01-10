import {
  ASTBinop,
  ASTExpr,
  ASTNote,
  ASTType,
  RawASTExpr,
} from "../ast/ast.mjs";
import * as path from "node:path";
import { ScopeInfo, ScopeContent } from "./analysis-types.mjs";
import { loop, sub } from "../stdlib/macroutils.mjs";
import { loadObj } from "../stdlib/3d/obj-to-desmoscript.mjs";
import {
  lookupMeshBVH,
  multiObjToDesmoscriptBVH,
} from "../stdlib/3d/multi-obj-bvh-to-desmoscript.mjs";
import {
  lookupMesh,
  multiObjToDesmoscript,
} from "../stdlib/3d/multi-obj-to-desmoscript.mjs";
import { makeExprId } from "../ast/parse.mjs";
import { deswizzle } from "../stdlib/3d/swizzle.mjs";
import { lookupCelShadingMesh, multiObjCelShadingToDesmoscript } from "../stdlib/3d/mesh-manip/multi-obj-cel-shading-to-desmoscript.mjs";
import { lookupPhysicsMesh, multiObjPhysicsToDesmoscript } from "../stdlib/3d/mesh-manip/multi-obj-physics-to-desmoscript.mjs";


export function getExprContext(expr: RawASTExpr<{}>) {
  return {
    line: expr.line,
    col: expr.col,
    file: expr.file,
    _isexpr: true as const,
  };
}

export function createDesmosBuiltins(): Map<string, ScopeContent.Content> {
  const macro: ScopeContent.Macro = {
    type: ScopeContent.Type.MACRO,
    fn: (expr, ctx, a): ASTExpr => {
      return a.number(3);
    },
    id: makeExprId(),
  };

  const map = new Map<string, ScopeContent.Content>();
  map.set("x", {
    type: ScopeContent.Type.VARIABLE,
    isPartOfDesmos: true,
    id: makeExprId(),
  });
  map.set("y", {
    type: ScopeContent.Type.VARIABLE,
    isPartOfDesmos: true,
    id: makeExprId(),
  });
  map.set("width", {
    type: ScopeContent.Type.VARIABLE,
    isPartOfDesmos: true,
    id: makeExprId(),
  });
  map.set("height", {
    type: ScopeContent.Type.VARIABLE,
    isPartOfDesmos: true,
    id: makeExprId(),
  });
  map.set("parametricT", {
    type: ScopeContent.Type.VARIABLE,
    isPartOfDesmos: true,
    id: makeExprId(),
    replacement: "t "
  });
    map.set("rgb", {
      id: makeExprId(),
      type: ScopeContent.Type.FUNCTION,
      isPartOfDesmos: true,
    });
  map.set("loadObj", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: loadObj,
  });
  map.set("multiObjToDesmoscriptBVH", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: multiObjToDesmoscriptBVH,
  });
  map.set("lookupMeshBVH", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: lookupMeshBVH,
  });
  map.set("multiObjToDesmoscript", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: multiObjToDesmoscript,
  });
  map.set("lookupMesh", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: lookupMesh,
  });
  map.set("deswizzle", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: deswizzle
  });
  map.set("lookupCelShadingMesh", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: lookupCelShadingMesh
  });
  map.set("multiObjCelShadingToDesmoscript", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: multiObjCelShadingToDesmoscript
  });
  map.set("lookupPhysicsMesh", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: lookupPhysicsMesh
  });
  map.set("multiObjPhysicsToDesmoscript", {
    id: makeExprId(),
    type: ScopeContent.Type.MACRO,
    fn: multiObjPhysicsToDesmoscript
  });
  map.set("sub", sub);
  map.set("loop", loop);
  [
    "sin",
    "cos",
    "tan",
    "sec",
    "csc",
    "cot",
    "arctan",
    "arccos",
    "arcsin",

    "join",
    "total",
    "mean",
    "sort",
    "length",

    "floor",
    "ceil",
    "mod",
    "sign",
    "abs",

    "min",
    "max",

    "polygon",

    "index",

    "random",
  ].map((name) => map.set(name, {
    type: ScopeContent.Type.FUNCTION,
    isPartOfDesmos: true,
    id: makeExprId()
  }));
  return map;
}

// export function makeDefaultDesmoscriptContext(entry: string) {
//     return {
//         files: [path.join(process.cwd(), entry)],
//         builtins: {
//             scopeName: "",
//             contents: new Map<string, ScopeContent>()
//             .set("sin", builtin)
//             .set("cos", builtin)
//             .set("tan", builtin)
//             .set("rgb", builtin)
//             .set("hsv", builtin)
//             .set("polygon", builtin)
//             .set("floor", builtin)
//             .set("ceil", builtin)
//             .set("mod", builtin)
//             .set("join", builtin)
//             .set("sort", builtin)
//             .set("length", builtin)
//             .set("max", builtin)
//             .set("min", builtin)
//             .set("total", builtin)
//             .set("x", builtinVar)
//             .set("t", builtinVar)

//             .set("plusOne", {
//                 type: Identifier.BUILTIN_MACRO,
//                 fn: (expr): ASTBinop<ScopeInfo> => {
//                     let ctx = getExprContext(expr);
//                     return {
//                         ...ctx,
//                         type: ASTType.BINOP,
//                         op: "+",
//                         left: expr.args[0],
//                         right: {
//                             ...ctx,
//                             type: ASTType.NUMBER,
//                             number: 1
//                         }
//                     }
//                 }
//             })
//             .set("makeBuiltin", {
//                 type: Identifier.BUILTIN_MACRO,
//                 fn: (expr, ctx): ASTNote<ScopeInfo> => {
//                     if (expr.args[0].type == ASTType.IDENTIFIER) {
//                         ctx.builtins.contents.set(expr.args[0].segments[0], builtin);
//                     }
//                     return {
//                         ...getExprContext(expr),
//                         type: ASTType.NOTE,
//                         text: ""
//                     };
//                 }
//             })
//             .set("loadObj", { fn: loadObj, type: Identifier.BUILTIN_MACRO })
//             .set("sub", sub)

//             // .set("sum", {
//             //     type: Identifier.MACRO,
//             //     fn: (expr): ASTSumProd<ScopeInfo> => {
//             //         let ctx = getExprContext(expr);
//             //         return
//             //     }
//             // })
//         }
//     };
// }
