import { levenshtein } from "../all-steps/error-hints.mjs";
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

export type FindIdentifierSuccess = { 
  result: ScopeContent.Content, 
  enclosingScope: Scope, 
  unit: string,
  success: true
};

export type FindIdentifierResult = FindIdentifierSuccess | {
  success: false,
  badSegment: string,
  similarSegments: string[]
} 

export type FindIdentifierDirectlyInScopeResult
  = FindIdentifierSuccess
  | {
    success: false,
    badSegment: string
    badScope: Scope
  }

export function findIdentifierDirectlyInScope(
  scope: Scope,
  compileContext: DesmoscriptCompileContext,
  path: string[],
  originalExpr: ASTExpr,
  unit: string
): FindIdentifierDirectlyInScopeResult {
  const entry = scope.contents.get(path[0]);

  if (entry) {
    if (path.length == 1) {
      return {
        result: entry,
        enclosingScope: scope,
        unit,
        success: true
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
        );
        return result.success ? {
          result: result.result,
          enclosingScope: scope,
          unit: entry.unit,
          success: true
        } : result;
      } else if (entry.type == ScopeContent.Type.SCOPE) {
        const result = findIdentifierDirectlyInScope(
          entry.data,
          compileContext,
          nextPath,
          originalExpr,
          unit
        );
        return result.success ? {
          result: result.result,
          enclosingScope: scope,
          unit,
          success: true
        } : result;
      }
    }
  }
  return {
    success: false,
    badSegment: path[0],
    badScope: scope
  }
}

// given a scope and a path, find the given identifier relative to that scope
export function findIdentifier(
  startScope: Scope,
  compileContext: DesmoscriptCompileContext,
  unit: string,
  path: string[],
  originalExpr: ASTExpr,
): FindIdentifierResult {
  let searchScope: Scope | undefined = startScope;

  const failures: {
    success: false,
    badSegment: string
    badScope: Scope
  }[] = [];

  while (searchScope != undefined) {
    const result = findIdentifierDirectlyInScope(
      startScope, 
      compileContext,
      path,
      originalExpr,
      unit
    );
    if (result.success) return result;
    searchScope = searchScope.parent;
    failures.push(result);
  }

  // TODO: Figure out how to format spelling suggestions
  // for unknown variable names. 
  return failures
    .map(failure => {
      const distances = levenshtein
    })

  // if (!startScope.parent) return {
  //   success: false,
  //   badSegment: path[0],
  //   similarSegments
  // };
  //return findIdentifier(startScope.parent, compileContext, unit, path, originalExpr);
}

// assert that an expression must be an identifier
export function parseIdent(expr: RawASTExpr<{}>): ASTIdentifier<{}> {
  if (expr.type != ASTType.IDENTIFIER)
    err(expr, "INTERNAL ERROR: Expected an identifier.");
  return expr;
}
