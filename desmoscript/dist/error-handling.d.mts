import { ast } from "./ast/ast.mjs";
export type CompilerError = {
    line: number;
    col: number;
    file: string;
    reason: string;
};
export declare function errstring(err: CompilerError): void;
export declare function err(node: ast.Node, reason: string): never;
export declare function ierr(node: ast.Node, reason: string): never;
export declare function errFull(line: number, col: number, file: string, reason: string): never;
