// typescript mutable tuple constructor
export const tuple = (...args) => args;
export function literalSubtract(a, b) {
    //@ts-ignore
    return a.filter((e) => e.indexOf(b) == -1);
}
export function lastof(t) {
    return t[t.length - 1];
}
