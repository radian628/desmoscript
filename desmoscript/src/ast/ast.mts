export enum ASTType {
  BINOP = "binop",
  NUMBER = "number",
  ROOT = "root",
  IDENTIFIER = "identifier",
  POINT = "point",
  FNCALL = "fncall",
  LIST = "list",
  STEP_RANGE = "step_range",
  FNDEF = "fndef",
  NAMESPACE = "namespace",
  BLOCK = "block",
  MATCH = "match",
  MACRODEF = "macrodef",
  MACROCALL = "macrocall",
  IMPORT = "import",
  SUMPRODINT = "sumprodint",
  INTEGRAL = "integral",
  DERIVATIVE = "derivative",
  LISTCOMP = "listcomp",
  MEMBERACCESS = "memberaccess",
  JSON = "json",
  DECORATOR = "decorator",
  NAMED_JSON = "named_json",
  NOTE = "note",
  ACTIONS = "actions",
}

export type LineCol = {
  line: number;
  col: number;
  file: string;
  id: number;
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
  args: RawASTExpr<C, C>[];
  type: ASTType.FNCALL;
  isMacro: boolean;
} & LineCol &
  T;

export type ASTList<T, C = T> = {
  elements: RawASTExpr<C, C>[];
  type: ASTType.LIST;
} & LineCol &
  T;

export type ASTRoot<T, C = T> = {
  expressions: RawASTExpr<C, C>[];
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
  name: string;
  args: string[];
  bodyExprs: RawASTExpr<C, C>[];
  lastExpr?: RawASTExpr<C, C>;
  type: ASTType.FNDEF | ASTType.MACRODEF;
} & LineCol &
  T;

export type ASTNamespace<T, C = T> = {
  name: string;
  bodyExprs: RawASTExpr<C, C>[];
  type: ASTType.NAMESPACE;
} & LineCol &
  T;

export type ASTBlock<T, C = T> = {
  bodyExprs: RawASTExpr<C, C>[];
  type: ASTType.BLOCK;
  lastExpr?: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTMatch<T, C = T> = {
  branches: [RawASTExpr<C, C>, RawASTExpr<C, C>][];
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
  type: ASTType.SUMPRODINT;
  opType: "sum" | "product" | "integral";
  varName: string;
  lo: RawASTExpr<C, C>;
  hi: RawASTExpr<C, C>;
  body: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTDerivative<T, C = T> = {
  type: ASTType.DERIVATIVE;
  variable: string;
  body: RawASTExpr<C, C>;
} & LineCol &
  T;

export type ASTListComp<T, C = T> = {
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
      data: ASTJSON<C, C>[];
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
  actions: [RawASTExpr<C, C>, RawASTExpr<C, C>][];
  actionAliases: RawASTExpr<C, C>[];
} & LineCol &
  T;

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
    expr,
    reason: "Expected AST JSON.",
  };
}
