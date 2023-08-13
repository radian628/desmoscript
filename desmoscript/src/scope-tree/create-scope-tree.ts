import {
  ASTExpr,
  ASTJson,
  ASTNode,
  BlockNode,
  ChildlessScoped,
  CompilationUnit,
  FunctionDefNode,
  ListcompNode,
  NamespaceNode,
  NotBuiltinScopeContent,
  NumberNode,
  Scope,
  ScopeContent,
  Scoped,
  newid,
  asExpr,
} from "../ast/ast.js";
import {
  CompilerError,
  ScopeError,
  compilerError,
  internalError,
} from "../compiler-errors.js";
import { CodegenError } from "../codegen/codegen.js";
import { TypeError } from "./typecheck/type-errors.js";
import { ImportScriptsMap } from "../combined-functionality/language-support-compiler.js";

export function mapASTToAddScopes<T extends ASTNode>(
  node: ChildlessScoped<T>,
  mapper: <U extends ASTNode>(node: U) => Scoped<U>
): Scoped<ASTNode> {
  function map<U extends ASTNode>(n: U): U extends ASTNode ? Scoped<U> : U {
    // handle arrays within astnodes
    //@ts-ignore
    if (Array.isArray(n)) return n.map((e) => map(e));

    //@ts-ignore
    if (n && typeof n == "object" && typeof n.id == "number") {
      // handle current node
      //@ts-ignore
      if (n !== node) {
        //@ts-ignore
        return mapper(n);
      }

      // handle direct child nodes
      const node2 = n as unknown as ASTNode;
      //@ts-ignore
      return Object.fromEntries(
        Object.entries(node2).map(([k, v]) => [k, map(v)])
      );
    }

    // handle all other properties
    //@ts-ignore
    return n;
  }

  //@ts-ignore
  return map(node);
}

export type ASTScopingContext = {
  // loads an import up to and including scope trees
  // returns the "absolute path" of the input (e.g. full URL or abs file path)
  // so that it can be recorded as a map key
  resolveImport: (str: string, importer: string) => string | undefined;
  unit: string;
  errors: (CompilerError | TypeError | CodegenError)[];
  importScripts: ImportScriptsMap;
  getAbsolutePath: (currentFile: string, path: string) => string;
};

export function newScope(
  parent: Scope | undefined,
  name: string,
  ctx: ASTScopingContext,
  start: number,
  end: number,
  isWithinFunction?: boolean
): Scope {
  const scope = {
    elements: new Map(),
    imports: [],
    parent,
    name,
    importScripts: [],
  };

  if (parent) {
    addToScope(
      parent,
      name,
      {
        type: "scope",
        scope,
        id: newid(),
        unitName: ctx.unit,
        start,
        end,
        isWithinFunction,
      },
      ctx.errors
    );
  }

  return scope;
}

export function addToScope(
  scope: Scope,
  name: string,
  content: ScopeContent,
  errors: CompilerError[]
) {
  const existing = scope.elements.get(name);

  // throw namespace collision error
  if (existing && existing.type != "builtin-variable") {
    let start: number = 0;
    let end: number = 0;
    if (
      existing.type != "builtin-function" &&
      //existing.type != "builtin-variable" &&
      existing.type != "macro"
    ) {
      start = existing.start;
      end = existing.end;
    }
    let namespaceCollision: ScopeError = {
      reason: `namespace collision`,
      type: "namespace-collision",
      start,
      end,
      startB: content.type != "macro" ? content?.start : undefined,
      endB: content.type != "macro" ? content?.end : undefined,
      unitB: content.unitName,
      unit: existing.unitName,
    };
    errors.push(namespaceCollision);
  }

  scope.elements.delete(name);
  scope.elements.set(name, content);
}

type NodeOfType<T extends ASTNode["type"]> = ASTNode & { type: T };

//https://github.com/microsoft/TypeScript/issues/27808
type AssertsNonUnion<T> = [T] extends [infer U]
  ? U extends unknown // Make T non-distributive, and (U, an alias for T) distributive
    ? T extends U
      ? T
      : never
    : never
  : never;

