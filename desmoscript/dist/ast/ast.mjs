import { err, ierr } from "../error-handling.mjs";
// assert that a node is an expression
export function parseExpr(node, notInternal) {
    switch (node.type) {
        case "number":
        case "binop":
        case "unop":
        case "ident":
        case "fncall":
        case "macrocall":
        case "block":
        case "listcomp":
        case "point":
        case "steprange":
        case "list":
        case "sumprodint":
        case "derivative":
        case "case":
        case "actions":
        case "memberaccess":
            return node;
    }
    if (notInternal)
        err(node, "Expected an expression.");
    ierr(node, "Expected an expression.");
}
// assert that a node is DJSON
export function parseDJson(node) {
    switch (node.type) {
        case "dnumber":
        case "dstring":
        case "dnull":
        case "dboolean":
        case "dobject":
        case "darray":
        case "ddesmoscript":
            return node;
    }
    ierr(node, "Expected DJSON.");
}
// assert that a node is a statement
export function parseStatement(node) {
    switch (node.type) {
        case "assignment":
        case "namespace":
        case "namedjson":
        case "fndef":
        case "import":
        case "note":
        case "root":
            return node;
    }
    ierr(node, "Expected a statement.");
}
// assert that a node is of a given type
export function parseNodeType(node, type) {
    if (node.type == type) {
        return node;
    }
    ierr(node, `Expected a '${type}' node`);
}
// assert that a node is an identifier
export function parseIdent(node) {
    return parseNodeType(node, "ident");
}
