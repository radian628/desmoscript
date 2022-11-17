import { CompilerError, DesmoscriptCompilationUnit, DesmoscriptCompileContext, ErrorType, Scope, ScopeContent } from "./analysis-types.mjs";
import { desmoscriptFileToAST, uniqueAnonScopeName } from "../ast/parse.mjs";
import * as path from "node:path";
import { ASTExpr, ASTFunctionCall, ASTIdentifier, ASTType, JSONType, mapAST, RawASTExpr } from "../ast/ast.mjs";

// add a compilation unit to a compilation operation (memoized)
export async function addDesmoscriptCompilationUnit(context: DesmoscriptCompileContext, filePath: string) {

    // get compilation unit if it already exists
    const existingCompilationUnit = context.compilationUnits.has(filePath);
    if (existingCompilationUnit) return existingCompilationUnit;

    const ast = await desmoscriptFileToAST(filePath);
    const compilationUnit = await astToCompilationUnit(ast, context, filePath);
    context.compilationUnits.set(filePath, compilationUnit);

}








function err(expr: RawASTExpr<{}>, reason: string): never {
    throw {
        expr, reason
    };
}










export function findIdentifier(scope: Scope, identifier: ASTIdentifier<{}>): ScopeContent.Content | undefined {
    // look for identifier in scope chain
    function findIdentHelper(scope: Scope, identChain: string[]) {
        const foundScopeContent = scope.contents.get(identChain[0]);
        if (foundScopeContent) {
            if (foundScopeContent.type == ScopeContent.Type.SCOPE) {
                return findIdentHelper(foundScopeContent.data, identChain.slice(1));
            } else if (identChain.length == 1) {
                return foundScopeContent;
            }
        }
    }

    // look through current scope, parent scope, etc.
    let searchScope: Scope | undefined = scope;
    while (searchScope) {
        const ident = findIdentHelper(scope, identifier.segments);
        if (ident) return ident;
        searchScope = searchScope.parent;
    }
}




export function makeAndBindNewScope(parent: Scope, name: string): Scope {
    const newScope = {
        parent,
        contents: new Map()
    }
    parent.contents.set(name, {
        type: ScopeContent.Type.SCOPE,
        external: false,
        data: newScope
    });
    return newScope;
}




