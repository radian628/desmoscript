import { DesmoscriptCompilationUnit, DesmoscriptCompileContext, Scope, ScopeContent } from "../semantic-analysis/analysis-types.mjs";

import { GraphState } from "../graphstate.mjs";
import { ASTBinop, ASTExpr, ASTIdentifier, ASTType, RawASTExpr } from "../ast/ast.mjs";
import { err } from "../semantic-analysis/analyze.mjs";

let exprIdCounter = 0;
function uniqueExpressionID() {
    return (exprIdCounter++).toString();
}


function opToLatex<T>(expr: ASTBinop<T>) {
    const lop: string | undefined = optable[expr.op];
    if (!lop) throw {
        expr,
        reason: `Unable to convert operator '${expr.op}'. Contact a developer if this error occurs.`
    }
    return lop;
}

function toDesmosVar(str: string) {
    if (str.length == 1) return str;
    return `${str[0]}_{${str.slice(1)}}`;
}

function lastof<T>(arr: T[]) {
    return arr[arr.length - 1];
}

const optable: { [key: string]: string } = {
    "+": "+",
    "-": "-",
    "*": "\\cdot ",
    ">": "\\gt ",
    "<": "\\lt ",
    ">=": "\\ge ",
    "<=": "\\le ",
    "->": "\\to ",
    "..": "...",
    "=": "=",
    "==": "="
}

/*
How do I come up with identifier names, given that they may be in different scopes in different files?
My current approach is to create a hash table of identifier names.
*/
function compileExprToJSON(
expr: RawASTExpr<{}>,
state: {
    ctx: DesmoscriptCompileContext,
    unit: DesmoscriptCompilationUnit,
    unitName: string,
    graphState: GraphState,
    scope: Scope,
    identifierMap: Map<string, Map<string, string>>
}, ) {
    function compileSingleExpr(e: ASTExpr, scope: Scope): string {
        function c(e2: ASTExpr) {
          let innerScope = scope;
          let newScopeName: string | undefined = undefined;
          switch (e2.type) {
            case ASTType.LISTCOMP:
            case ASTType.DERIVATIVE:
            case ASTType.SUMPRODINT:
            case ASTType.FNDEF:
              newScopeName = e2.id;
              break;
            case ASTType.NAMESPACE:
              newScopeName = e2.name;
              break;
          }
          if (newScopeName) {
            const newInnerScope = scope.contents.get(newScopeName);
            if (!newInnerScope 
              || newInnerScope.type != ScopeContent.Type.SCOPE
            ) err(e, "Scope does not exist when it should.");
            innerScope = newInnerScope.data;
          }
          return compileSingleExpr(e2, innerScope);
        }
        switch (e.type) {
            case ASTType.BINOP:
                if (e.op == "^") return `${c(e.left)}^{${c(e.right)}}`;
                if (e.op == "[") return `${c(e.left)}\\left[${c(e.right)}\\right]`;
                if (e.op == "/") return `\\frac{${c(e.left)}}{${c(e.right)}}`;
                if (e.op == "%") return `\\operatorname{mod}\\left(${c(e.left)},${c(e.right)}\\right)`
                if (e.op == "=") return `${c(e.left)}${opToLatex(e)}${c(e.right)}`;
                if (e.op == "..") return `\\left[${c(e.left)}${opToLatex(e)}${c(e.right)}\\right]`;
                if ([">", "<", ">=", "<=", "=="].indexOf(e.op) != -1) {
                    return `${c(e.left)}${opToLatex(e)}${c(e.right)}`;
                }
                return `\\left(${c(e.left)}${opToLatex(e)}${c(e.right)}\\right)`;
            case ASTType.NUMBER:
                return e.number.toString();
            case ASTType.ROOT:
                throw {
                    expr: e,
                    reason: "INTERNAL ERROR: A single expression should never be the root!"
                }
            case ASTType.IDENTIFIER:
                const ident = findIdentifier(scope, e);
                if (!ident) 
                  err(e, `Identifier '${e.segments.join(".")}' does not exist in this scope.`);
                
                switch (ident.type) {
                  case ScopeContent.Type.VARIABLE:
                  case ScopeContent.Type.FUNCTION:
                    if (ident.data.isBuiltin) {
                      return `\\operatorname{${ident.path[ident.path.length - 1]}}`;
                    } else {
                      return toDesmosVar(ident.path.join("X"));
                    }
                  default:
                    err(e, "INTERNAL ERROR: These types of expressions should not exist here!");
                }

                // if (
                //   ident.type == ScopeContent.Type.MACRO
                //   || ident.type == ScopeContent.Type.NOTE
                // ) 
                //   err(e, "INTERNAL ERROR: These types of expressions should not exist here!");
                
                // if (ident?.data.isBuiltin) {
                //     return `\\operatorname{${ident.path[ident.path.length - 1]}}`;
                // } else if (ident.content.type == Identifier.BUILTIN_VARIABLE) {
                //     return ident.path[ident.path.length - 1];
                // }
                
        }
    }
}

function compileScopeToJSON(state: {
    ctx: DesmoscriptCompileContext,
    unit: DesmoscriptCompilationUnit,
    unitName: string,
    graphState: GraphState,
    scope: Scope,
    identifierMap: Map<string, Map<string, string>>
}) {
    const { ctx, unit, unitName, graphState, scope, identifierMap } = state;
    for (const [name, c] of scope.contents) {
    
        // don't compile symbols defined in other compilation units
        if (c.source !== undefined) continue;

        // compile
        switch (c.type) {
            case ScopeContent.Type.NOTE:
                graphState.expressions.list.push({
                    type: "text",
                    text: c.data,
                    id: uniqueExpressionID()
                });
                break;
            case ScopeContent.Type.SCOPE:
                compileScopeToJSON({
                    ...state,
                    scope: c.data
                });
                break;
            case ScopeContent.Type.VARIABLE:
                if (c.data.isBuiltin) continue;
                compileExprToJSON(c.data.data, state);
                break;
            case ScopeContent.Type.FUNCTION:
                if (c.data.isBuiltin) continue;
        }
    }
}

function compileCompilationUnitToJSON(state: {
    ctx: DesmoscriptCompileContext, 
    unit: DesmoscriptCompilationUnit,
    unitName: string,
    graphState: GraphState,
    identifierMap: Map<string, Map<string, string>>
}) {
    const { ctx, unit, unitName, graphState } = state;
    compileScopeToJSON({
        ...state,
        scope: unit.rootScope
    });
}

function joinIdent(identifier: string[] | string) {
    if (typeof identifier == "string") return identifier;
    return identifier.join(".");
}

function compileContextToJSON(ctx: DesmoscriptCompileContext) {

    // initial default graph state
    const graphState: GraphState = {
        version: 9,
        graph: {
            viewport: {
                xmin: -10, ymin: -10, xmax: 10, ymax: 10
            }
        },
        expressions: {
            list: []
        }
    }

    const identifierMap = new Map<string, Map<string, string>>();

    // compile all compilation units
    for (const [unitName, unit] of ctx.compilationUnits) {
        compileCompilationUnitToJSON({
            ctx, unit, unitName, graphState, identifierMap
        });
    }
}