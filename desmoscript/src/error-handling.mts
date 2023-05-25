import { ast } from "./ast/ast.mjs";

export type CompilerError = {
  line: number;
  col: number;
  file: string;
  reason: string;
};

export function errstring(err: CompilerError) {
  return;
}

export function err(node: ast.Node, reason: string): never {
  throw {
    line: node.line,
    col: node.col,
    file: node.file,
    reason,
  };
}
export function ierr(node: ast.Node, reason: string): never {
  throw {
    line: node.line,
    col: node.col,
    file: node.file,
    reason: `INTERNAL ERROR (Should not happen in production!): ${reason}`,
  };
}
export function errFull(
  line: number,
  col: number,
  file: string,
  reason: string
): never {
  throw { line, col, file, reason };
}
