import {
  MacroCallNode,
  MatchNode,
  RangeNode,
  Scope,
  UnaryOpNode,
  getErrors,
} from "../../ast/ast.js";
import {
  ASTExpr,
  ASTNode,
  AssignmentNode,
  BinaryOpNode,
  BlockNode,
  CompilationUnit,
  FunctionCallNode,
  FunctionDefNode,
  IdentifierNode,
  InnerScoped,
  ListNode,
  ListcompNode,
  PointNode,
  ScopeContent,
  ScopeContentVariable,
  Scoped,
  asExpr,
} from "../../ast/ast.js";
import { formatAST } from "../../ast/fmt.js";
import { assertNotUndefined, internalError } from "../../compiler-errors.js";
import { findIdentifierScopeItem } from "../create-scope-tree.js";
import {
  formatCircularDependencyError,
  notFoundError,
  wrongTypeError,
  TypeError,
  assertNoError,
  formatScopeItemTypeName,
  badMacroError,
} from "./type-errors.js";
import { consolidateTypeErrors } from "./typecheck-binop.js";
import { typecheckBinop } from "./typecheck-binop.js";
import { typecheckBuiltinFn } from "./typecheck-builtin-fn.js";

export type DSPrimitiveType =
  | {
      type:
        | "number"
        | "color"
        | "polygon"
        | "point"
        | "action"
        | "boolean"
        | "distribution";
    }
  | ErrorType;

export type ErrorType = {
  type: "error";
  why: TypeError[];
};

export type DSType =
  | DSPrimitiveType
  | { type: "list"; element: DSPrimitiveType };

export function typeAsStr(type: DSType): string {
  if (type.type == "list") return `${typeAsStr(type.element)}[]`;
  return type.type;
}

export type TypecheckContext = {
  unitName: string;

  // associates compilatin units with their qualified paths
  units: Map<string, CompilationUnit>;

  // ast node lookup table
  astNodes: Map<number, Scoped<ASTNode>>;

  // lists dependent function calls, variables, etc
  // used to prevent circular dependencies
  dependencyChain: Map<
    number,
    {
      content: ScopeContent;
      node: Scoped<ASTNode>;
      nodeUnit: string;
    }
  >;

  // lists types of known scope contents (mainly for builtins)
  knownTypes: Map<number, DSType>;

  // scope content IDs of variables with known circular dependencies
  knownCircularDependencies: Set<number>;
};

export function getASTNode<T extends ASTNode, U extends T["type"]>(
  ctx: { astNodes: Map<number, Scoped<ASTNode>> },
  id: number,
  requiredType: U
): Scoped<T> {
  const node = ctx.astNodes.get(id);
  if (!node) throw internalError("ast node map lookup failed");
  if (node.type != requiredType)
    throw internalError(
      `ast node map lookup failed: expected a node of type '${requiredType}' but got a '${node.type}' node`
    );
  //@ts-ignore
  return node;
}

export function getASTExpr(
  ctx: { astNodes: Map<number, Scoped<ASTNode>> },
  id: number
): Scoped<ASTExpr> {
  const node = ctx.astNodes.get(id);
  if (!node) throw internalError("ast node map lookup failed");
  const asexpr = asExpr(node);
  if (!asexpr.success)
    throw internalError(
      "ast node map lookup failed: expected an expression but got a non-expression"
    );
  return asexpr.data as Scoped<ASTExpr>;
}

export function typecheckPoint(
  expr: Scoped<PointNode>,
  ctx: TypecheckContext
): DSType {
  const x = typecheckExpr(expr.x, ctx);
  const y = typecheckExpr(expr.y, ctx);

  const err = consolidateTypeErrors([x, y]);
  if (err) return err;

  if (x.type != "number")
    return wrongTypeError(expr.x, ctx.unitName, "expected a number");
  if (y.type != "number")
    return wrongTypeError(expr.y, ctx.unitName, "expected a number");

  return { type: "point" };
}

export function addVarsToCtx(
  ctx: TypecheckContext,
  vars: Map<number, DSType>
): TypecheckContext {
  const newVars = new Map(ctx.knownTypes);
  for (const [k, v] of vars.entries()) {
    newVars.set(k, v);
  }
  return { ...ctx, knownTypes: newVars };
}

