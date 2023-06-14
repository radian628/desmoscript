import { ASTExpr, ASTNode, MacroCallNode, Scoped } from "../ast/ast.mjs";
import { CompilerError } from "../compiler-errors.js";
import { InstantiateMacroContext } from "./instantiate-macros.mjs";
export type MacroError = {
    reason: string | CompilerError[];
};
export declare function macroError(reason: string | CompilerError[]): {
    reason: string | CompilerError[];
};
export type MacroAPI = {
    parse: (src: string) => ASTNode;
    parseExpr: (src: string) => ASTExpr;
    fatalError: (reason: string) => never;
    recoverableError: (reason: string) => void;
    fmt: (node: ASTNode) => string;
};
export declare function getMacroAPI(errors: MacroError[], call: Scoped<MacroCallNode>, ctx: InstantiateMacroContext): MacroAPI;
