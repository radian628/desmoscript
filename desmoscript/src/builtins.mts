import { ASTBinop, ASTNote, ASTType, RawASTExpr } from "./ast.mjs";
import { DesmoscriptContext, Identifier, ScopeContent, ScopeInfo } from "./semantic-analysis-types.mjs";

const builtin: ScopeContent = { type: Identifier.BUILTIN_FUNCTION };

const builtinVar: ScopeContent = { type: Identifier.BUILTIN_VARIABLE };

function getExprContext(expr: RawASTExpr<ScopeInfo>) {
    return {
        line: expr.line,
        col: expr.col,
        file: expr.file,
        equivalentScope: expr.equivalentScope,
        innerScope: expr.innerScope
    };
}

export function makeDefaultDesmoscriptContext(entry: string): DesmoscriptContext {
    return {
        files: [entry],
        builtins: {
            scopeName: "",
            contents: new Map<string, ScopeContent>()
            .set("sin", builtin)
            .set("cos", builtin)
            .set("tan", builtin)
            .set("rgb", builtin)
            .set("hsv", builtin)
            .set("polygon", builtin)
            .set("floor", builtin)
            .set("ceil", builtin)
            .set("mod", builtin)
            .set("join", builtin)
            .set("sort", builtin)
            .set("length", builtin)
            .set("max", builtin)
            .set("min", builtin)
            .set("total", builtin)
            .set("x", builtinVar)
            .set("t", builtinVar)

            .set("plusOne", { 
                type: Identifier.MACRO, 
                fn: (expr): ASTBinop<ScopeInfo> => {
                    let ctx = getExprContext(expr);
                    return {
                        ...ctx,
                        type: ASTType.BINOP,
                        op: "+",
                        left: expr.args[0],
                        right: {
                            ...ctx,
                            type: ASTType.NUMBER,
                            number: 1
                        }
                    }
                }
            })
            .set("makeBuiltin", {
                type: Identifier.MACRO,
                fn: (expr, ctx): ASTNote<ScopeInfo> => {
                    if (expr.args[0].type == ASTType.IDENTIFIER) {
                        ctx.builtins.contents.set(expr.args[0].segments[0], builtin);
                    }
                    return {
                        ...getExprContext(expr),
                        type: ASTType.NOTE,
                        text: ""
                    };
                }
            })

            // .set("sum", {
            //     type: Identifier.MACRO,
            //     fn: (expr): ASTSumProd<ScopeInfo> => {
            //         let ctx = getExprContext(expr);
            //         return 
            //     }
            // })
        }
    };
}