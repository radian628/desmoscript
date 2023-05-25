import { CharStreams, CommonTokenStream, ConsoleErrorListener, } from "antlr4ts";
import { DesmoscriptLexer } from "../grammar/DesmoscriptLexer.js";
import { DesmoscriptParser, } from "../grammar/DesmoscriptParser.js";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor.js";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { parseDJson, parseExpr, parseIdent, parseNodeType, parseStatement, } from "./ast.mjs";
import { errFull } from "../error-handling.mjs";
let anonScopeNameCounter = 0;
export function uniqueAnonScopeName() {
    return "$" + anonScopeNameCounter++;
}
let exprIdCounter = 0;
export const makeExprId = () => exprIdCounter++;
export class DesmoscriptASTBuilder extends AbstractParseTreeVisitor {
    constructor(filename) {
        super();
        this.filename = filename;
    }
    withLineCol(ctx, node) {
        return {
            ...node,
            line: ctx.start.line,
            col: ctx.start.charPositionInLine,
            file: this.filename,
            id: makeExprId(),
            _isnode: true,
        };
    }
    defaultResult() {
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
    aggregateResult(aggregate, nextResult) {
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
    parseBinop(ctx) {
        return this.withLineCol(ctx, {
            op: ctx._op.text,
            lhs: parseExpr(this.visit(ctx._left)),
            rhs: parseExpr(this.visit(ctx._right)),
            type: "binop",
        });
    }
    visitAddOrSubExpr(ctx) {
        return this.parseBinop(ctx);
    }
    visitMultOrDivExpr(ctx) {
        return this.parseBinop(ctx);
    }
    visitLogicalExpr(ctx) {
        return this.parseBinop(ctx);
    }
    visitAssignmentStatement(ctx) {
        return this.withLineCol(ctx, {
            name: ctx._left.text,
            value: parseExpr(this.visit(ctx._right)),
            type: "assignment",
        });
    }
    visitActionExpr(ctx) {
        return this.withLineCol(ctx, {
            actions: ctx._lefts.map((left, i) => [
                parseNodeType(this.visit(left), "ident"),
                parseExpr(this.visit(ctx._rights[i])),
            ]),
            others: ctx._singles.map((s) => parseExpr(this.visit(s))),
            type: "actions",
        });
    }
    visitRangeExpr(ctx) {
        return this.parseBinop(ctx);
    }
    visitListMemberAccessExpr(ctx) {
        return this.parseBinop(ctx);
    }
    visitMemberAccessExpr(ctx) {
        return this.withLineCol(ctx, {
            type: "memberaccess",
            lhs: parseExpr(this.visit(ctx._left)),
            rhs: ctx._right.text ?? "",
        });
    }
    visitStepRangeExpr(ctx) {
        return this.withLineCol(ctx, {
            lhs: parseExpr(this.visit(ctx._left)),
            rhs: parseExpr(this.visit(ctx._right)),
            step: parseExpr(this.visit(ctx._step)),
            type: "steprange",
        });
    }
    visitParentheticalExpr(ctx) {
        return this.visit(ctx._expr);
    }
    visitNumberExpr(ctx) {
        return this.withLineCol(ctx, {
            num: Number(ctx.text),
            type: "number",
        });
    }
    visitPointExpr(ctx) {
        return this.withLineCol(ctx, {
            x: parseExpr(this.visit(ctx._x)),
            y: parseExpr(this.visit(ctx._y)),
            type: "point",
        });
    }
    visitIdentifierExpr(ctx) {
        return this.visit(ctx._ident);
    }
    visitIdentifier(ctx) {
        return this.withLineCol(ctx, {
            segments: ctx._segments.map((s) => s.text ?? "ERROR"),
            type: "ident",
        });
    }
    visitListExpr(ctx) {
        return this.withLineCol(ctx, {
            elements: ctx._l._elements.map((elem) => parseExpr(this.visit(elem))),
            type: "list",
        });
    }
    visitListCompExpr(ctx) {
        return this.withLineCol(ctx, {
            type: "listcomp",
            variables: ctx._variables.map((v, i) => [
                v.text ?? "",
                parseExpr(this.visit(ctx._lists[i])),
            ]),
            body: parseExpr(this.visit(ctx._body)),
        });
    }
    visitSumProdIntegralExpr(ctx) {
        return this.withLineCol(ctx, {
            type: "sumprodint",
            var: ctx._var.text ?? "",
            lo: parseExpr(this.visit(ctx._lo)),
            hi: parseExpr(this.visit(ctx._hi)),
            body: parseExpr(this.visit(ctx._body)),
            op: (ctx._op.text ?? "sum"),
        });
    }
    visitDerivativeExpr(ctx) {
        return this.withLineCol(ctx, {
            type: "derivative",
            var: ctx._var.text ?? "",
            body: parseExpr(this.visit(ctx._body)),
        });
    }
    visitFunctionCallExpr(ctx) {
        return this.visit(ctx._call);
    }
    visitFunctionCall(ctx) {
        return this.withLineCol(ctx, {
            name: parseIdent(this.visit(ctx._fnname)),
            args: ctx._fnargs._args.map((arg) => parseExpr(this.visit(arg))),
            type: "fncall",
            isMacro: false,
        });
    }
    visitMacroCallExpr(ctx) {
        return this.visit(ctx._call);
    }
    visitMacroCall(ctx) {
        return this.withLineCol(ctx, {
            name: parseIdent(this.visit(ctx._fnname)),
            args: ctx._fnargs ? ctx._fnargs._args.map((arg) => this.visit(arg)) : [],
            type: "macrocall",
        });
    }
    visitFunctionDefinitionExpr(ctx) {
        return this.withLineCol(ctx, {
            name: ctx._fnname.text ?? "",
            args: ctx._fnargs._args.map((arg) => arg.text ?? ""),
            body: parseExpr(this.visit(ctx._expr)),
            type: "fndef",
        });
    }
    visitNamespaceDefinitionExpr(ctx) {
        return this.withLineCol(ctx, {
            name: ctx._nsname.text ?? "ERROR",
            statements: ctx._statements.map((st) => parseStatement(this.visit(st))),
            type: "namespace",
        });
    }
    visitBlockExpr(ctx) {
        return this.withLineCol(ctx, {
            statements: ctx._statements.map((st) => parseStatement(this.visit(st))),
            expr: parseExpr(this.visit(ctx._expr)),
            type: "block",
        });
    }
    visitMatchExpr(ctx) {
        return this.withLineCol(ctx, {
            branches: ctx._predicate.map((e, i) => [parseExpr(this.visit(e)), parseExpr(this.visit(ctx._result[i]))]),
            fallback: ctx._fallback
                ? parseExpr(this.visit(ctx._fallback))
                : undefined,
            type: "case",
        });
    }
    visitImportExpr(ctx) {
        return this.withLineCol(ctx, {
            filename: ctx._filename.text?.slice(1, -1) ?? "",
            alias: ctx._alias.text ?? "",
            type: "import",
        });
    }
    visitJSONExpr(ctx) {
        return this.visit(ctx._jsonval);
    }
    visitNullDJson(ctx) {
        return this.withLineCol(ctx, {
            type: "dnull",
            data: null,
        });
    }
    visitNumberDJson(ctx) {
        return this.withLineCol(ctx, {
            type: "dnumber",
            data: Number(ctx._data.text),
        });
    }
    visitStringDJson(ctx) {
        return this.withLineCol(ctx, {
            type: "dstring",
            data: ctx._data.text ?? "",
        });
    }
    visitBooleanDJson(ctx) {
        return this.withLineCol(ctx, {
            type: "dboolean",
            data: ctx._data.text == "true",
        });
    }
    visitObjectDJson(ctx) {
        const children = {};
        ctx._keys.forEach((key, i) => {
            children[key.text ?? ""] = parseDJson(this.visit(ctx._values[i]));
        });
        return this.withLineCol(ctx, {
            type: "dobject",
            data: children,
        });
    }
    visitArrayDJson(ctx) {
        const children = ctx._elements.map((elem) => parseDJson(this.visit(elem)));
        return this.withLineCol(ctx, {
            type: "darray",
            data: children,
        });
    }
    visitDesmoscriptDJson(ctx) {
        return this.withLineCol(ctx, {
            type: "ddesmoscript",
            data: parseExpr(this.visit(ctx._expr)),
        });
    }
    visitNamedJsonStatement(ctx) {
        return this.withLineCol(ctx, {
            type: "namedjson",
            json: parseDJson(this.visit(ctx._jsonval)),
            name: ctx._namedjsontype.text ?? "",
        });
    }
    visitStringStatement(ctx) {
        return this.withLineCol(ctx, {
            type: "note",
            text: ctx._str.text?.slice(1, -1) ?? "",
        });
    }
    visitStatementList(ctx) {
        console.log("visited stataement list");
        return this.withLineCol(ctx, {
            type: "root",
            statements: ctx.children?.map((c) => parseStatement(this.visit(c))) ?? [],
        });
    }
}
// parse desmoscript file to AST
export async function desmoscriptFileToAST(filename) {
    const src = (await fs.readFile(filename)).toString();
    return desmoscriptStringToAST(src, filename);
}
// parse desmoscript string to AST
export function desmoscriptStringToAST(src, filename) {
    let lexer = new DesmoscriptLexer(CharStreams.fromString(src));
    let tokenStream = new CommonTokenStream(lexer);
    let parser = new DesmoscriptParser(tokenStream);
    parser.removeErrorListener(ConsoleErrorListener.INSTANCE);
    parser.addErrorListener({
        syntaxError(recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
            errFull(recognizer.inputStream?.index ?? -1, recognizer.inputStream?.index ?? -1, filename, msg);
        },
    });
    let tree = parser.statementList();
    const astBuilder = new DesmoscriptASTBuilder(path.resolve(filename));
    const ast = astBuilder.visit(tree);
    return ast;
}
