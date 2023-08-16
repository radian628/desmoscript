import {
  ASTNode,
  CompilationUnit,
  MacroCallNode,
  Scope,
  Scoped,
} from "./ast/ast.js";
import { MacroAPI } from "./macro/macro-api.js";

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
export { lex } from "./parse/lex.js";
export { parse } from "./parse/parse.js";
export { typecheckScopeTree } from "./scope-tree/typecheck/typecheck.js";
export {
  compileDesmoscript,
  lexAndParse,
} from "./combined-functionality/full-compiler.js";
export { compileDesmoscriptForLanguageSupport } from "./combined-functionality/language-support-compiler.js";
export { enableDebug } from "./debug/debug.js";
export { formatError } from "./scope-tree/typecheck/type-errors.js";
export { formatAST, format } from "./ast/fmt.js";
export { IOInterface } from "./io/io.js";
export { setupRPCCaller, setupRPCCallee } from "./rpc/rpc.js";

export type DesmoCallback = (ctx: {
  scope: Scope;
  addMacro: (opts: {
    name: string;
    fn: (node: Scoped<MacroCallNode>, a: MacroAPI) => Promise<Scoped<ASTNode>>;
  }) => void;
}) => void;
export declare function desmo(callback: DesmoCallback): void;