export function typecheckListcomp(
  expr: Scoped<ListcompNode>,
  ctx: TypecheckContext
): DSType {
  const vars = new Map<number, DSType>();

  const paramTypes = expr.params.map(
    (p) => [p[0], typecheckExpr(p[1], ctx), p[1]] as const
  );
  const err = consolidateTypeErrors([...paramTypes.map((t) => t[1])]);
  if (err) return err;

  for (const [pname, ptype, p] of paramTypes) {
    if (ptype.type != "list")
      return wrongTypeError(
        p,
        ctx.unitName,
        `list comprehension parameters must be lists, but '${pname}', an expression of type '${typeAsStr(
          ptype
        )}', was received instead`
      );

    // add scope content to the list of known variable types
    // to parse inner expression
    const varScopeContent = expr.innerScope.elements.get(
      pname
    ) as ScopeContentVariable;
    vars.set(varScopeContent.id, ptype.element);
  }

  const body = typecheckExpr(expr.body, addVarsToCtx(ctx, vars));

  const err2 = consolidateTypeErrors([body]);
  if (err2) return err2;

  if (body.type == "list")
    return wrongTypeError(
      expr.body,
      ctx.unitName,
      "list comprehension body cannot be a list, as desmos does not support nested lists"
    );

  return { type: "list", element: body };
}

export function typecheckIdentifier(
  expr: Scoped<IdentifierNode>,
  ctx: TypecheckContext
): DSType {
  const enclosingScope = expr.enclosingScope;

  const identifierScopeItem = findIdentifierScopeItem(
    ctx.units.get(ctx.unitName) as CompilationUnit,
    enclosingScope,
    expr.segments,
    { compilationUnits: ctx.units }
  );

  // point member accesses always return numbers
  if (identifierScopeItem.result == "point-member-access") {
    return { type: "number" };

    // it's an error if an identifier is not found
  } else if (identifierScopeItem.result == "not-found") {
    return notFoundError(
      expr,
      ctx.unitName,
      `identifier '${expr.segments.join(".")}' does not exist`
    );
  }

  if (ctx.knownCircularDependencies.has(identifierScopeItem.identifier.id)) {
    return { type: "error", why: [] };
  }

  // did we find a custom defined variable?
  if (identifierScopeItem.identifier.type == "variable") {
    // check to see if there's a circular dependency
    if (ctx.dependencyChain.has(identifierScopeItem.identifier.id)) {
      return formatCircularDependencyError(
        expr,
        ctx.units,
        ctx.dependencyChain,
        identifierScopeItem.identifier,
        ctx.knownCircularDependencies
      );
    }

    // get the variable assignment that created this variable
    const identifierBodyExpr = getASTNode<AssignmentNode, "assignment">(
      ctx,
      identifierScopeItem.identifier.node,
      "assignment"
    );

    // add the new variable to a copy of the dependency chain
    // this is to prevent circular dependencies down the line
    const dependencyChain = new Map(ctx.dependencyChain);
    dependencyChain.set(identifierScopeItem.identifier.id, {
      content: identifierScopeItem.identifier,
      node: expr,
      nodeUnit: ctx.unitName,
    });

    // typecheck the assignment rhs and treat that as the type
    const identifierType = typecheckExpr(identifierBodyExpr.rhs, {
      ...ctx,
      dependencyChain,
    });

    return identifierType;

    // did we find a built-in variable?
  } else if (identifierScopeItem.identifier.type == "builtin-variable") {
    // builtin variables' types are provided by other expressions
    // (e.g. function calls or list comprehensions)
    // so knownTypes must contain them
    if (identifierScopeItem.identifier.typeSignature)
      return identifierScopeItem.identifier.typeSignature;

    const type = ctx.knownTypes.get(identifierScopeItem.identifier.id);

    if (!type)
      throw internalError(
        `builtin variables should have their types provided! builtin variable was ${expr.segments.join(
          "."
        )}`
      );
    return type;
  } else {
    return wrongTypeError(
      expr,
      ctx.unitName,
      `expected an identifier representing a variable but found a/an ${formatScopeItemTypeName(
        identifierScopeItem.identifier.type
      )} instead`
    );
  }
}

