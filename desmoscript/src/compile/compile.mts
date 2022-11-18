import {
  DesmoscriptCompilationUnit,
  DesmoscriptCompileContext,
  Scope,
  ScopeContent,
} from "../semantic-analysis/analysis-types.mjs";

import { GraphState } from "../graphstate.mjs";
import {
  ASTBinop,
  ASTExpr,
  ASTIdentifier,
  ASTType,
  RawASTExpr,
} from "../ast/ast.mjs";
import { err } from "../semantic-analysis/analyze-first-pass.mjs";

let exprIdCounter = 0;
function uniqueExpressionID() {
  return (exprIdCounter++).toString();
}

function opToLatex<T>(expr: ASTBinop<T>) {
  const lop: string | undefined = optable[expr.op];
  if (!lop)
    throw {
      expr,
      reason: `Unable to convert operator '${expr.op}'. Contact a developer if this error occurs.`,
    };
  return lop;
}

function toDesmosVar(str: string) {
  if (str.length == 1) return str;
  return `${str[0]}_{${str.slice(1)}}`;
}

function lastof<T>(arr: T[]) {
  return arr[arr.length - 1];
}

const optable: { [key: string]: string } = {
  "+": "+",
  "-": "-",
  "*": "\\cdot ",
  ">": "\\gt ",
  "<": "\\lt ",
  ">=": "\\ge ",
  "<=": "\\le ",
  "->": "\\to ",
  "..": "...",
  "=": "=",
  "==": "=",
};
