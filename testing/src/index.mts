import * as desmoscript from "desmoscript";
import * as http from "node:http";
import * as fs from "node:fs/promises";
import { DesmoscriptContext, Identifier, MacroDefinition, Scope, ScopedASTExpr, ScopeInfo } from "desmoscript/dist/semantic-analysis-types.mjs";
import { ASTFunctionCall, ASTType } from "desmoscript/dist/ast.mjs";
//import * as chokidar from "chokidar";

const entryPoint = "./testfiles/parametric-renderer.desmo";

const additionalDefines = new Map<string, MacroDefinition>();

additionalDefines.set("three", {
    type: Identifier.MACRO,
    fn: (ast: ASTFunctionCall<ScopeInfo>, ctx: DesmoscriptContext) => {
        return {
            ...ast,
            type: ASTType.NUMBER,
            number: 3
        };
    }
});

desmoscript.runCompilerWebServer(entryPoint, {
    watch: true,
    port: 8081,
    additionalDefines
});

// async function compile() {
//     await desmoscript.compileDesmoscriptFromFile(entryPoint, "testfiles/out.json");
//     console.log("Compiled!");
// }

// compile();

// chokidar.watch(entryPoint).on("change", path => compile());

// http.createServer(async (req, res) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.end(await fs.readFile("./testfiles/out.json"));
// }).listen(8082);
