import { ast } from "../ast/ast.mjs";
import {
  compileExpression,
  CompileExpressionContext,
} from "./compile-expression.mjs";

export function parseDJSON(
  e: ast.djson.Expr<"macrosubsync">,
  ctx: CompileExpressionContext
): any {
  function p(e2: ast.djson.Expr<"macrosubsync">) {
    return parseDJSON(e2, ctx);
  }

  switch (e.type) {
    case "dnull":
      return null;
    case "dboolean":
    case "dnumber":
    case "dstring":
      return e.data;
    case "dobject":
      return Object.fromEntries(
        Object.entries(e.data).map(([k, v]) => [k, p(v)])
      );
    case "darray":
      return e.data.map((d) => p(d));
    case "ddesmoscript":
      return compileExpression(e.data, ctx);
  }
}
