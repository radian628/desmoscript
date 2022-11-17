import { never } from "zod";

export enum ASTType {
  BINOP,
  NUMBER,
  ROOT,
  IDENTIFIER,
  POINT,
  FNCALL,
  LIST,
  STEP_RANGE,
  FNDEF,
  NAMESPACE,
  BLOCK,
  MATCH,
  MACRODEF,
  MACROCALL,
  IMPORT,
  SUMPRODINT,
  INTEGRAL,
  DERIVATIVE,
  LISTCOMP,
  MEMBERACCESS,
  JSON,
  DECORATOR,
  NAMED_JSON,
  NOTE,
  ACTIONS
}

export type LineCol = {
  line: number;
  col: number;
  file: string;
};

export type ASTBinop<T, C = T> = {
  op:
    | "+"
    | "-"
    | "*"
    | "/"
    | "%"
    | "=="
    | ">"
    | "<"
    | ">="
    | "<="
    | ".."
    | "="
    | "->"
    | "["
    | "^";
  left: RawASTExpr<C, C>;
  right: RawASTExpr<C, C>;
  type: ASTType.BINOP;
} & LineCol &
  T;

export type ASTNumber<T, C = T> = {
  number: number;
  type: ASTType.NUMBER;
} & LineCol &
  T;

export type ASTIdentifier<T, C = T> = {
  segments: string[];
  type: ASTType.IDENTIFIER;
} & LineCol &
  T;

export type ASTPoint<T, C = T> = {
  x: RawASTExpr<C, C>;
  y: RawASTExpr<C, C>;
  type: ASTType.POINT;
} & LineCol &
  T;

