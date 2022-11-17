import { CharStreams, CommonTokenStream } from "antlr4ts";
import { DesmoscriptLexer } from "./grammar/DesmoscriptLexer";
import { DesmoscriptParser } from "./grammar/DesmoscriptParser";
import { DesmoscriptASTBuilder } from "./ast/parse.mjs";
import * as ds from "./ast/ast.mjs";
import * as fs from "fs/promises";
import * as chokidar from "chokidar";
import * as http from "node:http";

export { getExprContext } from "./semantic-analysis/builtins.mjs";

process.on("unhandledRejection", (reason, p) => {
    //@ts-ignore
    console.log("Unhandled rejection: ", reason);
});

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
