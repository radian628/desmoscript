"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forEachASTAsync = exports.forEachAST = exports.deduplicateErrors = exports.getErrors = exports.writeASTDebug = exports.asExpr = exports.newid = exports.errnode = void 0;
const compiler_errors_js_1 = require("../compiler-errors.js");
function errnode(reason, start, end) {
    return {
        type: "error",
        reason,
        start,
        end,
    };
}
exports.errnode = errnode;
let idCounter = 0;
function newid() {
    return ++idCounter;
}
exports.newid = newid;
function asExpr(node) {
    const t = node.type;
    if (t == "number" ||
        t == "point" ||
        t == "list" ||
        t == "block" ||
        t == "identifier" ||
        t == "fncall" ||
        t == "binop" ||
        t == "unop" ||
        t == "range" ||
        t == "listcomp" ||
        t == "match" ||
        t == "note" ||
        t == "macrocall") {
        return (0, compiler_errors_js_1.ok)(node);
    }
    return (0, compiler_errors_js_1.err)(undefined);
}
exports.asExpr = asExpr;
function writeASTDebug(n, indent) {
    if (!indent)
        indent = 0;
    if (typeof n == "string")
        return `"${n}"`;
    if (Array.isArray(n))
        return `[${n
            .map((e) => writeASTDebug(e, indent + 2))
            .join(" ")}]`;
    if (typeof n == "object" && typeof n.id == "number") {
        const node = n;
        //console.log(node, SOURCECODE.slice(node.start, node.end));
        switch (node.type) {
            case "number":
                return node.number.toString();
            case "note":
                return `"${node.content}"`;
            default:
                const strs = [""];
                for (const [k, v] of Object.entries(node)) {
                    if (k == "start")
                        continue;
                    if (k == "id")
                        continue;
                    if (k == "end")
                        continue;
                    if (k == "type")
                        continue;
                    strs.push(`${k}=${writeASTDebug(v, indent + 2)}`);
                }
                strs.push("");
                return `(${node.type} ${strs.join("\n" + "".padStart(indent, " "))})`;
        }
    }
    return n?.toString() ?? "undefined";
}
exports.writeASTDebug = writeASTDebug;
function getErrors(ast) {
    if (Array.isArray(ast))
        return ast.map((e) => getErrors(e)).flat();
    if (typeof ast == "object") {
        if (ast.type == "error") {
            return [ast];
        }
        else {
            return getErrors(Object.values(ast));
        }
    }
    return [];
}
exports.getErrors = getErrors;
function deduplicateErrors(errors) {
    const uniqueErrors = [];
    for (const e1 of errors) {
        let unique = true;
        for (const e2 of uniqueErrors) {
            if (e1.start == e2.start && e1.reason == e2.reason && e1.end == e2.end) {
                unique = false;
                break;
            }
        }
        if (unique) {
            uniqueErrors.push(e1);
        }
    }
    return uniqueErrors;
}
exports.deduplicateErrors = deduplicateErrors;
function forEachAST(node, ctx, mapper) {
    function map(n, myctx) {
        //@ts-ignore
        if (Array.isArray(n))
            return n.map((e) => map(e, myctx));
        //@ts-ignore
        if (n && typeof n == "object" && typeof n.id == "number") {
            const node = n;
            //@ts-ignore
            const innerctx = mapper(node, myctx);
            //@ts-ignore
            Object.entries(node).forEach(([k, v]) => [k, map(v, innerctx)]);
        }
    }
    map(node, ctx);
}
exports.forEachAST = forEachAST;
async function forEachASTAsync(node, ctx, mapper) {
    async function map(n, myctx) {
        //@ts-ignore
        if (Array.isArray(n))
            return await Promise.all(n.map((e) => map(e, myctx)));
        //@ts-ignore
        if (n && typeof n == "object" && typeof n.id == "number") {
            const node = n;
            //@ts-ignore
            const innerctx = await mapper(node, myctx);
            //@ts-ignore
            await Promise.all(Object.entries(node).map(([k, v]) => map(v, innerctx)));
        }
    }
    await map(node, ctx);
}
exports.forEachASTAsync = forEachASTAsync;