export type ASTFunctionCall<T, C = T> = {
  name: RawASTExpr<C, C>;
  args: (RawASTExpr<C, C>)[];
  type: ASTType.FNCALL | ASTType.MACROCALL;
  substitution?: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTList<T, C = T> = {
  elements: (RawASTExpr<C, C>)[];
  type: ASTType.LIST;
} & LineCol &
  T;

export type ASTRoot<T, C = T> = {
  expressions: (RawASTExpr<C, C>)[];
  type: ASTType.ROOT;
} & LineCol &
  T;

export type ASTStepRange<T, C = T> = {
  left: RawASTExpr<C, C>;
  step: RawASTExpr<C, C>;
  right: RawASTExpr<C, C>;
  type: ASTType.STEP_RANGE;
} & LineCol &
  T;

export type ASTFunctionDef<T, C = T> = {
  id: string,
  name: RawASTExpr<C, C>;
  args: string[];
  bodyExprs: (RawASTExpr<C, C>)[];
  lastExpr?: RawASTExpr<C, C>;
  type: ASTType.FNDEF | ASTType.MACRODEF;
} & LineCol &
  T;

export type ASTNamespace<T, C = T> = {
  name: string;
  bodyExprs: (RawASTExpr<C, C>)[];
  type: ASTType.NAMESPACE;
} & LineCol &
  T;

export type ASTBlock<T, C = T> = {
  bodyExprs: (RawASTExpr<C, C>)[];
  type: ASTType.BLOCK;
  id: string,
  lastExpr?: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTMatch<T, C = T> = {
  branches: [ RawASTExpr<C, C>, RawASTExpr<C, C>][];
  fallback?: RawASTExpr<C, C>;
  type: ASTType.MATCH;
} & LineCol &
  T;

export type ASTImport<T, C = T> = {
  filename: string;
  alias?: string;
  type: ASTType.IMPORT;
} & LineCol &
  T;

export type ASTSumProdInt<T, C = T> = {
  id: string;
  type: ASTType.SUMPRODINT;
  opType: "sum" | "product" | "integral";
  varName: string;
  lo: RawASTExpr<C, C>;
  hi: RawASTExpr<C, C>;
  body: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTDerivative<T, C = T> = {
  id: string;
  type: ASTType.DERIVATIVE;
  variable: string;
  body: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTListComp<T, C = T> = {
  id: string;
  type: ASTType.LISTCOMP;
  variables: [string, RawASTExpr<C, C>][];
  body: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTMemberAccess<T, C = T> = {
  type: ASTType.MEMBERACCESS;
  left: RawASTExpr<C, C>;
  right: string;
} & LineCol &
  T;

export enum JSONType {
  NUMBER,
  STRING,
  OBJECT,
  ARRAY,
  BOOLEAN,
  NULL,
  DESMOSCRIPT,
}

export type ASTJsonData<T, C = T> =
  | {
      jsontype: JSONType.NUMBER;
      data: number;
    }
  | {
      jsontype: JSONType.STRING;
      data: string;
    }
  | {
      jsontype: JSONType.OBJECT;
      data: Record<string, ASTJSON<C, C>>;
    }
  | {
      jsontype: JSONType.ARRAY;
      data: (ASTJSON<C, C>)[];
    }
  | {
      jsontype: JSONType.BOOLEAN;
      data: boolean;
    }
  | {
      jsontype: JSONType.NULL;
      data: null;
    }
  | {
      jsontype: JSONType.DESMOSCRIPT;
      data: RawASTExpr<C, C>;
    };

export type ASTJSON<T, C = T> = {
  type: ASTType.JSON;
  data: ASTJsonData<C, C>;
} & LineCol &
  T;

export type ASTDecorator<T, C = T> = {
  type: ASTType.DECORATOR;
  name: string;
  expr: RawASTExpr<C, C>;
  json: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTNamedJSON<T, C = T> = {
  type: ASTType.NAMED_JSON;
  name: string;
  json: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTNote<T, C = T> = {
  type: ASTType.NOTE;
  text: string;
} & LineCol &
  T;

export type ASTActions<T, C = T> = {
  type: ASTType.ACTIONS;
  actions: [RawASTExpr<C, C>, RawASTExpr<C, C>][],
  actionAliases: (RawASTExpr<C, C>)[]
} & LineCol & T;

export type RawASTExpr<T, C = T> =
  | ASTBinop<T, C>
  | ASTNumber<T, C>
  | ASTRoot<T, C>
  | ASTIdentifier<T, C>
  | ASTPoint<T, C>
  | ASTFunctionCall<T, C>
  | ASTList<T, C>
  | ASTStepRange<T, C>
  | ASTFunctionDef<T, C>
  | ASTNamespace<T, C>
  | ASTBlock<T, C>
  | ASTMatch<T, C>
  | ASTImport<T, C>
  | ASTSumProdInt<T, C>
  | ASTDerivative<T, C>
  | ASTListComp<T, C>
  | ASTMemberAccess<T, C>
  | ASTJSON<T, C>
  | ASTDecorator<T, C>
  | ASTNamedJSON<T, C>
  | ASTNote<T, C>
  | ASTActions<T, C>;

export type RawCompleteASTExpr<T> = RawASTExpr<T, T>;

export type ASTExpr = RawCompleteASTExpr<{}>;

function unreachable(x: never): never {
  throw new Error("Unreachable code reached");
}


function parseASTJSON<T>(expr: RawCompleteASTExpr<T>): ASTJSON<T, T> {
  if (expr.type == ASTType.JSON) return expr;
  throw {
    expr, reason: "Expected AST JSON."
  }
}



/*
How in the world do I map over an AST in a sensible manner?
I can easily just have it map over the leaf nodes, but that's a foolish idea
because I want it to map over all the other nodes as well.
How can this be done?

I need to have an "intermediate phase" in the AST where children can have
a different type from their parent.
*/
export function mapAST<T, U>(
  e: RawASTExpr<T, T>,
  callback: (expr: RawASTExpr<T, U>) => RawASTExpr<U, U>
): RawASTExpr<U, U> {
  function m(expr: RawASTExpr<T, T>) {
    return mapAST(expr, callback);
  }

  function mf(expr?: RawASTExpr<T, T>) {
    return expr ? m(expr) : undefined;
  }

  function mmap(exprs: RawASTExpr<T, T>[]) {
    return exprs.map(e => m(e));
  }

  switch (e.type) {
    case ASTType.BINOP:
      return callback({
        ...e, 
        left: m(e.left),
        right: m(e.right)
      });
    case ASTType.BLOCK:
      return callback({
        ...e,
        bodyExprs: e.bodyExprs.map(expr => m(expr)),
        lastExpr: e.lastExpr ? m(e.lastExpr) : undefined
      })
    case ASTType.DECORATOR:
      return callback({
        ...e,
        json: m(e.json),
        expr: m(e.expr)
      });
    case ASTType.DERIVATIVE:
      return callback({ ...e, body: m(e.body) });
    case ASTType.FNCALL:
      return callback({
        ...e,
        args: mmap(e.args),
        name: m(e.name),
        substitution: e.substitution ? m(e.substitution) : undefined
      });
    case ASTType.FNDEF:
      return callback({
        ...e,
        bodyExprs: mmap(e.bodyExprs),
        lastExpr: mf(e.lastExpr),
        name: m(e.name)
      });
    case ASTType.IDENTIFIER:
      return callback(e);
    case ASTType.IMPORT:
      return callback(e);
    case ASTType.JSON:
      switch (e.data.jsontype) {
        case JSONType.ARRAY:
          return callback({
            ...e,
            data: {
              ...e.data,
              data: e.data.data.map(e => parseASTJSON(m(e)))
            }
          });
        case JSONType.DESMOSCRIPT:
          return callback({
            ...e, data: { ...e.data, data: m(e.data.data) }
          });
        case JSONType.OBJECT:
          return callback({
            ...e,
            data: {
              ...e.data,
              data: Object.fromEntries(Object.entries(e.data.data).map(([k, v]) => [k, parseASTJSON(m(v))]))
            }
          });
        case JSONType.NULL:
        case JSONType.STRING:
        case JSONType.NUMBER:
        case JSONType.BOOLEAN:
          return callback({
            ...e,
            data: { ...e.data }
          });
      }
    case ASTType.LIST:
      return callback({ ...e, elements: mmap(e.elements) });
    case ASTType.LISTCOMP:
      return callback({ 
        ...e, 
        variables: e.variables.map(([vname, vdata]) => [vname, m(vdata)]), 
        body: m(e.body) })
    case ASTType.MACROCALL:
      return callback({
        ...e,
        args: mmap(e.args),
        name: m(e.name),
        substitution: mf(e.substitution)
      });
    case ASTType.MACRODEF:
      return callback({
        ...e,
        bodyExprs: mmap(e.bodyExprs),
        lastExpr: mf(e.lastExpr),
        name: m(e.name)
      });
    case ASTType.MATCH:
      return callback({
        ...e,
        branches: e.branches.map(([predicate, result]) => [m(predicate), m(result)]),
        fallback: mf(e.fallback)
      });
    case ASTType.MEMBERACCESS:
      return callback({ ...e, left: m(e.left) });
    case ASTType.NAMED_JSON:
      return callback({ ...e, json: m(e.json) });
    case ASTType.NAMESPACE:
      return callback({ ...e, bodyExprs: mmap(e.bodyExprs) });
    case ASTType.NOTE:
      return callback(e);
    case ASTType.NUMBER:
      return callback(e);
    case ASTType.POINT:
      return callback({ ...e, x: m(e.x), y: m(e.y) });
    case ASTType.ROOT:
      return callback({ ...e, expressions: mmap(e.expressions) });
    case ASTType.STEP_RANGE:
      return callback({
        ...e,
        left: m(e.left),
        step: m(e.step),
        right: m(e.right)
      });
    case ASTType.SUMPRODINT:
      return callback({
        ...e,
        hi: m(e.hi),
        body: m(e.body),
        lo: m(e.lo)
      });
    case ASTType.ACTIONS:
      return callback({
        ...e,
        actions: e.actions.map(([l, r]) => [m(l), m(r)]),
        actionAliases: mmap(e.actionAliases)
      });
  }
}
