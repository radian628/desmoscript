import { ast, parseExpr } from "../ast/ast.mjs";
import {
  CompilationState,
  CompilationUnit,
  scopeTree,
} from "../compiler-state.mjs";
import { err, ierr } from "../error-handling.mjs";
import { getCanonicalIdentifierName } from "../scope-tree-lookup.mjs";

const comparisonTable = {
  ">": "\\gt",
  ">=": "\\ge",
  "<": "\\lt",
  "<=": "\\le",
  "==": "=",
};

export type CompileExpressionContext = {
  unit: CompilationUnit<"macrosubsync">;
  state: CompilationState<"macrosubsync">;
  compiledUnits: Set<string>;
};

export function identToPath(
  unit: CompilationUnit<"macrosubsync">,
  e: ast.Ident<"macrosubsync">
) {
  return [unit.path, ...e.segments].join("\n");
}

//export function getIdentName(names: Map<string, string>, ident: ast.Ident) {}

export function compileExpression(
  e: ast.Expr<"macrosubsync">,
  ctx: CompileExpressionContext
): string {
  function getIdentName(
    scope: scopeTree.Scope,
    node: ast.Node<"macrosubsync">,
    additionalNames: string[]
  ) {
    return getCanonicalIdentifierName(
      scope,
      ctx.state,
      ctx.unit,
      node,
      additionalNames
    );
  }

  function c(e: ast.Expr<"macrosubsync">) {
    return compileExpression(e, ctx);
  }

  function compileActions(e: ast.Actions<"macrosubsync">) {
    return e.actions
      .map(([l, r]) => `${c(l)}\\to ${c(r)}`)
      .concat(e.others.map((a) => c(a)))
      .join(",");
  }

  function compileBinop(e: ast.Binop<"macrosubsync">) {
    const l = c(e.lhs);
    const r = c(e.rhs);
    switch (e.op) {
      case "+":
      case "-":
      case "*":
        return `\\left(${l}${e.op}${r}\\right)`;
      case "/":
        return `\\frac{${l}}{${r}}`;
      case "%":
        return `\\operatorname{mod}\\left(${l}, ${r}\\right)`;
      case ">":
      case ">=":
      case "<":
      case "<=":
      case "==":
        return `\\${l}${comparisonTable[e.op]} ${r}`;
      case "..":
        return `\\left[${l}..${r}\\right]`;
    }
    ierr(e, `Unimplemented operator '${e.op}'`);
  }

  function compileDerivative(e: ast.Derivative<"macrosubsync">) {
    const varname = getIdentName(e.enclosingScope, e, [e.var]);
    return `\\left(\\frac{d}{d${varname}}\\left(${c(e.body)}\\right)\\right)`;
  }

  switch (e.type) {
    case "actions":
      return compileActions(e);
    case "binop":
      return compileBinop(e);
    case "block":
      return c(e.expr);
    case "case":
      return (
        `\\left\\{` +
        `${e.branches
          .map(
            ([predicate, result]) =>
              `${c(predicate)}: \\left(${c(result)}\\right)`
          )
          .join(",")}` +
        `${e.fallback ? `, ${c(e.fallback)}` : ""}` +
        `\\right\\}`
      );
    case "derivative":
      return compileDerivative(e);
    case "fncall":
      return `${c(e.name)}\\left(${e.args
        .map((arg) => c(arg))
        .join(",")}\\right)`;
    case "ident":
      const identName = getIdentName(e.enclosingScope, e, e.segments);

      if (!identName) {
        err(e, `Identifier '${e.segments}' does not exist.`);
      }
      return identName;
    case "list":
      return `\\left[${e.elements.map((expr) => c(expr)).join(",")}\\right]`;
    case "listcomp":
      return `\\left[${c(e.body)}\\operatorname{for}${e.variables
        .map(([varname, list]) => {
          const ident = e.innerScope.contents.get(varname);
          if (!ident)
            err(e, "INTERNAL ERROR: Listcomp variable does not exist.");
          const desmosVarName = getIdentName(e.innerScope, e, [varname]);
          return `${desmosVarName}=${c(list)}`;
        })
        .join(",")}\\right]`;
    case "macrocall":
      if (!e.substitution) {
        err(
          e,
          `Macro '${e.name.segments.join(
            "."
          )}' does not exist or was unable to be resolved.`
        );
      }
      return c(parseExpr(e.substitution, true));
    case "memberaccess":
      return `${c(e.lhs)}.${e.rhs}`;
    case "number":
      return e.num.toString();
    case "point":
      return `\\left(${c(e.x)}, ${c(e.y)}\\right)`;
    case "steprange":
      return `\\left[${c(e.lhs)},${c(e.step)}...${c(e.rhs)}\\right]`;
    case "sumprodint":
      const counterVarName = getIdentName(e.innerScope, e, [e.var]);
      if (e.op == "integral") {
        return `\\left(\\int_{${c(e.lo)}}^{${c(e.hi)}}\\left(${c(
          e.body
        )}\\right)d${counterVarName}\\right)`;
      } else {
        let op = e.op == "product" ? "prod" : "sum";
        return `\\left(\\${op}_{${counterVarName}=${c(e.lo)}}^{${c(
          e.hi
        )}}\\left(${c(e.body)}\\right)\\right)`;
      }
    case "unop":
      if (e.op == "-") {
        return `-${c(e.expr)}`;
      }
      ierr(e, `Unary operator '${e.op}' is currently unimplemented.`);
  }
}
