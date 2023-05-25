import { astTypeNamesArray, makeFixedOpLUT, mapASTPreOrder, } from "./ast/traversal.mjs";
import { createScopeTree, mergeScopes } from "./create-scope-tree.mjs";
import { generateMacroAPI } from "./macro/macro-api.mjs";
import { lookupScopeTreeItem } from "./scope-tree-lookup.mjs";
const lut = makeFixedOpLUT(astTypeNamesArray.filter((x) => x != "macrocall"), (a, b) => [a, b]);
lut.binop;
export function ident2str(ident) {
    return ident.segments.join(".");
}
export function resolveMacroSubstitutions(state, unit, node, importFile, makeDefaultScopeTree) {
    return mapASTPreOrder(node, {
        ...lut,
        macrocall(node, ctx) {
            const macro = lookupScopeTreeItem(state, unit, node.enclosingScope, node.name.segments);
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
            }
            else {
                const substitution = macro.scope
                    .fn(node, generateMacroAPI(state, unit, node))
                    .then((sub) => {
                    const createScopeTreeResult = createScopeTree(sub, unit.path, importFile, makeDefaultScopeTree);
                    const scopeTree = createScopeTreeResult.scope;
                    mergeScopes(node, node.enclosingScope, scopeTree);
                    return resolveMacroSubstitutions(state, unit, createScopeTreeResult.ast, importFile, makeDefaultScopeTree);
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
    }, undefined);
}
