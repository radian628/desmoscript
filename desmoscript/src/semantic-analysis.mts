import { ASTBinop, ASTExpr, ASTFunctionDef, ASTIdentifier, ASTType, LineCol, RawASTExpr, JSONType, convertASTToSExpression } from "./ast.mjs";
import * as fs from "fs/promises";
import * as path from "path";
import { DesmoscriptLexer } from "./grammar/DesmoscriptLexer.js";
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { DesmoscriptParser } from "./grammar/DesmoscriptParser.js";
import { DesmoscriptASTBuilder } from "./parse.mjs";
import { AnalyzedDesmoscript, DesmoscriptContext, Identifier, Scope, ScopeContent, ScopedASTExpr, ScopeInfo } from "./semantic-analysis-types.mjs";
import { makeDefaultDesmoscriptContext } from "./builtins.mjs";

//how do I represent generics in a type system?


function makeNewScope(scopeName: string, parent: Scope | undefined): Scope {
    return { contents: new Map(), scopeName, parent };
}



let anonymousIdentifierCounter = 0;

function anonScope() {
    return "ANON" + (anonymousIdentifierCounter++).toString();
}

function err(expr: ASTExpr, reason: string): never {
    throw {
        expr, reason
    };
}


export async function getDesmoscriptScopes(filename: string, additionalDefines?: Map<string, ScopeContent>): Promise<AnalyzedDesmoscript> {
    const src = (await fs.readFile(filename)).toString();
    let lexer = new DesmoscriptLexer(CharStreams.fromString(src));
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new DesmoscriptParser(tokenStream);

    const oldcwd = process.cwd();

    // Parse the input, where `compilationUnit` is whatever entry point you defined
    let tree = parser.expressionList();

    const astBuilder = new DesmoscriptASTBuilder(path.resolve(filename));

    const ast = astBuilder.visit(tree);

    process.chdir(path.dirname(path.join(oldcwd, filename)));

    const ctx = makeDefaultDesmoscriptContext(filename);
    if (additionalDefines) {
        for (let [k, v] of additionalDefines.entries()) {
            ctx.builtins.contents.set(k, v);
        }
    }
    await calculateScopes(ctx, ast, ctx.builtins, true);

    process.chdir(oldcwd);


    //console.log(ctx.builtins);

    return {
        rootExpr: ast as ScopedASTExpr,
        rootScope: ctx.builtins,
        files: ctx.files
    };;
}

function findDeclaration(enclosingScope: Scope | undefined, ident: ASTIdentifier<ScopeInfo>): ScopeContent {
    if (!enclosingScope) throw {
        expr: ident,
        reason: `Identifier '${ident.segments.join(".")}' must have enclosing scope! Notify a dev if this error occurs.`
    };

    while (enclosingScope != undefined) {
        let segmentScope: Scope | undefined = enclosingScope;
        for (let i = 0; i < ident.segments.length - 1; i++) {
            if (segmentScope?.contents.has(ident.segments[i])) {
                let newSegmentScope = segmentScope.contents.get(ident.segments[i]) as ScopeContent;
                if (newSegmentScope.type != Identifier.SCOPE) {
                    segmentScope = undefined;
                    break;
                }
                segmentScope = newSegmentScope.root;
            }
        }

        if (segmentScope) {
            let declaration = segmentScope.contents.get(ident.segments[ident.segments.length - 1]);
            if (declaration) {
                if ([
                    Identifier.FUNCTION, 
                    Identifier.MACRO, 
                    Identifier.BUILTIN_FUNCTION, 
                    Identifier.VARIABLE
                ].indexOf(declaration.type) != undefined) {
                    return declaration;
                }
            }
        }

        enclosingScope = enclosingScope.parent;
    }

    throw {
        expr: ident,
        reason: `Identifier '${ident.segments.join(".")}' does not exist in this scope.`
    };
}