export function addScopesToAST(
  node: ASTNode,
  state: {
    parentNode?: ASTNode;
    scope: Scope;
    isValueBlock?: boolean;
  },
  ctx: ASTScopingContext
): Scoped<ASTNode> {
  const child = <T extends ASTNode>(
    n: T,
    innerScope?: Scope,
    isValueBlock?: boolean
  ) => {
    return addScopesToAST(
      n,
      {
        parentNode: node,
        scope: innerScope ?? state.scope,
        isValueBlock: isValueBlock ?? true,
      },
      ctx
    ) as Scoped<T>;
  };

  const getDisplay = () => {
    return state.parentNode?.type == "show"
      ? state.parentNode.settings.id
      : undefined;
  };

  let exprResult: Scoped<ASTExpr> | undefined;

  switch (node.type) {
    case "fndef": {
      let innerScope = newScope(
        state.scope,
        newid().toString(),
        ctx,
        node.start,
        node.end,
        true
      );
      innerScope.name = node.name;

      addToScope(
        state.scope,
        node.name,
        {
          type: "function",
          node: node.id,
          start: node.start,
          end: node.end,
          unitName: ctx.unit,
          display: getDisplay(),
          id: newid(),
        },
        ctx.errors
      );

      for (const p of node.params) {
        addToScope(
          innerScope,
          p,
          {
            type: "builtin-variable",
            unitName: ctx.unit,
            id: newid(),
          },
          ctx.errors
        );
      }

      return {
        ...node,
        innerScope,
        enclosingScope: state.scope,
        body: child(node.body, innerScope),
      };
    }
    case "namespace": {
      const innerScope = newScope(
        state.scope,
        node.name,
        ctx,
        node.start,
        node.end
      );

      return {
        ...node,
        innerScope,
        enclosingScope: state.scope,
        body: child(node.body, innerScope, false),
        settings: node.settings ? child(node.settings, state.scope) : undefined,
      };
    }
    case "listcomp": {
      let innerScope = newScope(
        state.scope,
        "listcomp" + newid().toString(),
        ctx,
        node.start,
        node.end
      );

      for (const [k, v] of node.params) {
        addToScope(
          innerScope,
          k,
          {
            type: "builtin-variable",
            unitName: ctx.unit,
            id: newid(),
          },
          ctx.errors
        );
      }

      exprResult = {
        ...node,
        innerScope,
        enclosingScope: state.scope,
        body: child(node.body, innerScope),
        params: node.params.map(
          (p) => [p[0], child(p[1], state.scope)] as [string, Scoped<ASTExpr>]
        ),
      };
      break;
    }
    case "block": {
      // having a block create a namespace is redundant
      // if it's directly within a function definition or a namespace
      let innerScope =
        state.parentNode?.type == "fndef" ||
        state.parentNode?.type == "namespace" ||
        node.isRoot
          ? state.scope
          : newScope(
              state.scope,
              "block" + newid().toString(),
              ctx,
              node.start,
              node.end
            );

      exprResult = {
        ...node,
        innerScope,
        enclosingScope: state.scope,
        body: node.body.map((e) => child(e, innerScope)),
      };
      break;
    }
    case "assignment":
      addToScope(
        state.scope,
        node.lhs,
        {
          type: "variable",
          node: node.id,
          start: node.start,
          end: node.end,
          unitName: ctx.unit,
          display: getDisplay(),
          id: newid(),
        },
        ctx.errors
      );
      break;
    case "note":
      if (
        state.parentNode?.type === "json-object" ||
        state.parentNode?.type === "json-array"
      )
        break;
      addToScope(
        state.scope,
        newid().toString(),
        {
          type: "note",
          text: node.content,
          start: node.start,
          end: node.end,
          unitName: ctx.unit,
          id: newid(),
        },
        ctx.errors
      );
      break;
    case "import":
      const resolvedImport = ctx.resolveImport(node.src, ctx.unit);
      if (resolvedImport === undefined) {
        ctx.errors.push(
          compilerError(
            `failed to import '${node.src}'`,
            node.start,
            node.end,
            ctx.unit
          )
        );
        break;
      }
      if (node.type == "import" && node.alias) {
        addToScope(
          state.scope,
          node.alias,
          {
            type: "import",
            compilationUnitPath: resolvedImport,
            start: node.start,
            end: node.end,
            unitName: ctx.unit,
            id: newid(),
          },
          ctx.errors
        );
      } else {
        state.scope.imports.push({
          compilationUnitPath: resolvedImport,
          start: node.start,
          end: node.end,
        });
      }
      break;
    case "import-script":
      const resolvedImport2 = ctx.getAbsolutePath(ctx.unit, node.src);
      if (!resolvedImport2) {
        ctx.errors.push({
          type: "general",
          start: node.start,
          end: node.end,
          reason: `Import script '${resolvedImport2}' does not exist.`,
          unit: ctx.unit,
        });
        break;
      }
      const iscript = ctx.importScripts.get(resolvedImport2);
      if (!iscript) {
        ctx.errors.push({
          type: "general",
          start: node.start,
          end: node.end,
          reason: `Import script '${resolvedImport2}' does not exist.`,
          unit: ctx.unit,
        });
      }

      iscript?.run({ scope: state.scope });
      break;
    case "settings":
      addToScope(
        state.scope,
        newid().toString(),
        {
          type: "settings",
          settings: node.content.id,
          start: node.start,
          settingsType: node.settingsType,
          end: node.end,
          unitName: ctx.unit,
          id: newid(),
        },
        ctx.errors
      );
      break;
    case "macrocall":
      if (node.result && !(node.result instanceof Promise)) {
        exprResult = {
          ...node,
          enclosingScope: state.scope,
          // don't do scope resolution on macro params
          params: node.params,
          name: child(node.name),

          // When generating scopes, macro calls are ignored
          // and don't count as parent nodes.
          result: addScopesToAST(
            node.result,
            {
              parentNode: state.parentNode,
              scope: state.scope,
            },
            ctx
          ),
        };
      }
  }

  if (
    // add expression to scope if it's a non-note expression...
    asExpr(node).success &&
    node.type != "note" &&
    // make sure the expression isn't a macro call
    // if it is, make sure its result is actually an expression
    (node.type != "macrocall" ||
      (node.result &&
        !(node.result instanceof Promise) &&
        asExpr(node.result).success))
  ) {
    if (
      // only add expressions to scope if they're within
      // non-value blocks
      (state.parentNode?.type == "block" &&
        // or if they're not at the last position in a value block
        (node != state.parentNode.body[state.parentNode.body.length - 1] ||
          !state.isValueBlock ||
          state.parentNode?.isRoot)) ||
      // or if they're inside a "show" statement
      state.parentNode?.type == "show"
    ) {
      addToScope(
        state.scope,
        newid().toString(),
        {
          type: "expression",
          start: node.start,
          end: node.end,
          unitName: ctx.unit,
          id: newid(),
          expr: node.id,
          display: getDisplay(),
        },
        ctx.errors
      );
    }
  }

  if (exprResult) return exprResult;

  return mapASTToAddScopes(
    {
      ...node,
      enclosingScope: state.scope,
    },
    (childNode) => child(childNode)
  );
}

