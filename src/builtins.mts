import { ASTBinop, ASTType, RawASTExpr } from "./ast.mjs";
import { DesmoscriptContext, Identifier, ScopeContent, ScopeInfo } from "./semantic-analysis-types.mjs";

const builtin: ScopeContent = { type: Identifier.BUILTIN_FUNCTION };

function getExprContext(expr: RawASTExpr<ScopeInfo>) {
    return {
        line: expr.line,
        col: expr.col,
        file: expr.file,
        equivalentScope: expr.equivalentScope,
        innerScope: expr.innerScope
    };
}

export function makeDefaultDesmoscriptContext(): DesmoscriptContext {
    return {
        builtins: {
            scopeName: "",
            contents: new Map<string, ScopeContent>()
            .set("sin", builtin)
            .set("cos", builtin)
            .set("tan", builtin)

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