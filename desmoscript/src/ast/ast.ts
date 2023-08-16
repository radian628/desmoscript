import { Result, err, ok } from "../compiler-errors.js";
import { MacroAPI, MacroCodegenAPI } from "../macro/macro-api.js";
import { DSType, TypecheckContext } from "../scope-tree/typecheck/typecheck.js";
import { BuiltinTypeSignature } from "../stdlib/stdlib.js";

export type CompilationUnit = {
  scopeTree: Scope;
  name: string;
  src: string;
  linesAndCols: [number, number][];
  ast: Scoped<ASTNode>;
};

export type ScopeContentVariable = {
  type: "variable";
  node: number; // node id
  unitName: string;
  id: number;
  display?: number;
} & LexingInfo;

export type ScopeContentBuiltinVariable = {
  type: "builtin-variable";
  start?: undefined;
  end?: undefined;
  unitName: string;
  id: number;
  definedByDesmos?: boolean; //e.g. t, x, y, index
  typeSignature?: DSType;
  computedTypeSignature?: (
    expr: Scoped<IdentifierNode>,
    ctx: TypecheckContext
  ) => DSType;
};

export type ScopeContentBuiltinFunction = {
  type: "builtin-function";
  start?: undefined;
  end?: undefined;
  unitName: string;
  id: number;
  definedByDesmos?: boolean; //e.g. sin, cos, tan, abs
  typeSignature: BuiltinTypeSignature;
};

export type ScopeContentFunction = {
  type: "function";
  node: number; // node id
  unitName: string;
  id: number;
  display?: number;
} & LexingInfo;

export type ScopeContentImport = {
  type: "import";
  compilationUnitPath: string;
  unitName: string;
  id: number;
  isScript?: boolean;
} & LexingInfo;

export type ScopeContentNote = {
  type: "note";
  text: string;
  unitName: string;
  id: number;
} & LexingInfo;

export type ScopeContentScope = {
  type: "scope";
  scope: Scope;
  unitName: string;
  id: number;
  isWithinFunction?: boolean;
  ignoreTypecheckAndCodegen?: boolean;
} & LexingInfo;

export type ScopeContentSettings = {
  type: "settings";
  settings: number;
  settingsType: "settings" | "ticker";
  id: number;
  unitName: string;
} & LexingInfo;

export type ScopeContentExpression = {
  type: "expression";
  expr: number;
  id: number;
  unitName: string;
  display?: number;
} & LexingInfo;

export type ScopeContentMacro = {
  type: "macro";
  id: number;
  unitName: string;
  start?: undefined;
  end?: undefined;
  useInnerScope?: boolean;
  macroOperation: (
    node: Scoped<MacroCallNode>,
    a: MacroAPI
  ) => Promise<ASTNode>;
  customTypecheck?: (
    node: Scoped<MacroCallNode>,
    ctx: TypecheckContext
  ) => DSType;
  customCodegen?: (node: Scoped<MacroCallNode>, a: MacroCodegenAPI) => string;
};

export type ScopeContent =
  | ScopeContentVariable
  | ScopeContentFunction
  | ScopeContentBuiltinFunction
  | ScopeContentBuiltinVariable
  | ScopeContentImport
  | ScopeContentNote
  | ScopeContentScope
  | ScopeContentSettings
  | ScopeContentExpression
  | ScopeContentMacro;

export type NotBuiltinScopeContent =
  | ScopeContentVariable
  | ScopeContentFunction
  | ScopeContentImport
  | ScopeContentNote
  | ScopeContentScope
  | ScopeContentSettings
  | ScopeContentExpression;

export type Scope = {
  name: string;
  parent: Scope | undefined;
  elements: Map<string, ScopeContent>;
  imports: ({
    compilationUnitPath: string;
  } & LexingInfo)[];
  importScripts: ({
    path: string;
  } & LexingInfo)[];
};

export type InnerScoped = {
  enclosingScope: Scope;
  innerScope: Scope;
};

export type EnclosingScoped = {
  enclosingScope: Scope;
};

type ScopeChildren<T> = T extends ASTNode
  ? {
      [K in keyof T]: 1 extends (K extends "params" ? 1 : 0) & // don't add scopes to macro params
        (T["type"] extends "macrocall" ? 1 : 0)
        ? T[K]
        : // ensure every other possible AST child is scoped
        T[K] extends ASTNode
        ? Scoped<T[K]>
        : T[K] extends ASTNode | undefined
        ? Scoped<T[K] & ASTNode> | undefined
        : T[K] extends Promise<ASTNode> | ASTNode
        ? Promise<Scoped<T[K] & ASTNode>> | Scoped<T[K] & ASTNode>
        : ScopeChildren<T[K]>;
    }
  : T extends [infer U, infer V][]
  ? [U extends ASTNode ? Scoped<U> : U, V extends ASTNode ? Scoped<V> : V][]
  : T extends (infer U)[]
  ? (U extends ASTNode ? Scoped<U> : U)[]
  : T;

