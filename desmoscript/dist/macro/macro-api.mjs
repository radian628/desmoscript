"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMacroAPI = exports.macroError = void 0;
const ast_mjs_1 = require("../ast/ast.mjs");
const fmt_mjs_1 = require("../ast/fmt.mjs");
const index_js_1 = require("../index.js");
const lex_js_1 = require("../parse/lex.js");
const parse_js_1 = require("../parse/parse.js");
function macroError(reason) {
    return { reason };
}
exports.macroError = macroError;
function getMacroAPI(errors, call, ctx) {
    const parseStmt = (str) => {
        const macroSrcName = `_macro${(0, ast_mjs_1.newid)()}`;
        ctx.sourceCode.set(macroSrcName, {
            src: str,
            linesAndCols: (0, index_js_1.getLinesAndCols)(str),
        });
        const lexed = (0, lex_js_1.lex)(str, macroSrcName);
        if (!lexed.success)
            throw macroError(lexed.data);
        const ast = (0, parse_js_1.parse)(lexed.data, macroSrcName);
        return ast;
    };
    return {
        parse: parseStmt,
        parseExpr: (str) => {
            const block = parseStmt(str);
            if (block.type == "error")
                return block;
            if (block.type != "block" || block.body.length == 0)
                throw macroError("no expression found");
            if (block.body.length > 1)
                throw macroError("multiple expressions found; expected only one");
            const expr = (0, ast_mjs_1.asExpr)(block.body[block.body.length - 1]);
            if (!expr.success) {
                throw macroError("expected an expression, got a non-expression");
            }
            return expr.data;
        },
        fatalError(str) {
            errors.push(macroError(str));
            throw "";
        },
        recoverableError(str) {
            errors.push(macroError(str));
        },
        fmt(ast, ctx) {
            return (0, fmt_mjs_1.formatAST)(ast, ctx);
        },
    };
}
exports.getMacroAPI = getMacroAPI;
