import * as path from "node:path";
import { desmoscriptFileToAST } from "../ast/parse.mjs";
import { compile } from "../compile/compile.mjs";
import { DesmoscriptCompileContext } from "../semantic-analysis/analysis-types.mjs";
import { astToCompilationUnitFirstPass } from "../semantic-analysis/analyze-first-pass.mjs";
import { astToCompilationUnitThirdPass } from "../semantic-analysis/analyze-third-pass.mjs";

export async function compileDesmoscript(entryPoint: string) {
  const ctx: DesmoscriptCompileContext = {
    existingNames: new Set(),
    existingFiles: new Set(),
    compilationUnits: new Map(),
    compilationUnitPrefixes: new Map(),
    namespaceSeparator: "X",
  }
  entryPoint = path.resolve(entryPoint);
  const ast = await desmoscriptFileToAST(entryPoint);
  await astToCompilationUnitFirstPass(ast, ctx, entryPoint);

  // stupid loop to make macro instantiation work better
  for (let i = 0; i < 10; i++) {
    for (const [unitName, unit] of ctx.compilationUnits) {
      await astToCompilationUnitThirdPass(ctx, unit);
    }
  }

  return compile(ctx);
}