import { errFull } from "../error-handling.mjs";
import { tuple } from "../util.mjs";
// no-op function for AST mapping lookup table
export const noOpLutFn = (a, b) => tuple(a, b);
export const astTypeNamesArray = [
    "number",
    "binop",
    "unop",
    "ident",
    "fncall",
    "macrocall",
    "block",
    "listcomp",
    "point",
    "steprange",
    "list",
    "sumprodint",
    "derivative",
    "case",
    "actions",
    "memberaccess",
    "dnumber",
    "dstring",
    "dboolean",
    "dnull",
    "darray",
    "dobject",
    "ddesmoscript",
    "assignment",
    "namespace",
    "namedjson",
    "fndef",
    "import",
    "note",
    "root",
];
export const astTypeNames = new Set(astTypeNamesArray);
// create a lookup table that represents a no-op.
export function makeFixedOpLUT(includedASTTypeNames, op) {
    const lut = Object.fromEntries(includedASTTypeNames.map((n) => {
        return [n, op];
    }));
    //@ts-ignore
    return lut;
}
// assert that a piece of data is an AST node
function parseNode(node) {
    if (node._isnode) {
        return node;
    }
    throw errFull(0, 0, "", "INTERNAL ERROR: Expected a node.");
}
// helper function for pre-order AST mapping
function mapASTPreOrderHelper(ast, lut, ctx) {
    if (ast instanceof Map)
        return ast;
    if (typeof ast == "object") {
        if (ast._isnode) {
            const node = parseNode(ast);
            //@ts-ignore
            const [newNode, newctx] = lut[node.type](node, ctx);
            for (const [k, v] of Object.entries(newNode)) {
                if (k == "enclosingScope" || k == "innerScope")
                    continue;
                //@ts-ignore
                newNode[k] = mapASTPreOrderHelper(v, lut, newctx);
            }
            return Object.assign(node, newNode);
        }
        if (ast instanceof Promise) {
            return ast;
        }
        if (Array.isArray(ast)) {
            return ast.map((elem) => mapASTPreOrderHelper(elem, lut, ctx));
        }
        return Object.fromEntries(Object.entries(ast).map(([k, v]) => [
            k,
            mapASTPreOrderHelper(v, lut, ctx),
        ]));
    }
    return ast;
}
// map an AST in pre-order
export function mapASTPreOrder(ast, lut, ctx) {
    return mapASTPreOrderHelper(ast, lut, ctx);
}
// export type Promiseless<T> = Promise<
//   T extends Promise<infer R>
//     ? R
//     : T extends {}
//     ? {
//         [K in keyof T]: Promiseless<T[K]>;
//       }
//     : T extends (infer E)[]
//     ? Promiseless<E>[]
//     : T
// >;
export async function liftMacroPromisesHelper(ast) {
    if (ast instanceof Map)
        return ast;
    if (typeof ast == "object") {
        if (ast._isnode) {
            const node = parseNode(ast);
            if (node.type == "macrocall") {
                const newNode = { ...node, substitution: await node.substitution };
                return Object.assign(node, newNode);
            }
        }
        if (Array.isArray(ast)) {
            return Promise.all(ast.map((e) => liftMacroPromisesHelper(e)));
        }
        return Promise.all(Object.entries(ast).map(async ([k, v]) => {
            if (k == "enclosingScope" || k == "innerScope")
                return [k, v];
            return await [k, liftMacroPromisesHelper(v)];
        })).then((p) => Object.fromEntries(p));
    }
    return ast;
}
export async function liftMacroPromises(node) {
    return liftMacroPromisesHelper(node);
}
// export async function liftAllPromises<T>(t: T): Promiseless<T> {
//   if (Array.isArray(t)) {
//     let t2 = t.map((e) => liftAllPromises(e));
//     //@ts-ignore
//     return Promise.all(t2);
//   } else if (t instanceof Object) {
//     return Object.fromEntries(
//       Promise.all(
//         Object.entries(t).map(async ([k, v]) => {
//           return [k, await liftAllPromises(v)];
//         })
//       )
//     );
//   } else {
//     return t;
//   }
// }
