import { CodegenError } from "./codegen/codegen";
import { debugTrace } from "./debug/debug";
import { TypeError } from "./scope-tree/typecheck/type-errors";

export type CompilerError =
  | {
      type: "general";
      reason: string;
      start: number;
      end: number;
      internal?: boolean;
      unit: string;
    }
  | ScopeError
  | TypeError
  | CodegenError;

export type ScopeError = {
  type: "namespace-collision";
  unit: string;
  start: number;
  end: number;

  unitB: string;
  startB?: number;
  endB?: number;
  reason: string;
};

export function compilerError(
  reason: string,
  start: number,
  end: number,
  unit: string
): CompilerError {
  return { reason, start, end, type: "general", unit };
}

export type ResultOk<Ok, Err> = { success: true; data: Ok };
export type ResultErr<Ok, Err> = { success: false; data: Err };

export type Result<Ok, Err> = ResultOk<Ok, Err> | ResultErr<Ok, Err>;

export function ok<Ok, Err>(data: Ok): ResultOk<Ok, Err> {
  return { success: true, data };
}
export function err<Ok, Err>(data: Err): ResultErr<Ok, Err> {
  return { success: false, data };
}

export function internalError(reason: string) {
  return { reason, internal: true };
}

export function assertNotUndefined<T>(
  t: T | undefined,
  customErrorMessage?: string
): T {
  if (t == undefined) {
    debugTrace();
    throw internalError(customErrorMessage ?? "unexpected undefined");
  }
  return t;
}
