import { ast } from "./ast/ast.mjs";
import { CompilationState, CompilationUnit, scopeTree } from "./compiler-state.mjs";
export declare function ident2str(ident: ast.Ident<any>): any;
export declare function resolveMacroSubstitutions<T extends keyof ast.NodeTypes>(state: CompilationState<"withscope" | "macrosub">, unit: CompilationUnit<"withscope" | "macrosub">, node: ast.NodeTypes<"withscope" | "macrosub">[T], importFile: (filename: string) => void, makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>): ast.NodeTypes<"macrosub">[T];
