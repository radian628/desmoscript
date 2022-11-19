import {
  DesmoscriptCompilationUnit,
  DesmoscriptCompileContext,
  Scope,
  ScopeContent,
} from "../semantic-analysis/analysis-types.mjs";

import { GraphState } from "../graphstate.mjs";
import {
  ASTBinop,
  ASTExpr,
  ASTIdentifier,
  ASTType,
  RawASTExpr,
} from "../ast/ast.mjs";
import { err } from "../semantic-analysis/analyze-first-pass.mjs";
import { ASTVisitorLUT } from "../ast/ast-visitor.mjs";
import { getCanonicalPath, getScopeOfExpr, locateIdentifier, locateIdentifierScope } from "../semantic-analysis/analyze-utils.mjs";

let exprIdCounter = 0;
function uniqueExpressionID() {
  return (exprIdCounter++).toString();
}

function opToLatex<T>(expr: ASTBinop<T>) {
  const lop: string | undefined = optable[expr.op];
  if (!lop)
    throw {
      expr,
      reason: `Unable to convert operator '${expr.op}'. Contact a developer if this error occurs.`,
    };
  return lop;
}

function toDesmosVar(str: string) {
  if (str.length == 1) return str;
  return `${str[0]}_{${str.slice(1)}}`;
}

function lastof<T>(arr: T[]) {
  return arr[arr.length - 1];
}

const optable: { [key: string]: string } = {
  "+": "+",
  "-": "-",
  "*": "\\cdot ",
  ">": "\\gt ",
  "<": "\\lt ",
  ">=": "\\ge ",
  "<=": "\\le ",
  "->": "\\to ",
  "..": "...",
  "=": "=",
  "==": "=",
};

let currentExprID = 0;
function getGraphExprID() {
  return (currentExprID++).toString();
}

/*
How do I make this completely resistant to namespace collisions?

Also, how do I create sensible names for everything?

Here's my thought: To completely disambiguate everything, I need a
namespace separator that isn't used anywhere. I also need a way of
disambiguating stuff with the same name in different files.

How can I do this?

Here's every possible name:
- all file names, possilby with some suffix to avoid duplicate file names
- all identifier segments
- so I need to enumerate a set of all of these to generate a namespace separator
- how to actually refer to a variable?
  1. file path
  2. namespace path (from original file)
  3. variable name
*/
function compileExpression(props: {
  ctx: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit,
  graphState: GraphState,
  namespaceSeparator: string
}, rootExpr: RawASTExpr<{}>) {
  const { ctx, unit, graphState, namespaceSeparator } = props;

  const u = undefined;
  const lut: ASTVisitorLUT<{}, any, string> = {
    number(e, c, v) {
      return e.number.toString();
    },

    binop(e, c, v){
      const lc = v(e.left, u);
      const rc = v(e.right, u);
      if (e.op == "^") return `${lc}^{${rc}}`;
      if (e.op == "[") return `${lc}\\left[${rc}\\right]`;
      if (e.op == "/") return `\\frac{${lc}}{${rc}}`;
      if (e.op == "%") return `\\operatorname{mod}\\left(${lc},${rc}\\right)`
      if (e.op == "=") return `${lc}${opToLatex(e)}${rc}`;
      if (e.op == "..") return `\\left[${lc}${opToLatex(e)}${rc}\\right]`;
      if ([">", "<", ">=", "<=", "=="].indexOf(e.op) != -1) {
          return `${lc}${opToLatex(e)}${rc}`;
      }
      return `\\left(${lc}${opToLatex(e)}${rc}\\right)`;
    },

    root(e, c, v) {
      err(e, "This should not be an expression!");
    },

    identifier(e, c, v) {
      const myScope = getScopeOfExpr(e, unit);

      const ident = locateIdentifier(
        myScope,
        e.segments
      );

      const scope = locateIdentifierScope(
        myScope,
        e.segments
      );

      if (!ident || !scope)
        err(e, `'${e.segments.join(".")}' does not exist in this scope.`);

      return toDesmosVar(
        [
          ...getCanonicalPath(scope), 
          e.segments[e.segments.length - 1]
        ].join(namespaceSeparator)
      )
    },

    point(e, c, v) {
      return `\\left(${v(e.x, u)}, ${v(e.y, u)}\\right)`;
    },

    fncall(e,c, v) {
      return `${v(e.name,u)}\\left(${e.args.map(arg => v(arg,u)).join(",")}\\right)`;
    },

    list(e,c,v) {
      return `\\left[${e.elements.map(expr => v(expr,u)).join(",")}\\right]`;
    },

    step_range(e,c,v) {
      return `\\left[${v(e.left,u)},${v(e.step,u)}...${v(e.right,u)}\\right]`;
    },

    fndef(e,c,v) {
      err(e, "Function definitions should not be here!");
    },

    namespace(e, c,v) {
      err(e, "Namespaces should not be here!");
    },

    block(e, c, v) {
      return v(lastof(e.bodyExprs), u);
    },

    match(e, c, v) {
      return `\\left\\{`+
      `${e.branches.map(([predicate, result]) => `${v(predicate,u)}: ${v(result,u)}`).join(",")}`
      + `${e.fallback ? `, ${v(e.fallback,u)}` : ""}`
      +`\\right\\}`;
    },

    import(e, c, v) {
      err(e, "Imports should not be here!");
    },

    listcomp(e,c,v) {
      const scopeChain = getCanonicalPath(scope)
      return `\\left[${v(e.body,c)}\\operatorname{for}${
        e.variables.map(([varname, list]) => {
          `${
            //@ts-ignore
            toDesmosVar(`${
              getScopeChain(e.innerScope)
              .join(namespaceSeparator)}${namespaceSeparator}${varname}`)
          }=${c(list)}`
        }).join(",")
      }\\right]`;
    }

  }
}

function compileScope(props: {
  ctx: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit,
  graphState: GraphState
}, scope: Scope) {
  const { ctx, unit, graphState } = props;

  for (let [name, c] of scope.contents) {
    switch (c.type) {
      case ScopeContent.Type.VARIABLE:
        break;
      case ScopeContent.Type.FUNCTION:
        break;
      case ScopeContent.Type.NAMED_JSON:
        break;
      case ScopeContent.Type.SCOPE:
        break;
      case ScopeContent.Type.NOTE:
        graphState.expressions.list.push({
          type: "text", text: c.data, id: getGraphExprID()
        });
    }
  }
  
}

function compileCompilationUnit(
  ctx: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit,
  graphState: GraphState
) {
  compileScope({ ctx, unit, graphState }, unit.rootScope);
}

function compile(ctx: DesmoscriptCompileContext) {
  const graphState: GraphState = {
    version: 9,
    graph: {
      viewport: { xmin: -10, ymin: -10, xmax: 10, ymax: 10 }
    },
    expressions: {
      list: []
    }
  }
}