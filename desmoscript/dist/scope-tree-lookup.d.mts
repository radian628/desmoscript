import { ast } from "./ast/ast.mjs";
import { CompilationState, CompilationUnit, scopeTree } from "./compiler-state.mjs";
export declare function getCompilationUnit<T extends ast.URIS>(state: CompilationState<T>, unitName: string): CompilationUnit<T>;
export declare function lookupScopeTreeItem<T extends ast.URIS>(state: CompilationState<T>, unit: CompilationUnit<T>, startingScope: scopeTree.Scope, path: string[]): {
    scope: scopeTree.ScopeContent<{}, {}>;
    unit: CompilationUnit<T>;
} | undefined;
export declare function scopeTreeNameRelativeToRoot<T extends ast.URIS>(state: CompilationState<T>, unit: CompilationUnit<T>, content?: scopeTree.ScopeContent): string[];
export declare function mapGetErr<K, V>(map: Map<K, V>, key: K, node: ast.Node): V;
export declare function getCanonicalIdentifierName<T extends ast.URIS>(scope: scopeTree.Scope, state: CompilationState<T>, unit: CompilationUnit<T>, associatedNode: ast.Node, additionalNames: string[]): string | undefined;
export declare function createCanonicalIdentifierName<T extends ast.URIS>(content: scopeTree.Variable | scopeTree.Function, state: CompilationState<T>, unit: CompilationUnit<T>, associatedNode: ast.Node): string;
