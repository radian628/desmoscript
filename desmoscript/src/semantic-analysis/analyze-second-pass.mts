import { ASTVisitorLUT, noOpLUT, visitAST } from "../ast/ast-visitor.mjs";
import { JSONType, RawASTExpr } from "../ast/ast.mjs";
import { DesmoscriptCompilationUnit, DesmoscriptCompileContext } from "./analysis-types.mjs";
import { err } from "./analyze-first-pass.mjs";

function getScopeOfExpr(expr: RawASTExpr<{}>, unit: DesmoscriptCompilationUnit) {
  const scope = unit.symbolScopes.get(expr.id);
  if (scope == undefined) {
    err(expr, "INTERNAL ERROR: Expression has no corresponding scope.");
  }
  return scope;
}

// compiler second pass: resolve imports so that they are visible
async function astToCompilationUnitSecondPass(
  compileContext: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit
) {

  const lut: ASTVisitorLUT<{}, any> = {
    ...noOpLUT(),
    async import(e, ctx, v) {
      const scope = getScopeOfExpr(e, unit);

    }
  };

  await visitAST(unit.ast, lut, undefined);

}
