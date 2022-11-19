import {
  CompilerError,
  DesmoscriptCompilationUnit,
  DesmoscriptCompileContext,
  ErrorType,
  Scope,
  ScopeContent,
  ScopeInfo,
} from "./analysis-types.mjs";
import { desmoscriptFileToAST, uniqueAnonScopeName } from "../ast/parse.mjs";
import * as path from "node:path";
import {
  ASTExpr,
  ASTFunctionCall,
  ASTIdentifier,
  ASTType,
  JSONType,
  RawASTExpr,
} from "../ast/ast.mjs";
import { ASTVisitorLUT, visitAST } from "../ast/ast-visitor.mjs";
import { checkNamespaceCollision, getCanonicalPath } from "./analyze-utils.mjs";

// // add a compilation unit to a compilation operation (memoized)
// export async function addDesmoscriptCompilationUnit(
//   context: DesmoscriptCompileContext,
//   filePath: string
// ) {
//   // get compilation unit if it already exists
//   const existingCompilationUnit = context.compilationUnits.has(filePath);
//   if (existingCompilationUnit) return existingCompilationUnit;

//   const ast = await desmoscriptFileToAST(filePath);
//   const compilationUnit = await astToCompilationUnitFirstPass(ast, context, filePath);
//   context.compilationUnits.set(filePath, compilationUnit);
// }

export function err(expr: RawASTExpr<{}>, reason: string): never {
  throw {
    expr,
    reason,
  };
}

export function makeAndBindNewScope(parent: Scope, name: string): Scope {
  const newScope = {
    name,
    parent,
    contents: new Map(),
  };
  parent.contents.set(name, {
    type: ScopeContent.Type.SCOPE,
    data: newScope,
  });
  return newScope;
}

type ASTToCompilationUnitContext = {
  scope: Scope;
};

function checkLengthOneSegment(e: ASTIdentifier<{}>, typename: string) {
  if (e.segments.length != 1) {
    err(
      e,
      `${typename} '${e.segments.join(
        "."
      )}' is invalid: It cannot be composed of multiple segments.`
    );
  }
}


