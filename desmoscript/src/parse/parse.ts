/* eslint-disable no-constant-condition */
import {
  ASTExpr,
  ASTNode,
  ASTStatement,
  AssignmentNode,
  BinaryOpNode,
  BlockNode,
  ErrorNode,
  IdentifierNode,
  ListNode,
  ListcompNode,
  MatchNode,
  NoteNode,
  NumberNode,
  ImportNode,
  asExpr,
  newid,
  FunctionCallNode,
  FunctionDefNode,
  errnode,
  UnaryOpNode,
  getErrors,
  RangeNode,
  NamespaceNode,
  ASTJson,
  ShowNode,
  SettingsNode,
  MacroCallNode,
  ImportScriptNode,
} from "../ast/ast.js";
import { SyntaxHighlightingType } from "../combined-functionality/language-support-compiler.js";
import {
  CompilerError,
  Result,
  compilerError,
  err,
  ok,
} from "../compiler-errors.js";
import { debugPrint } from "../debug/debug.js";
import { Token, token } from "./lex.js";

export interface TokenStream {
  next: (considerWhitespace?: boolean) => Token | undefined;
  peek: (considerWhitespace?: boolean) => Token | undefined;
  done: (considerWhitespace?: boolean) => boolean;
  prev: (considerWhitespace?: boolean) => void;
  prevPeek: (considerWhitespace?: boolean) => Token | undefined;
  stringpos: () => number;
  stringposend: (offset?: number, considerWhitespace?: boolean) => number;
  getpos: () => number;
  setpos: (n: number) => void;
}

export function tokenStreamify(tokens: Token[]): TokenStream {
  let pos = 0;

  return {
    next: (considerWhitespace?: boolean) => {
      if (pos >= tokens.length) return undefined;
      if (!considerWhitespace)
        while (tokens[pos] && tokens[pos].type == "whitespace") pos++;
      pos++;
      return tokens[pos - 1];
    },
    peek: (considerWhitespace?: boolean) => {
      let pos2 = pos;
      if (!considerWhitespace)
        while (tokens[pos2] && tokens[pos2].type == "whitespace") pos2++;
      return tokens[pos2];
    },
    done: (considerWhitespace?: boolean) => {
      let pos2 = pos;
      while (pos2 < tokens.length) {
        if (tokens[pos2].type != "whitespace" || considerWhitespace)
          return false;
        pos2++;
      }
      return true;
    },
    prev: (considerWhitespace?: boolean) => {
      if (considerWhitespace) {
        pos--;
        return;
      }
      do {
        pos--;
      } while (tokens[pos].type != "whitespace");
    },
    prevPeek: (considerWhitespace?: boolean) => {
      let pos2 = pos;
      if (considerWhitespace) {
        pos2--;
        return tokens[pos2];
      }
      do {
        pos2--;
      } while (tokens[pos2].type == "whitespace");
      return tokens[pos2];
    },
    stringpos: () => tokens[pos]?.start ?? tokens[tokens.length - 1].start ?? 0,
    stringposend: (offset?: number, considerWhitespace?: boolean) => {
      let remainingOffset = Math.abs(offset ?? 0);
      const offsetSign = Math.sign(offset ?? 0);
      let posOffset = 0;
      while (remainingOffset > 0) {
        posOffset += offsetSign;
        if (tokens[pos + posOffset]?.type != "whitespace" || considerWhitespace)
          remainingOffset--;
      }
      return tokens[pos + posOffset]?.end ?? tokens[tokens.length - 1].end ?? 0;
    },
    getpos: () => pos,
    setpos: (n: number) => (pos = n),
  };
}

export type ParseContext = {
  tokens: TokenStream;
  node: <T extends ASTNode>(
    nodefn: (
      a: NodeAssembler
    ) => Omit<T | ErrorNode, "start" | "end" | "id" | "unitName">,
    restartOnFailure?: boolean
  ) => T | ErrorNode;
};

