import {
  CharStreams,
  CommonTokenStream,
  ConsoleErrorListener,
  ParserRuleContext,
  Token,
} from "antlr4ts";
import { DesmoscriptLexer } from "../grammar/DesmoscriptLexer.js";
import {
  ActionExprContext,
  AddOrSubExprContext,
  ArrayDJsonContext,
  AssignmentStatementContext,
  BlockExprContext,
  BooleanDJsonContext,
  DerivativeExprContext,
  DesmoscriptDJsonContext,
  DesmoscriptParser,
  DjsonExpressionContext,
  ExpressionContext,
  FunctionCallContext,
  FunctionCallExprContext,
  FunctionDefinitionStatementContext,
  IdentifierContext,
  IdentifierExprContext,
  ImportStatementContext,
  ListCompExprContext,
  ListExprContext,
  ListMemberAccessExprContext,
  LogicalExprContext,
  MacroCallContext,
  MacroCallExprContext,
  MatchExprContext,
  MemberAccessExprContext,
  MultOrDivExprContext,
  NamedJsonStatementContext,
  NamespaceDefinitionStatementContext,
  NullDJsonContext,
  NumberDJsonContext,
  NumberExprContext,
  ObjectDJsonContext,
  ParentheticalExprContext,
  PointExprContext,
  RangeExprContext,
  StatementContext,
  StatementListContext,
  StepRangeExprContext,
  StringDJsonContext,
  StringStatementContext,
  SumProdIntegralExprContext,
} from "../grammar/DesmoscriptParser.js";
import { DesmoscriptListener } from "../grammar/DesmoscriptListener.js";
import { DesmoscriptVisitor } from "../grammar/DesmoscriptVisitor.js";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener.js";
import { TerminalNode } from "antlr4ts/tree/TerminalNode.js";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";

import {
  ast,
  parseDJson,
  parseExpr,
  parseIdent,
  parseNodeType,
  parseStatement,
} from "./ast.mjs";
import { errFull } from "../error-handling.mjs";

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

let anonScopeNameCounter = 0;
export function uniqueAnonScopeName() {
  return "$" + anonScopeNameCounter++;
}

let exprIdCounter = 0;
export const makeExprId = () => exprIdCounter++;

