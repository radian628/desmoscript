import {
  ASTActions,
  ASTBinop,
  ASTBlock,
  ASTDecorator,
  ASTDerivative,
  ASTFunctionCall,
  ASTFunctionDef,
  ASTIdentifier,
  ASTImport,
  ASTJSON,
  ASTJsonData,
  ASTList,
  ASTListComp,
  ASTMatch,
  ASTMemberAccess,
  ASTNamedJSON,
  ASTNamespace,
  ASTNote,
  ASTNumber,
  ASTPoint,
  ASTRoot,
  ASTStepRange,
  ASTSumProdInt,
  ASTType,
  JSONType,
  RawASTExpr,
} from "./ast.mjs";

export type VisitorEntry<T, CtxBefore, RT, NodeType extends RawASTExpr<T>> = (
  node: NodeType,
  ctx: CtxBefore,
  visit: (node: RawASTExpr<T>, ctx: CtxBefore) => RT
) => RT;

export type ASTVisitorLUT<T, B, RT> = {
  number: VisitorEntry<T, B, RT, ASTNumber<T>>;
  binop: VisitorEntry<T, B, RT, ASTBinop<T>>;
  root: VisitorEntry<T, B, RT, ASTRoot<T>>;
  identifier: VisitorEntry<T, B, RT, ASTIdentifier<T>>;
  point: VisitorEntry<T, B, RT, ASTPoint<T>>;
  fncall: VisitorEntry<T, B, RT, ASTFunctionCall<T>>;
  list: VisitorEntry<T, B, RT, ASTList<T>>;
  step_range: VisitorEntry<T, B, RT, ASTStepRange<T>>;
  fndef: VisitorEntry<T, B, RT, ASTFunctionDef<T>>;
  namespace: VisitorEntry<T, B, RT, ASTNamespace<T>>;
  block: VisitorEntry<T, B, RT, ASTBlock<T>>;
  match: VisitorEntry<T, B, RT, ASTMatch<T>>;
  import: VisitorEntry<T, B, RT, ASTImport<T>>;
  sumprodint: VisitorEntry<T, B, RT, ASTSumProdInt<T>>;
  derivative: VisitorEntry<T, B, RT, ASTDerivative<T>>;
  listcomp: VisitorEntry<T, B, RT, ASTListComp<T>>;
  memberaccess: VisitorEntry<T, B, RT, ASTMemberAccess<T>>;
  json: VisitorEntry<T, B, RT, ASTJSON<T>>;
  decorator: VisitorEntry<T, B, RT, ASTDecorator<T>>;
  named_json: VisitorEntry<T, B, RT, ASTNamedJSON<T>>;
  note: VisitorEntry<T, B, RT, ASTNote<T>>;
  actions: VisitorEntry<T, B, RT, ASTActions<T>>;
  all: (expr: RawASTExpr<T>, ctx: B) => Promise<void>;
};

export async function visitAST<T, Ctx, RT>(
  root: RawASTExpr<T>,
  lut: ASTVisitorLUT<T, Ctx, RT>,
  context: Ctx
): Promise<RT> {
  const visit = (node: RawASTExpr<T>, ctx: Ctx) => {
    lut.all(node, ctx);
    //@ts-ignore
    return lut[node.type](node, ctx, visit);
  };
  return visit(root, context);
}

export function noOpLUT<T, U, RetType>(rt: Promise<RetType>): ASTVisitorLUT<T, U, Promise<RetType>> {
  return {
    async all(e, ctx) {  },

    async number(e, ctx, v) {return rt;},

    async binop(e, ctx, v) {
      await v(e.left, ctx);
      await v(e.right, ctx);
      return rt;
    },

    async root(e, ctx, v) {
      await Promise.all(e.expressions.map((e2) => v(e2, ctx)));return rt;
    },

    async identifier(e, ctx, v) {return rt;},

    async point(e, ctx, v) {
      await Promise.all([v(e.x, ctx), v(e.y, ctx)]);return rt;
    },

    async fncall(e, ctx, v) {
      await v(e.name, ctx);
      await Promise.all(e.args.map((arg) => v(arg, ctx)));return rt;
    },

    async list(e, ctx, v) {
      await Promise.all(e.elements.map((elem) => v(elem, ctx)));return rt;
    },

    async step_range(e, ctx, v) {
      await Promise.all([v(e.left, ctx), v(e.step, ctx), v(e.right, ctx)]);return rt;
    },

    async fndef(e, ctx, v) {
      await Promise.all(e.bodyExprs.map((expr) => v(expr, ctx)));return rt;
    },

    async namespace(e, ctx, v) {
      await Promise.all(
        e.bodyExprs.map((expr) => {
          v(expr, ctx);
        })
      );return rt;
    },

    async block(e, ctx, v) {
      await Promise.all(e.bodyExprs.map((expr) => v(expr, ctx)));return rt;
    },

    async match(e, ctx, v) {
      await Promise.all(
        e.branches
          .map(([predicate, value]) => [v(predicate, ctx), v(value, ctx)])
          .flat()
      );
      if (e.fallback) await v(e.fallback, ctx);return rt;
    },

    async import(e, ctx, v) {return rt;},

    async sumprodint(e, ctx, v) {
      await Promise.all([v(e.body, ctx), v(e.hi, ctx), v(e.lo, ctx)]);return rt;
    },

    async derivative(e, ctx, v) {
      await v(e.body, ctx);return rt;
    },

    async listcomp(e, ctx, v) {
      await Promise.all(
        e.variables
          .map(([varName, value]) => {
            return v(value, ctx);
          })
          .flat()
      );
      await v(e.body, ctx);return rt;
    },

    async memberaccess(e, ctx, v) {
      await v(e.left, ctx);return rt;
    },

    async json(e, ctx, v) {
      switch (e.data.jsontype) {
        case JSONType.OBJECT:
          await Promise.all(Object.values(e.data.data).map((d) => v(d, ctx)));
          break;
        case JSONType.ARRAY:
          await Promise.all(e.data.data.map((d) => v(d, ctx)));
          break;
        case JSONType.DESMOSCRIPT:
          await v(e.data.data, ctx);
      }return rt;
    },

    async decorator(e, ctx, v) {
      await v(e.json, ctx);
      await v(e.expr, ctx);return rt;
    },

    async named_json(e, ctx, v) {
      await v(e.json, ctx);return rt;
    },

    async note(e, ctx, v) {return rt;},

    async actions(e, ctx, v) {
      await Promise.all(
        e.actions.map(([l, r]) => [v(l, ctx), v(r, ctx)]).flat()
      );
      await Promise.all(e.actionAliases.map((alias) => v(alias, ctx)));return rt;
    },
  };
}
