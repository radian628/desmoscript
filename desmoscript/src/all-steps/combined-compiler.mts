import * as path from "node:path";
import { desmoscriptFileToAST } from "../ast/parse.mjs";
import { compile } from "../compile/compile.mjs";
import { DesmoscriptCompileContext } from "../semantic-analysis/analysis-types.mjs";
import { astToCompilationUnitScopePass } from "../semantic-analysis/analyze-scope-pass.mjs";
import { astToCompilationUnitMacroPass } from "../semantic-analysis/analyze-macro-pass.mjs";
import { enumerateUses, getVariableNamesAndSubstitutions, reserveBuiltins } from "../semantic-analysis/analyze-inline-pass.mjs";
import * as http from "node:http";
import * as chokidar from "chokidar";
import { GraphState } from "../graphstate.mjs";
import * as z from "zod";
import { levenshtein } from "./error-hints.mjs";

export async function compileDesmoscript(
  entryPoint: string,
  filesOut: Set<string>
) {
  filesOut.add(path.resolve(entryPoint));
  const ctx: DesmoscriptCompileContext = {
    existingNames: new Set(),
    existingFiles: new Set(),
    identifierInfo: new Map(),
    compilationUnits: new Map(),
    compilationUnitPrefixes: new Map(),
    namespaceSeparator: "X",
  };
  entryPoint = path.resolve(entryPoint);
  const ast = await desmoscriptFileToAST(entryPoint);
  await astToCompilationUnitScopePass(ast, ctx, entryPoint, filesOut);

  // stupid loop to make macro instantiation work better
  for (let i = 0; i < 10; i++) {
    for (const [unitName, unit] of ctx.compilationUnits) {
      await astToCompilationUnitMacroPass(ctx, unit, filesOut);
    }
  }
  for (const [unitName, unit] of ctx.compilationUnits) {
    await astToCompilationUnitMacroPass(ctx, unit, filesOut, true);
  }
  for (const [unitName, unit] of ctx.compilationUnits) {
    await reserveBuiltins(ctx, unit);
  }
  for (const [unitName, unit] of ctx.compilationUnits) {
    await getVariableNamesAndSubstitutions(ctx, unit);
  }
  for (const [unitName, unit] of ctx.compilationUnits) {
    await enumerateUses(ctx, unit);
  }


  return {
    graphState: await compile(ctx),
    files: Array.from(filesOut),
  };
}

// coloured logging functions
function logInfo(content: string) {
  console.log("\u001b[" + 90 + "m" + content + "\u001b[0m");
}

function logError(content: string) {
  console.log("\u001b[" + 31 + "m" + content + "\u001b[0m");
}

function logSuccess(content: string) {
  console.log("\u001b[" + 32 + "m" + content + "\u001b[0m");
}

const desmoscriptErrorParser = z.object({
  reason: z.string(),
  expr: z.object({
    file: z.string(),
    line: z.number(),
    col: z.number(),
  }),
});

export async function createDesmoscriptWatchServer(
  entryPoint: string,
  options?: {
    port?: number;
  }
) {
  const port = options?.port ?? 8081;

  let compiledOutput: GraphState | null = null;

  let watchedFiles = new Set<string>();

  async function doCompilation() {
    // try to compile
    let hadErr = false;
    let err: any = undefined;
    try {
      compiledOutput = (await compileDesmoscript(entryPoint, watchedFiles))
        .graphState;
    } catch (err2) {
      hadErr = true;
      err = err2;
    }

    // list all watched files
    for (const file of Array.from(watchedFiles)) {
      logInfo("Watching " + file);
    }

    // display error message
    if (hadErr) {
      const dserr = desmoscriptErrorParser.safeParse(err);
      if (dserr.success) {
        logError(
          `${dserr.data.expr.file}\n line ${dserr.data.expr.line}; col ${dserr.data.expr.col}; ${dserr.data.reason}`
        );
      } else {
        logError(`err: ${err} ${(err as Error).stack}`);
      }
    }

    // watch files
    const watcher = chokidar.watch(Array.from(watchedFiles), {
      ignoreInitial: true,
      awaitWriteFinish: {
        stabilityThreshold: 500,
      },
    });
    watcher.on("all", () => {
      watcher.close();
      doCompilation();
    });

    // successful compile message
    if (!hadErr) {
      logSuccess("Compiled successfully!");
    }
  }

  doCompilation();

  const server = http.createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.end(JSON.stringify(compiledOutput));
  });

  server.listen(port);
  console.log(`Server is listening on port ${port}!`);
}
