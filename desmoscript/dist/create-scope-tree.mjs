import { astTypeNamesArray, makeFixedOpLUT, mapASTPreOrder, } from "./ast/traversal.mjs";
import { err } from "./error-handling.mjs";
import { literalSubtract } from "./util.mjs";
import * as path from "node:path";
let currentScopeContentId = 0;
function getScopeContentId() {
    return currentScopeContentId++;
}
function addVariableToScope(scope, name, data) {
    scope.contents.set(name, {
        type: "variable",
        data,
        parent: scope,
        name,
        id: getScopeContentId(),
    });
}
function addSameExprVarToScope(scope, name) {
    addVariableToScope(scope, name, { type: "same" });
}
function addFunctionToScope(scope, name, data) {
    scope.contents.set(name, {
        type: "function",
        data,
        parent: scope,
        name,
        id: getScopeContentId(),
    });
}
function addScopeToScope(scope, name) {
    const newScope = {
        type: "scope",
        contents: new Map(),
        parent: scope,
        name,
    };
    scope.contents.set(name, newScope);
    return newScope;
}
function addImportToScope(scope, filename, alias) {
    scope.contents.set(alias, {
        type: "import",
        path: filename,
        parent: scope,
        name: alias,
        id: getScopeContentId(),
    });
}
function addNamedJSONToScope(scope, name, json) {
    scope.contents.set(name, {
        type: "namedjson",
        json,
        parent: scope,
        name,
        id: getScopeContentId(),
    });
}
let count = 0;
function scopeCounter() {
    return (count++).toString();
}
export function mergeScopes(node, dst, src) {
    for (const [k, v] of src.contents) {
        if (dst.contents.get(k)) {
            err(node, `Failed to merge scopes: Namespace collision with identifier '${k}'.`);
        }
        dst.contents.set(k, v);
        v.parent = dst;
    }
}
function scopify(node, enclosingScope, innerScope) {
    return {
        ...node,
        enclosingScope,
        innerScope,
    };
}
const scopeTreeFixedOpCases = literalSubtract(astTypeNamesArray, [
    "assignment",
    "fndef",
    "block",
    "listcomp",
    "sumprodint",
    "derivative",
    "namespace",
    "import",
    "namedjson",
    "root",
]);
//type Test = Exclude<typeof scopeTreeFixedOpCases, "number" | "dnumber">;
export function createScopeTree(node, filePath, importFile, makeDefaultScopeTree) {
    const rootScope = {
        type: "scope",
        contents: makeDefaultScopeTree(),
        name: path.basename(filePath),
    };
    const newAST = mapASTPreOrder(node, {
        ...makeFixedOpLUT(scopeTreeFixedOpCases, (node, ctx) => {
            return [
                {
                    ...node,
                    enclosingScope: ctx.scope,
                },
                ctx,
            ];
        }),
        assignment: (node, ctx) => {
            addVariableToScope(ctx.scope, node.name, {
                expr: node,
                type: "other",
            });
            return [scopify(node, ctx.scope, undefined), ctx];
        },
        fndef: (node, ctx) => {
            addFunctionToScope(ctx.scope, node.name, {
                expr: node,
                type: "other",
            });
            const scope = addScopeToScope(ctx.scope, scopeCounter());
            for (const arg of node.args) {
                addSameExprVarToScope(scope, arg);
            }
            return [scopify(node, ctx.scope, scope), { scope }];
        },
        block: (node, ctx) => {
            const scope = addScopeToScope(ctx.scope, scopeCounter());
            return [scopify(node, ctx.scope, scope), { scope }];
        },
        listcomp: (node, ctx) => {
            const scope = addScopeToScope(ctx.scope, scopeCounter());
            for (const [v] of node.variables) {
                addSameExprVarToScope(scope, v);
            }
            return [scopify(node, ctx.scope, scope), { scope }];
        },
        sumprodint: (node, ctx) => {
            const scope = addScopeToScope(ctx.scope, scopeCounter());
            addSameExprVarToScope(scope, node.var);
            return [scopify(node, ctx.scope, scope), { scope }];
        },
        derivative: (node, ctx) => {
            const scope = addScopeToScope(ctx.scope, scopeCounter());
            addSameExprVarToScope(scope, node.var);
            return [scopify(node, ctx.scope, scope), { scope }];
        },
        namespace: (node, ctx) => {
            const scope = addScopeToScope(ctx.scope, node.name);
            return [scopify(node, ctx.scope, scope), { scope }];
        },
        import: (node, ctx) => {
            const filename = path.resolve(path.dirname(filePath), node.filename);
            importFile(filename);
            addImportToScope(ctx.scope, filename, node.alias);
            return [scopify(node, ctx.scope, undefined), ctx];
        },
        namedjson: (node, ctx) => {
            addNamedJSONToScope(ctx.scope, node.name, node.json);
            return [scopify(node, ctx.scope, undefined), ctx];
        },
        root: (node, ctx) => {
            return [scopify(node, ctx.scope, ctx.scope), ctx];
        },
    }, {
        scope: rootScope,
    });
    return {
        ast: newAST,
        scope: rootScope,
    };
}