export class DesmoscriptASTBuilder
  extends AbstractParseTreeVisitor<ast.Node>
  implements DesmoscriptVisitor<ast.Node>
{
  filename: string;
  constructor(filename: string) {
    super();
    this.filename = filename;
  }

  withLineCol<T extends ast.Node>(
    ctx: ParserRuleContext,
    node: Omit<T, keyof ast.Context>
  ): T {
    return {
      ...node,
      line: ctx.start.line,
      col: ctx.start.charPositionInLine,
      file: this.filename,
      id: makeExprId(),
      _isnode: true,
    } as T;
  }

  defaultResult(): ast.Root {
    return {
      type: "root",
      statements: [],
      line: 0,
      col: 0,
      file: this.filename,
      id: makeExprId(),
      _isnode: true,
    };
  }

  aggregateResult(aggregate: ast.Node, nextResult: ast.Node) {
    console.log("aggregate result");
    // switch (aggregate.type) {
    //   case "root":
    //     return {
    //       ...aggregate,
    //       statements: [...aggregate.statements, parseStatement(nextResult)],
    //     };
    // }
    return aggregate;
  }

  // parseStatement(ctx: StatementContext) {
  //   return this.visit(ctx.children)
  // }

  // BINARY OPERATORS
  parseBinop(
    ctx: ParserRuleContext & {
      _left: ExpressionContext;
      _right: ExpressionContext;
      _op: Token;
    }
  ): ast.Node {
    return this.withLineCol<ast.Binop>(ctx, {
      op: ctx._op.text as unknown as PropType<ast.Binop, "op">,
      lhs: parseExpr(this.visit(ctx._left)),
      rhs: parseExpr(this.visit(ctx._right)),
      type: "binop",
    });
  }

  visitAddOrSubExpr(ctx: AddOrSubExprContext): ast.Node {
    return this.parseBinop(ctx);
  }

  visitMultOrDivExpr(ctx: MultOrDivExprContext): ast.Node {
    return this.parseBinop(ctx);
  }

  visitLogicalExpr(ctx: LogicalExprContext): ast.Node {
    return this.parseBinop(ctx);
  }

  visitAssignmentStatement(ctx: AssignmentStatementContext): ast.Node {
    return this.withLineCol<ast.Assignment>(ctx, {
      name: ctx._left.text,
      value: parseExpr(this.visit(ctx._right)),
      type: "assignment",
    });
  }

  visitActionExpr(ctx: ActionExprContext): ast.Node {
    return this.withLineCol<ast.Actions>(ctx, {
      actions: ctx._lefts.map((left, i) => [
        parseNodeType<ast.Ident>(this.visit(left), "ident"),
        parseExpr(this.visit(ctx._rights[i])),
      ]),
      others: ctx._singles.map((s) => parseExpr(this.visit(s))),
      type: "actions",
    });
  }

  visitRangeExpr(ctx: RangeExprContext): ast.Node {
    return this.parseBinop(ctx);
  }

  visitListMemberAccessExpr(ctx: ListMemberAccessExprContext): ast.Node {
    return this.parseBinop(ctx);
  }

  visitMemberAccessExpr(ctx: MemberAccessExprContext): ast.Node {
    return this.withLineCol<ast.MemberAccess>(ctx, {
      type: "memberaccess",
      lhs: parseExpr(this.visit(ctx._left)),
      rhs: ctx._right.text ?? "",
    });
  }

  visitStepRangeExpr(ctx: StepRangeExprContext): ast.Node {
    return this.withLineCol<ast.StepRange>(ctx, {
      lhs: parseExpr(this.visit(ctx._left)),
      rhs: parseExpr(this.visit(ctx._right)),
      step: parseExpr(this.visit(ctx._step)),
      type: "steprange",
    });
  }

  visitParentheticalExpr(ctx: ParentheticalExprContext) {
    return this.visit(ctx._expr);
  }

  visitNumberExpr(ctx: NumberExprContext): ast.Node {
    return this.withLineCol<ast.Number>(ctx, {
      num: Number(ctx.text),
      type: "number",
    });
  }

  visitPointExpr(ctx: PointExprContext): ast.Node {
    return this.withLineCol<ast.Point>(ctx, {
      x: parseExpr(this.visit(ctx._x)),
      y: parseExpr(this.visit(ctx._y)),
      type: "point",
    });
  }

  visitIdentifierExpr(ctx: IdentifierExprContext): ast.Node {
    return this.visit(ctx._ident);
  }

  visitIdentifier(ctx: IdentifierContext): ast.Node {
    return this.withLineCol<ast.Ident>(ctx, {
      segments: ctx._segments.map((s) => s.text ?? "ERROR"),
      type: "ident",
    });
  }

  visitListExpr(ctx: ListExprContext): ast.Node {
    return this.withLineCol<ast.List>(ctx, {
      elements: ctx._l._elements.map((elem) => parseExpr(this.visit(elem))),
      type: "list",
    });
  }

  visitListCompExpr(ctx: ListCompExprContext): ast.Node {
    return this.withLineCol<ast.Listcomp>(ctx, {
      type: "listcomp",
      variables: ctx._variables.map((v, i) => [
        v.text ?? "",
        parseExpr(this.visit(ctx._lists[i])),
      ]),
      body: parseExpr(this.visit(ctx._body)),
    });
  }

  visitSumProdIntegralExpr(ctx: SumProdIntegralExprContext): ast.Node {
    return this.withLineCol<ast.SumProdInt>(ctx, {
      type: "sumprodint",
      var: ctx._var.text ?? "",
      lo: parseExpr(this.visit(ctx._lo)),
      hi: parseExpr(this.visit(ctx._hi)),
      body: parseExpr(this.visit(ctx._body)),
      op: (ctx._op.text ?? "sum") as PropType<ast.SumProdInt, "op">,
    });
  }

  visitDerivativeExpr(ctx: DerivativeExprContext): ast.Node {
    return this.withLineCol<ast.Derivative>(ctx, {
      type: "derivative",
      var: ctx._var.text ?? "",
      body: parseExpr(this.visit(ctx._body)),
    });
  }

  visitFunctionCallExpr(ctx: FunctionCallExprContext): ast.Node {
    return this.visit(ctx._call);
  }

  visitFunctionCall(ctx: FunctionCallContext): ast.Node {
    return this.withLineCol<ast.FnCall>(ctx, {
      name: parseIdent(this.visit(ctx._fnname)),
      args: ctx._fnargs._args.map((arg) => parseExpr(this.visit(arg))),
      type: "fncall",
      isMacro: false,
    });
  }

  visitMacroCallExpr(ctx: MacroCallExprContext): ast.Node {
    return this.visit(ctx._call);
  }

  visitMacroCall(ctx: MacroCallContext): ast.Node {
    return this.withLineCol<ast.MacroCall>(ctx, {
      name: parseIdent(this.visit(ctx._fnname)),
      args: ctx._fnargs ? ctx._fnargs._args.map((arg) => this.visit(arg)) : [],
      type: "macrocall",
    });
  }

  visitFunctionDefinitionExpr(
    ctx: FunctionDefinitionStatementContext
  ): ast.Node {
    return this.withLineCol<ast.FunctionDefinition>(ctx, {
      name: ctx._fnname.text ?? "",
      args: ctx._fnargs._args.map((arg) => arg.text ?? ""),
      body: parseExpr(this.visit(ctx._expr)),
      type: "fndef",
    });
  }

  visitNamespaceDefinitionExpr(
    ctx: NamespaceDefinitionStatementContext
  ): ast.Node {
    return this.withLineCol<ast.Namespace>(ctx, {
      name: ctx._nsname.text ?? "ERROR",
      statements: ctx._statements.map((st) => parseStatement(this.visit(st))),
      type: "namespace",
    });
  }

  visitBlockExpr(ctx: BlockExprContext): ast.Node {
    return this.withLineCol<ast.Block>(ctx, {
      statements: ctx._statements.map((st) => parseStatement(this.visit(st))),
      expr: parseExpr(this.visit(ctx._expr)),
      type: "block",
    });
  }

  visitMatchExpr(ctx: MatchExprContext): ast.Node {
    return this.withLineCol<ast.Case>(ctx, {
      branches: ctx._predicate.map(
        (e, i) =>
          [parseExpr(this.visit(e)), parseExpr(this.visit(ctx._result[i]))] as [
            ast.Expr,
            ast.Expr
          ]
      ),
      fallback: ctx._fallback
        ? parseExpr(this.visit(ctx._fallback))
        : undefined,
      type: "case",
    });
  }

  visitImportExpr(ctx: ImportStatementContext): ast.Node {
    return this.withLineCol<ast.Import>(ctx, {
      filename: ctx._filename.text?.slice(1, -1) ?? "",
      alias: ctx._alias.text ?? "",
      type: "import",
    });
  }

  visitJSONExpr(ctx: DjsonExpressionContext): ast.Node {
    return this.visit(ctx._jsonval);
  }

  visitNullDJson(ctx: NullDJsonContext): ast.Node {
    return this.withLineCol<ast.djson.Null>(ctx, {
      type: "dnull",
      data: null,
    });
  }

  visitNumberDJson(ctx: NumberDJsonContext): ast.Node {
    return this.withLineCol<ast.djson.Number>(ctx, {
      type: "dnumber",
      data: Number(ctx._data.text),
    });
  }

  visitStringDJson(ctx: StringDJsonContext): ast.Node {
    return this.withLineCol<ast.djson.String>(ctx, {
      type: "dstring",
      data: ctx._data.text ?? "",
    });
  }

  visitBooleanDJson(ctx: BooleanDJsonContext): ast.Node {
    return this.withLineCol<ast.djson.Boolean>(ctx, {
      type: "dboolean",
      data: ctx._data.text == "true",
    });
  }

  visitObjectDJson(ctx: ObjectDJsonContext): ast.Node {
    const children: Record<string, ast.djson.Expr> = {};

    ctx._keys.forEach((key, i) => {
      children[key.text ?? ""] = parseDJson(this.visit(ctx._values[i]));
    });

    return this.withLineCol<ast.djson.Object>(ctx, {
      type: "dobject",
      data: children,
    });
  }

  visitArrayDJson(ctx: ArrayDJsonContext): ast.Node {
    const children: ast.djson.Expr[] = ctx._elements.map((elem) =>
      parseDJson(this.visit(elem))
    );

    return this.withLineCol<ast.djson.Array>(ctx, {
      type: "darray",
      data: children,
    });
  }

  visitDesmoscriptDJson(ctx: DesmoscriptDJsonContext): ast.Node {
    return this.withLineCol<ast.djson.Desmoscript>(ctx, {
      type: "ddesmoscript",
      data: parseExpr(this.visit(ctx._expr)),
    });
  }

  visitNamedJsonStatement(ctx: NamedJsonStatementContext): ast.Node {
    return this.withLineCol<ast.NamedJSON>(ctx, {
      type: "namedjson",
      json: parseDJson(this.visit(ctx._jsonval)),
      name: ctx._namedjsontype.text ?? "",
    });
  }

  visitStringStatement(ctx: StringStatementContext): ast.Node {
    return this.withLineCol<ast.Note>(ctx, {
      type: "note",
      text: ctx._str.text?.slice(1, -1) ?? "",
    });
  }

  visitStatementList(ctx: StatementListContext): ast.Node {
    console.log("visited stataement list");
    return this.withLineCol<ast.Root>(ctx, {
      type: "root",
      statements: ctx.children?.map((c) => parseStatement(this.visit(c))) ?? [],
    });
  }
}

// parse desmoscript file to AST
export async function desmoscriptFileToAST(filename: string) {
  const src = (await fs.readFile(filename)).toString();
  return desmoscriptStringToAST(src, filename) as ast.Root;
}

// parse desmoscript string to AST
export function desmoscriptStringToAST(src: string, filename: string) {
  let lexer = new DesmoscriptLexer(CharStreams.fromString(src));
  let tokenStream = new CommonTokenStream(lexer);
  let parser = new DesmoscriptParser(tokenStream);
  parser.removeErrorListener(ConsoleErrorListener.INSTANCE);
  parser.addErrorListener({
    syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
      errFull(
        recognizer.inputStream?.index ?? -1,
        recognizer.inputStream?.index ?? -1,
        filename,
        msg
      );
    },
  });
  let tree = parser.statementList();
  const astBuilder = new DesmoscriptASTBuilder(path.resolve(filename));
  const ast = astBuilder.visit(tree);
  return ast;
}
