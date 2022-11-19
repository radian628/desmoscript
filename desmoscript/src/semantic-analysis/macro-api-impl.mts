import { ASTType, JSONType, RawASTExpr } from "../ast/ast.mjs";
import { getExprContext } from "./builtins.mjs";
import { MacroAPI, ScopedASTExpr } from "./analysis-types.mjs";
import { makeExprId, uniqueAnonScopeName } from "../ast/parse.mjs";

export async function getMacroAPI(e: RawASTExpr<{}>): Promise<MacroAPI> {
  let ctx = getExprContext(e);
  ctx.id = makeExprId();

  return {
    clone: (e) => {
      //TODO: Make this clone an AST fragment
      return {
        ...ctx,
        type: ASTType.NUMBER,
        number: 0,
      };
    },
    number: (n) => {
      return {
        ...ctx,
        type: ASTType.NUMBER,
        number: n,
      };
    },
    binop: (left, op, right) => {
      return {
        ...ctx,
        type: ASTType.BINOP,
        left,
        op,
        right,
      };
    },
    list: (...elements) => {
      return {
        ...ctx,
        type: ASTType.LIST,
        elements,
      };
    },
    fndef: (name, args, body) => {
      return {
        ...ctx,
        type: ASTType.FNDEF,
        name,
        args,
        bodyExprs: body,
      };
    },
    fn: (name, ...args) => {
      return {
        ...ctx,
        type: ASTType.FNCALL,
        name,
        args,
        isMacro: false,
      };
    },
    macro: (name, ...args) => {
      return {
        ...ctx,
        type: ASTType.FNCALL,
        name,
        args,
        isMacro: true,
      };
    },
    note: (text) => {
      return {
        ...ctx,
        type: ASTType.NOTE,
        text,
      };
    },
    ident: (...segments) => {
      return {
        ...ctx,
        type: ASTType.IDENTIFIER,
        segments,
      };
    },
    point: (x, y) => {
      return {
        ...ctx,
        type: ASTType.POINT,
        x,
        y,
      };
    },
    range: (left, step, right) => {
      return {
        ...ctx,
        type: ASTType.STEP_RANGE,
        left,
        step,
        right,
      };
    },
    ns: (name, args) => {
      return {
        ...ctx,
        type: ASTType.NAMESPACE,
        bodyExprs: args,
        name,
      };
    },
    block: (bodyExprs) => {
      return {
        ...ctx,
        type: ASTType.BLOCK,
        bodyExprs,
      };
    },
    match: (branches, fallback) => {
      return {
        ...ctx,
        type: ASTType.MATCH,
        branches,
        fallback,
      };
    },
    import: (filename, alias) => {
      return {
        ...ctx,
        type: ASTType.IMPORT,
        filename,
        alias,
      };
    },
    sumprodint: (op, varName, lo, hi, body) => {
      return {
        ...ctx,
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
        type: ASTType.DERIVATIVE,
        variable: varName,
        body,
      };
    },
    listcomp: (variables, body) => {
      return {
        ...ctx,
        type: ASTType.LISTCOMP,
        variables,
        body,
      };
    },
    member: (left, right) => {
      return {
        ...ctx,
        type: ASTType.MEMBERACCESS,
        left,
        right,
      };
    },
    json: (json) => {
      return {
        ...ctx,
        type: ASTType.JSON,
        data: { jsontype: JSONType.NUMBER, data: 0 },
      };
    },
    namedjson: (name, json) => {
      return { ...ctx, name, type: ASTType.NAMED_JSON, json };
    },
    error: (message) => {
      throw {
        expr: ctx,
        reason: message,
      };
    },
  };
}
