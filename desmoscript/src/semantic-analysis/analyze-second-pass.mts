// import { ASTVisitorLUT, noOpLUT, visitAST } from "../ast/ast-visitor.mjs";
// import { JSONType, RawASTExpr } from "../ast/ast.mjs";
// import { DesmoscriptCompilationUnit, DesmoscriptCompileContext, ScopeContent } from "./analysis-types.mjs";
// import { err } from "./analyze-first-pass.mjs";
// import * as path from "node:path";
// import { checkNamespaceCollision, getScopeOfExpr } from "./analyze-utils.mjs";

// export async function resolveImports(
//   compileContext: DesmoscriptCompileContext,
//   unit: DesmoscriptCompilationUnit,
//   ast: RawASTExpr<{}>,
//   dirname: string
// ) {

//   const lut: ASTVisitorLUT<{}, any, Promise<void>> = {
//     ...noOpLUT(),
//     async import(e, ctx, v) {
//       const scope = getScopeOfExpr(e, unit);
//       const externalUnit = compileContext.compilationUnits.get(e.filename);

//       const fullPath = path.join(dirname, e.filename);

//       if (!externalUnit) {
//         err(e, `INTERNAL ERROR: Tried to resolve an import of a file '${fullPath}' for which no compilation unit exists!`);
//       }

//       if (e.alias !== undefined) {
//         const externalRootScope = ScopeContent.externalizeScope(externalUnit.rootScope, fullPath);
//         checkNamespaceCollision([e, e.alias], "Import", scope);
//         scope.contents.set(e.alias, {
//           type: ScopeContent.Type.SCOPE,
//           data: externalRootScope
//         });
//       } else {
//         for (const [contentName, contentValue] of externalUnit.rootScope.contents) {
//           const externalContent = ScopeContent.externalize(contentValue, fullPath);
//           checkNamespaceCollision([e, contentName], "Symbol", scope);
//           scope.contents.set(contentName, externalContent);
//         }
//       }
//     }
//   };

//   await visitAST(unit.ast, lut, undefined);
// }

// // compiler second pass: resolve imports so that they are visible
// async function astToCompilationUnitSecondPass(
//   compileContext: DesmoscriptCompileContext,
//   unit: DesmoscriptCompilationUnit
// ) {

//   const dirname = path.dirname(unit.filePath);

//   resolveImports(compileContext, unit, unit.ast, dirname);
// }
