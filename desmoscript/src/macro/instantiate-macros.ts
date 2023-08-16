import {
  ASTNode,
  CompilationUnit,
  MacroCallNode,
  Scope,
  Scoped,
  forEachAST,
  forEachASTAsync,
  newid,
} from "../ast/ast.js";
import { createASTLookupTable } from "../combined-functionality/full-compiler.js";
import { ImportScriptsMap } from "../combined-functionality/language-support-compiler.js";
import { CompilerError } from "../compiler-errors.js";
import { debugPrint } from "../debug/debug.js";
import { IOInterface } from "../io/io.js";
import {
  ASTScopingContext,
  addScopesToAST,
  findIdentifierScopeItem,
} from "../scope-tree/create-scope-tree.js";
import {
  notFoundError,
  TypeError,
} from "../scope-tree/typecheck/type-errors.js";

import { MacroError, getMacroAPI } from "./macro-api.js";

export type InstantiateMacroContext = {
  unit: string;
  units: Map<string, CompilationUnit>;
  sourceCode: Map<string, { src: string; linesAndCols: [number, number][] }>;
  resolveImport: (str: string, importer: string) => string;
  errors: CompilerError[];
  io: IOInterface;
  watchFiles: Set<string>;
  importScripts: ImportScriptsMap;
  getAbsolutePath: (cwdfile: string, path: string) => string;
};

export function instantiateMacros(
  node: Scoped<ASTNode>,
  ctx: InstantiateMacroContext
) {
  const instantiationErrors: TypeError[] = [];

  let instantiated = false;

  forEachAST(node, undefined, (node) => {
    if (node.type != "macrocall") return;
    const scope = (node as Scoped<ASTNode>).enclosingScope;
    const scopeItem = findIdentifierScopeItem(
      ctx.units.get(ctx.unit) as CompilationUnit,
      scope,
      node.name.segments,
      { compilationUnits: ctx.units }
    );

    const scopedNode = node as Scoped<MacroCallNode>;

    if (scopeItem.result == "not-found") {
      instantiationErrors.push(
        notFoundError(
          scopedNode,
          ctx.unit,
          `the macro '${node.name.segments.join(".")}' does not exist`
        ).why[0]
      );
      return;
    } else if (scopeItem.result == "point-member-access") {
      instantiationErrors.push(
        notFoundError(scopedNode, ctx.unit, `expected a macro; got a number`)
          .why[0]
      );
      return;
    }

    if (scopeItem.identifier.type != "macro") {
      instantiationErrors.push(
        notFoundError(
          scopedNode,
          ctx.unit,
          `expected a macro; got a '${scopeItem.identifier.type}'`
        ).why[0]
      );
      return;
    }

    // don't instantiate already-instantiated macros
    if (scopedNode.result) return;

    instantiated = true;

    scopedNode.result = scopeItem.identifier.macroOperation(
      scopedNode,
      getMacroAPI(ctx.errors, scopedNode, ctx)
    );
  });

  return instantiated;
}

// actually resolving the macro instantiations is done in a separate pass
// so that all the async stuff can happen in a non-blocking manner
export async function resolveMacros(
  node: Scoped<ASTNode>,
  ctx: InstantiateMacroContext
) {
  await forEachASTAsync<Scoped<ASTNode> | undefined>(
    node,
    undefined,
    async (node, parentNode) => {
      // skip non-macrocalls
      if (node.type != "macrocall") return node as Scoped<ASTNode>;

      // the purpose of this is to wait until all unresolved macros are resolved
      // and then add scopes to them
      // so we only need to do this for unresolved macros (i.e. ones that have promises)
      if (!(node.result instanceof Promise)) return parentNode;

      try {
        node.result = await node.result;
      } catch (err) {
        if (err != "")
          node.result = {
            start: node.start,
            end: node.end,
            id: newid(),
            type: "error",
            reason: "error during macro evaluation: " + err?.toString(),
            unitName: ctx.unit,
          };
      }

      // // TODO: Find a better way of dealing with this
      // if (!node.result) {
      //   return parentNode;
      // }

      // macro instantiation result is already an AST; all we have to do is add scopes to it
      // make sure to pass the parent of the macro call as the "parent node" because scope resolution
      // should not care about whether an expression came from a macro or directly from the source
      // code
      node.result = addScopesToAST(
        node.result as ASTNode,
        {
          parentNode,
          scope: (node as Scoped<ASTNode>).enclosingScope,
        },
        {
          ...ctx,
          errors: ctx.errors,
          importScripts: ctx.importScripts,
          getAbsolutePath: ctx.getAbsolutePath,
        }
      );

      return parentNode;
    }
  );
}
