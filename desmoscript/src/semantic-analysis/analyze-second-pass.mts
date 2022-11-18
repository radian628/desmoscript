import { ASTVisitorLUT, noOpLUT, visitAST } from "../ast/ast-visitor.mjs";
import { JSONType, RawASTExpr } from "../ast/ast.mjs";
import { DesmoscriptCompilationUnit, DesmoscriptCompileContext, ScopeContent } from "./analysis-types.mjs";
import { err } from "./analyze-first-pass.mjs";
import * as path from "node:path";

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

  const dirname = path.dirname(unit.filePath);

  const lut: ASTVisitorLUT<{}, any> = {
    ...noOpLUT(),
    async import(e, ctx, v) {
      const scope = getScopeOfExpr(e, unit);
      const externalUnit = compileContext.compilationUnits.get(e.filename);

      const fullPath = path.join(dirname, e.filename);

      if (!externalUnit) {
        err(e, `INTERNAL ERROR: Tried to resolve an import of a file '${fullPath}' for which no compilation unit exists!`);
      }

      if (e.alias) {
        const externalRootScope = ScopeContent.externalizeScope(externalUnit.rootScope, fullPath);
      } else {
        
      }
    }
  };

  await visitAST(unit.ast, lut, undefined);

}
