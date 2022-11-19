import { CharStreams, CommonTokenStream } from "antlr4ts";
import { DesmoscriptLexer } from "./grammar/DesmoscriptLexer";
import { DesmoscriptParser } from "./grammar/DesmoscriptParser";
import { DesmoscriptASTBuilder } from "./ast/parse.mjs";
import * as ds from "./ast/ast.mjs";
import * as fs from "fs/promises";
import * as chokidar from "chokidar";
import * as http from "node:http";
export { compileDesmoscript, createDesmoscriptWatchServer } from "./all-steps/combined-compiler.mjs"

export { getExprContext } from "./semantic-analysis/builtins.mjs";

process.on("unhandledRejection", (reason, p) => {
  //@ts-ignore
  console.log("Unhandled rejection: ", reason);
});
