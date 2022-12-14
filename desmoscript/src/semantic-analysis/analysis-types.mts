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
    IMPORT,
  }

  export type Variable = {
    source?: string;
    type: Type.VARIABLE;
    decoratorInfo?: {
      json: ASTJSON<{}>;
    };
    id: number;
  } & (
    | {
        isPartOfDesmos?: false;
        isBuiltin?: false;
        data: RawASTExpr<{}>;
      }
    | {
        isPartOfDesmos?: boolean;
        isBuiltin: true;
      }
    | {
        isPartOfDesmos: true;
        isBuiltin?: false;
      }
  );

  export type Function = {
    source?: string;
    type: Type.FUNCTION;
    id: number;
  } & (
    | {
        isPartOfDesmos?: false;
        isBuiltin?: false;
        data: ASTFunctionDef<{}>;
        finalExpr: RawASTExpr<{}>;
      }
    | {
        isPartOfDesmos?: boolean;
        isBuiltin: true;
      }
    | {
        isPartOfDesmos: true;
        isBuiltin?: false;
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
    id: number;
  };

  export type Scope = {
    source?: string;
    type: Type.SCOPE;
    data: Scope2;
    id: number;
  };

  export type NamedJSON = {
    source?: string;
    type: Type.NAMED_JSON;
    data: ASTJSON<{}>;
    name: string;
    id: number;
  };

  export type Note = {
    source?: string;
    type: Type.NOTE;
    data: string;
    id: number;
  };

  export type Import = {
    unit: string;
    type: Type.IMPORT;
    alias?: string;
    id: number;
  };

  export type Content =
    (Variable
    | Function
    | Macro
    | Scope
    | NamedJSON
    | Note
    | Import);
}

type Scope2 = Scope;
export type Scope = {
  name: string;
  correspondingFunctionName?: string;
  contents: Map<string, ScopeContent.Content>;
  parent?: Scope;
  isRoot?: boolean;
};

export type ScopeInfo = {};

export type ScopedASTExpr = RawASTExpr<ScopeInfo>;

export type MacroAPI = {
  clone: (n: ASTExpr) => ASTExpr;
  scopeof: (n: ASTExpr) => Scope;
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
  macro: (
    name: ASTIdentifier<ScopeInfo>,
    ...args: RawASTExpr<ScopeInfo>[]
  ) => ASTFunctionCall<ScopeInfo>;
  note: (content: string) => ASTNote<ScopeInfo>;
  ident: (...segments: string[]) => ASTIdentifier<ScopeInfo>;
  point: (x: ScopedASTExpr, y: ScopedASTExpr) => ASTPoint<ScopeInfo>;
  steprange: (
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
  import: (filename: string, alias: string) => ASTImport<ScopeInfo>;
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
  fromstrraw: (str: string) => ASTExpr;
  fromstr: (str: string) => ASTExpr;
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
  symbolInnerScopes: Map<number, Scope>;
  rootScope: Scope;
  filePath: string;
  substitutionLUT: Map<number, ASTExpr>;
};

// represents all the data necessary to compile a desmoscript program
export type DesmoscriptCompileContext = {
  existingNames: Set<string>;
  existingFiles: Set<string>;
  compilationUnits: Map<string, DesmoscriptCompilationUnit>;
  compilationUnitPrefixes: Map<string, string>;
  namespaceSeparator: string;
  identifierInfo: Map<number, {
    name: string,
    uses: number,
    isInlineable: boolean
  }>
};