export type Highlights = {
  start: number;
  end: number;
  type: SyntaxHighlightingType;
}[];

export function parse(
  tokens: Token[],
  unitName: string,
  errors: CompilerError[],
  highlights?: Highlights
) {
  const tokenStream = tokenStreamify(tokens);
  const encounteredTokenErrors = new Set<number>();
  const nodeAssembler: ParseContext["node"] = <T extends ASTNode>(
    nodefn: Parameters<ParseContext["node"]>[0],
    restartOnFailure?: boolean
  ) => {
    const start = tokenStream.stringpos();
    const oldpos = tokenStream.getpos();
    try {
      const rawNode = nodefn({
        expectToken(str, err, endOfInputErr) {
          const token = tokenStream.next();
          if (!token)
            throw errnode(
              endOfInputErr ??
                `unexpected end of input: ${err}` ??
                `unexpected end of input: expected '${str}'`,
              tokenStream.stringpos(),
              tokenStream.stringpos()
            );
          if (token.str != str)
            throw errnode(
              err ?? `expected '${str}', got '${token.str}'`,
              tokenStream.stringpos() - token.str.length - 1,
              tokenStream.stringpos()
            );
        },
        expectOneOfTheseTokens(strs, err, endOfInputErr) {
          const token = tokenStream.next();
          if (!token)
            throw errnode(
              endOfInputErr ??
                `unexpected end of input: ${err}` ??
                `unexpected end of input: expected one of ${strs
                  .map((s) => `'${s}'`)
                  .join(", ")}`,
              tokenStream.stringpos(),
              tokenStream.stringpos()
            );

          for (const str of strs) {
            if (token.str == str) return token;
          }
          throw errnode(
            err ??
              `expected one of ${strs.map((s) => `'${s}'`).join(", ")}, got '${
                token.str
              }'`,
            tokenStream.stringpos() - token.str.length,
            tokenStream.stringpos()
          );
        },
        expectTokenType(type, err, endOfInputErr) {
          const token = tokenStream.next();
          if (!token) {
            throw errnode(
              endOfInputErr ??
                `unexpected end of input: ${err}` ??
                `unexpected end of input: expected a/an '${type}' token`,
              tokenStream.stringpos(),
              tokenStream.stringpos()
            );
          }
          if (token.type != type)
            throw errnode(
              err ??
                `expected a '${type}' token; got '${token.str}' a '${token.type}' token`,
              tokenStream.stringpos() - token.str.length,
              tokenStream.stringpos()
            );
          return token;
        },
        expectExpression(bindingPower) {
          return parseExpr(ctx, bindingPower ?? 0);
        },
        expectJson(isTopLevel) {
          return parseJson(ctx, isTopLevel);
        },
        isNextToken(str) {
          const token = tokenStream.peek();
          return token?.str == str;
        },
        isNextTokenType(str) {
          const token = tokenStream.peek();
          return token?.type == str;
        },
        consumeTokenIfExists(str) {
          const token = tokenStream.peek();
          if (token?.str == str) {
            tokenStream.next();
            return true;
          }
          return false;
        },
        expectExpressionOrStatement(err, endOfInputErr) {
          const oldpos = tokenStream.getpos();
          const node = parseStatement(ctx);
          if (node.type != "error") return node;
          tokenStream.setpos(oldpos);
          return parseExpr(ctx, 0);
        },
        expectAny(bindingPower) {
          const oldpos = tokenStream.getpos();
          const node = parseStatement(ctx);
          if (node.type != "error") return node;
          tokenStream.setpos(oldpos);
          const json = parseJson(ctx);
          if (node.type != "error") return node;
          tokenStream.setpos(oldpos);
          return parseExpr(ctx, bindingPower ?? 0);
        },
        error(message) {
          return errnode(message);
        },
        tokenError(message) {
          const start = tokenStream.stringpos();
          const end = tokenStream.stringposend();
          if (encounteredTokenErrors.has(start)) {
            tokenStream.next();
          }
          encounteredTokenErrors.add(start);
          return {
            ...errnode(message),
            id: newid(),
            start,
            end,
          };
        },
        peek(considerWhitespace?: boolean) {
          const token = tokenStream.peek(considerWhitespace);
          if (!token) throw errnode("unexpected end of input");
          return token;
        },
        maybeNext(considerWhitespace?: boolean) {
          return tokenStream.next(considerWhitespace);
        },
        maybePeek() {
          return tokenStream.peek();
        },
        isEnd() {
          return tokenStream.done();
        },
        getpos() {
          return tokenStream.getpos();
        },
        setpos(n) {
          tokenStream.setpos(n);
        },
        markNoReturn() {
          restartOnFailure = false;
        },
        highlightLastToken: (highlight: SyntaxHighlightingType) => {
          const lastToken = tokenStream.prevPeek();
          if (!lastToken) throw errnode("cannot highlight undefined");

          highlights?.push({
            start: lastToken.start,
            end: lastToken.end,
            type: highlight,
          });
        },
        softError: (reason, start, end) => {
          errors.push({ reason, start, end, type: "general", unit: unitName });
        },
        clearErrorsFrom: (start, end) => {
          for (let i = 0; i < errors.length; i++) {
            if (start > errors[i].start || end < errors[i].end) {
              errors.splice(i, 1);
              i--;
            }
          }
        },
      });
      const end = tokenStream.stringposend(-1);
      if (rawNode.type == "error" && restartOnFailure)
        tokenStream.setpos(oldpos);

      return {
        id: newid(),
        start,
        end,
        ...rawNode,
      } as T;
    } catch (err) {
      if (restartOnFailure) tokenStream.setpos(oldpos);
      const errnode = err as {
        reason: string;
        type: "error";
        start?: number;
        end?: number;
      };
      if (errnode.start === undefined) delete errnode.start;
      if (errnode.end === undefined) delete errnode.end;
      return {
        unitName,
        id: newid(),
        start,
        end: tokenStream.stringpos(),
        ...errnode,
      };
    }
  };

  const ctx: ParseContext = {
    tokens: tokenStream,
    node: nodeAssembler,
  };

  const rootNode = parseBlock(ctx, true);

  return rootNode;
}

