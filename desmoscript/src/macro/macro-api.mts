import { ast } from "../ast/ast.mjs";
import { CompilationState, CompilationUnit } from "../compiler-state.mjs";

export type MacroAPI = {
  state: CompilationState<"withscope" | "macrosub">;
  unit: CompilationUnit<"withscope" | "macrosub">;
};

export function generateMacroAPI(
  state: CompilationState<"withscope" | "macrosub">,
  unit: CompilationUnit<"withscope" | "macrosub">,
  call: ast.MacroCall
) {
  return { state, unit };
}
