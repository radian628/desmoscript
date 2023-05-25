import { type } from "os";
import { scopeTree } from "../compiler-state.mjs";
import { err, ierr } from "../error-handling.mjs";

export namespace ast {
  // AST node context that explains stuff about the AST node
  export type Context<B extends URIS = "", A = ""> = {
    line: number;
    col: number;
    file: string;
    _isnode: true;
    id: number;
  } & URIToKind<A>[B];

  //https://ybogomolov.me/01-higher-kinded-types/
  type URIToKind<A> = {
    withscope: WithScope<A>;
    macrosub: WithMacroSub<A> & WithScope<A>;
    macrosubsync: WithMacroSubSync<A> & WithScope<A>;
    "": {};
  };
  export type URIS = keyof URIToKind<unknown>;

  // adds macro substitution field to macro calls
  export type WithMacroSub<Type> = Type extends "macrocall"
    ? {
        substitution?: Promise<Node<"macrosub">>;
      }
    : {};

  export type WithMacroSubSync<Type> = Type extends "macrocall"
    ? {
        substitution?: Node<"macrosubsync">;
      }
    : {};

  type WithInnerScope = { innerScope: scopeTree.Scope };

  export type WithScope<Type> = {
    enclosingScope: scopeTree.Scope;
  } & (Type extends
    | "fndef"
    | "listcomp"
    | "block"
    | "sumprodint"
    | "derivative"
    | "namespace"
    | "root"
    ? WithInnerScope
    : {});

  // EXPRESSIONS
  export type Expr<A extends URIS = "", B extends URIS = A> =
    | Number<A, B>
    | Binop<A, B>
    | Unop<A, B>
    | Ident<A>
    | FnCall<A, B>
    | MacroCall<A, B>
    | Block<A, B>
    | Listcomp<A, B>
    | Point<A, B>
    | StepRange<A, B>
    | List<A, B>
    | SumProdInt<A, B>
    | Derivative<A, B>
    | Case<A, B>
    | Actions<A, B>
    | MemberAccess<A, B>;

  export type Number<A extends URIS = "", B extends URIS = A> = {
    type: "number";
    num: number;
  } & Context<A, "number">;

  export type Binop<A extends URIS = "", B extends URIS = A> = {
    type: "binop";
    lhs: Expr<B>;
    rhs: Expr<B>;
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
      | "->"
      | "["
      | "^"
      | "\\"
      | "&&"
      | "||";
  } & Context<A, "binop">;

  export type Unop<A extends URIS = "", B extends URIS = A> = {
    type: "unop";
    expr: Expr<B>;
    op: "!" | "-";
  } & Context<A, "unop">;

  export type Ident<A extends URIS = ""> = {
    type: "ident";
    segments: string[];
  } & Context<A, "ident">;

  export type FnCall<A extends URIS = "", B extends URIS = A> = {
    type: "fncall";
    name: Ident<B>;
    args: Expr<B>[];
    isMacro: boolean;
  } & Context<A, "fncall">;

  export type MacroCall<A extends URIS = "", B extends URIS = A> = {
    type: "macrocall";
    name: Ident;
    args: Node<B>[];
  } & Context<A, "macrocall">;

  export type Block<A extends URIS = "", B extends URIS = A> = {
    type: "block";
    expr: Expr<B>;
    statements: Statement<B>[];
  } & Context<A, "block">;

  export type Listcomp<A extends URIS = "", B extends URIS = A> = {
    type: "listcomp";
    body: Expr<B>;
    variables: [string, Expr<B>][];
  } & Context<A, "listcomp">;

  export type Point<A extends URIS = "", B extends URIS = A> = {
    type: "point";
    x: Expr<B>;
    y: Expr<B>;
  } & Context<A, "point">;

  export type StepRange<A extends URIS = "", B extends URIS = A> = {
    type: "steprange";
    lhs: Expr<B>;
    step: Expr<B>;
    rhs: Expr<B>;
  } & Context<A, "steprange">;

  export type List<A extends URIS = "", B extends URIS = A> = {
    type: "list";
    elements: Expr<B>[];
  } & Context<A, "list">;

  export type SumProdInt<A extends URIS = "", B extends URIS = A> = {
    type: "sumprodint";
    op: "sum" | "product" | "integral";
    var: string;
    lo: Expr<B>;
    hi: Expr<B>;
    body: Expr<B>;
  } & Context<A, "sumprodint">;

  export type Derivative<A extends URIS = "", B extends URIS = A> = {
    type: "derivative";
    var: string;
    body: Expr<B>;
  } & Context<A, "derivative">;

  export type Case<A extends URIS = "", B extends URIS = A> = {
    type: "case";
    branches: [Expr<B>, Expr<B>][];
    fallback?: Expr<B>;
  } & Context<A, "case">;

  export type Actions<A extends URIS = "", B extends URIS = A> = {
    type: "actions";
    actions: [Ident<B>, Expr<B>][];
    others: Expr<B>[];
  } & Context<A, "actions">;

  export type MemberAccess<A extends URIS = "", B extends URIS = A> = {
    type: "memberaccess";
    lhs: Expr<B>;
    rhs: string;
  } & Context<A, "memberaccess">;

  type DesmoscriptExpr<A extends URIS = "", B extends URIS = A> = Expr<A, B>;

  // DJSON
  export namespace djson {
    export type Expr<A extends URIS = "", B extends URIS = A> =
      | Number<A>
      | String<A>
      | Boolean<A>
      | Null<A>
      | Array<A, B>
      | Object<A, B>
      | Desmoscript<A, B>;