export type Scoped<T extends ASTNode> = T extends any
  ? T["type"] extends "block" | "listcomp" | "fndef" | "namespace" | "macrocall"
    ? ScopeChildren<T> & InnerScoped
    : ScopeChildren<T> & EnclosingScoped
  : never;

export type ChildlessScoped<T extends ASTNode> = T["type"] extends
  | "block"
  | "listcomp"
  | "fndef"
  | "namespace"
  | "macrocall"
  ? T & InnerScoped
  : T & EnclosingScoped;

export type ASTNode = ASTExpr | ASTStatement | ASTJson;

export type ASTExpr =
  | NumberNode
  | PointNode
  | ListNode
  | BlockNode
  | IdentifierNode
  | FunctionCallNode
  | BinaryOpNode
  | UnaryOpNode
  | RangeNode
  | ListcompNode
  | MatchNode
  | NoteNode
  | ErrorNode
  | MacroCallNode;

export type ASTStatement =
  | ImportScriptNode
  | AssignmentNode
  | FunctionDefNode
  | NoteNode
  | ImportNode
  | LineBreakNode
  | ErrorNode
  | NamespaceNode
  | ShowNode
  | SettingsNode
  | MacroCallNode;

export type ASTJson =
  | JsonObjectNode
  | NumberNode
  | NoteNode
  | JsonBooleanNode
  | JsonNullNode
  | JsonInnerExprNode
  | JsonArrayNode
  | ErrorNode
  | MacroCallNode;

export type LexingInfo = {
  start: number;
  end: number;
};

export type ImportNode = {
  type: "import";
  id: number;
  src: string;
  alias?: string;
} & LexingInfo;

export type ImportScriptNode = {
  type: "import-script";
  id: number;
  src: string;
} & LexingInfo;

export type AssignmentNode = {
  type: "assignment";
  id: number;
  lhs: string;
  rhs: ASTExpr;
} & LexingInfo;

export type IdentifierNode = {
  type: "identifier";
  id: number;
  segments: string[];
} & LexingInfo;

export type NumberNode = {
  type: "number";
  id: number;
  number: number;
} & LexingInfo;

export type PointNode = {
  type: "point";
  id: number;
  x: ASTExpr;
  y: ASTExpr;
} & LexingInfo;

export type ListNode = {
  type: "list";
  id: number;
  elements: ASTExpr[];
  typeAnnotation?: "number" | "color" | "polygon" | "point" | "boolean";
} & LexingInfo;

export type BlockNode = {
  type: "block";
  id: number;
  body: ASTNode[];
  isRoot?: boolean;
} & LexingInfo;

export type FunctionDefNode = {
  type: "fndef";
  id: number;
  name: string;
  params: string[];
  body: BlockNode;
} & LexingInfo;

export type FunctionCallNode = {
  type: "fncall";
  id: number;
  name: IdentifierNode;
  params: ASTExpr[];
} & LexingInfo;

export type BinaryOpNode = {
  type: "binop";
  id: number;
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
    | "->"
    | "["
    | "^"
    | "&&"
    | "||"
    // action chain operator
    | ",";
  lhs: ASTExpr;
  rhs: ASTExpr;
} & LexingInfo;

export type UnaryOpNode = {
  type: "unop";
  id: number;
  op: "-" | "!" | ".x" | ".y";
  operand: ASTExpr;
} & LexingInfo;

export type RangeNode = {
  type: "range";
  id: number;
  lhs: ASTExpr;
  step?: ASTExpr;
  rhs: ASTExpr;
} & LexingInfo;

export type ListcompNode = {
  type: "listcomp";
  id: number;
  body: ASTExpr;
  params: [string, ASTExpr][];
} & LexingInfo;

export type MatchNode = {
  type: "match";
  id: number;
  branches: [ASTExpr, ASTExpr][];
  fallback?: ASTExpr;
} & LexingInfo;

export type SettingsNode = {
  type: "settings";
  id: number;
  settingsType: "settings" | "ticker";
  content: ASTJson;
} & LexingInfo;

export type NoteNode = {
  type: "note";
  id: number;
  content: string;
} & LexingInfo;

export type ErrorNode = {
  type: "error";
  id: number;
  reason: string;
  unitName: string;
} & LexingInfo;

export type LineBreakNode = {
  type: "linebreak";
  id: number;
} & LexingInfo;

export type NamespaceNode = {
  type: "namespace";
  id: number;
  body: BlockNode;
  name: string;
  settings?: ASTJson;
} & LexingInfo;

export type ShowNode = {
  type: "show";
  id: number;
  body: ASTNode;
  settings: JsonObjectNode;
} & LexingInfo;

