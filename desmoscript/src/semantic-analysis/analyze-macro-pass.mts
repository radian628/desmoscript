import {
  DesmoscriptCompilationUnit,
  DesmoscriptCompileContext,
  ScopeContent,
} from "./analysis-types.mjs";
import * as path from "node:path";
import { ASTVisitorLUT, noOpLUT, visitAST } from "../ast/ast-visitor.mjs";
import {
  findIdentifier,
  getScopeOfExpr,
  parseIdent,
} from "./analyze-utils.mjs";
import {
  createVariableScopesAndDeclareImports,
  err,
} from "./analyze-scope-pass.mjs";
import { ASTType, RawASTExpr } from "../ast/ast.mjs";
import { getMacroAPI } from "./macro-api-impl.mjs";

export function noUndefined<T>(t: T | undefined): T {
  if (t === undefined) throw "UNDEFINED SHOULD BE IMPOSSIBLE HERE";
  return t;
}

// compiler third pass: macro substitution
/*
Problem with macro substitution: 
Inside of a macro, one may define one or more variables. 
This is a big problem because if scopes are calculated for those variables,
now you have 
SOLVED: fncall AST nodes can state whether they are macros or not

Problem with macro substitution #2: How do I patch the AST? 
This is a problem with the LUT now that I think about it.
For that matter, how did I even handle it earlier?
I know, I'll just create another ID-based map for it!

Problem with macro substitution #3: How do I handle imported
macros that are created by other macros? I might have to 
iterate over the AST a bunch of times! I am going to
iterate over the AST like 20 times, this should be fine because
none of my projects are gonna get that large anyway.
*/
export async function astToCompilationUnitMacroPass(
  compileContext: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit,
  watchFiles: Set<string>,
  isLastPass?: boolean
) {
  const dirname = path.dirname(unit.filePath);

  const lut: ASTVisitorLUT<{}, any, Promise<void>> = {
    ...noOpLUT(new Promise<void>((resolve, reject) => resolve())),
    async fncall(e, ctx, v) {
      // don't attempt to perform macro substitution on non-macros
      if (!e.isMacro) {
        await v(e.name, ctx);
        for (let arg of e.args) await v(arg, ctx);
        return
      }

      // for (const arg of e.args) {
      //   v(arg, ctx);
      // }

      const myScope = getScopeOfExpr(e, unit);

      const ident = findIdentifier(
        myScope,
        compileContext,
        unit.filePath,
        parseIdent(e.name).segments,
        e
      );
      if (!ident.success) {
        if (isLastPass) {
          err(
            e,
            `Macro instantiation failed: Macro definition depth is too deep OR macro '${parseIdent(
              e.name
            ).segments.join(".")}' does not exist!`
          );
        }
        return;
      }
      if (ident.result.type != ScopeContent.Type.MACRO) return;

      // if macro substitution already exists, then don't bother doing it again. just search below
      let substitution = unit.substitutionLUT.get(e.id);
      if (!substitution) {
        substitution = await ident.result.fn(
          e,
          compileContext,
          await getMacroAPI(e, unit)
        );

        unit.substitutionLUT.set(e.id, substitution);

        // compiler first pass
        await createVariableScopesAndDeclareImports(
          { scope: myScope },
          unit.symbolScopes,
          unit.symbolInnerScopes,
          compileContext,
          path.dirname(unit.filePath),
          substitution,
          watchFiles
        );

        // // repeat third pass to get nested macros
        // await astToCompilationUnitMacroPass(
        //   compileContext,
        //   noUndefined(compileContext.compilationUnits.get(ident.unit)),
        //   watchFiles,
        //   isLastPass
        // );
        v(substitution, ctx);
      }
    },
  };

  await visitAST(unit.ast, lut, undefined);
}
