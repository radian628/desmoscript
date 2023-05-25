import { compileDesmoscript } from "./complete-compiler.mjs";
import * as chokidar from "chokidar";
import * as http from "node:http";
export async function createCompilerWatcherServer(entryPoint, port, makeDefaultScopeTree) {
    let compileResult;
    let filesToWatch = new Set();
    const compile = async () => {
        try {
            compileResult = await compileDesmoscript({
                entryPoint,
                makeDefaultScopeTree,
            });
        }
        catch (err) {
            console.log(err);
        }
        for (const file of compileResult.usedFiles)
            filesToWatch.add(file);
    };
    await compile();
    const compileLoop = async function () {
        const watcher = chokidar.watch(Array.from(compileResult.usedFiles), {
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 500,
            },
        });
        watcher.on("all", async () => {
            watcher.close();
            await compile();
            compileLoop();
        });
    };
    compileLoop();
    const server = http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.end(JSON.stringify(compileResult.graphState));
    });
    server.listen(port);
    console.log(`Server is listening on port ${port}!`);
}