export type JsonObjectNode = {
  type: "json-object";
  id: number;
  data: [string, ASTJson][];
} & LexingInfo;

export type JsonBooleanNode = {
  type: "json-boolean";
  id: number;
  data: boolean;
} & LexingInfo;

export type JsonNullNode = {
  type: "json-null";
  id: number;
} & LexingInfo;

export type JsonInnerExprNode = {
  type: "json-inner-expr";
  id: number;
  expr: ASTExpr;
} & LexingInfo;

export type JsonArrayNode = {
  type: "json-array";
  id: number;
  elements: ASTJson[];
} & LexingInfo;

export type MacroCallNode = {
  type: "macrocall";
  id: number;
  params: ASTNode[]; // you can pass literally anything into a macro as long as it parses
  result?: Promise<ASTNode> | ASTNode;
  useInnerScope?: boolean;
  name: IdentifierNode;
} & LexingInfo;

export function errnode(reason: string, start?: number, end?: number) {
  return {
    type: "error" as const,
    reason,
    start,
    end,
  };
}

let idCounter = 0;
export function newid() {
  return ++idCounter;
}

export function asExpr(node: ASTNode): Result<ASTExpr, undefined> {
  const t = node.type;
  if (
    t == "number" ||
    t == "point" ||
    t == "list" ||
    t == "block" ||
    t == "identifier" ||
    t == "fncall" ||
    t == "binop" ||
    t == "unop" ||
    t == "range" ||
    t == "listcomp" ||
    t == "match" ||
    t == "note" ||
    t == "macrocall"
  ) {
    return ok(node);
  }
  return err(undefined);
}

export function writeASTDebug(n: any, indent?: number): string {
  if (!indent) indent = 0;

  if (typeof n == "string") return `"${n}"`;

  if (Array.isArray(n))
    return `[${n
      .map((e) => writeASTDebug(e, (indent as number) + 2))
      .join(" ")}]`;

  if (typeof n == "object" && typeof n.id == "number") {
    const node: ASTNode = n;

    switch (node.type) {
      case "number":
        return node.number.toString();
      case "note":
        return `"${node.content}"`;
      default: {
        const strs = [""];
        for (const [k, v] of Object.entries(node)) {
          if (k == "start") continue;
          if (k == "id") continue;
          if (k == "end") continue;
          if (k == "type") continue;
          strs.push(`${k}=${writeASTDebug(v, indent + 2)}`);
        }
        strs.push("");
        return `(${node.type} ${strs.join("\n" + "".padStart(indent, " "))})`;
      }
    }
  }

  return n?.toString() ?? "undefined";
}

export function getErrors(ast: any): ErrorNode[] {
  if (Array.isArray(ast)) return ast.map((e) => getErrors(e)).flat();
  if (typeof ast == "object") {
    if (ast.type == "error") {
      return [ast];
    } else {
      return getErrors(Object.values(ast));
    }
  }
  return [];
}

export function deduplicateErrors(errors: ErrorNode[]): ErrorNode[] {
  const uniqueErrors: ErrorNode[] = [];
  for (const e1 of errors) {
    let unique = true;
    for (const e2 of uniqueErrors) {
      if (e1.start == e2.start && e1.reason == e2.reason && e1.end == e2.end) {
        unique = false;
        break;
      }
    }
    if (unique) {
      uniqueErrors.push(e1);
    }
  }
  return uniqueErrors;
}

export function forEachAST<Ctx>(
  node: ASTNode,
  ctx: Ctx,
  mapper: (node: ASTNode, ctx: Ctx) => Ctx
): void {
  function map<T>(n: T, myctx: Ctx): void {
    //@ts-expect-error not even gonna try
    if (Array.isArray(n)) return n.map((e) => map(e, myctx));

    //@ts-expect-error not even gonna try
    if (n && typeof n == "object" && typeof n.id == "number") {
      const node = n as unknown as ASTNode;

      const innerctx = mapper(node, myctx);

      Object.entries(node).forEach(([k, v]) => [k, map(v, innerctx)]);
    }
  }

  map(node, ctx);
}

export async function forEachASTAsync<Ctx>(
  node: ASTNode,
  ctx: Ctx,
  mapper: (node: ASTNode, ctx: Ctx) => Promise<Ctx>
): Promise<void> {
  async function map<T>(n: T, myctx: Ctx): Promise<void> {
    //@ts-expect-error not even gonna try
    if (Array.isArray(n)) return await Promise.all(n.map((e) => map(e, myctx)));

    //@ts-expect-error not even gonna try
    if (n && typeof n == "object" && typeof n.id == "number") {
      const node = n as unknown as ASTNode;

      const innerctx = await mapper(node, myctx);

      await Promise.all(Object.entries(node).map(([k, v]) => map(v, innerctx)));
    }
  }

  await map(node, ctx);
}