export type NodeAssembler = {
  expectToken: (str: string, err?: string, endOfInputErr?: string) => void;
  expectOneOfTheseTokens: (
    strs: string[],
    err?: string,
    endOfInputErr?: string
  ) => Token;
  expectTokenType: (
    type: Token["type"],
    err?: string,
    endOfInputErr?: string
  ) => Token;
  expectExpression: (bindingPower?: number) => ASTExpr;
  expectAny: (bindingPower?: number) => ASTNode;
  expectJson: (isTopLevel?: boolean) => ASTJson;
  isNextToken: (str: string) => boolean;
  isNextTokenType: (str: Token["type"]) => boolean;
  consumeTokenIfExists: (str: string) => boolean;
  expectExpressionOrStatement: (
    err?: string,
    endOfInputErr?: string
  ) => ASTNode;
  error: (
    message: string
  ) => Omit<ErrorNode, "id" | "start" | "end" | "unitName">;
  tokenError: (message: string) => Omit<ErrorNode, "unitName">;
  softError: (reason: string, start: number, end: number) => void;
  peek: (considerWhitespace?: boolean) => Token;
  maybeNext: (considerWhitespace?: boolean) => Token | undefined;
  maybePeek: () => Token | undefined;
  isEnd: () => boolean;
  getpos: () => number;
  setpos: (n: number) => void;
  markNoReturn: () => void;
  highlightLastToken: (highlight: SyntaxHighlightingType) => void;
  clearErrorsFrom: (start: number, end: number) => void;
};