/*
How do I handle circular dependencies? I'll have to defer existence/duplicate checking to compilation instead
of semantic analysis. This is fine with me. I'll call these "deferred errors." Deferred errors related to existence
will later be checked at compile time. Thing is, which ones should I catch? I shouldn't catch namespace collisions
because those can always get worse. I should catch "this thing doesn't exist" errors, however.

Okay, all of this presents a third problem: How the fuck do I handle associating AST nodes with scopes. I can of course
take the easy way out and make a two-way coupling between AST nodes and scopes by mutating it. On the other hand,
this approach is going to be an immense headache to pull off. As an alternative, I can give each AST node its own 
globally unique ID. I could even do this just for blocks, since nothing else is probably gonna need it.

Circular macros across files are a whole different beast. I'll just have those error because
it's too much effort to deal with that. I'm unlikely to be dealing with circular macros anyway.
*/
export async function astToCompilationUnit(ast: RawASTExpr<{}>, context: DesmoscriptCompileContext, filePath: string)
    : Promise<DesmoscriptCompilationUnit> {
    const fileDir = path.dirname(filePath);

    const rootScope: Scope = {
        contents: new Map(),
    }

    const blockInfo: DesmoscriptCompilationUnit["blockInfo"] = new Map();

    const deferredErrors: CompilerError[] = [];

    function ensureNameLengthAndNamespace(e: RawASTExpr<{}>, scope: Scope, name: ASTIdentifier<{}>, exprTypeName: string) {
        if (name.segments.length != 1) {
            err(e, `Invalid ${exprTypeName} name '${name.segments.join(".")}': A ${exprTypeName} name must have only one segment. (No '.')`);
        }
        if (scope.contents.has(name.segments[0])) {
            err(e, `Invalid ${exprTypeName} name '${name.segments.join(".")}': Something with the same name already exists in this scope.`);
        }
    }

    async function addSemanticInfoToASTExpr(e: RawASTExpr<{}>, ctx: {
        scope: Scope
    }) {
        function s(expr) {
            addSemanticInfoToASTExpr(expr, ctx);
        }
        
        switch (e.type) {
            case ASTType.BINOP:
                s(e.left);
                s(e.right);
                if (e.op == "=") {
                    if (e.left.type != ASTType.IDENTIFIER) {
                        err(e, "Invalid left-hand side of assignment.");
                    }
                    ensureNameLengthAndNamespace(e, ctx.scope, e.left, "variable");
                    const varName = e.left.segments[0];
                    ctx.scope.contents.set(varName, {
                        external: false,
                        type: ScopeContent.Type.VARIABLE,
                        data: {
                            isBuiltin: false,
                            data: e.right
                        }
                    });
                }
                break;
            case ASTType.ROOT:
                for (let expr of e.expressions) {
                    s(expr);
                }
                break;
            case ASTType.POINT:
                s(e.x);
                s(e.y);
                break;
            case ASTType.FNCALL:
                s(e.name);
                for (let arg of e.args) s(arg);
                break;
            case ASTType.MACROCALL:
                if (e.name.type != ASTType.IDENTIFIER) {
                    err(e, "Macro name is not an identifier. This should never happen!");
                }
                const macroInfo = findIdentifier(ctx.scope, e.name);
                if (macroInfo?.type != ScopeContent.Type.MACRO) {
                    if (macroInfo) {
                        err(e, `'${e.name.segments.join(".")}' is not a macro, and thus it cannot be called like a macro.`);
                    } else {
                        err(e, `'${e.name.segments.join(".")}' does not exist.`);
                    }
                }
                e.substitution = await macroInfo.fn(e, context, getMacroAPI(e));
                s(e.substitution);
                break;
            case ASTType.LIST:
                for (const elem of e.elements) s(elem);
                break;
            case ASTType.STEP_RANGE:
                s(e.left);
                s(e.step);
                s(e.right);
                break;
            case ASTType.FNDEF:
                {
                    s(e.name);
                    if (e.name.type != ASTType.IDENTIFIER) {
                        err(e, `Function/macro name is not an identifier. This should not occur.`);
                    }
                    ensureNameLengthAndNamespace(e, ctx.scope, e.name, "function");
                    const scopeName = e.name.segments[0];
                    const innerScope = makeAndBindNewScope(ctx.scope, scopeName);
                    for (let arg of e.args) {
                        innerScope.contents.set(arg, {
                            type: ScopeContent.Type.VARIABLE,
                            external: false,
                            data: {
                                isBuiltin: true
                            }
                        })
                    }
                    for (let expr of e.bodyExprs.slice(0, -1)) {
                        addSemanticInfoToASTExpr(expr, { scope: innerScope });
                    }
                    if (e.bodyExprs.length == 0) {
                        err(e, `Function '${scopeName}' must contain at least one expression!`);
                    }

                    const finalExpr = e.bodyExprs[e.bodyExprs.length - 1];

                    ctx.scope.contents.set(e.name.segments[0], {
                        external: false,
                        type: ScopeContent.Type.FUNCTION,
                        data: {
                            isBuiltin: false,
                            data: e,
                            finalExpr
                        }
                    });
                }
                break;
            case ASTType.NAMESPACE:
                {
                    s(e.name);
                    if (ctx.scope.contents.has(e.name)) {
                        err(e, `Invalid namespace name '${e.name}': Name already exists.`);
                    }
                    const innerScopeName = e.name;
                    const innerScope = makeAndBindNewScope(ctx.scope, innerScopeName);
                    for (let expr of e.bodyExprs) {
                        addSemanticInfoToASTExpr(expr, { scope: innerScope });
                    }
                }
                break;
            case ASTType.BLOCK:
                {
                    const innerScopeName = e.id;
                    const innerScope = makeAndBindNewScope(ctx.scope, innerScopeName);
                    if (e.bodyExprs.length == 0) {
                        err(e, "Block cannot be empty: It must contain at least one expression!");
                    }
                    for (let expr of e.bodyExprs.slice(0, -1)) {
                        addSemanticInfoToASTExpr(expr, { scope: innerScope });
                    }
                    blockInfo.set(innerScopeName, {
                        finalExpr: e.bodyExprs[e.bodyExprs.length - 1]
                    });
                }
                break;
            case ASTType.MATCH:
                for (let [predicate, result] of e.branches) {
                    s(predicate);
                    s(result);
                }
                if (e.fallback) s(e.fallback);
                break;
            case ASTType.IMPORT:
                const filepath = path.join(fileDir, e.filename);
                const ast = await desmoscriptFileToAST(filepath);
                const compilationUnit = await astToCompilationUnit(ast, context, filepath);
                const externalizedImportedModule = ScopeContent.externalizeScope(compilationUnit.rootScope);
                if (e.alias) {
                    externalizedImportedModule.parent = ctx.scope;
                    if (ctx.scope.contents.has(e.alias)) {
                        err(e, `Cannot import file with alias '${e.alias}': '${e.alias}' is already defined.`);
                    }
                    ctx.scope.contents.set(e.alias, {
                        type: ScopeContent.Type.SCOPE,
                        data: externalizedImportedModule
                    });
                } else {
                    externalizedImportedModule.contents.forEach((v, k) => {
                        if (ctx.scope.contents.has(k)) {
                            err(e, `Namespace collision in imported file '${e.filename}': '${k}' is already defined.`);
                        }
                        if (v.type == ScopeContent.Type.SCOPE) {
                            v.data.parent = ctx.scope;
                        }
                        ctx.scope.contents.set(k, v);
                    });
                }
                break;
            case ASTType.LISTCOMP:
                {
                    const scopeName = uniqueAnonScopeName();
                    const innerScope = makeAndBindNewScope(ctx.scope, scopeName);

                    for (let [varName, list] of e.variables) {
                        innerScope.contents.set(varName, {
                            type: ScopeContent.Type.VARIABLE,
                            data: { isBuiltin: true }
                        })
                        s(list);
                    }

                    s(e.body);
                }
                break;
            case ASTType.SUMPRODINT:
                {
                    const scopeName = uniqueAnonScopeName();
                    const innerScope = makeAndBindNewScope(ctx.scope, scopeName);

                    innerScope.contents.set(e.varName, {
                        type: ScopeContent.Type.VARIABLE,
                        data: { isBuiltin: true }
                    });

                    s(e.lo);
                    s(e.hi);
                    s(e.body);
                }
                break;
            case ASTType.DERIVATIVE:
                {
                    const scopeName = uniqueAnonScopeName();
                    const innerScope = makeAndBindNewScope(ctx.scope, scopeName);

                    innerScope.contents.set(e.variable, {
                        type: ScopeContent.Type.VARIABLE,
                        data: { isBuiltin: true }
                    });

                    s(e.body);
                }
                break;
            case ASTType.MEMBERACCESS:
                s(e.left);
                break;
            case ASTType.JSON:        
                switch (e.data.jsontype) {
                case JSONType.OBJECT:
                    Object.values(e.data.data).forEach(v => s(v));
                    break;
                case JSONType.ARRAY:
                    e.data.data.forEach(v => s(v));
                    break;
                case JSONType.DESMOSCRIPT:
                    s(e.data.data);
                }
                break;
            case ASTType.DECORATOR:
                {
                    const scopeName = uniqueAnonScopeName();
                    if (e.json.type != ASTType.JSON) {
                        err(e.json, "Cannot have non-JSON in decorator!");
                    }
                    ctx.scope.contents.set(scopeName, {
                        type: ScopeContent.Type.VARIABLE,
                        decoratorInfo: { json: e.json },
                        data: {
                            data: e.expr
                        }
                    });
                    //const innerScope = makeAndBindNewScope(ctx.scope, scopeName);
                    s(e.expr);
                    s(e.json);
                }
                break;
            case ASTType.NAMED_JSON:
                {
                    const scopeName = uniqueAnonScopeName();
                    if (e.json.type != ASTType.JSON) {
                        err(e.json, "Cannot have non-JSON in a named JSON expression!");
                    }
                    ctx.scope.contents.set(scopeName, {
                        type: ScopeContent.Type.NAMED_JSON,
                        data: e.json
                    });
                    s(e.json)
                }
                break;
            case ASTType.NOTE:
                ctx.scope.contents.set(
                    uniqueAnonScopeName(),
                    {
                        type: ScopeContent.Type.NOTE,
                        data: e.text
                    }
                );
                break;
            case ASTType.ACTIONS:
                {
                    for (let [l, r] of e.actions) {
                        s(l);
                        s(r);
                    }
                    for (let a of e.actionAliases) s(a);
                }
                break;
            default: 
                break;
        }
    }

    await addSemanticInfoToASTExpr(ast, { scope: rootScope });

    return {
        ast,
        blockInfo,
        deferredErrors,
        rootScope
    };
}

function getMacroAPI(e: ASTFunctionCall<{}, {}>): import("./analysis-types.mjs").MacroAPI {
    throw new Error("Function not implemented.");
}
