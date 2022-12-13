import { mapAST } from "../../ast/ast-visitor.mjs";
import { ASTExpr, ASTType } from "../../ast/ast.mjs";
import { makeExprId } from "../../ast/parse.mjs";
import { lastof } from "../../compile/compile.mjs";
import { ScopeContent } from "../../semantic-analysis/analysis-types.mjs";
import { parseIdentSingleString } from "../macroutils.mjs";

export const deswizzle: ScopeContent.Macro["fn"] = (expr, ctx, a) => {
  const outputNamespace = parseIdentSingleString(expr.args[0], a, "argument 1");
  const mainExpr = expr.args[1];
  if (!mainExpr) a.error("Expected a second argument.");

  const mainOutputExpressions: ASTExpr[] = [];

  const astCallback = (index: number) => (expr: ASTExpr) => {
    if (expr.type == ASTType.IDENTIFIER) {
      const lastSegment = lastof(expr.segments);
      if (lastSegment.length == 3 && lastSegment.split("").every(c => c >= "x" && c <= "z")) {
        return a.ident(...expr.segments.slice(0, -1), lastSegment.split("")[index]);
      }
    }
    return { ...expr, id: makeExprId() };
  };

  for (let i = 0; i < 3; i++) {
    mainOutputExpressions.push(
      a.binop(a.ident("xyz"[i]), "=",
      a.clone(mapAST(mainExpr, astCallback(i))))
    );
  }

  return a.ns(outputNamespace, mainOutputExpressions);
}