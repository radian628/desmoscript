import { errFull, ierr } from "../error-handling.mjs";
import { ast } from "./ast.mjs";
import { tuple } from "../util.mjs";

// AST mapping lookup table function
type LutFn<NodeType, ReturnType, Ctx> = (
  node: NodeType,
  ctx: Ctx
) => [ReturnType, Ctx];

// AST mapping lookup table for operations on single node types
type ASTLookupTable<
  A extends ast.URIS,
  B extends ast.URIS,
  C extends ast.URIS,
  D extends ast.URIS,
  Ctx
> = {
  // expressions
  number: LutFn<ast.Number<A, B>, ast.Number<C, D>, Ctx>;
  binop: LutFn<ast.Binop<A, B>, ast.Binop<C, D>, Ctx>;
  unop: LutFn<ast.Unop<A, B>, ast.Unop<C, D>, Ctx>;
  ident: LutFn<ast.Ident<A>, ast.Ident<C>, Ctx>;
  fncall: LutFn<ast.FnCall<A, B>, ast.FnCall<C, D>, Ctx>;
  macrocall: LutFn<ast.MacroCall<A, B>, ast.MacroCall<C, D>, Ctx>;
  block: LutFn<ast.Block<A, B>, ast.Block<C, D>, Ctx>;
  listcomp: LutFn<ast.Listcomp<A, B>, ast.Listcomp<C, D>, Ctx>;
  point: LutFn<ast.Point<A, B>, ast.Point<C, D>, Ctx>;
  steprange: LutFn<ast.StepRange<A, B>, ast.StepRange<C, D>, Ctx>;
  list: LutFn<ast.List<A, B>, ast.List<C, D>, Ctx>;
  sumprodint: LutFn<ast.SumProdInt<A, B>, ast.SumProdInt<C, D>, Ctx>;
  derivative: LutFn<ast.Derivative<A, B>, ast.Derivative<C, D>, Ctx>;
  case: LutFn<ast.Case<A, B>, ast.Case<C, D>, Ctx>;
  actions: LutFn<ast.Actions<A, B>, ast.Actions<C, D>, Ctx>;
  memberaccess: LutFn<ast.MemberAccess<A, B>, ast.MemberAccess<C, D>, Ctx>;

  // djson
  dnumber: LutFn<ast.djson.Number<A>, ast.djson.Number<C>, Ctx>;
  dstring: LutFn<ast.djson.String<A>, ast.djson.String<C>, Ctx>;
  dboolean: LutFn<ast.djson.Boolean<A>, ast.djson.Boolean<C>, Ctx>;
  dnull: LutFn<ast.djson.Null<A>, ast.djson.Null<C>, Ctx>;
  darray: LutFn<ast.djson.Array<A, B>, ast.djson.Array<C, D>, Ctx>;
  dobject: LutFn<ast.djson.Object<A, B>, ast.djson.Object<C, D>, Ctx>;
  ddesmoscript: LutFn<
    ast.djson.Desmoscript<A, B>,
    ast.djson.Desmoscript<C>,
    Ctx
  >;

  // statements
  assignment: LutFn<ast.Assignment<A, B>, ast.Assignment<C, D>, Ctx>;
  namespace: LutFn<ast.Namespace<A, B>, ast.Namespace<C, D>, Ctx>;
  namedjson: LutFn<ast.NamedJSON<A, B>, ast.NamedJSON<C, D>, Ctx>;
  fndef: LutFn<ast.FunctionDefinition<A, B>, ast.FunctionDefinition<C, D>, Ctx>;
  import: LutFn<ast.Import<A, B>, ast.Import<C, D>, Ctx>;
  note: LutFn<ast.Note<A, B>, ast.Note<C, D>, Ctx>;
  root: LutFn<ast.Root<A, B>, ast.Root<C, D>, Ctx>;
};

// no-op function for AST mapping lookup table
export const noOpLutFn = <A, B>(a: A, b: B) => tuple(a, b);

export const astTypeNamesArray = [
  "number",
  "binop",
  "unop",
  "ident",
  "fncall",
  "macrocall",
  "block",
  "listcomp",
  "point",
  "steprange",
  "list",
  "sumprodint",
  "derivative",
  "case",
  "actions",
  "memberaccess",

  "dnumber",
  "dstring",
  "dboolean",
  "dnull",
  "darray",
  "dobject",
  "ddesmoscript",

  "assignment",
  "namespace",
  "namedjson",
  "fndef",
  "import",
  "note",
  "root",
] as const;
export type ASTTypeName = (typeof astTypeNamesArray)[number];

