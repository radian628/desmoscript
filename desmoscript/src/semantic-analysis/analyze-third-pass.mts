import { DesmoscriptCompilationUnit, DesmoscriptCompileContext, ScopeContent } from "./analysis-types.mjs";
import * as path from "node:path";
import { ASTVisitorLUT, noOpLUT, visitAST } from "../ast/ast-visitor.mjs";
import { getScopeOfExpr, locateIdentifier, parseIdent } from "./analyze-utils.mjs";
import { createVariableScopesAndDeclareImports, err } from "./analyze-first-pass.mjs";
import { ASTType, RawASTExpr } from "../ast/ast.mjs";
import { getMacroAPI } from "./macro-api-impl.mjs";
import { resolveImports } from "./analyze-second-pass.mjs";

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
iterate over the AST a bunch of times! Fuck it, I am going to
iterate over the AST like 20 times, this should be fine because
none of my projects are gonna get that large anyway.
*/
async function astToCompilationUnitThirdPass(
    compileContext: DesmoscriptCompileContext,
    unit: DesmoscriptCompilationUnit
  ) {
  
    const dirname = path.dirname(unit.filePath);

    const substitutionLUT = new Map<number, RawASTExpr<{}>>();
  
    const lut: ASTVisitorLUT<{}, any, Promise<void>> = {
      ...noOpLUT(),
      async fncall(e, ctx, v) {
        // don't attempt to perform macro substitution on non-macros
        if (!e.isMacro) return;

        const myScope = getScopeOfExpr(e, unit);

        const ident = locateIdentifier(myScope, parseIdent(e.name).segments);
        if (!ident) return;
        if (ident.type != ScopeContent.Type.MACRO) return;
        
        // if macro substitution already exists, then don't bother doing it again. just search below
        let substitution = substitutionLUT.get(e.id);
        if (!substitution) {
          substitution = await ident.fn(e, compileContext, await getMacroAPI(e));

          substitutionLUT.set(e.id, substitution);

          // compiler first pass
          createVariableScopesAndDeclareImports(
            { scope: myScope },
            unit.symbolScopes,
            compileContext,
            path.dirname(unit.filePath),
            substitution
          );
          
          // compiler second pass
          resolveImports(
            compileContext,
            unit,
            substitution,
            dirname
          );
        }

        // repeat third pass to get nested macros
        await v(substitution, ctx);
      }
    };
  
    await visitAST(unit.ast, lut, undefined);
  }
  