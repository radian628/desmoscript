import { scopeTree } from "./compiler-state.mjs";
export declare function createCompilerWatcherServer(entryPoint: string, port: number, makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>): Promise<void>;
