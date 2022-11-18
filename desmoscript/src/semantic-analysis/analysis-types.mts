import {
  ASTBinop,
  ASTBlock,
  ASTDerivative,
  ASTExpr,
  ASTFunctionCall,
  ASTFunctionDef,
  ASTIdentifier,
  ASTImport,
  ASTJSON,
  ASTList,
  ASTListComp,
  ASTMatch,
  ASTMemberAccess,
  ASTNamedJSON,
  ASTNamespace,
  ASTNote,
  ASTNumber,
  ASTPoint,
  ASTStepRange,
  ASTSumProdInt,
  RawASTExpr,
} from "../ast/ast.mjs";

export namespace ScopeContent {
  export enum Type {
    VARIABLE,
    FUNCTION,
    MACRO,
    SCOPE,
    NAMED_JSON,
    NOTE,
  }

  export type Variable = {
    source?: string;
    type: Type.VARIABLE;
    decoratorInfo?: {
      json: ASTJSON<{}>;
    };
  } & (
    | {
        isBuiltin?: false;
        data: RawASTExpr<{}>;
      }
    | {
        isBuiltin: true;
      }
  );

  export type Function = {
    source?: string;
    type: Type.FUNCTION;
  } & (
    | {
        isBuiltin?: false;
        data: ASTFunctionDef<{}>;
        finalExpr: RawASTExpr<{}>;
      }
    | {
        isBuiltin: true;
      }
  );

  export type Macro = {
    source?: string;
    type: Type.MACRO;
    isBuiltin?: boolean;
    fn: (
      expr: ASTFunctionCall<{}>,
      ctx: DesmoscriptCompileContext,
      api: MacroAPI
    ) => RawASTExpr<{}> | Promise<RawASTExpr<{}>>;
  };

  export type Scope = {
    source?: string;
    type: Type.SCOPE;
    data: Scope2;
  };

  export type NamedJSON = {
    source?: string;
    type: Type.NAMED_JSON;
    data: ASTJSON<{}>;
  };

  export type Note = {
    source?: string;
    type: Type.NOTE;
    data: string;
  };

  export type Content = Variable | Function | Macro | Scope | NamedJSON | Note;

  export function externalizeScope(scope: Scope2, source: string): Scope2 {
    return {
        ...scope,
        contents: new Map(
            Array.from(scope.contents.entries()).map(
                ([k, v]) => [k, externalize(v, source)]
            )
        )
    }
}

export function externalize(content: Content, source: string): Content {
    switch (content.type) {
        case Type.SCOPE:
            return {
                ...content,
                data: externalizeScope(content.data, source),
                source
            }
        default:
            return {
                ...content,
                source
            }
    }
}
}

type Scope2 = Scope;
export type Scope = {
  name: string;
  contents: Map<string, ScopeContent.Content>;
  parent?: Scope;
};

export type ScopeInfo = {
  myScope: Scope;
};

export type ScopedASTExpr = RawASTExpr<ScopeInfo>;

export type MacroAPI = {
  number: (n: number) => ASTNumber<ScopeInfo>;
  binop: (
    left: RawASTExpr<ScopeInfo>,
    op: ASTBinop<ScopeInfo>["op"],
    right: RawASTExpr<ScopeInfo>
  ) => ASTBinop<ScopeInfo>;
  list: (...args: RawASTExpr<ScopeInfo>[]) => ASTList<ScopeInfo>;
  fndef: (
    name: string,
    args: string[],
    body: RawASTExpr<ScopeInfo>[]
  ) => ASTFunctionDef<ScopeInfo>;
  fn: (
    name: ASTIdentifier<ScopeInfo>,
    ...args: RawASTExpr<ScopeInfo>[]
  ) => ASTFunctionCall<ScopeInfo>;
  note: (content: string) => ASTNote<ScopeInfo>;
  ident: (...segments: string[]) => ASTIdentifier<ScopeInfo>;
  point: (x: ScopedASTExpr, y: ScopedASTExpr) => ASTPoint<ScopeInfo>;
  range: (
    start: ScopedASTExpr,
    step: ScopedASTExpr,
    end: ScopedASTExpr
  ) => ASTStepRange<ScopeInfo>;
  ns: (name: string, args: ScopedASTExpr[]) => ASTNamespace<ScopeInfo>;
  block: (args: ScopedASTExpr[]) => ASTBlock<ScopeInfo>;
  match: (
    branches: [ScopedASTExpr, ScopedASTExpr][],
    fallback?: ScopedASTExpr
  ) => ASTMatch<ScopeInfo>;
  import: (filename: string, alias?: string) => ASTImport<ScopeInfo>;
  sumprodint: (
    op: ASTSumProdInt<ScopeInfo>["opType"],
    varName: string,
    lo: ScopedASTExpr,
    hi: ScopedASTExpr,
    body: ScopedASTExpr
  ) => ASTSumProdInt<ScopeInfo>;
  derivative: (
    varName: string,
    body: ScopedASTExpr
  ) => ASTDerivative<ScopeInfo>;
  listcomp: (
    variables: [string, ScopedASTExpr][],
    body: ScopedASTExpr
  ) => ASTListComp<ScopeInfo>;
  member: (left: ScopedASTExpr, right: string) => ASTMemberAccess<ScopeInfo>;
  json: (json: any) => ASTJSON<ScopeInfo>;
  namedjson: (name: string, json: ScopedASTExpr) => ASTNamedJSON<ScopeInfo>;
  error: (message: string) => never;
};

export enum ErrorType {
  EXISTENCE,
}

export type CompilerError = {
  expr: RawASTExpr<{}>;
  reason: string;
  type: ErrorType;
};

// represents a single compilation unit in Desmoscript (usually one .desmo file)
export type DesmoscriptCompilationUnit = {
  ast: RawASTExpr<{}>;
  symbolScopes: Map<number, Scope>;
  rootScope: Scope;
  filePath: string
};

// represents all the data necessary to compile a desmoscript program
export type DesmoscriptCompileContext = {
  existingFiles: Set<string>;
  compilationUnits: Map<string, DesmoscriptCompilationUnit>;
};

