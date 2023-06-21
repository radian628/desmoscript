import { Result } from "../compiler-errors.js";
import { MacroAPI } from "../macro/macro-api.js";
import { DSType } from "../scope-tree/typecheck/typecheck.js";
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
    node: number;
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
    definedByDesmos?: boolean;
    typeSignature?: DSType;
};
export type ScopeContentBuiltinFunction = {
    type: "builtin-function";
    start?: undefined;
    end?: undefined;
    unitName: string;
    id: number;
    definedByDesmos?: boolean;
    typeSignature: BuiltinTypeSignature;
};
export type ScopeContentFunction = {
    type: "function";
    node: number;
    unitName: string;
    id: number;
    display?: number;
} & LexingInfo;
export type ScopeContentImport = {
    type: "import";
    compilationUnitPath: string;
    unitName: string;
    id: number;
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
    macroOperation: (node: Scoped<MacroCallNode>, a: MacroAPI) => Promise<ASTNode>;
};
export type ScopeContent = ScopeContentVariable | ScopeContentFunction | ScopeContentBuiltinFunction | ScopeContentBuiltinVariable | ScopeContentImport | ScopeContentNote | ScopeContentScope | ScopeContentSettings | ScopeContentExpression | ScopeContentMacro;
export type NotBuiltinScopeContent = ScopeContentVariable | ScopeContentFunction | ScopeContentImport | ScopeContentNote | ScopeContentScope | ScopeContentSettings | ScopeContentExpression;
export type Scope = {
    name: string;
    parent: Scope | undefined;
    elements: Map<string, ScopeContent>;
    imports: ({
        compilationUnitPath: string;
    } & LexingInfo)[];
};
export type InnerScoped = {
    enclosingScope: Scope;
    innerScope: Scope;
};
export type EnclosingScoped = {
    enclosingScope: Scope;
};
type ScopeChildren<T> = T extends ASTNode ? {
    [K in keyof T]: 1 extends (K extends "params" ? 1 : 0) & // don't add scopes to macro params
    (T["type"] extends "macrocall" ? 1 : 0) ? T[K] : T[K] extends ASTNode ? Scoped<T[K]> : T[K] extends ASTNode | undefined ? Scoped<T[K] & ASTNode> | undefined : T[K] extends Promise<ASTNode> | ASTNode ? Promise<Scoped<T[K] & ASTNode>> | Scoped<T[K] & ASTNode> : ScopeChildren<T[K]>;
} : T extends [infer U, infer V][] ? [U extends ASTNode ? Scoped<U> : U, V extends ASTNode ? Scoped<V> : V][] : T extends (infer U)[] ? (U extends ASTNode ? Scoped<U> : U)[] : T;
export type Scoped<T extends ASTNode> = T extends any ? T["type"] extends "block" | "listcomp" | "fndef" | "namespace" ? ScopeChildren<T> & InnerScoped : ScopeChildren<T> & EnclosingScoped : never;
export type ChildlessScoped<T extends ASTNode> = T["type"] extends "block" | "listcomp" | "fndef" | "namespace" ? T & InnerScoped : T & EnclosingScoped;
export type ASTNode = ASTExpr | ASTStatement | ASTJson;
export type ASTExpr = NumberNode | PointNode | ListNode | BlockNode | IdentifierNode | FunctionCallNode | BinaryOpNode | UnaryOpNode | RangeNode | ListcompNode | MatchNode | NoteNode | ErrorNode | MacroCallNode;
export type ASTStatement = AssignmentNode | FunctionDefNode | NoteNode | ImportNode | LineBreakNode | ErrorNode | NamespaceNode | ShowNode | SettingsNode | MacroCallNode;
export type ASTJson = JsonObjectNode | NumberNode | NoteNode | JsonBooleanNode | JsonNullNode | JsonInnerExprNode | JsonArrayNode | ErrorNode | MacroCallNode;
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
    op: "+" | "-" | "*" | "/" | "%" | "==" | ">" | "<" | ">=" | "<=" | "->" | "[" | "^" | "&&" | "||";
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
export type ActionsNode = {
    type: "actions";
    id: number;
    actions: ([IdentifierNode, ASTExpr] | ASTExpr)[];
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
    params: ASTNode[];
    result?: Promise<ASTNode> | ASTNode;
    name: IdentifierNode;
} & LexingInfo;
export declare function errnode(reason: string, start?: number, end?: number): {
    type: "error";
    reason: string;
    start: number | undefined;
    end: number | undefined;
};
export declare function newid(): number;
export declare function asExpr(node: ASTNode): Result<ASTExpr, undefined>;
export declare function writeASTDebug(n: any, indent?: number): string;
export declare function getErrors(ast: any): ErrorNode[];
export declare function deduplicateErrors(errors: ErrorNode[]): ErrorNode[];
export declare function forEachAST<Ctx>(node: ASTNode, ctx: Ctx, mapper: (node: ASTNode, ctx: Ctx) => Ctx): void;
export declare function forEachASTAsync<Ctx>(node: ASTNode, ctx: Ctx, mapper: (node: ASTNode, ctx: Ctx) => Promise<Ctx>): Promise<void>;
export {};
