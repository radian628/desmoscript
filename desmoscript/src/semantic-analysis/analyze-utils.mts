import { ASTIdentifier, ASTType, RawASTExpr } from "../ast/ast.mjs";
import { DesmoscriptCompilationUnit, Scope, ScopeContent } from "./analysis-types.mjs";
import { err } from "./analyze-first-pass.mjs";

// get the "canonical path" (local to its compilation unit) of a scope
// use this to generate human-readable variable names
export function getCanonicalPath(
  scope?: Scope
): string[] {
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
      e[0],
      `${typename} '${name}' is invalid, as something with the same name exists in this scope.`
    );
  }
}

// given an expression, retrieve its enclosing scope
export function getScopeOfExpr(expr: RawASTExpr<{}>, unit: DesmoscriptCompilationUnit) {
  const scope = unit.symbolScopes.get(expr.id);
  if (scope == undefined) {
    err(expr, "INTERNAL ERROR: Expression has no corresponding scope.");
  }
  return scope;
}

function locateIdentifierInScope(scope: Scope, path: string[]) {
  if (path.length == 1) return scope.contents.get(path[0]);
  const shouldBeScope = scope.contents.get(path[0]);
  if (shouldBeScope?.type != ScopeContent.Type.SCOPE) return;
  locateIdentifierInScope(shouldBeScope.data, path.slice(1));
}

// identifier resolution, just like in any old language e.g. JS
export function locateIdentifier(scope: Scope | undefined, path: string[]) {
  if (!scope) return;
  const ident = locateIdentifierInScope(scope, path);
  if (ident) return ident;
  locateIdentifier(scope.parent, path);
}

export function traverseScopeTree(scope: Scope, path: string[])
  : Scope | undefined {
  if (path.length == 0) return scope;
  return traverseScopeTree(scope, path.slice(1));
}

// get the scope of some identifier
export function locateIdentifierScope(scope: Scope | undefined, path: string[])
  : Scope | undefined {
  if (!scope) return;
  const ident = locateIdentifierInScope(scope, path);
  if (ident) return traverseScopeTree(scope, path.slice(0, -1));
  locateIdentifier(scope.parent, path);
}

// assert that an expression must be an identifier
export function parseIdent(expr: RawASTExpr<{}>): ASTIdentifier<{}> {
  if (expr.type != ASTType.IDENTIFIER) err(expr, "INTERNAL ERROR: Expected an identifier.");
  return expr;
}