export function typecheckList(
  expr: Scoped<ListNode>,
  ctx: TypecheckContext
): DSType {
  if (expr.elements.length == 0) {
    if (!expr.typeAnnotation)
      throw internalError(
        "Expected a type annotation, as this is an empty list! This should be caught during parsing!"
      );
    return { type: expr.typeAnnotation };
  }

  const elemTypes = expr.elements.map((e) => typecheckExpr(e, ctx));
  const err = consolidateTypeErrors(elemTypes);
  if (err) return err;

  let elemType: DSType = elemTypes[0];

  if (elemType.type == "list") {
    return wrongTypeError(
      expr.elements[0],
      ctx.unitName,
      "desmoscript does not support lists of lists"
    );
  }

  for (const elem of expr.elements.slice(1)) {
    const thisElemType = typecheckExpr(elem, ctx);
    if (thisElemType.type != elemType.type)
      return wrongTypeError(
        elem,
        ctx.unitName,
        `based on its first element, this is a list of ${
          elemType.type
        }s, but this element is of type '${typeAsStr(thisElemType)}'`
      );
  }

  return { type: "list", element: elemType };
}

export function getInnerDefinedVariable(
  expr: Scoped<FunctionDefNode | BlockNode | ListcompNode>,
  name: string
) {
  const innerScope = expr.innerScope;

  const content = innerScope.elements.get(name);

  if (!content)
    throw internalError(`expected '${name}' to be defined in this inner scope`);

  if (content.type != "builtin-variable")
    throw internalError(`expected '${name}' to be a builtin variable`);

  return content;
}

export function typecheckFnCall(
  expr: Scoped<FunctionCallNode>,
  ctx: TypecheckContext
): DSType {
  // find fndef
  const fndefFindResult = findIdentifierScopeItem(
    ctx.units.get(ctx.unitName) as CompilationUnit,
    expr.enclosingScope,
    expr.name.segments,
    { compilationUnits: ctx.units }
  );

  // if not found, throw an error
  if (fndefFindResult.result != "found") {
    return notFoundError(
      expr.name,
      ctx.unitName,
      `could not find a function with the name '${expr.name.segments.join(
        "."
      )}'`
    );
  }

  const fndefScopeContent = fndefFindResult.identifier;

  const paramTypes: DSType[] = [];

  // no need to consolidate errors because this will be resolved downstream
  for (const p of expr.params) {
    paramTypes.push(typecheckExpr(p, ctx));
  }

  // if function is user-defined (not builtin)
  if (fndefScopeContent.type == "function") {
    if (ctx.dependencyChain.has(fndefScopeContent.id)) {
      return formatCircularDependencyError(
        expr,
        ctx.units,
        ctx.dependencyChain,
        fndefScopeContent,
        ctx.knownCircularDependencies
      );
    }

    const fndefStmt = getASTNode<FunctionDefNode, "fndef">(
      ctx,
      fndefScopeContent.node,
      "fndef"
    );

    const params = fndefStmt.params;

    // validate number of parameters is correct
    if (params.length != expr.params.length) {
      return wrongTypeError(
        expr,
        ctx.unitName,
        `wrong number of parameters: function '${expr.name.segments.join(
          "."
        )}' takes ${params.length} parameters, but it was given ${
          expr.params.length
        } parameters here`
      );
    }

    // set types of parameters
    const knownTypes = new Map<number, DSType>();
    for (let i = 0; i < params.length; i++) {
      const paramID = getInnerDefinedVariable(fndefStmt, params[i]).id;
      knownTypes.set(paramID, paramTypes[i]);
    }

    const dependencyChain = new Map(ctx.dependencyChain);
    dependencyChain.set(fndefScopeContent.id, {
      content: fndefScopeContent,
      node: fndefStmt,
      nodeUnit: ctx.unitName,
    });

    const result = typecheckExpr(
      fndefStmt.body,
      addVarsToCtx({ ...ctx, dependencyChain }, knownTypes)
    );

    if (result.type == "error") {
      return {
        type: "error",
        why: [
          {
            type: "bad-fncall",
            reason: `cannot call '${expr.name.segments.join(
              "."
            )}' due to bad parameters because:`,
            start: expr.start,
            end: expr.end,
            why: result.why,
            unit: ctx.unitName,
          },
        ],
      };
    }

    return result;
    // if function is not user-defined (builtin)
  } else if (fndefScopeContent.type == "builtin-function") {
    return typecheckBuiltinFn(expr, paramTypes, fndefScopeContent, ctx);
  } else {
    return wrongTypeError(
      expr.name,
      ctx.unitName,
      `expected this name to refer to a function; got a/an ${formatScopeItemTypeName(
        fndefScopeContent.type
      )} instead`
    );
  }
}

