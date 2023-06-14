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
import { InstantiateMacroContext } from "./instantiate-macros.js";

export type MacroError = {
  reason: string | CompilerError[];
};

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
    //@ts-ignore
    if (Array.isArray(n)) return n.map((e) => map(e));

    //@ts-ignore
    if (n && typeof n == "object" && typeof n.id == "number") {
      // handle current node
      //@ts-ignore
      if (n !== node) {
        //@ts-ignore
        return mapper(n);
      }

      // handle direct child nodes
      const node2 = n as unknown as ASTNode;
      //@ts-ignore
      return Object.fromEntries(
        //@ts-ignore
        Object.entries(node2).map(([k, v]) => [k, map(v)])
      );
    }

    // handle all other properties
    //@ts-ignore
    return n;
  }

  //@ts-ignore
  return { ...map(node), id: newid() };
}

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

  node: <T extends ASTNode>(node: Omit<T, "start" | "end" | "id">) => T;
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

  return {
    //@ts-ignore
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

    readFile: (path) => {
      const abspath = getAbsolutePathRelativeToThisFile(path);
      ctx.watchFiles.add(abspath);
      return ctx.io.readFile(abspath);
    },

    readStringFile: async (filepath: string) => {
      const abspath = getAbsolutePathRelativeToThisFile(filepath);
      ctx.watchFiles.add(abspath);
      return uint8ArrayToString(await ctx.io.readFile(abspath));
    },
  };
}