// ensure that scopes don't contain namespace collisions from imports
// that don't have aliasing
export function validateUnaliasedImports(
  scope: Scope,
  scopingContext: ASTScopingContext,
  compilationContext: {
    compilationUnits: Map<string, CompilationUnit>;
  }
) {
  const combinedScopeContents = newScope(undefined, "", scopingContext, 0, 0);
  const sourceScopes = [{ scope, unitName: scopingContext.unit }];
  const visitedUnits = new Set<string>(scopingContext.unit);

  // get all the scopes to combine as a test
  function gatherUnaliasedImportedScopes(
    searchScope: Scope,
    scopes: { scope: Scope; unitName: string }[],
    visitedUnits: Set<string>
  ) {
    for (const importInfo of searchScope.imports) {
      if (visitedUnits.has(importInfo.compilationUnitPath)) continue;

      const unit = compilationContext.compilationUnits.get(
        importInfo.compilationUnitPath
      );
      if (!unit)
        throw internalError(
          `expected a valid absolute import path; got '${importInfo.compilationUnitPath}'`
        );
      visitedUnits.add(importInfo.compilationUnitPath);
      scopes.push({
        scope: unit.scopeTree,
        unitName: importInfo.compilationUnitPath,
      });
      gatherUnaliasedImportedScopes(unit.scopeTree, scopes, visitedUnits);
    }
  }

  // start gathering process
  gatherUnaliasedImportedScopes(scope, sourceScopes, visitedUnits);

  // attempt to merge all scopes together, revealing any namespace collisions
  for (const { scope, unitName } of sourceScopes) {
    for (const [k, v] of scope.elements.entries()) {
      addToScope(combinedScopeContents, k, v, scopingContext.errors);
    }
  }
}

