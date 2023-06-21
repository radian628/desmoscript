"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compileDesmoscriptForLanguageSupport = exports.compileDesmoscript = exports.typecheckScopeTree = exports.parse = exports.lex = exports.getLinesAndCols = exports.placeholder = void 0;
exports.placeholder = 0;
function getLinesAndCols(str) {
    const linesAndCols = [];
    let line = 1;
    let col = 1;
    for (const char of str) {
        linesAndCols.push([line, col]);
        if (char == "\n") {
            line++;
            col = 1;
        }
        else {
            col++;
        }
    }
    return linesAndCols;
}
exports.getLinesAndCols = getLinesAndCols;
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
var lex_mjs_1 = require("./parse/lex.mjs");
Object.defineProperty(exports, "lex", { enumerable: true, get: function () { return lex_mjs_1.lex; } });
var parse_mjs_1 = require("./parse/parse.mjs");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_mjs_1.parse; } });
var typecheck_mjs_1 = require("./scope-tree/typecheck/typecheck.mjs");
Object.defineProperty(exports, "typecheckScopeTree", { enumerable: true, get: function () { return typecheck_mjs_1.typecheckScopeTree; } });
var full_compiler_mjs_1 = require("./combined-functionality/full-compiler.mjs");
Object.defineProperty(exports, "compileDesmoscript", { enumerable: true, get: function () { return full_compiler_mjs_1.compileDesmoscript; } });
var language_support_compiler_mjs_1 = require("./combined-functionality/language-support-compiler.mjs");
Object.defineProperty(exports, "compileDesmoscriptForLanguageSupport", { enumerable: true, get: function () { return language_support_compiler_mjs_1.compileDesmoscriptForLanguageSupport; } });