export function parseMatch(ctx: ParseContext) {
  return ctx.node<MatchNode>((a) => {
    const branches: [ASTExpr, ASTExpr][] = [];
    a.expectToken("{");

    // get branches
    let hasFallback = false;
    let lhs: ASTExpr | undefined;
    while (!a.isNextToken("}")) {
      lhs = a.expectExpression(1);
      if (!a.isNextToken(":")) {
        hasFallback = true;
        break;
      }
      a.expectToken(":");
      const rhs = a.expectExpression(1);
      branches.push([lhs, rhs]);
      if (!a.isNextToken("}")) {
        a.expectToken(",");
      }
    }

    // get optional fallback
    let fallback: ASTExpr | undefined = undefined;
    if (hasFallback) {
      fallback = lhs;
    }

    // allow trailing comma
    a.consumeTokenIfExists(",");

    a.expectToken("}");

    return {
      branches,
      fallback,
      type: "match",
    };
  });
}

// bad parsing in blocks is handled in a special manner
// to prevent blocks from being turned into error nodes and disabling
// autocomplete and other useful language features.
export function parseBlock(ctx: ParseContext, isRoot?: boolean) {
  return ctx.node<BlockNode>((a) => {
    const body: ASTNode[] = [];
    if (!isRoot) a.expectToken("{");

    // body statements/expressions
    while (
      (!isRoot && !a.isNextToken("}") && !a.isEnd()) ||
      (isRoot && !a.isEnd())
    ) {
      body.push(a.expectExpressionOrStatement());

      // makes sure that certain types of expressions/statements have line break
      const last = body[body.length - 1];
      if ((!isRoot && !a.isNextToken("}")) || (isRoot && !a.isEnd())) {
        if (last.type == "note" || last.type == "linebreak") {
          a.consumeTokenIfExists(";");
        } else if (last.type == "assignment" || asExpr(last).success) {
          const start = ctx.tokens.stringpos();
          if (!a.isNextToken(";")) {
            body.push(
              ctx.node<ErrorNode>((a) => {
                while (!a.isNextToken(";") && !a.isEnd()) {
                  a.maybeNext();
                }
                return { reason: "expected a ';' here", type: "error" };
              })
            );
          }
          a.expectToken(";");
        } else {
          a.consumeTokenIfExists(";");
        }
      }
    }

    a.consumeTokenIfExists(";");

    if (!isRoot) a.expectToken("}");

    return { body, type: "block", isRoot };
  });
}

export function parseNumber(ctx: ParseContext) {
  return ctx.node<NumberNode>((a) => {
    const sign = a.consumeTokenIfExists("-") ? -1 : 1;

    const token = a.expectTokenType("number");
    a.highlightLastToken("number");

    return { number: Number(token.str) * sign, type: "number" };
  });
}

export function parseIdentifier(ctx: ParseContext) {
  return ctx.node<IdentifierNode>((a) => {
    const segments: string[] = [];
    let first = true;
    while (
      first ||
      a.isNextToken(".") ||
      a.isNextToken(".x") ||
      a.isNextToken(".y")
    ) {
      if (!first) {
        if (a.isNextToken(".x") || a.isNextToken(".y")) {
          const op = a.expectTokenType("op");
          a.highlightLastToken("keyword");
          segments.push(op.str[1]);
          continue;
        } else {
          a.expectToken(".");
        }
      }
      first = false;
      segments.push(a.expectTokenType("ident").str);
      if (a.isNextToken(".") || a.isNextToken(".x") || a.isNextToken(".y"))
        a.highlightLastToken("variable");
    }
    return { type: "identifier", segments };
  });
}

