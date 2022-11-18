import { CompilerError, DesmoscriptCompilationUnit, DesmoscriptCompileContext, ErrorType, Scope, ScopeContent, ScopeInfo } from "./analysis-types.mjs";
import { desmoscriptFileToAST, uniqueAnonScopeName } from "../ast/parse.mjs";
import * as path from "node:path";
import { ASTExpr, ASTFunctionCall, ASTIdentifier, ASTType, JSONType, mapAST, RawASTExpr } from "../ast/ast.mjs";
import {ASTVisitorLUT} from "../ast/ast-visitor.mjs"

// add a compilation unit to a compilation operation (memoized)
export async function addDesmoscriptCompilationUnit(context: DesmoscriptCompileContext, filePath: string) {

    // get compilation unit if it already exists
    const existingCompilationUnit = context.compilationUnits.has(filePath);
    if (existingCompilationUnit) return existingCompilationUnit;

    const ast = await desmoscriptFileToAST(filePath);
    const compilationUnit = await astToCompilationUnit(ast, context, filePath);
    context.compilationUnits.set(filePath, compilationUnit);

}








export function err(expr: RawASTExpr<{}>, reason: string): never {
    throw {
        expr, reason
    };
}





export function makeAndBindNewScope(parent: Scope, name: string): Scope {
    const newScope = {
      name,
        parent,
        contents: new Map()
    }
    parent.contents.set(name, {
        type: ScopeContent.Type.SCOPE,
        data: newScope
    });
    return newScope;
}







type ASTToCompilationUnitContext = {
    scope: Scope
}

function checkLengthOneSegment(e: ASTIdentifier<{}>, typename: string) {
    if (e.segments.length != 1) {
        err(e, `${typename} '${e.segments.join(".")}' is invalid: It cannot be composed of multiple segments.`);
    }
}

function checkNamespaceCollision(e: ASTIdentifier<{}>, typename: string, scope: Scope) {
    if (scope.contents.has(e.segments[0])) {
        err(e, `${typename} '${e.segments[0]}' is invalid, as something with the same name exists in this scope.`)
    }
}

function astToCompilationUnit(ast: RawASTExpr<{}>, ctx: DesmoscriptCompileContext, filePath: string): DesmoscriptCompilationUnit {
    
    const rootScope: Scope = {
        name: "root",
        contents: new Map()
    }

    const context: ASTToCompilationUnitContext = {
        scope: rootScope
    }

    const lut: ASTVisitorLUT<RawASTExpr<{}>, RawASTExpr<ScopeInfo>, typeof context, typeof context> = {
        number: (e, ctx, v) => {
            return [{ ...e, myScope: ctx.scope }, ctx];
        },

        binop: (e, ctx, v) => {
            const [left] = v(e.left, ctx);
            const [right] = v(e.right, ctx);

            if (e.op == "=") {
                if (e.left.type != "identifier") {
                    err(e, "Invalid left-hand side of assignment.");
                }
                checkLengthOneSegment(e.left, "Variable");
                checkNamespaceCollision(e.left, "Variable", ctx.scope);
            }

            return [{
                ...e, left, right, myScope: ctx.scope
            }, ctx];
        },

        root: (e, ctx, v) => {
            const expressions = e
                .expressions
                .map(e2 => v(e2, ctx)[0]);

            return [{ ...e, expressions, myScope: ctx.scope }, ctx];
        },

        identifier: (e, ctx, v) => {
            return [{ ...e, myScope: ctx.scope }, ctx];
        },

        point: (e, ctx, v) => {
            const [x] = v(e.x, ctx);
            const [y] = v(e.y, ctx);
            return [{ ...e, x, y, myScope: ctx.scope }, ctx];
        },

        fncall: (e, ctx, v) => {
            const [name] = v(e.name, ctx);
            const args = e.args.map(arg => v(arg, ctx)[0]);
            return [{ ...e, args, name, myScope: ctx.scope }, ctx];
        },

        list: (e, ctx, v) => {
            const elements = e.elements
                .map(elem => v(elem, ctx)[0]);
            return [{ ...e, elements, myScope: ctx.scope }, ctx];
        },

        step_range: (e, ctx, v) => {
            const [left] = v(e.left, ctx);
            const [step] = v(e.step, ctx);
            const [right] = v(e.right, ctx);
            return [{ ...e, left, step, right, myScope: ctx.scope }, ctx];
        },

        fndef: (e, ctx, v) => {
            const innerScope = makeAndBindNewScope(ctx.scope, e.name);
            const innerctx = {
                scope: innerScope
            };
            const args = e.args.map(arg => {
                innerScope.contents.set(arg, {
                    type: ScopeContent.Type.VARIABLE,
                    isBuiltin: true
                });
                return v(arg, innerctx)[0];
            });
            
        }

    }
}