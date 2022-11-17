import { ASTBinop, ASTNote, ASTType, RawASTExpr } from "../ast/ast.mjs";
import { sub } from "../stdlib/macroutils.mjs";
import { loadObj } from "../stdlib/obj-importer.mjs";
import * as path from "node:path";
import { ScopeInfo, ScopeContent } from "./analysis-types.mjs"

const builtin = { type: ScopeContent.Type.FUNCTION, data: { builtin: true } };

const builtinVar = { type: ScopeContent.Type.VARIABLE, data: { builtin: true } };

export function getExprContext(expr: RawASTExpr<{}>) {
    return {
        line: expr.line,
        col: expr.col,
        file: expr.file,
    };
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