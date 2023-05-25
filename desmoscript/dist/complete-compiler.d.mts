import { scopeTree } from "./compiler-state.mjs";
export declare function promiseAllMap<T, U>(map: Map<T, Promise<U>>): Promise<Map<T, Awaited<U>>>;
export declare function compileDesmoscript(options: {
    entryPoint: string;
    makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>;
}): Promise<{
    graphState: import("./graphstate.mjs").GraphState;
    usedFiles: Set<string>;
}>;
