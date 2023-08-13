import {
  Scoped,
  FunctionCallNode,
  ScopeContentBuiltinFunction,
} from "../../ast/ast.js";
import { printTypeSig } from "../../stdlib/stdlib.js";
import { indent, wrongTypeError } from "./type-errors.js";
import { DSType, TypecheckContext, typeAsStr } from "./typecheck.js";

export function isCompatible(src: DSType, dst: DSType[]) {
  for (const type of dst) {
    if (src.type == "list" && type.type == "list") {
      if (src.element.type == type.element.type) {
        return true;
      }
      continue;
    }
    if (src.type == type.type) return true;
  }
  return false;
}

export function typecheckBuiltinFn(
  call: Scoped<FunctionCallNode>,
  paramTypes: DSType[],
  def: ScopeContentBuiltinFunction,
  ctx: TypecheckContext
) {
  outer: for (const overload of def.typeSignature) {
    if (overload.type == "variadic") {
      if (
        paramTypes.length >= (overload.minArgs ?? 0) &&
        paramTypes.every((e) => isCompatible(e, overload.validTypes))
      ) {
        return overload.returns;
      }
    } else {
      if (
        paramTypes.length > overload.params.length ||
        paramTypes.length < (overload.requiredCount ?? overload.params.length)
      )
        continue;
      for (let i = 0; i < paramTypes.length; i++) {
        if (!isCompatible(paramTypes[i], overload.params[i])) continue outer;
      }
      return overload.returns;
    }
  }

  return wrongTypeError(
    call,
    ctx.unitName,
    "invalid function parameters; valid overloads are:\n" +
      indent(printTypeSig(def.typeSignature), 2) +
      "\n" +
      "parameters supplied were:\n" +
      paramTypes.map((e) => typeAsStr(e)).join("\n")
  );
}
