import { CharStreams, CommonTokenStream } from "antlr4ts";
import { DesmoscriptLexer } from "./grammar/DesmoscriptLexer";
import { DesmoscriptParser } from "./grammar/DesmoscriptParser";
import { DesmoscriptASTBuilder } from "./parse.mjs";
import * as ds from "./ast.mjs";
import { DesmoscriptError, MacroDefinition } from "./semantic-analysis-types.mjs";
import { compileDesmoscriptScopeTree } from "./compile.mjs";
import * as fs from "fs/promises";
import { getDesmoscriptScopes, semanticallyAnalyzeDesmoscript } from "./semantic-analysis.mjs";
import { makeDefaultDesmoscriptContext } from "./builtins.mjs";
import * as chokidar from "chokidar";
import * as http from "node:http";

export { getExprContext } from "./builtins.mjs";

process.on("unhandledRejection", (reason, p) => {
    //@ts-ignore
    console.log("Unhandled rejection: ", reason);
});

export type CompileOptions = {
    logProgress?: boolean,
    additionalDefines?: Map<string, MacroDefinition>
}

// coloured logging functions
function logInfo(content: string) {
    console.log('\u001b[' + 90 + 'm' + content + '\u001b[0m');
}

function logError(content: string) {
    console.log('\u001b[' + 31 + 'm' + content + '\u001b[0m');
}

function logSuccess(content: string) {
    console.log('\u001b[' + 32 + 'm' + content + '\u001b[0m')
}

export async function compileDesmoscriptToString(infile: string, options?: CompileOptions, files?: string[]): Promise<string> {

    const input = (await fs.readFile(infile)).toString();
    try {
        if (options?.logProgress) logInfo("Parsing...");
        const analyzedAST = (await getDesmoscriptScopes(infile, options?.additionalDefines));

        if (files) {
            files?.push(...analyzedAST.files);
        }
    
        if (options?.logProgress) logInfo("Compiling...");
        const compiledAST = compileDesmoscriptScopeTree(analyzedAST);
    
        if (options?.logProgress) logInfo("Writing...");
        if (options?.logProgress) logInfo("Done!");
        return JSON.stringify(compiledAST);
    } catch (err) {
        const dserr: DesmoscriptError = err as DesmoscriptError;
        if (!dserr.expr) logError(`err: ${JSON.stringify(dserr)} ${(err as Error).stack}`);
        logError(`${dserr.expr.file} line ${dserr.expr.line}; col ${dserr.expr.col}; ${dserr.reason}`);
        return "";
    }
}

export async function compileDesmoscriptFromFile(infile: string, outfile: string, options?: CompileOptions) {

    const outstring = compileDesmoscriptToString(infile, options);
    fs.writeFile(outfile, await outstring);
}

export async function runCompilerWebServer(infile: string, serverOptions?: CompileOptions & {
    watch?: boolean,
    port?: number
}) {
    let options = serverOptions ?? {
        watch: false,
        port: 8080
    };

    options.watch ??= false;
    options.port ??= 8080;

    let files: string[] = [];

    let watcher: chokidar.FSWatcher | undefined;
    let output: string | undefined;
    async function compile() {
        let oldcwd = process.cwd();
        const str = await compileDesmoscriptToString(infile, options, files);
        files = Array.from(new Set<string>(files));
        process.chdir(oldcwd);
        if (watcher) {
            await watcher.close();
        }
        if (options.watch) {
            logInfo(`Watching the following files: ${files.join("\n")}`);
            watcher = chokidar.watch(files);
            watcher.on("change", compile);
            watcher.on("unlink", compile);
        }
        output = str;
        if (output) logSuccess("Compiled.");
    }

    await compile();

    const server = http.createServer((req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.end(output);
    });
    server.listen(options.port);
    console.log(`Desmoscript server listening on port ${options.port}.`);
}