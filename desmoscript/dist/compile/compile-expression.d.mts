import { ast } from "../ast/ast.mjs";
import { CompilationState, CompilationUnit } from "../compiler-state.mjs";
export type CompileExpressionContext = {
    unit: CompilationUnit<"macrosubsync">;
    state: CompilationState<"macrosubsync">;
    compiledUnits: Set<string>;
};
export declare function identToPath(unit: CompilationUnit<"macrosubsync">, e: ast.Ident<"macrosubsync">): string;
export declare function compileExpression(e: ast.Expr<"macrosubsync">, ctx: CompileExpressionContext): string;