export function parseListOrRange(
  a: NodeAssembler,
  initElem: ASTExpr
):
  | Omit<ListNode, "id" | "start" | "end">
  | Omit<RangeNode, "id" | "start" | "end"> {
  const elements: ASTExpr[] = [initElem];

  // one-element list case
  if (a.isNextToken("]")) {
    a.maybeNext();
    return {
      elements: [initElem],
      type: "list",
    };

    // range with no step
  } else if (a.isNextToken("..")) {
    a.maybeNext();
    const rhs = a.expectExpression(1);
    a.expectToken("]");
    return { type: "range", lhs: initElem, rhs };
  }

  a.expectToken(",");

  const secondElement = a.expectExpression(1);

  // range with step
  if (a.isNextToken("..")) {
    a.maybeNext();
    const rhs = a.expectExpression(1);
    a.expectToken("]");
    return {
      type: "range" as const,
      lhs: initElem,
      rhs,
      step: secondElement,
    };
  }

  elements.push(secondElement);

  // rest of list
  while (true) {
    if (a.isNextToken("]")) break;
    a.expectToken(",");
    if (a.isNextToken("]")) break;
    elements.push(a.expectExpression(1));
  }

  a.expectToken("]");

  return {
    elements,
    type: "list" as const,
  };
}

export function parseListcomp(a: NodeAssembler, body: ASTExpr) {
  const params: [string, ASTExpr][] = [];

  while (true) {
    if (a.isNextToken("]")) break;
    const left = a.expectTokenType("ident").str;
    a.highlightLastToken("variable");
    a.expectToken("=");
    const right = a.expectExpression(1);
    params.push([left, right]);
    if (a.isNextToken("]")) break;
    a.expectToken(",");
  }

  a.expectToken("]");

  return {
    type: "listcomp" as const,
    params,
    body,
  };
}

export function parseListOrListcomp(ctx: ParseContext) {
  return ctx.node<ListcompNode | ListNode | RangeNode>((a) => {
    a.expectToken("[");
    if (a.isNextToken("]")) {
      a.maybeNext();

      a.expectToken("as", "empty lists must have type annotations");
      a.highlightLastToken("keyword");

      const type = a.expectOneOfTheseTokens(
        ["point", "number", "polygon", "color", "boolean"],
        `invalid type: valid list type annotation types are 'point', 'number', 'polygon', 'color', or 'boolean'`
      );
      a.highlightLastToken("type");

      a.expectToken("[");
      a.expectToken("]");

      return { elements: [], type: "list", typeAnnotation: type.str };
    }

    const initExpr = a.expectExpression(1);

    if (a.isNextToken(",") || a.isNextToken("]") || a.isNextToken("..")) {
      return parseListOrRange(a, initExpr);
    } else {
      a.expectToken("for");
      a.highlightLastToken("keyword");
      return parseListcomp(a, initExpr);
    }
  });
}

export function parseNote(ctx: ParseContext) {
  return ctx.node<NoteNode>((a) => {
    const note = a.expectTokenType("note");
    a.highlightLastToken("string");
    return {
      type: "note",
      content: note.str.slice(1, -1),
    };
  });
}

export function parseParenthesizedOrPoint(ctx: ParseContext) {
  return ctx.node<ASTExpr>((a) => {
    a.expectToken("(");

    const x = a.expectExpression(1);

    // if this is a parenthesized expression, end early
    if (a.isNextToken(")")) {
      a.maybeNext();
      return x;
    }

    // edge case: actions should use the commas as a separator
    // instead of treating it as a point
    if (x.type === "binop" && x.op === "->") {
      a.expectToken(",");
      const possibleActionList = {
        type: "binop" as const,
        lhs: x,
        rhs: a.expectExpression(0),
        op: ",",
      };
      a.expectToken(")");
      return possibleActionList;
    }

    a.expectToken(
      ",",
      "expected ',' (if a point) or ')' (if a paraenthesized expression)"
    );

    const y = a.expectExpression();

    a.expectToken(")");

    return { type: "point", x, y };
  });
}

export function parseFunctionCall(ctx: ParseContext) {
  return ctx.node<FunctionCallNode>((a) => {
    const name = parseIdentifier(ctx);

    if (name.type != "identifier") return a.error("expected an identifier");

    a.expectToken("(");

    const params: ASTExpr[] = [];

    while (!a.isEnd()) {
      if (a.isNextToken(")")) break;
      params.push(a.expectExpression(1));
      if (a.isNextToken(")")) break;
      a.expectToken(",");
    }

    a.expectToken(")");

    return {
      type: "fncall",
      name: name as IdentifierNode,
      params,
    };
  });
}