    export type Number<A extends URIS = ""> = {
      type: "dnumber";
      data: number;
    } & Context<A, "dnumber">;
    export type String<A extends URIS = ""> = {
      type: "dstring";
      data: string;
    } & Context<A, "dstring">;
    export type Boolean<A extends URIS = ""> = {
      type: "dboolean";
      data: boolean;
    } & Context<A, "dboolean">;
    export type Null<A extends URIS = ""> = {
      type: "dnull";
      data: null;
    } & Context<A, "dnull">;
    export type Array<A extends URIS = "", B extends URIS = A> = {
      type: "darray";
      data: Expr<B>[];
    } & Context<A, "darray">;
    export type Object<A extends URIS = "", B extends URIS = A> = {
      type: "dobject";
      data: { [key: string]: Expr<B> };
    } & Context<A, "dobject">;
    export type Desmoscript<A extends URIS = "", B extends URIS = A> = {
      type: "ddesmoscript";
      data: DesmoscriptExpr<B>;
    } & Context<A, "ddesmoscript">;
  }

  // STATEMENTS
  export type Statement<A extends URIS = "", B extends URIS = A> =
    | Assignment<A, B>
    | Namespace<A, B>
    | NamedJSON<A, B>
    | FunctionDefinition<A, B>
    | Import<A>
    | Note<A>
    | Root<A, B>;

  export type Assignment<A extends URIS = "", B extends URIS = A> = {
    type: "assignment";
    name: string;
    value: Expr<B>;
    annotation?: djson.Expr<B>; // TODO
  } & Context<A, "assignment">;

  export type Namespace<A extends URIS = "", B extends URIS = A> = {
    type: "namespace";
    name: string;
    statements: Statement<B>[];
  } & Context<A, "namespace">;

  export type NamedJSON<A extends URIS = "", B extends URIS = A> = {
    type: "namedjson";
    name: string;
    json: djson.Expr<B>;
  } & Context<A, "namedjson">;

  export type FunctionDefinition<A extends URIS = "", B extends URIS = A> = {
    type: "fndef";
    name: string;
    args: string[];
    body: Expr<B>;
  } & Context<A, "fndef">;

  export type Import<A extends URIS = "", B extends URIS = A> = {
    type: "import";
    filename: string;
    alias: string;
  } & Context<A, "import">;

  export type Note<A extends URIS = "", B extends URIS = A> = {
    type: "note";
    text: string;
  } & Context<A, "note">;

  export type Root<A extends URIS = "", B extends URIS = A> = {
    type: "root";
    statements: Statement<B>[];
  } & Context<A, "root">;

  export type Node<A extends URIS = "", B extends URIS = A> =
    | Expr<A, B>
    | djson.Expr<A, B>
    | Statement<A, B>;

  export type NodeTypes<A extends URIS = "", B extends URIS = A> = {
    number: Number<A, B>;
    binop: Binop<A, B>;
    unop: Unop<A, B>;
    ident: Ident<A>;
    fncall: FnCall<A, B>;
    macrocall: MacroCall<A, B>;
    block: Block<A, B>;
    listcomp: Listcomp<A, B>;
    point: Point<A, B>;
    steprange: StepRange<A, B>;
    list: List<A, B>;
    sumprodint: SumProdInt<A, B>;
    derivative: Derivative<A, B>;
    case: Case<A, B>;
    actions: Actions<A, B>;
    memberaccess: MemberAccess<A, B>;

    dnumber: djson.Number<A>;
    dstring: djson.String<A>;
    dnull: djson.Null<A>;
    dboolean: djson.Boolean<A>;
    dobject: djson.Object<A, B>;
    darray: djson.Array<A, B>;
    ddesmoscript: djson.Desmoscript<A, B>;

    assignment: Assignment<A, B>;
    namespace: Namespace<A, B>;
    namedjson: NamedJSON<A, B>;
    fndef: FunctionDefinition<A, B>;
    import: Import<A, B>;
    note: Note<A, B>;
    root: Root<A, B>;
  };
}

// assert that a node is an expression
export function parseExpr<T extends ast.URIS>(
  node: ast.Node<T>,
  notInternal?: boolean
): ast.Expr<T> {
  switch (node.type) {
    case "number":
    case "binop":
    case "unop":
    case "ident":
    case "fncall":
    case "macrocall":
    case "block":
    case "listcomp":
    case "point":
    case "steprange":
    case "list":
    case "sumprodint":
    case "derivative":
    case "case":
    case "actions":
    case "memberaccess":
      return node;
  }
  if (notInternal) err(node, "Expected an expression.");
  ierr(node, "Expected an expression.");
}

// assert that a node is DJSON
export function parseDJson(node: ast.Node): ast.djson.Expr {
  switch (node.type) {
    case "dnumber":
    case "dstring":
    case "dnull":
    case "dboolean":
    case "dobject":
    case "darray":
    case "ddesmoscript":
      return node;
  }
  ierr(node, "Expected DJSON.");
}

// assert that a node is a statement
export function parseStatement(node: ast.Node): ast.Statement {
  switch (node.type) {
    case "assignment":
    case "namespace":
    case "namedjson":
    case "fndef":
    case "import":
    case "note":
    case "root":
      return node;
  }
  ierr(node, "Expected a statement.");
}

// assert that a node is of a given type
export function parseNodeType<T extends ast.Node>(
  node: ast.Node,
  type: T["type"]
): T {
  if (node.type == type) {
    return node as T;
  }
  ierr(node, `Expected a '${type}' node`);
}

// assert that a node is an identifier
export function parseIdent(node: ast.Node) {
  return parseNodeType<ast.Ident>(node, "ident");
}
