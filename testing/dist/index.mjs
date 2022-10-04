import * as desmoscript from "desmoscript";
import { Identifier } from "desmoscript/dist/semantic-analysis-types.mjs";
import { ASTType } from "desmoscript/dist/ast.mjs";
//import * as chokidar from "chokidar";
const entryPoint = "./testfiles/parametric-renderer.desmo";
const additionalDefines = new Map();
additionalDefines.set("three", {
    type: Identifier.MACRO,
    fn: (ast, ctx) => {
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