export function parseMacroCall(ctx: ParseContext) {
  return ctx.node<MacroCallNode>((a) => {
    const name = parseIdentifier(ctx);

    if (name.type != "identifier") return a.error("expected an identifier");

    a.expectToken("!");

    a.expectToken("(");

    const params: ASTNode[] = [];

    while (true) {
      if (a.isNextToken(")")) break;
      params.push(a.expectAny(1));
      if (a.isNextToken(")")) break;
      a.expectToken(",");
    }

    a.expectToken(")");

    return {
      type: "macrocall",
      name: name as IdentifierNode,
      params,
    };
  });
}

export function parseUnaryOp(ctx: ParseContext) {
  return ctx.node<UnaryOpNode>((a) => {
    a.expectToken("-");

    const operand = a.expectExpression(6);

    return {
      type: "unop",
      op: "-",
      operand,
    };
  });
}

export function parseInitExpr(
  ctx: ParseContext,
  a: NodeAssembler,
  initToken: Token
): ASTExpr {
  switch (initToken.type) {
    case "note":
      return parseNote(ctx);
    case "number":
      return parseNumber(ctx);
    case "ident": {
      const pos = a.getpos();
      const node = parseFunctionCall(ctx);
      if (getErrors(node).length == 0) return node;
      a.setpos(pos);
      const node2 = parseMacroCall(ctx);
      if (getErrors(node2).length == 0) return node2;
      a.setpos(pos);
      return parseIdentifier(ctx);
    }
    default:
      switch (initToken.str) {
        case "-": {
          const pos2 = a.getpos();
          const num = parseNumber(ctx);
          if (getErrors(num).length === 0) return num;
          a.setpos(pos2);
          return parseUnaryOp(ctx);
        }
        case "[":
          return parseListOrListcomp(ctx);
        case "(":
          return parseParenthesizedOrPoint(ctx);
        case "{": {
          const pos3 = a.getpos();
          const node2: ASTExpr = parseBlock(ctx);
          if (getErrors(node2).length == 0) return node2;
          a.setpos(pos3);
          return parseMatch(ctx);
        }
      }
      throw a.tokenError(`unexpected token '${initToken.str}'`);
  }
}

export const bindingPowers: Record<string, number> = {
  "^": 5,
  "*": 4,
  "/": 4,
  "+": 3,
  "-": 3,
  ">=": 6,
  "<=": 6,
  "==": 6,
  ">": 6,
  "<": 6,
  "->": 2,
  "[": 8,
  ",": 1,
};

export const rightAssociative: Record<string, boolean> = {
  "^": true,
};

export function isRightAssociative(token: Token) {
  return rightAssociative[token.str] ?? false;
}

export function getBindingPowerStr(str: string) {
  return bindingPowers[str] ?? 0;
}

export function getBindingPower(token: Token) {
  return bindingPowers[token.str] ?? 0;
}

export function parseBinaryOp(ctx: ParseContext, leftNode: ASTExpr) {
  return ctx.node<BinaryOpNode>((a) => {
    //if (leftNode.type == "error") return leftNode;

    const op = a.expectTokenType("op");

    const rhs = a.expectExpression(
      getBindingPower(op) - (isRightAssociative(op) ? 1 : 0)
    );

    return {
      type: "binop",
      lhs: leftNode,
      start: leftNode.start, // ensure that binary op nodes also include the lhs
      rhs,
      op: op.str as BinaryOpNode["op"],
    };
  });
}