export async function createVariableScopesAndDeclareImports(
  context: ASTToCompilationUnitContext,
  symbolScopes: Map<number, Scope>,
  compileContext: DesmoscriptCompileContext,
  dirname: string,
  ast: RawASTExpr<{}>
) {

  const lut: ASTVisitorLUT<{}, ASTToCompilationUnitContext, Promise<void>> = {
    async all(e, ctx) {
      symbolScopes.set(e.id, ctx.scope);
    },

    async number(e, ctx, v) {},

    async binop(e, ctx, v) {
      await v(e.left, ctx);
      await v(e.right, ctx);

      if (e.op == "=") {
        if (e.left.type != "identifier") {
          err(e, "Invalid left-hand side of assignment.");
        }
        checkLengthOneSegment(e.left, "Variable");
        checkNamespaceCollision(e.left, "Variable", ctx.scope);
      }
    },

    async root(e, ctx, v) {
      await Promise.all(e.expressions.map((e2) => v(e2, ctx)[0]));
    },

    async identifier(e, ctx, v) {},

    async point(e, ctx, v) {
      await Promise.all([v(e.x, ctx), v(e.y, ctx)]);
    },

    async fncall(e, ctx, v) {
      // do not calc scopes inside of a macro! variables defined in macros
      // may not actually mean anything
      if (e.isMacro) return;

      await v(e.name, ctx);
      await Promise.all(e.args.map((arg) => v(arg, ctx)[0]));
    },

    async list(e, ctx, v) {
      await Promise.all(e.elements.map((elem) => v(elem, ctx)[0]));
    },

    async step_range(e, ctx, v) {
      await Promise.all([v(e.left, ctx), v(e.step, ctx), v(e.right, ctx)]);
    },

    async fndef(e, ctx, v) {
      const innerScope = makeAndBindNewScope(ctx.scope, e.id.toString());
      const innerctx = {
        scope: innerScope,
      };
      e.args.forEach((arg) => {
        innerScope.contents.set(arg, {
          type: ScopeContent.Type.VARIABLE,
          isBuiltin: true,
        });
      });
      await Promise.all(e.bodyExprs.map((expr) => v(expr, innerctx)));

      if (e.bodyExprs.length == 0)
        err(e, "A function body must contain at least one expression.");

      checkNamespaceCollision([e, e.name], "Function", ctx.scope);
      ctx.scope.contents.set(e.name, {
        type: ScopeContent.Type.FUNCTION,
        isBuiltin: false,
        data: e,
        finalExpr: e.bodyExprs[e.bodyExprs.length - 1],
      });
    },

    async namespace(e, ctx, v) {
      checkNamespaceCollision([e, e.name], "Namespace", ctx.scope);
      const innerScope = makeAndBindNewScope(ctx.scope, e.name);
      const innerctx = {
        scope: innerScope,
      };
      await Promise.all(
        e.bodyExprs.map((expr) => {
          v(expr, innerctx);
        })
      );
    },

    async block(e, ctx, v) {
      const innerScope = makeAndBindNewScope(ctx.scope, e.id.toString());
      const innerctx = { scope: innerScope };
      await Promise.all(e.bodyExprs.map((expr) => v(expr, innerctx)));
    },

    async match(e, ctx, v) {
      await Promise.all(
        e.branches
          .map(([predicate, value]) => [v(predicate, ctx), v(value, ctx)])
          .flat()
      );
      if (e.fallback) await v(e.fallback, ctx);
    },

    async import(e, ctx, v) {
      if (compileContext.existingFiles.has(e.filename)) return;
      const fullPath = path.join(dirname, e.filename);
      const parsedOutput = await desmoscriptFileToAST(fullPath);
      astToCompilationUnitFirstPass(parsedOutput, compileContext, fullPath);
    },

    async sumprodint(e, ctx, v) {
      const innerScope = makeAndBindNewScope(ctx.scope, e.id.toString());
      const innerctx = { scope: innerScope };
      innerScope.contents.set(e.varName, {
        type: ScopeContent.Type.VARIABLE,
        isBuiltin: true,
      });
      await Promise.all([
        v(e.body, innerctx),
        v(e.hi, innerctx),
        v(e.lo, innerctx),
      ]);
    },

    async derivative(e, ctx, v) {
      const innerScope = makeAndBindNewScope(ctx.scope, e.id.toString());
      const innerctx = { scope: innerScope };
      innerScope.contents.set(e.variable, {
        type: ScopeContent.Type.VARIABLE,
        isBuiltin: true,
      });
      await v(e.body, innerctx);
    },

    async listcomp(e, ctx, v) {
      const innerScope = makeAndBindNewScope(ctx.scope, e.id.toString());
      const innerctx = { scope: innerScope };
      await Promise.all(
        e.variables
          .map(([varName, value]) => {
            innerScope.contents.set(varName, {
              type: ScopeContent.Type.VARIABLE,
              isBuiltin: true,
            });
            return v(value, innerctx);
          })
          .flat()
      );
      await v(e.body, innerctx);
    },

    async memberaccess(e, ctx, v) {
      await v(e.left, ctx);
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
      }
    },

    async decorator(e, ctx, v) {
      if (e.json.type != ASTType.JSON) {
        err(e.json, "Expected a JSON expression here.");
      }
      await v(e.json, ctx);
      await v(e.expr, ctx);
      ctx.scope.contents.set(e.id.toString(), {
        type: ScopeContent.Type.VARIABLE,
        data: e.expr,
        decoratorInfo: {
          json: e.json,
        },
      });
    },

    async named_json(e, ctx, v) {
      if (e.json.type != ASTType.JSON) {
        err(e.json, "Expected a JSON expression here.");
      }
      await v(e.json, ctx);
      ctx.scope.contents.set(e.id.toString(), {
        type: ScopeContent.Type.NAMED_JSON,
        data: e.json,
      });
    },

    async note(e, ctx, v) {
      ctx.scope.contents.set(e.id.toString(), {
        type: ScopeContent.Type.NOTE,
        data: e.text,
      });
    },

    async actions(e, ctx, v) {
      await Promise.all(
        e.actions.map(([l, r]) => [v(l, ctx), v(r, ctx)]).flat()
      );
      await Promise.all(e.actionAliases.map((alias) => v(alias, ctx)));
    },
  };

  await visitAST(ast, lut, context);
}


// compiler first pass: create variables scopes and gather files
export async function astToCompilationUnitFirstPass(
  ast: RawASTExpr<{}>,
  compileContext: DesmoscriptCompileContext,
  filePath: string
): Promise<DesmoscriptCompilationUnit> {
  compileContext.existingFiles.add(filePath);

  const dirname = path.dirname(filePath);

  const rootScope: Scope = {
    name: "root",
    contents: new Map(),
    isRoot: true
  };

  const context: ASTToCompilationUnitContext = {
    scope: rootScope,
  };

  const symbolScopes = new Map<number, Scope>();

  createVariableScopesAndDeclareImports(
    context,
    symbolScopes,
    compileContext,
    dirname,
    ast
  );

  return {
    ast,
    symbolScopes,
    rootScope,
    filePath
  };
}