// gets the path of scope names that lead to a given scope
// note that this won't work for indexing scope trees
export function getScopeNameList(scope?: Scope, path?: string[]): string[] {
  if (!scope) return path ?? [];
  return [...getScopeNameList(scope.parent), ...(path ?? [scope.name])];
}

// basically lookup a variable (or function etc) given a starting position
// in the scope tree
// takes into account imports and whatnot
export function findIdentifierScopeItem(
  compilationUnit: CompilationUnit,
  initSearchScope: Scope,
  identifierSegments: string[],
  compilationContext: {
    compilationUnits: Map<string, CompilationUnit>;
  },
  previouslySearchedUnits?: Set<string>
):
  | {
      result: "found";
      identifier: ScopeContent;
    }
  | {
      result: "not-found";
    }
  | {
      result: "point-member-access";
      identifier: ScopeContent;
      memberAccess: "x" | "y";
    } {
  // rule out compilation units we've already searched (eliminates circular searching)
  if (previouslySearchedUnits?.has(compilationUnit.name))
    return { result: "not-found" };

  // get a list of scopes to search through to find the identifier
  const scopePath: Scope[] = [];
  let currentScope: Scope | undefined = initSearchScope;
  while (currentScope) {
    scopePath.push(currentScope);
    currentScope = currentScope.parent;
  }

  // search through each of the scopes
  for (const searchScope of scopePath) {
    // traverse downwards using identifier segments
    let identifierScope = searchScope;
    for (let i = 0; i < identifierSegments.length; i++) {
      const segment = identifierSegments[i];
      let possibleNextIdentifierScope = identifierScope.elements.get(segment);

      // found a scope content in this file
      if (possibleNextIdentifierScope) {
        // found scope content!
        if (i == identifierSegments.length - 1) {
          return {
            result: "found",
            identifier: possibleNextIdentifierScope,
          };
        }

        // traverse scope in same file
        if (possibleNextIdentifierScope.type == "scope") {
          identifierScope = possibleNextIdentifierScope.scope;

          // traverse scope in different file
        } else if (possibleNextIdentifierScope.type == "import") {
          const unit = compilationContext.compilationUnits.get(
            possibleNextIdentifierScope.compilationUnitPath
          );
          if (!unit)
            throw internalError(
              `expected a valid absolute import path; got '${possibleNextIdentifierScope.compilationUnitPath}'`
            );

          identifierScope = unit.scopeTree;
        } else {
          // handle case where the scope chain is just a misidentified point member access
          if (
            i == identifierSegments.length - 2 &&
            possibleNextIdentifierScope.type == "variable" &&
            (identifierSegments[identifierSegments.length - 1] == "x" ||
              identifierSegments[identifierSegments.length - 1] == "y")
          ) {
            return {
              result: "point-member-access",
              identifier: possibleNextIdentifierScope,
              memberAccess: identifierSegments[
                identifierSegments.length - 1
              ] as "x" | "y",
            };
          }
          break;
        }

        // attempt to find a scope content in other file
      } else {
        for (const otherFile of identifierScope.imports) {
          // try to load other compilation unit
          const unit = compilationContext.compilationUnits.get(
            otherFile.compilationUnitPath
          );

          // make sure we don't search this unit twice
          previouslySearchedUnits?.add(otherFile.compilationUnitPath);
          if (!unit)
            throw internalError(
              `expected a valid absolute import path; got '${otherFile.compilationUnitPath}'`
            );

          // search for scope content in other compilation unit
          const searchResult = findIdentifierScopeItem(
            unit,
            unit.scopeTree, // search from the root scope
            identifierSegments.slice(i),
            compilationContext,
            previouslySearchedUnits ?? new Set(compilationUnit.name)
          );

          if (searchResult.result != "not-found") return searchResult;
        }

        // couldn't find anything in any other file
        // --> not found in this scope
        // --> try in parent scope
        break;
      }
    }
  }

  return { result: "not-found" };
}