export function parseConsequentExpr(
  ctx: ParseContext,
  leftNode: ASTExpr,
  token: Token
): ASTExpr | undefined {
  // handle array subscript
  if (token.str == "[") {
    return ctx.node<BinaryOpNode>((a) => {
      a.maybeNext();
      const rhs = a.expectExpression();

      a.expectToken("]");

      return {
        type: "binop",
        lhs: leftNode,
        start: leftNode.start,
        rhs,
        op: "[",
      };
    });
  }

  switch (token.type) {
    case "op":
      return parseBinaryOp(ctx, leftNode);
    default:
      return;
  }
}

export function parseExpr(ctx: ParseContext, currentBindingPower: number) {
  return ctx.node<ASTExpr>((a) => {
    const initToken = a.peek();

    let leftNode = parseInitExpr(ctx, a, initToken);

    while (true) {
      if (leftNode.type == "error") return leftNode;

      const nextToken = a.maybePeek();
      if (!nextToken) break;

      if (getBindingPower(nextToken) <= currentBindingPower) break;

      const consequentExpr = parseConsequentExpr(ctx, leftNode, nextToken);

      if (!consequentExpr) break;

      leftNode = consequentExpr;
    }

    return leftNode;
  });
}

export function parseAssignment(ctx: ParseContext) {
  return ctx.node<AssignmentNode>((a) => {
    const lhs = a.expectTokenType("ident").str;
    a.highlightLastToken("variable");

    // custom error message if assigning to namespaced variables
    if (a.isNextToken(".")) {
      return a.error(
        "Variables being assigned to cannot contain '.' characters!"
      );
    }

    a.expectToken("=");

    const rhs = a.expectExpression();

    if (rhs.type == "error")
      while (!a.isNextToken(";") && !a.isNextToken("}") && !a.isEnd())
        a.maybeNext();

    return { lhs, rhs, type: "assignment" };
  });
}

export function parseImport(ctx: ParseContext) {
  return ctx.node<ImportNode | ImportScriptNode>((a) => {
    a.expectToken("import");
    a.highlightLastToken("keyword");

    const isScript = a.consumeTokenIfExists("script");
    if (isScript) {
      a.highlightLastToken("keyword");

      const src = a.expectTokenType("note").str.slice(1, -1);
      a.highlightLastToken("string");
      return { type: "import-script", src };
    }

    const src = a.expectTokenType("note").str.slice(1, -1);
    a.highlightLastToken("string");

    let alias: string | undefined;

    if (a.isNextToken("as")) {
      a.maybeNext();
      a.highlightLastToken("keyword");
      alias = a.expectTokenType("ident").str;
      a.highlightLastToken("namespace");
    }

    return { type: "import", src, alias };
  });
}

export function parseFunctionDef(ctx: ParseContext) {
  return ctx.node<FunctionDefNode>((a) => {
    a.expectToken("fn");
    a.highlightLastToken("keyword");

    const name = a.expectTokenType("ident").str;
    a.highlightLastToken("function");

    a.expectToken("(");

    const params: string[] = [];

    while (!a.isNextToken(")")) {
      params.push(a.expectTokenType("ident").str);
      a.highlightLastToken("variable");
      if (!a.isNextToken(")")) {
        a.expectToken(",");
      } else {
        a.consumeTokenIfExists(",");
      }
    }

    a.expectToken(")");

    const oldpos = a.getpos();
    let body: BlockNode | MatchNode | ErrorNode = parseBlock(ctx);
    if (body.type == "error") {
      a.setpos(oldpos);
      body = parseMatch(ctx);
    }
    if (body.type == "error") {
      a.error(
        "expected a function body surrounded by '{}' brackets or a match expression"
      );
    }

    return { type: "fndef", params, body, name };
  });
}

export function parseNamespace(ctx: ParseContext) {
  return ctx.node<NamespaceNode>((a) => {
    a.expectToken("ns");
    a.highlightLastToken("keyword");

    const name = a.expectTokenType("ident").str;
    a.highlightLastToken("namespace");

    let settings: ASTJson | undefined = undefined;

    if (a.isNextToken("@")) {
      settings = a.expectJson();
    }

    const body = a.expectExpression();
    if (body.type != "block") {
      a.error("expected a block of expressions or statements");
    }

    return {
      type: "namespace",
      body,
      name,
      settings,
    };
  });
}

