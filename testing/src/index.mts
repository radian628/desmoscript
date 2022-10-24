import * as desmoscript from "desmoscript";
import * as http from "node:http";
import * as fs from "node:fs/promises";
import { DesmoscriptContext, Identifier, MacroDefinition, Scope, ScopedASTExpr, ScopeInfo } from "desmoscript/dist/semantic-analysis-types.mjs";
import { ASTFunctionCall, ASTType } from "desmoscript/dist/ast.mjs";

const entryPoint = "./testfiles/macro.desmo";

const additionalDefines = new Map<string, MacroDefinition>();

additionalDefines.set("three", {
    type: Identifier.MACRO,
    fn: (ast: ASTFunctionCall<ScopeInfo>, ctx: DesmoscriptContext) => {
        return {
            ...desmoscript.getExprContext(ast),
            type: ASTType.NUMBER,
            number: 3
        };
    }
});

additionalDefines.set("apiTest", {
  type: Identifier.MACRO,
  fn: (ast, ctx, m) => {
    return new Promise((resolve) => {
      resolve(m.number(12345));
    })
  }
});

desmoscript.runCompilerWebServer(entryPoint, {
    watch: true,
    port: 8081,
    additionalDefines
});
