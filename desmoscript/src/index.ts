import { CompilationUnit, Scope } from "./ast/ast.js";

export let placeholder = 0;

export function getLinesAndCols(str: string): [number, number][] {
  const linesAndCols: [number, number][] = [];
  let line = 1;
  let col = 1;
  for (const char of str) {
    linesAndCols.push([line, col]);
    if (char == "\n") {
      line++;
      col = 1;
    } else {
      col++;
    }
  }
  return linesAndCols;
}

// const compileOutput = await compileDesmoscript("./index.desmo");

// console.log(
//   compileOutput.errors
//     .map((e) => {
//       return formatError(
//         {
//           entry: "./",
//           sourceCode: compileOutput.sourceCode,
//           maxWidth: 60,
//           format: (str, opts) => {
//             if (opts.type == "error") {
//               return str
//                 .split("\n")
//                 .map((substr) => `\x1b[1;31m${substr}\x1b[0m`)
//                 .join("\n");
//             }
//             if (opts.type == "gutter") {
//               return `\x1b[38;5;236m${str}\x1b[0m`;
//             }
//             if (opts.type == "deemphasize") {
//               return `\x1b[38;5;236m${str}\x1b[0m`;
//             }
//             if (opts.type == "message") {
//               return `\x1b[38;5;220m${str}\x1b[0m`;
//             }
//             return str;
//           },
//         },
//         e
//       );
//     })
//     .join(`\n\x1b[38;5;195m${"".padStart(80, "_")}\x1b[0m\n\n`)
// );

// if (compileOutput.type == "success") {
//   console.log("Success!");
//   fs.writeFile("out.json", JSON.stringify(compileOutput.state));
// } else {
//   console.log("Failure!");
// }

export { lex } from "./parse/lex.js";
export { parse } from "./parse/parse.js";
export { typecheckScopeTree } from "./scope-tree/typecheck/typecheck.js";
export { compileDesmoscript } from "./combined-functionality/full-compiler.js";
export { compileDesmoscriptForLanguageSupport } from "./combined-functionality/language-support-compiler.js";
export { enableDebug } from "./debug/debug.js";
export { formatError } from "./scope-tree/typecheck/type-errors.js";
export { IOInterface } from "./io/io.js";

export type DesmoCallback = (ctx: { scope: Scope }) => void;
export declare function desmo(callback: DesmoCallback): void;
