import { ASTBinop, ASTDecorator, ASTExpr, ASTFunctionCall, ASTFunctionDef, ASTIdentifier, ASTList, ASTNamedJSON, ASTNote, ASTNumber, RawASTExpr } from "./ast.mjs";

export type DesmoscriptError = {
    expr: ASTExpr,
    reason: string
};

export enum Identifier {
    FUNCTION, MACRO, VARIABLE, EXPRESSION, SCOPE, BUILTIN_FUNCTION, FUNCTION_ARG, DECORATOR, NAMED_JSON, NOTE, BUILTIN_VARIABLE
}

export type MacroAPI = {
  number: (n: number) => ASTNumber<ScopeInfo>,
  binop: (left: RawASTExpr<ScopeInfo>, op: ASTBinop<ScopeInfo>["op"], right: RawASTExpr<ScopeInfo>) => ASTBinop<ScopeInfo>,
  list: (...args: RawASTExpr<ScopeInfo>[]) => ASTList<ScopeInfo>,
  fndef: (name: string, args: string[], body: RawASTExpr<ScopeInfo>[]) => ASTFunctionDef<ScopeInfo>,
  fn: (name: ASTIdentifier<ScopeInfo>, ...args: RawASTExpr<ScopeInfo>[]) => ASTFunctionCall<ScopeInfo>,
  note: (content: string) => ASTNote<ScopeInfo>
}

export type MacroDefinition = {
    type: Identifier.MACRO,
    fn: (expr: ASTFunctionCall<ScopeInfo>, ctx: DesmoscriptContext, api: MacroAPI) => ASTExpr | Promise<ASTExpr>
}

export type ScopeContent = { 
    type: Identifier.VARIABLE,
    root: ASTBinop<{}>,
    noCodeGen?: boolean
}
| {
    type: Identifier.FUNCTION,
    root: ASTFunctionDef<{}>
}
| MacroDefinition
| {
    type: Identifier.EXPRESSION,
    root: ASTExpr
}
| {
    type: Identifier.SCOPE,
    root: Scope
} | {
    type: Identifier.BUILTIN_FUNCTION
} | {
    type: Identifier.BUILTIN_VARIABLE
} | {
    type: Identifier.FUNCTION_ARG
} | {
    type: Identifier.DECORATOR,
    root: ASTDecorator<{}>
} | {
    type: Identifier.NAMED_JSON,
    root: ASTNamedJSON<{}>
} | {
    type: Identifier.NOTE,
    root: string
};

export type Scope = {
    contents: Map<string, ScopeContent>,
    scopeName: string,
    parent?: Scope
};

export type DesmoscriptContext = {
    builtins: Scope,
    files: string[]
}

export type ScopeInfo = { equivalentScope?: Scope, innerScope?: Scope };

export type ScopedASTExpr = RawASTExpr<ScopeInfo>;

// type TypedASTExpr = ds.ASTExpr & { dataType: number };

// type GenericTypeInfo = 

export type AnalyzedDesmoscript = {
    rootExpr: ScopedASTExpr,
    rootScope: Scope,
    files: string[]
};