export async function calculateScopes(ctx: DesmoscriptContext, e: ScopedASTExpr, scope: Scope, isTopLevel: boolean, options?: { noCodeGen: boolean }): 
Promise<void> {
    e.equivalentScope = scope;
    if (isTopLevel) {
        scope.contents.set(anonScope(), {
            type: Identifier.EXPRESSION,
            root: e
        });
    }
    switch (e.type) {
    case ASTType.BINOP:
        await calculateScopes(ctx, e.left, scope, false);
        await calculateScopes(ctx, e.right, scope, false);
        if (e.op == "=") {
            if (e.left.type != ASTType.IDENTIFIER) {
                err(e, `Invalid left-hand side of assignment.`);
            }
            if (e.left.segments.length != 1) {
                err(e, `Variable '${e.left.segments.join(".")}' is invalid: Variables may only be declared in their own scope.`);
            }
            if (scope.contents.has(e.left.segments[0])) {
                err(e, `'${e.left.segments[0]}' is already defined in this scope.`);
            }
            if (isTopLevel) scope.contents.set(e.left.segments[0], {
                type: Identifier.VARIABLE,
                root: e,
                noCodeGen: options?.noCodeGen
            });
        }
        break;
    case ASTType.ROOT:
        for (let expr of e.expressions) {
            await calculateScopes(ctx, expr, scope, true);
        }
        break;
    case ASTType.NUMBER:
    case ASTType.IDENTIFIER:
        break;
    case ASTType.POINT:
        await calculateScopes(ctx, e.x, scope, false);
        await calculateScopes(ctx, e.y, scope, false);
        break;
    case ASTType.FNCALL:
        await calculateScopes(ctx, e.name, scope, false);
        for (let arg of e.args) {
            await calculateScopes(ctx, arg, scope, false);
        }
        break;
    case ASTType.MACROCALL:
        // for (let arg of e.args) {
        //     await calculateScopes(ctx, arg, scope, false);
        // }
        if (e.name.type != ASTType.IDENTIFIER) throw {
            expr: e,
            reason: "Macro name is not an identifer. Contact a dev if this error occurs."
        }
        const macroInfo = findDeclaration(scope, e.name);
        if (macroInfo.type != Identifier.MACRO) throw {
            expr: e,
            reason: "This identifier does not represent a macro."
        };
        e.substitution = macroInfo.fn(e, ctx);
        await calculateScopes(ctx, e.substitution, scope, false);
        break;
    case ASTType.LIST:
        for (let elem of e.elements) {
            await calculateScopes(ctx, elem, scope, false);
        }
        break;
    case ASTType.STEP_RANGE:
        await calculateScopes(ctx, e.left, scope, false);
        await calculateScopes(ctx, e.step, scope, false);
        await calculateScopes(ctx, e.right, scope, false);
        break;
    case ASTType.FNDEF:
    //case ASTType.MACRODEF:
        await calculateScopes(ctx, e.name, scope, false);
    case ASTType.NAMESPACE:
    case ASTType.BLOCK:
        const isFunctionOrMacro = e.type == ASTType.FNDEF;
        if (isFunctionOrMacro) {
            if (e.name != undefined && e.name.type != ASTType.IDENTIFIER) {
                err(e, `Function/macro name is not an identifier. This error should never occur. Contact the developer if it does.`);
            }
            if (e.name != undefined && e.name.segments.length != 1) {
                err(e, `Function/macro '${e.name.segments.join(".")}' is invalid: Functions may only be declared in their own scope.`);
            }
            if (e.name != undefined && scope.contents.has(e.name.segments[0])) {
                err(e, `'${e.name.segments[0]}' is already defined in this scope.`);
            }
            scope.contents.set(e.name.segments[0], { type: Identifier.FUNCTION, root: e });
        } else if (e.type == ASTType.NAMESPACE) {
            if (scope.contents.has(e.name)) {
                err(e, `Namespace '${e.name}' is already defined in this scope.`);
            }
        }

        let scopeName: string = anonScope();
        if ((e.type == ASTType.FNDEF) && e.name.type == ASTType.IDENTIFIER) 
            scopeName = e.name.segments[0];
        if (e.type == ASTType.NAMESPACE) 
            scopeName = e.name;

        let innerScope: Scope = makeNewScope(scopeName, scope);
        if (isFunctionOrMacro) {
            for (let arg of e.args) {
                innerScope.contents.set(arg, {
                    type: Identifier.FUNCTION_ARG
                });
            }
        }
        for (let expr of e.bodyExprs) {
            await calculateScopes(ctx, expr, innerScope, true);
        }
        e.innerScope = innerScope;

        scope.contents.set(scopeName + (isFunctionOrMacro ? "SCOPE" : ""), { type: Identifier.SCOPE, root: innerScope });
        break;
    case ASTType.MATCH:
        for (let [predicate, result] of e.branches) {
            await calculateScopes(ctx, predicate, scope, false);
            await calculateScopes(ctx, result, scope, false);
        }
        if (e.fallback) await calculateScopes(ctx, e.fallback, scope, false);
        break;
    case ASTType.IMPORT:
        const otherFileCtx = (await getDesmoscriptScopes(e.filename));
        ctx.files.push(e.filename);
        if (e.alias) {
            otherFileCtx.rootScope.parent = scope;
            otherFileCtx.rootScope.scopeName = e.alias;
            scope.contents.set(e.alias, { type: Identifier.SCOPE, root: otherFileCtx.rootScope });
        } else {
            otherFileCtx.rootScope.contents.forEach((v, k) => {
                if (k == undefined || v == undefined) {
                    return;
                    //err(e, "Undefined key/value! This error should not occur; contact a dev if it does.");
                }
                if (scope.contents.has(k)) {
                    err(e, `Namespace collision in imported file '${e.filename}': Identifier '${k}' is already defined.`);
                }
                if (v.type == Identifier.SCOPE) {
                    v.root.parent = scope;
                }
                scope.contents.set(k, v);
            });
        }
        break;
    case ASTType.LISTCOMP:
        let scopeName2 = anonScope();

        let innerScope2 = makeNewScope(scopeName2, scope);
        e.innerScope = innerScope2;

        for (let [varName, list] of e.variables) {
            innerScope2.contents.set(varName, {
                type: Identifier.FUNCTION_ARG
            });
            await calculateScopes(ctx, list, innerScope2, false);
        }

        await calculateScopes(ctx, e.body, innerScope2, false);

        scope.contents.set(scopeName2, { type: Identifier.SCOPE, root: innerScope2 });

        break;
    case ASTType.SUMPRODINT:
        let scopeName3 = anonScope();
        let innerScope3 = makeNewScope(scopeName3, scope);
        e.innerScope = innerScope3;

        innerScope3.contents.set(e.varName, { type: Identifier.FUNCTION_ARG});
        await calculateScopes(ctx, e.lo, innerScope3, false);
        await calculateScopes(ctx, e.hi, innerScope3, false);
        await calculateScopes(ctx, e.body, innerScope3, false);

        scope.contents.set(scopeName3, { type: Identifier.SCOPE, root: innerScope3 });
        break;
    case ASTType.DERIVATIVE:
        let scopeName4 = anonScope();
        let innerScope4 = makeNewScope(scopeName4, scope);
        e.innerScope = innerScope4;

        innerScope4.contents.set(e.variable, { type: Identifier.FUNCTION_ARG });
        await calculateScopes(ctx, e.body, innerScope4, false);

        scope.contents.set(scopeName4, { type: Identifier.SCOPE, root: innerScope4 });
        break;
    case ASTType.MEMBERACCESS:
        calculateScopes(ctx, e.left, scope, false);
        break;
    case ASTType.JSON:
        switch (e.data.jsontype) {
        case JSONType.OBJECT:
            //console.log("got here! DJSON object");
            Object.values(e.data.data).forEach(v => calculateScopes(ctx, v, scope, false));
            break;
        case JSONType.ARRAY:
            e.data.data.forEach(v => calculateScopes(ctx, v, scope, false));
            break;
        case JSONType.DESMOSCRIPT:
            //console.log("got here! DJSON Desmoscript");
            calculateScopes(ctx, e.data.data, scope, true, { noCodeGen: true });
        }
        break;
    case ASTType.DECORATOR:
        scope.contents.set(anonScope(), { type: Identifier.DECORATOR, root: e });
        await calculateScopes(ctx, e.expr, scope, true, { noCodeGen: true });
        calculateScopes(ctx, e.json, scope, false);
        break;
    case ASTType.NAMED_JSON:
        scope.contents.set(anonScope(), { type: Identifier.NAMED_JSON, root: e });
        calculateScopes(ctx, e.json, scope, false);
        break;
    case ASTType.NOTE:
        scope.contents.set(anonScope(), { type: Identifier.NOTE, root: e.text });
    default:
        break;
    }
}



export async function semanticallyAnalyzeDesmoscript(expr: ASTExpr, ctx: DesmoscriptContext): Promise<AnalyzedDesmoscript> {
    await calculateScopes(ctx, expr, ctx.builtins, true);

    return {
        rootExpr: expr as ScopedASTExpr,
        rootScope: ctx.builtins,
        files: ctx.files
    };
}

