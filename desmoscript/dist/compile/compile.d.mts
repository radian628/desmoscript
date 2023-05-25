import { ast } from "../ast/ast.mjs";
import { CompileExpressionContext } from "./compile-expression.mjs";
import { ExpressionState, GraphState } from "../graphstate.mjs";
import { CompilationState, scopeTree } from "../compiler-state.mjs";
export declare function compileAssignment(assignment: ast.Assignment<"macrosubsync">, ctx: CompileExpressionContext): ExpressionState;
export declare function compileFunctionDefinition(fndef: ast.FunctionDefinition<"macrosubsync">, ctx: CompileExpressionContext): ExpressionState;
export declare function unwrap<T>(value: T | undefined): T;
export declare function compileScope(scope: scopeTree.Scope, ctx: CompileExpressionContext, state: GraphState): void;
export declare function compileDesmoscriptState(state: CompilationState<"macrosubsync">): GraphState;