export function typecheckBlock(expr: Scoped<BlockNode>, ctx: TypecheckContext) {
  const lastNode = expr.body[expr.body.length - 1];
  if (!lastNode)
    return wrongTypeError(
      expr,
      ctx.unitName,
      "a block must contain at least one expression for it to be a valid expression (i.e. something that resolves to a value)"
    );

  const maybeLastExpr = asExpr(lastNode);
  if (!maybeLastExpr.success)
    return wrongTypeError(
      lastNode,
      ctx.unitName,
      "this statement is the last one within a block expression and therefore must also be an expression (something that resolves to a value)"
    );

  const lastExpr = maybeLastExpr.data as Scoped<ASTExpr>;

  return typecheckExpr(lastExpr, ctx);
}

export function typecheckMatch(expr: Scoped<MatchNode>, ctx: TypecheckContext) {
  const branchTypes = expr.branches.map(
    (b) =>
      [b[0], b[1], typecheckExpr(b[0], ctx), typecheckExpr(b[1], ctx)] as const
  );
  const fallbackType = expr.fallback
    ? typecheckExpr(expr.fallback as Scoped<ASTExpr>, ctx)
    : undefined;

  const type = branchTypes[0]?.[3] ?? fallbackType ?? { type: "number" };

  const errs: ErrorType[] = [];

  const testBranch = (branch: Scoped<ASTExpr>, branchType: DSType) => {
    if (branchType.type != type.type)
      errs.push(
        wrongTypeError(
          branch,
          ctx.unitName,
          `all match branches must resolve to the same type; expected a ${typeAsStr(
            type
          )} based on the first branch but got a ${typeAsStr(branchType)}`
        )
      );
  };

  for (const [condExpr, branchExpr, condType, branchType] of branchTypes) {
    if (condType.type != "boolean") {
      errs.push(
        wrongTypeError(
          condExpr,
          ctx.unitName,
          `expected a boolean, got a ${typeAsStr(condType)}`
        )
      );
    }

    testBranch(branchExpr, branchType);
  }

  if (expr.fallback && fallbackType)
    testBranch(expr.fallback as Scoped<ASTExpr>, fallbackType);

  const err = consolidateTypeErrors(
    [branchTypes.map((b) => [b[2], b[3]]), fallbackType ?? []].flat(2)
  );
  if (err) return err;

  return type;
}

export function typecheckRange(
  expr: Scoped<RangeNode>,
  ctx: TypecheckContext
): DSType {
  const lhsType = typecheckExpr(expr.lhs, ctx);
  const rhsType = typecheckExpr(expr.rhs, ctx);
  const stepType = expr.step ? typecheckExpr(expr.step, ctx) : undefined;

  const err = consolidateTypeErrors(
    [lhsType, rhsType].concat(stepType ? [stepType] : [])
  );
  if (err) return err;

  for (const [e, t] of [
    [expr.lhs, lhsType],
    [expr.rhs, rhsType],
  ].concat(stepType && expr.step ? [[expr.step, stepType]] : []) as [
    Scoped<ASTNode>,
    DSType
  ][]) {
    if (t.type == "number") continue;
    return wrongTypeError(
      e,
      ctx.unitName,
      `range arguments must be numbers but a ${typeAsStr(
        t
      )} was received instead`
    );
  }
  return { type: "list", element: { type: "number" } };
}

