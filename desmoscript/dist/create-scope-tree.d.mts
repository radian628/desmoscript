import { ast } from "./ast/ast.mjs";
import { scopeTree } from "./compiler-state.mjs";
export declare function mergeScopes(node: ast.Node, dst: scopeTree.Scope, src: scopeTree.Scope): void;
export declare function createScopeTree<T extends keyof ast.NodeTypes>(node: ast.NodeTypes[T], filePath: string, importFile: (importedPath: string) => void, makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>): {
    ast: ast.NodeTypes<"withscope", "withscope">[T];
    scope: {
        type: "scope";
        contents: Map<string, scopeTree.ScopeContent<{}, {}>>;
        parent?: any | undefined;
        name: string;
    };
};