export const astTypeNames = new Set(astTypeNamesArray);

// create a lookup table that represents a no-op.
export function makeFixedOpLUT<
  A extends ast.URIS,
  Ctx,
  B extends ast.URIS,
  Names extends ASTTypeName
>(
  includedASTTypeNames: readonly Names[],
  op: (c: ast.NodeTypes<A>[Names], d: Ctx) => [ast.NodeTypes<B, A>[Names], Ctx]
): Pick<ASTLookupTable<A, A, B, A, Ctx>, Names> {
  const lut = Object.fromEntries(
    includedASTTypeNames.map((n) => {
      return [n, op];
    })
  );
  //@ts-ignore
  return lut;
}

// assert that a piece of data is an AST node
function parseNode<A extends ast.URIS, B extends ast.URIS>(
  node: any
): ast.Node<A, B> {
  if (node._isnode) {
    return node;
  }
  throw errFull(0, 0, "", "INTERNAL ERROR: Expected a node.");
}

// helper function for pre-order AST mapping
function mapASTPreOrderHelper<A extends ast.URIS, B extends ast.URIS, C>(
  ast: any,
  lut: ASTLookupTable<A, A, B, A, C>,
  ctx: C
): any {
  if (ast instanceof Map) return ast;
  if (typeof ast == "object") {
    if (ast._isnode) {
      const node = parseNode<A, A>(ast);
      //@ts-ignore
      const [newNode, newctx] = lut[node.type](node, ctx);
      for (const [k, v] of Object.entries(newNode)) {
        if (k == "enclosingScope" || k == "innerScope") continue;
        //@ts-ignore
        newNode[k] = mapASTPreOrderHelper(v, lut, newctx);
      }
      return Object.assign(node, newNode);
    }

    if (ast instanceof Promise) {
      return ast;
    }

    if (Array.isArray(ast)) {
      return ast.map((elem) => mapASTPreOrderHelper(elem, lut, ctx));
    }

    return Object.fromEntries(
      Object.entries(ast).map(([k, v]) => [
        k,
        mapASTPreOrderHelper(v, lut, ctx),
      ])
    );
  }
  return ast;
}

// map an AST in pre-order
export function mapASTPreOrder<
  A extends ast.URIS,
  B extends ast.URIS,
  C,
  NodeType extends keyof ast.NodeTypes
>(
  ast: ast.NodeTypes<A, A>[NodeType],
  lut: ASTLookupTable<A, A, B, A, C>,
  ctx: C
): ast.NodeTypes<B, B>[NodeType] {
  return mapASTPreOrderHelper(ast, lut, ctx);
}

// export type Promiseless<T> = Promise<
//   T extends Promise<infer R>
//     ? R
//     : T extends {}
//     ? {
//         [K in keyof T]: Promiseless<T[K]>;
//       }
//     : T extends (infer E)[]
//     ? Promiseless<E>[]
//     : T
// >;

export async function liftMacroPromisesHelper(ast: any): Promise<any> {
  if (ast instanceof Map) return ast;

  if (typeof ast == "object") {
    if (ast._isnode) {
      const node = parseNode<
        "macrosub" | "macrosubsync",
        "macrosub" | "macrosubsync"
      >(ast);

      if (node.type == "macrocall") {
        const newNode = { ...node, substitution: await node.substitution };
        return Object.assign(node, newNode);
      }
    }

    if (Array.isArray(ast)) {
      return Promise.all(ast.map((e) => liftMacroPromisesHelper(e)));
    }

    return Promise.all(
      Object.entries(ast).map(async ([k, v]) => {
        if (k == "enclosingScope" || k == "innerScope") return [k, v];
        return await [k, liftMacroPromisesHelper(v)];
      })
    ).then((p) => Object.fromEntries(p));
  }

  return ast;
}

export async function liftMacroPromises<
  T extends keyof ast.NodeTypes<"macrosub" | "macrosubsync">
>(
  node: ast.NodeTypes<"macrosub">[T]
): Promise<ast.NodeTypes<"macrosubsync">[T]> {
  return liftMacroPromisesHelper(node);
}

// export async function liftAllPromises<T>(t: T): Promiseless<T> {
//   if (Array.isArray(t)) {
//     let t2 = t.map((e) => liftAllPromises(e));
//     //@ts-ignore
//     return Promise.all(t2);
//   } else if (t instanceof Object) {
//     return Object.fromEntries(
//       Promise.all(
//         Object.entries(t).map(async ([k, v]) => {
//           return [k, await liftAllPromises(v)];
//         })
//       )
//     );
//   } else {
//     return t;
//   }
// }
