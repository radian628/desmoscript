import { ASTExpr, ASTIdentifier, ASTType, RawASTExpr } from "../ast/ast.mjs";
import {
  DesmoscriptCompilationUnit,
  DesmoscriptCompileContext,
  Scope,
  ScopeContent,
} from "./analysis-types.mjs";
import { err } from "./analyze-first-pass.mjs";

// get the "canonical path" (local to its compilation unit) of a scope
// use this to generate human-readable variable names
export function getCanonicalPath(scope?: Scope): string[] {
  if (!scope || scope.isRoot) return [];
  return [scope.name, ...getCanonicalPath(scope.parent)];
}

// determine whether an identifier has a namespace collision in its scope
export function checkNamespaceCollision(
  e: ASTIdentifier<{}> | [RawASTExpr<{}>, string],
  typename: string,
  scope: Scope
) {
  const name = Array.isArray(e) ? e[1] : e.segments[0];
  if (scope.contents.has(name)) {
    err(
      Array.isArray(e) ? e[0] : e,
      `${typename} '${name}' is invalid, as something with the same name exists in this scope.`
    );
  }
}

// given an expression, retrieve its enclosing scope
export function getScopeOfExpr(
  expr: RawASTExpr<{}>,
  unit: DesmoscriptCompilationUnit
) {
  const scope = unit.symbolScopes.get(expr.id);
  if (scope == undefined) {
    err(expr, "INTERNAL ERROR: Expression has no corresponding scope.");
  }
  return scope;
}

export function getInnerScopeOfExpr(
  expr: RawASTExpr<{}>,
  unit: DesmoscriptCompilationUnit
) {
  const scope = unit.symbolInnerScopes.get(expr.id);
  if (scope == undefined) {
    err(expr, "INTERNAL ERROR: Expression has no corresponding inner scope.");
  }
  return scope;
}

export function importScopeContentToCorrespondingRootScope(
  importContent: ScopeContent.Import,
  compileContext: DesmoscriptCompileContext,
  originalExpr: ASTExpr
) {
  const unit = compileContext.compilationUnits.get(importContent.unit);
  if (!unit) return err(originalExpr, `INTERNAL ERROR: Imported file '${importContent.unit}' does not exist.`);
  return unit.rootScope;
}

export function findIdentifierDirectlyInScope(
  scope: Scope,
  compileContext: DesmoscriptCompileContext,
  path: string[],
  originalExpr: ASTExpr,
  unit: string
): { result: ScopeContent.Content, enclosingScope: Scope, unit: string } | undefined {
  const entry = scope.contents.get(path[0]);

  if (entry) {
    if (path.length == 1) {
      return {
        result: entry,
        enclosingScope: scope,
        unit
      };
    } else {
      const nextPath = path.slice(1);

      if (entry.type == ScopeContent.Type.IMPORT) {
        const result = findIdentifierDirectlyInScope(
          importScopeContentToCorrespondingRootScope(entry, compileContext, originalExpr),
          compileContext,
          nextPath,
          originalExpr,
          entry.unit
        )?.result;
        return result ? {
          result,
          enclosingScope: scope,
          unit: entry.unit
        } : result;
      } else if (entry.type == ScopeContent.Type.SCOPE) {
        const result = findIdentifierDirectlyInScope(
          entry.data,
          compileContext,
          nextPath,
          originalExpr,
          unit
        )?.result;
        return result ? {
          result,
          enclosingScope: scope,
          unit
        } : result;
      }
    }
  }
}

export function findIdentifier(
  startScope: Scope,
  compileContext: DesmoscriptCompileContext,
  unit: string,
  path: string[],
  originalExpr: ASTExpr,
): { result: ScopeContent.Content, enclosingScope: Scope, unit: string } | undefined {
  const result = findIdentifierDirectlyInScope(
    startScope, 
    compileContext,
    path,
    originalExpr,
    unit
  );
  if (result) return result;
  if (!startScope.parent) return;
  return findIdentifier(startScope.parent, compileContext, unit, path, originalExpr);
}

// assert that an expression must be an identifier
export function parseIdent(expr: RawASTExpr<{}>): ASTIdentifier<{}> {
  if (expr.type != ASTType.IDENTIFIER)
    err(expr, "INTERNAL ERROR: Expected an identifier.");
  return expr;
}
