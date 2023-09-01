import {
  ASTExpr,
  ASTNode,
  MacroCallNode,
  Scope,
  Scoped,
  asExpr,
  newid,
} from "../ast/ast.js";
import { formatAST, FmtCtx } from "../ast/fmt.js";
import { CompilerError } from "../compiler-errors.js";
import { getLinesAndCols } from "../index.js";
import { uint8ArrayToString } from "../io/io.js";
import { lex } from "../parse/lex.js";
import { parse } from "../parse/parse.js";
import { untranspilableDynamicImport } from "../scope-tree/resolve-imports.js";
import { wrongTypeError } from "../scope-tree/typecheck/type-errors.js";
import { InstantiateMacroContext } from "./instantiate-macros.js";

import * as inspect from "object-inspect";

export type MacroError = {
  reason: string | CompilerError[];
};
export function assertNodeType<
  NodeType extends ASTNode["type"],
  T extends ASTNode & { type: NodeType }
>(unit: string, type: NodeType, node: ASTNode) {
  if (node.type === type) return node as T;

  throw wrongTypeError(
    node,
    unit,
    `Expected a '${type}' node, but got a '${node.type}' node.`
  );
}

export function macroError(
  reason: string | CompilerError,
  node: ASTNode,
  unit: string
): CompilerError {
  if (typeof reason == "string")
    return {
      reason,
      type: "general",
      unit,
      start: node.start,
      end: node.end,
    };
  return reason;
}

export function mapASTChildren<ASTNode>(
  node: ASTNode,
  mapper: (node: ASTNode) => ASTNode
): ASTNode {
  function map(n: any): any {
    // handle arrays within astnodes
    if (Array.isArray(n)) return n.map((e) => map(e));

    if (n && typeof n == "object" && typeof n.id == "number") {
      // handle current node
      if (n !== node) {
        return mapper(n);
      }

      // handle direct child nodes
      const node2 = n as unknown as ASTNode;
      return Object.fromEntries(
        //@ts-expect-error no.
        Object.entries(node2).map(([k, v]) => [k, map(v)])
      );
    }

    // handle all other properties
    return n;
  }

  return { ...map(node), id: newid() };
}

export type MacroCodegenAPI = {
  codegen: (node: Scoped<ASTExpr>) => string;
  getNameForIdentifier: (path: string[], scope: Scope) => string;
};

export type MacroAPI = {
  // parse a string (this will be the main way macros are used)
  // because manually creating AST nodes is honestly more annoying
  parse: (src: string) => ASTNode;

  parseExpr: (src: string) => ASTExpr;

  // throw a fatal error in case the macro fails
  fatalError: (reason: string) => never;

  // create an error message the user can recover from
  recoverableError: (reason: string) => void;

  // format AST nodes as a string
  fmt: (node: ASTNode) => string;

  readFile: (filepath: string) => Promise<Uint8Array>;
  readStringFile: (filepath: string) => Promise<string>;

  debug: (...args: any[]) => void;

  node: <T extends ASTNode>(node: Omit<T, "start" | "end" | "id">) => T;

  assertNodeType: <
    NodeType extends ASTNode["type"],
    T extends ASTNode & { type: NodeType }
  >(
    type: NodeType,
    node: ASTNode
  ) => T;
};

export function getMacroAPI(
  errors: CompilerError[],
  call: Scoped<MacroCallNode>,
  ctx: InstantiateMacroContext
): MacroAPI {
  const parseStmt = (str: string) => {
    const macroSrcName = `_macro${newid()}`;
    ctx.sourceCode.set(macroSrcName, {
      src: str,
      linesAndCols: getLinesAndCols(str),
    });

    const lexed = lex(str, macroSrcName, []);
    //if (!lexed) throw macroError(lexed.data);
    const ast = parse(lexed, macroSrcName, []);
    return ast;
  };

  function getAbsolutePathRelativeToThisFile(path: string): string {
    return ctx.io.resolvePath(ctx.io.dirname(ctx.unit), path);
  }

  const readStringFile = async (filepath: string) => {
    const abspath = getAbsolutePathRelativeToThisFile(filepath);
    ctx.watchFiles.add(abspath);
    return uint8ArrayToString(await ctx.io.readFile(abspath));
  };

  return {
    assertNodeType: (type, node) => assertNodeType(ctx.unit, type, node),

    //@ts-expect-error silly type inference
    node: (t) => {
      return {
        ...t,
        id: newid(),
        start: call.start,
        end: call.end,
      };
    },

    parse: parseStmt,

    parseExpr: (str: string) => {
      const block = parseStmt(str);

      if (block.type == "error") return block;

      if (block.type != "block" || block.body.length == 0)
        throw macroError("no expression found", call, ctx.unit);
      if (block.body.length > 1)
        throw macroError(
          "multiple expressions found; expected only one",
          call,
          ctx.unit
        );

      const expr = asExpr(block.body[block.body.length - 1]);

      if (!expr.success) {
        throw macroError(
          "expected an expression, got a non-expression",
          call,
          ctx.unit
        );
      }

      return expr.data;
    },

    fatalError(str) {
      errors.push(macroError(str, call, ctx.unit));
      throw "";
    },

    recoverableError(str) {
      errors.push(macroError(str, call, ctx.unit));
    },

    fmt(ast, ctx?: FmtCtx) {
      return formatAST(ast, ctx);
    },

    debug(...args: any[]) {
      errors.push(
        macroError(
          "Debug output from macro:\n" +
            args
              .map((arg) =>
                //@ts-expect-error dumb stupid esbuild bug
                ((inspect.default as typeof inspect) ?? inspect)(arg)
              )
              .join("\n"),
          call,
          ctx.unit
        )
      );
    },

    readFile: (path) => {
      const abspath = getAbsolutePathRelativeToThisFile(path);
      ctx.watchFiles.add(abspath);
      return ctx.io.readFile(abspath);
    },

    readStringFile,

    import: async (filepath: string) => {
      return untranspilableDynamicImport(await readStringFile(filepath));
    },
  };
}
