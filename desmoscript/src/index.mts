import { scopeTree } from "./compiler-state.mjs";
import { compileDesmoscript } from "./complete-compiler.mjs";

import * as chokidar from "chokidar";
import * as http from "node:http";
import { GraphState } from "./graphstate.mjs";

export async function createCompilerWatcherServer(
  entryPoint: string,
  port: number,
  makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>
) {
  let compileResult: {
    graphState: GraphState;
    usedFiles: Set<string>;
  };

  let filesToWatch = new Set<string>();

  const compile = async () => {
    try {
      compileResult = await compileDesmoscript({
        entryPoint,
        makeDefaultScopeTree,
      });
    } catch (err) {
      console.log(err);
    }
    for (const file of compileResult.usedFiles) filesToWatch.add(file);
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
