import { ASTBinop, ASTDecorator, ASTExpr, ASTFunctionCall, ASTFunctionDef, ASTNamedJSON, RawASTExpr } from "./ast.mjs";

export type DesmoscriptError = {
    expr: ASTExpr,
    reason: string
};

export enum Identifier {
    FUNCTION, MACRO, VARIABLE, EXPRESSION, SCOPE, BUILTIN_FUNCTION, FUNCTION_ARG, DECORATOR, NAMED_JSON
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
| {
    type: Identifier.MACRO,
    fn: (expr: ASTFunctionCall<ScopeInfo>) => ASTExpr
}
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
    type: Identifier.FUNCTION_ARG
} | {
    type: Identifier.DECORATOR,
    root: ASTDecorator<{}>
} | {
    type: Identifier.NAMED_JSON,
    root: ASTNamedJSON<{}>
};

export type Scope = {
    contents: Map<string, ScopeContent>,
    scopeName: string,
    parent?: Scope
};

export type DesmoscriptContext = {
    builtins: Scope
}

export type ScopeInfo = { equivalentScope?: Scope, innerScope?: Scope };

export type ScopedASTExpr = RawASTExpr<ScopeInfo>;

// type TypedASTExpr = ds.ASTExpr & { dataType: number };

// type GenericTypeInfo = 

export type AnalyzedDesmoscript = {
    rootExpr: ScopedASTExpr,
    rootScope: Scope
};