import { ast } from "./ast/ast.mjs";
import {
  ASTTypeName,
  astTypeNamesArray,
  makeFixedOpLUT,
  mapASTPreOrder,
  noOpLutFn,
} from "./ast/traversal.mjs";
import {
  CompilationState,
  CompilationUnit,
  scopeTree,
} from "./compiler-state.mjs";
import { createScopeTree, mergeScopes } from "./create-scope-tree.mjs";
import { err } from "./error-handling.mjs";
import { generateMacroAPI } from "./macro/macro-api.mjs";
import { lookupScopeTreeItem } from "./scope-tree-lookup.mjs";

const lut = makeFixedOpLUT<
  "withscope",
  undefined,
  "macrosub",
  Exclude<ASTTypeName, "macrocall">
>(
  astTypeNamesArray.filter((x) => x != "macrocall") as Exclude<
    ASTTypeName,
    "macrocall"
  >[],
  (a, b) => [a, b]
);

lut.binop;

export function ident2str(ident: ast.Ident<any>) {
  return ident.segments.join(".");
}

export function resolveMacroSubstitutions<T extends keyof ast.NodeTypes>(
  state: CompilationState<"withscope" | "macrosub">,
  unit: CompilationUnit<"withscope" | "macrosub">,
  node: ast.NodeTypes<"withscope" | "macrosub">[T],
  importFile: (filename: string) => void,
  makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>
): ast.NodeTypes<"macrosub">[T] {
  return mapASTPreOrder<"withscope" | "macrosub", "macrosub", undefined, T>(
    node,
    {
      ...lut,
      macrocall(node, ctx) {
        const macro = lookupScopeTreeItem(
          state,
          unit,
          node.enclosingScope,
          node.name.segments
        );

        // if (!macro) {
        //   err(node, `'${ident2str(node.name)}' does not exist.`);
        // }

        // if (macro.type != "macro") {
        //   err(
        //     node,
        //     `Expected '${ident2str(node.name)}' to be a macro, but found a '${
        //       macro.type
        //     }' instead.`
        //   );
        // }

        if (!macro || macro.scope.type != "macro") {
          return [node, ctx];
        } else {
          const substitution = macro.scope
            .fn(node, generateMacroAPI(state, unit, node))
            .then((sub) => {
              const createScopeTreeResult = createScopeTree(
                sub,
                unit.path,
                importFile,
                makeDefaultScopeTree
              );

              const scopeTree = createScopeTreeResult.scope;

              mergeScopes(node, node.enclosingScope, scopeTree);

              return resolveMacroSubstitutions(
                state,
                unit,
                createScopeTreeResult.ast,
                importFile,
                makeDefaultScopeTree
              );
            });

          return [
            {
              ...node,
              substitution,
            },
            ctx,
          ];
        }
      },
    },
    undefined
  );
}
