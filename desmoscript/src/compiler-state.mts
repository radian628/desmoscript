import { ast } from "./ast/ast.mjs";
import { MacroAPI } from "./macro/macro-api.mjs";

export namespace scopeTree {
  export type Context<A> = {
    parent: Scope<A>;
    name: string;
    id: number;
  } & A;

  export type ScopeContent<A = {}, B = A> =
    | Variable<A, B>
    | Function<A, B>
    | Macro<A, B>
    | Scope<A, B>
    | Import<A, B>
    | NamedJSON<A, B>;

  export type Variable<A = {}, B = A> = {
    type: "variable";
    data:
      | {
          type: "other";
          expr: ast.Assignment;
        }
      | {
          type: "same";
        }
      | {
          type: "builtin";
        };
  } & Context<A>;

  export type Function<A = {}, B = A> = {
    type: "function";
    data:
      | {
          type: "other";
          expr: ast.FunctionDefinition;
        }
      | {
          type: "builtin";
        };
  } & Context<A>;

  export type Macro<A = {}, B = A> = {
    type: "macro";
    fn: (call: ast.MacroCall, api: MacroAPI) => Promise<ast.Node>;
  } & Context<A>;

  export type Scope<A = {}, B = A> = {
    type: "scope";
    contents: Map<string, ScopeContent<B>>;
    parent?: Scope<A>;
    name: string;
  } & A;

  export type Import<A = {}, B = A> = {
    type: "import";
    path: string;
  } & Context<A>;

  export type NamedJSON<A = {}, B = A> = {
    type: "namedjson";
    json: ast.djson.Expr;
  } & Context<A>;
}

export type CompilationState<ASTAnnotation extends ast.URIS> = {
  names: Set<string>;
  unitNameMap: Map<string, string>;
  units: Map<string, CompilationUnit<ASTAnnotation>>;
  entryPointURL: string;
};

export type CompilationUnit<ASTAnnotation extends ast.URIS> = {
  ast: ast.Root<ASTAnnotation>;
  scopeTree: scopeTree.Scope;
  path: string;
};
