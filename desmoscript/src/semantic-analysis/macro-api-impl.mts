import { ASTExpr, ASTType, JSONType, RawASTExpr } from "../ast/ast.mjs";
import { getExprContext } from "./builtins.mjs";
import {
  DesmoscriptCompilationUnit,
  MacroAPI,
  ScopedASTExpr,
} from "./analysis-types.mjs";
import {
  desmoscriptFileToAST,
  desmoscriptStringToAST,
  makeExprId,
  uniqueAnonScopeName,
} from "../ast/parse.mjs";
import { getScopeOfExpr } from "./analyze-utils.mjs";
import { err } from "./analyze-scope-pass.mjs";
import { mapAST } from "../ast/ast-visitor.mjs";

export function remapIDs(value: ASTExpr) {
  return mapAST(value, e => {
    return {
      ...e,
      id: makeExprId()
    }
  });
}

export async function getMacroAPI(
  e: RawASTExpr<{}>,
  unit: DesmoscriptCompilationUnit
): Promise<MacroAPI> {
  let ctx = getExprContext(e);

  return {
    clone: (e) => {
      const eClone = structuredClone(e);
      return remapIDs(eClone);
    },
    scopeof: (e) => {
      return getScopeOfExpr(e, unit);
    },
    number: (n) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.NUMBER,
        number: n,
      };
    },
    binop: (left, op, right) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.BINOP,
        left,
        op,
        right,
      };
    },
    list: (...elements) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.LIST,
        elements,
      };
    },
    fndef: (name, args, body) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.FNDEF,
        name,
        args,
        bodyExprs: body,
      };
    },
    fn: (name, ...args) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.FNCALL,
        name,
        args,
        isMacro: false,
      };
    },
    macro: (name, ...args) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.FNCALL,
        name,
        args,
        isMacro: true,
      };
    },
    note: (text) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.NOTE,
        text,
      };
    },
    ident: (...segments) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.IDENTIFIER,
        segments,
      };
    },
    point: (x, y) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.POINT,
        x,
        y,
      };
    },
    steprange: (left, step, right) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.STEP_RANGE,
        left,
        step,
        right,
      };
    },
    ns: (name, args) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.NAMESPACE,
        bodyExprs: args,
        name,
      };
    },
    block: (bodyExprs) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.BLOCK,
        bodyExprs,
      };
    },
    match: (branches, fallback) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.MATCH,
        branches,
        fallback,
      };
    },
    import: (filename, alias) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.IMPORT,
        filename,
        alias,
      };
    },
    sumprodint: (op, varName, lo, hi, body) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.SUMPRODINT,
        opType: op,
        varName,
        lo,
        hi,
        body,
      };
    },
    derivative: (varName, body) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.DERIVATIVE,
        variable: varName,
        body,
      };
    },
    listcomp: (variables, body) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.LISTCOMP,
        variables,
        body,
      };
    },
    member: (left, right) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.MEMBERACCESS,
        left,
        right,
      };
    },
    json: (json) => {
      return {
        ...ctx,
        id: makeExprId(),
        type: ASTType.JSON,
        data: { jsontype: JSONType.NUMBER, data: 0 },
      };
    },
    namedjson: (name, json) => {
      return { ...ctx, id: makeExprId(), name, type: ASTType.NAMED_JSON, json };
    },
    error: (message) => {
      throw {
        expr: ctx,
        reason: message,
      };
    },
    fromstrraw: (str: string) => {
      return desmoscriptStringToAST(str, e.file);
    },
    fromstr: (str: string) => {
      const astNode = desmoscriptStringToAST(str, e.file);
      if (astNode.type != ASTType.ROOT)
        err(astNode, "INTERNAL ERROR: EXPECTED ROOT NODE.");
      if (astNode.expressions.length == 0)
        err(astNode, "INTERNAL ERROR: EXPECTED ONE OR MORE EXPRESSIONS.");
      return astNode.expressions[0];
    },
  };
}
