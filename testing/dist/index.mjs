import * as desmoscript from "desmoscript";
import * as http from "node:http";
import * as fs from "node:fs/promises";
import * as chokidar from "chokidar";
const entryPoint = "./testfiles/parametric-renderer.desmo";
async function compile() {
    await desmoscript.compileDesmoscriptFromFile(entryPoint, "testfiles/out.json");
    console.log("Compiled!");
}
compile();
chokidar.watch(entryPoint).on("change", path => compile());
http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(await fs.readFile("./testfiles/out.json"));
}).listen(8082);