export function parseShow(ctx: ParseContext) {
  return ctx.node<ShowNode>((a) => {
    a.expectToken("show");
    a.highlightLastToken("keyword");
    const body = a.expectExpressionOrStatement();
    const settings = a.expectJson(true);
    return { type: "show", settings, body };
  });
}

export function parseSettings(ctx: ParseContext) {
  return ctx.node<SettingsNode>((a) => {
    const token = a.expectOneOfTheseTokens(["settings", "ticker"]);
    a.highlightLastToken("keyword");
    const content = a.expectJson();

    return {
      type: "settings",
      settingsType: token.str as "settings" | "ticker",
      content,
    };
  });
}

export function parseStatement(ctx: ParseContext) {
  return ctx.node<ASTStatement>((a) => {
    const nextToken = a.peek(true);

    // keep track of line breaks for formatting purposes
    if (nextToken.type == "whitespace") {
      a.maybeNext(true);
      return {
        type: "linebreak",
      };
    }

    switch (nextToken.str) {
      case "import":
        return parseImport(ctx);
      case "fn":
        return parseFunctionDef(ctx);
      case "ns":
        return parseNamespace(ctx);
      case "show":
        return parseShow(ctx);
      case "settings":
      case "ticker":
        return parseSettings(ctx);
      default:
        switch (nextToken.type) {
          case "ident":
            return parseAssignment(ctx);
          case "note":
            return parseNote(ctx);
          default: {
            const err = a.error("expected a statement");
            return err;
          }
        }
    }
  });
}

export function parseJson(ctx: ParseContext, topLevel?: boolean) {
  return ctx.node<ASTJson>((a) => {
    if (topLevel) {
      a.expectToken("@");
      a.highlightLastToken("keyword");
    } else {
      if (a.isNextToken("@")) {
        a.maybeNext();
        a.highlightLastToken("keyword");
      }
    }

    const nextToken = a.peek();

    switch (nextToken.type) {
      case "number":
        return parseNumber(ctx);
      case "note":
        return parseNote(ctx);
      case "ident":
        switch (nextToken.str) {
          case "null":
            a.maybeNext();
            a.highlightLastToken("macro");
            return { type: "json-null" };
          case "true":
            a.maybeNext();
            a.highlightLastToken("macro");
            return { type: "json-boolean", data: true };
          case "false":
            a.maybeNext();
            a.highlightLastToken("macro");
            return { type: "json-boolean", data: false };
          case "ds": {
            a.maybeNext();
            a.highlightLastToken("keyword");
            a.expectToken("(");
            const expr = a.expectExpression();
            a.expectToken(")");
            return { type: "json-inner-expr", expr };
          }
        }
      // eslint-disable-next-line no-fallthrough
      default:
        if (nextToken.str == "{") {
          a.expectToken("{");

          const data: [string, ASTJson][] = [];

          let first = true;
          while (true) {
            if (a.isNextToken("}")) break;
            if (!first) a.expectToken(",");
            if (a.isNextToken("}")) break;
            first = false;

            const lhs = a.expectTokenType("ident").str;
            a.highlightLastToken("variable");
            a.expectToken(":");
            const rhs = a.expectJson();

            data.push([lhs, rhs]);
          }

          a.expectToken("}");

          return { type: "json-object", data };
        }

        if (nextToken.str == "[") {
          a.expectToken("[");

          const elements: ASTJson[] = [];
          while (true) {
            if (a.isNextToken("]")) break;
            elements.push(a.expectJson());
            if (a.isNextToken("]")) break;
            a.expectToken(",");
          }

          a.expectToken("]");

          return { type: "json-array", elements };
        }

        if (nextToken.str == "-") return parseNumber(ctx);

        return a.error("expected a desmoscript json expression");
    }
  });
}
