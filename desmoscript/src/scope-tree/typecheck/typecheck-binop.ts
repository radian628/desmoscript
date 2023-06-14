// handle typechecking for elementwise operations

import { BinaryOpNode, Scoped } from "../../ast/ast.js";
import { errorType, wrongTypeError } from "./type-errors.js";
import {
  DSPrimitiveType,
  DSType,
  TypecheckContext,
  typecheckExpr,
  typeAsStr,
  ErrorType,
} from "./typecheck.js";

// where if any argument is a list, the entire output is a list
function typecheckElementwise(
  a: DSType,
  b: DSType,
  handler: (a: DSType, b: DSType) => DSPrimitiveType | undefined
): DSType | undefined {
  const primitiveTest = handler(a, b);

  if (primitiveTest) return primitiveTest;

  let result: DSPrimitiveType | undefined = undefined;

  if (a.type == "list") {
    if (b.type == "list") {
      result = handler(a.element, b.element);
    } else {
      result = handler(a.element, b);
    }
  } else if (b.type == "list") {
    result = handler(a, b.element);
  }

  if (result)
    return {
      type: "list",
      element: result,
    };

  return undefined;
}

export function typecheckBinopAddSub(a: DSType, b: DSType): DSType | undefined {
  return typecheckElementwise(a, b, (a, b) => {
    if (a.type == "number" && b.type == "number") return { type: "number" };
    if (a.type == "point" && b.type == "point") return { type: "point" };
  });
}

export function typecheckBinopMulDiv(a: DSType, b: DSType): DSType | undefined {
  return typecheckElementwise(a, b, (a, b) => {
    if (a.type == "number" && b.type == "number") return { type: "number" };
    if (a.type == "point" && b.type == "point") return { type: "point" };
    if (a.type == "number" && b.type == "point") return { type: "point" };
    if (a.type == "point" && b.type == "number") return { type: "point" };
  });
}

export function typecheckBinopExp(a: DSType, b: DSType): DSType | undefined {
  return typecheckElementwise(a, b, (a, b) => {
    if (a.type == "number" && b.type == "number") return { type: "number" };
  });
}

export function typecheckCompare(a: DSType, b: DSType): DSType | undefined {
  return typecheckElementwise(a, b, (a, b) => {
    if (a.type == "number" && b.type == "number") return { type: "boolean" };
  });
}

export function typecheckLogicOperator(
  a: DSType,
  b: DSType
): DSType | undefined {
  return typecheckElementwise(a, b, (a, b) => {
    if (
      (a.type == "number" || a.type == "boolean") &&
      (b.type == "number" || b.type == "boolean")
    )
      return { type: "boolean" };
  });
}

export function typecheckListSubscript(
  a: DSType,
  b: DSType
): DSType | undefined {
  if (a.type != "list") return;

  if (b.type == "number") return a.element;
  if (b.type == "list") {
    if (b.element.type == "number" || b.element.type == "boolean") return a;
  }
}

export function consolidateTypeErrors(input: DSType[]): ErrorType | undefined {
  console.log("consolidate typeerror input", input);
  const errors: ErrorType[] = input.filter(
    (e) => e.type == "error"
  ) as ErrorType[];
  const err: ErrorType = {
    type: "error",
    why: errors.map((e) => e.why).flat(),
  };
  if (errors.length == 0) return undefined;
  return err;
}

export function typecheckBinop(
  expr: Scoped<BinaryOpNode>,
  ctx: TypecheckContext
): DSType {
  let lhs = typecheckExpr(expr.lhs, ctx);
  let rhs = typecheckExpr(expr.rhs, ctx);

  const err = consolidateTypeErrors([lhs, rhs]);
  if (err) return err;

  let result: DSType | undefined;

  switch (expr.op) {
    case "+":
    case "-":
      result = typecheckBinopAddSub(lhs, rhs);
      break;
    case "*":
    case "/":
      result = typecheckBinopMulDiv(lhs, rhs);
      break;
    case "^":
    case "%":
      result = typecheckBinopExp(lhs, rhs);
      break;

    case "<":
    case "<=":
    case "==":
    case ">=":
    case ">":
      result = typecheckCompare(lhs, rhs);
      break;

    case "&&":
    case "||":
      result = typecheckLogicOperator(lhs, rhs);
      break;

    case "[":
      result = typecheckListSubscript(lhs, rhs);
      break;

    case "->":
      result = { type: "action" };
      break;
  }

  if (!result)
    return wrongTypeError(
      expr,
      ctx.unitName,
      `cannot use operator '${expr.op}' on types '${typeAsStr(
        lhs
      )}' and '${typeAsStr(rhs)}'`
    );

  return result;
}
