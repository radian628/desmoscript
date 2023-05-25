import { ast } from "./ast/ast.mjs";
import {
  astTypeNamesArray,
  makeFixedOpLUT,
  mapASTPreOrder,
} from "./ast/traversal.mjs";
import { scopeTree } from "./compiler-state.mjs";
import { err } from "./error-handling.mjs";
import { literalSubtract } from "./util.mjs";

import * as path from "node:path";

let currentScopeContentId = 0;
function getScopeContentId(): number {
  return currentScopeContentId++;
}

function addVariableToScope(
  scope: scopeTree.Scope,
  name: string,
  data: scopeTree.Variable["data"]
) {
  scope.contents.set(name, {
    type: "variable",
    data,
    parent: scope,
    name,
    id: getScopeContentId(),
  });
}

function addSameExprVarToScope(scope: scopeTree.Scope, name: string) {
  addVariableToScope(scope, name, { type: "same" });
}

function addFunctionToScope(
  scope: scopeTree.Scope,
  name: string,
  data: scopeTree.Function["data"]
) {
  scope.contents.set(name, {
    type: "function",
    data,
    parent: scope,
    name,
    id: getScopeContentId(),
  });
}

function addScopeToScope(scope: scopeTree.Scope, name: string) {
  const newScope: scopeTree.Scope = {
    type: "scope",
    contents: new Map(),
    parent: scope,
    name,
  };
  scope.contents.set(name, newScope);
  return newScope;
}

function addImportToScope(
  scope: scopeTree.Scope,
  filename: string,
  alias: string
) {
  scope.contents.set(alias, {
    type: "import",
    path: filename,
    parent: scope,
    name: alias,
    id: getScopeContentId(),
  });
}

function addNamedJSONToScope(
  scope: scopeTree.Scope,
  name: string,
  json: ast.djson.Expr
) {
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

export function mergeScopes(
  node: ast.Node,
  dst: scopeTree.Scope,
  src: scopeTree.Scope
) {
  for (const [k, v] of src.contents) {
    if (dst.contents.get(k)) {
      err(
        node,
        `Failed to merge scopes: Namespace collision with identifier '${k}'.`
      );
    }
    dst.contents.set(k, v);
    v.parent = dst;
  }
}

function scopify<
  T extends ast.Node,
  InnerScopeType extends scopeTree.Scope | undefined
>(
  node: T,
  enclosingScope: scopeTree.Scope,
  innerScope: InnerScopeType
): T & { enclosingScope: scopeTree.Scope; innerScope: InnerScopeType } {
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
] as const);

//type Test = Exclude<typeof scopeTreeFixedOpCases, "number" | "dnumber">;

export function createScopeTree<T extends keyof ast.NodeTypes>(
  node: ast.NodeTypes[T],
  filePath: string,
  importFile: (importedPath: string) => void,
  makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>
) {
  const rootScope: scopeTree.Scope = {
    type: "scope",
    contents: makeDefaultScopeTree(),
    name: path.basename(filePath),
  };

  const newAST = mapASTPreOrder<"", "withscope", { scope: scopeTree.Scope }, T>(
    node,
    {
      ...makeFixedOpLUT<
        "",
        { scope: scopeTree.Scope },
        "withscope",
        (typeof scopeTreeFixedOpCases)[number]
      >(scopeTreeFixedOpCases, (node, ctx) => {
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
    },
    {
      scope: rootScope,
    }
  );

  return {
    ast: newAST,
    scope: rootScope,
  };
}
