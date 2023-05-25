export function errstring(err) {
    return;
}
export function err(node, reason) {
    throw {
        line: node.line,
        col: node.col,
        file: node.file,
        reason,
    };
}
export function ierr(node, reason) {
    throw {
        line: node.line,
        col: node.col,
        file: node.file,
        reason: `INTERNAL ERROR (Should not happen in production!): ${reason}`,
    };
}
export function errFull(line, col, file, reason) {
    throw { line, col, file, reason };
}