export function typecheckUnop(
  expr: Scoped<UnaryOpNode>,
  ctx: TypecheckContext
): DSType {
  const operandType = typecheckExpr(expr.operand, ctx);

  if (operandType.type == "error") return operandType;

  switch (expr.op) {
    case "!":
      if (operandType.type != "boolean")
        return wrongTypeError(
          expr.operand,
          ctx.unitName,
          `expected a boolean; got a ${typeAsStr(operandType)}`
        );

      return { type: "boolean" };
    case "-":
      if (
        ["number", "point"].indexOf(
          operandType.type == "list"
            ? operandType.element.type
            : operandType.type
        ) == -1
      ) {
        return wrongTypeError(
          expr.operand,
          ctx.unitName,
          `cannot negate a ${typeAsStr(operandType)}`
        );
      }

      return operandType;
    case ".x":
    case ".y":
      if (operandType.type != "point")
        return wrongTypeError(
          expr.operand,
          ctx.unitName,
          `cannot access the ${expr.op[1]} component of a ${typeAsStr(
            operandType
          )} or anything else that isn't a point`
        );

      return { type: "number" };
  }
}

export function typecheckMacrocall(
  expr: Scoped<MacroCallNode>,
  ctx: TypecheckContext
) {
  const result = expr.result;
  if (!result) return wrongTypeError(expr, ctx.unitName, `unresolved macro!`);
  if (result instanceof Promise)
    return wrongTypeError(expr, ctx.unitName, `unawaited macro!`);

  const resultErrors = getErrors(result);

  if (resultErrors.length > 0) {
    return badMacroError(
      expr,
      resultErrors,
      ctx.unitName,
      "error in macro body"
    );
  }

  const maybeResultExpr = asExpr(result);
  if (maybeResultExpr.success) {
    return typecheckExpr(maybeResultExpr.data as Scoped<ASTExpr>, ctx);
  }

  return wrongTypeError(
    expr,
    ctx.unitName,
    `expected this macro to resolve to an expression, but received '${formatAST(
      result,
      { indent: 2, tabSize: 2, maxlen: 80, bindingPower: 0 }
    )}' instead`
  );
}

export function typecheckExpr(
  expr: Scoped<ASTExpr>,
  ctx: TypecheckContext
): DSType {
  switch (expr.type) {
    case "binop":
      return typecheckBinop(expr, ctx);
    case "block":
      return typecheckBlock(expr, ctx);
    case "error":
      return {
        type: "error",
        why: [
          {
            type: "wrong-type",
            start: expr.start,
            end: expr.end,
            unit: expr.unitName,
            reason: expr.reason,
          },
        ],
      };
    case "fncall":
      return typecheckFnCall(expr, ctx);
    case "identifier":
      return typecheckIdentifier(expr, ctx);
    case "list":
      return typecheckList(expr, ctx);
    case "listcomp":
      return typecheckListcomp(expr, ctx);
    case "macrocall":
      return typecheckMacrocall(expr, ctx);
    case "match":
      return typecheckMatch(expr, ctx);
    case "note":
      return wrongTypeError(
        expr,
        ctx.unitName,
        "a note cannot be used in this context"
      );
    case "number":
      return { type: "number" };
    case "range":
      return typecheckRange(expr, ctx);
    case "unop":
      return typecheckUnop(expr, ctx);
    case "point":
      return typecheckPoint(expr, ctx);
  }
}

export function typecheckScopeTree(
  scope: Scope,
  ctx: TypecheckContext,
  types?: DSType[]
) {
  if (!types) types = [];
  for (const [itemName, item] of scope.elements) {
    switch (item.type) {
      case "function":
        // types.push(
        //   typecheckExpr(
        //     getASTNode<FunctionDefNode, "fndef">(ctx, item.node, "fndef").body,
        //     ctx
        //   )
        // );
        break;
      case "variable":
        const node = getASTNode<AssignmentNode, "assignment">(
          ctx,
          item.node,
          "assignment"
        );
        types.push(typecheckExpr(node.rhs, ctx));
        break;
      case "expression":
        types.push(typecheckExpr(getASTExpr(ctx, item.expr), ctx));
        break;
      case "scope":
        if (!item.isWithinFunction) typecheckScopeTree(item.scope, ctx, types);
        break;
      case "import":
        typecheckScopeTree(
          assertNotUndefined(
            ctx.units.get(item.compilationUnitPath),
            `'${item.compilationUnitPath}' not found in typecheckScopeTree`
          ).scopeTree,
          { ...ctx, unitName: item.compilationUnitPath },
          types
        );
        break;
    }
  }
  return consolidateTypeErrors(types);
}
