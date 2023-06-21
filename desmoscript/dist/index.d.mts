export declare let placeholder: number;
export declare function getLinesAndCols(str: string): [number, number][];
export { lex } from "./parse/lex.mjs";
export { parse } from "./parse/parse.mjs";
export { typecheckScopeTree } from "./scope-tree/typecheck/typecheck.mjs";
export { compileDesmoscript } from "./combined-functionality/full-compiler.mjs";
export { compileDesmoscriptForLanguageSupport } from "./combined-functionality/language-support-compiler.mjs";
