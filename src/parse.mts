import { CharStreams, CommonTokenStream, ParserRuleContext, Token } from "antlr4ts";
import {ParseTreeWalker} from "antlr4ts/tree/ParseTreeWalker";
import { DesmoscriptLexer } from "./grammar/DesmoscriptLexer";
import { AddOrSubExprContext, ArrayDJsonContext, AssignmentExprContext, BlockExprContext, BooleanDJsonContext, DecoratedExprContext, DerivativeExprContext, DesmoscriptDJsonContext, DesmoscriptParser, ExpressionContext, ExpressionListContext, FunctionCallContext, FunctionCallExprContext, FunctionDefinitionExprContext, IdentifierContext, IdentifierExprContext, ImportExprContext, JSONExprContext, ListCompExprContext, ListExprContext, ListMemberAccessExprContext, LogicalExprContext, MacroCallContext, MacroCallExprContext, MacroDefinitionExprContext, MatchExprContext, MemberAccessExprContext, MultOrDivExprContext, NamedJsonExprContext, NamespaceDefinitionExprContext, NullDJsonContext, NumberDJsonContext, NumberExprContext, ObjectDJsonContext, ParentheticalExprContext, PointExprContext, RangeExprContext, StepRangeExprContext, StringDJsonContext, SumProdIntegralExprContext } from "./grammar/DesmoscriptParser";
import { DesmoscriptListener } from "./grammar/DesmoscriptListener";
import { DesmoscriptVisitor } from "./grammar/DesmoscriptVisitor";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import {AbstractParseTreeVisitor} from "antlr4ts/tree/AbstractParseTreeVisitor";

import * as ds from "./ast.mjs";

type PropType<TObj, TProp extends keyof TObj> = TObj[TProp];

export class DesmoscriptASTBuilder extends AbstractParseTreeVisitor<ds.ASTExpr> implements DesmoscriptVisitor<ds.ASTExpr> {
    filename: string
    constructor (filename: string) {
        super();
        this.filename = filename;
    }
    
    withLineCol<T>(ctx: ParserRuleContext, node: Omit<T, keyof ds.LineCol>): ds.ASTExpr {
        //@ts-ignore
        return {
            ...node,
            line: ctx.start.line,
            col: ctx.start.charPositionInLine,
            file: this.filename
        };
    }

    defaultResult(): ds.ASTRoot<{}> {
        return {
            type: ds.ASTType.ROOT,
            expressions: [],
            line: 1,
            col: 1,
            file: this.filename
        };
    }

    aggregateResult(aggregate: ds.ASTExpr, nextResult: ds.ASTExpr) {
        switch (aggregate.type) {
            case ds.ASTType.ROOT:
                return {
                    ...aggregate,
                    expressions: [...aggregate.expressions, nextResult]
                };
        }
        return aggregate;
    }

    visitExpressionList(ctx: ExpressionListContext): ds.ASTExpr {
        return this.visitChildren(ctx);
    }





    // BINARY OPERATORS
    parseBinop(ctx: ParserRuleContext & { _left: ExpressionContext, _right: ExpressionContext, _op: Token }): ds.ASTExpr {
        return this.withLineCol<ds.ASTBinop<{}>>(ctx, {
            op: (ctx._op.text as unknown) as PropType<ds.ASTBinop<{}>, "op">,
            left: this.visit(ctx._left),
            right: this.visit(ctx._right),
            type: ds.ASTType.BINOP
        });
    }

    visitAddOrSubExpr(ctx: AddOrSubExprContext): ds.ASTExpr {
        //console.log("add sub: ", ctx.text);
        return this.parseBinop(ctx);
    }

    visitMultOrDivExpr(ctx: MultOrDivExprContext): ds.ASTExpr {
        //console.log("mult div: ", ctx.text);
        return this.parseBinop(ctx);
    }

    visitLogicalExpr(ctx: LogicalExprContext): ds.ASTExpr {
        //console.log("logical: ", ctx.text);
        return this.parseBinop(ctx);
    }

    visitAssignmentExpr(ctx: AssignmentExprContext): ds.ASTExpr {
        return this.parseBinop(ctx);
    }

    visitActionExpr(ctx: AssignmentExprContext): ds.ASTExpr {
        return this.parseBinop(ctx);
    }

    visitRangeExpr(ctx: RangeExprContext): ds.ASTExpr {
        return this.parseBinop(ctx);
    }

    visitListMemberAccessExpr(ctx: ListMemberAccessExprContext): ds.ASTExpr {
        return this.parseBinop(ctx);
    }

    visitMemberAccessExpr(ctx: MemberAccessExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTMemberAccess<{}>>(ctx, {
            type: ds.ASTType.MEMBERACCESS,
            left: this.visit(ctx._left),
            right: ctx._right.text ?? ""
        });
    }

    visitStepRangeExpr(ctx: StepRangeExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTStepRange<{}>>(ctx, {
            left: this.visit(ctx._left),
            right: this.visit(ctx._right),
            step: this.visit(ctx._step),
            type: ds.ASTType.STEP_RANGE
        });
    }






    visitParentheticalExpr(ctx: ParentheticalExprContext) {
        return this.visit(ctx._expr);
    }





    parseNumericalExpr(ctx: ParserRuleContext) {
        return this.withLineCol<ds.ASTNumber<{}>>(ctx, {
            number: Number(ctx.text),
            type: ds.ASTType.NUMBER
        });
    }

    visitNumberExpr(ctx: NumberExprContext): ds.ASTExpr {
        return this.parseNumericalExpr(ctx);
    }

    visitPointExpr(ctx: PointExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTPoint<{}>>(ctx, {
            x: this.visit(ctx._x),
            y: this.visit(ctx._y),
            type: ds.ASTType.POINT
        });
    }

    visitIdentifierExpr(ctx: IdentifierExprContext): ds.ASTExpr {
        return this.visit(ctx._ident);
    }

    visitIdentifier(ctx: IdentifierContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTIdentifier<{}>>(ctx, {
            segments: ctx._segments.map(s => s.text ?? "ERROR"),
            type: ds.ASTType.IDENTIFIER
        });
    }

    visitListExpr(ctx: ListExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTList<{}>>(ctx, {
            elements: ctx._l._elements.map(elem => this.visit(elem)),
            type: ds.ASTType.LIST
        });
    }

    visitListCompExpr(ctx: ListCompExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTListComp<{}>>(ctx, {
            type: ds.ASTType.LISTCOMP,
            variables: ctx._variables.map((v, i) => [v.text ?? "", this.visit(ctx._lists[i])]),
            body: this.visit(ctx._body)
        });
    }

    visitSumProdIntegralExpr(ctx: SumProdIntegralExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTSumProdInt<{}>>(ctx, {
            type: ds.ASTType.SUMPRODINT,
            varName: ctx._var.text ?? "",
            lo: this.visit(ctx._lo),
            hi: this.visit(ctx._hi),
            body: this.visit(ctx._body),
            opType: (ctx._op.text ?? "sum") as PropType<ds.ASTSumProdInt<{}>, "opType">
        });
    }

    visitDerivativeExpr(ctx: DerivativeExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTDerivative<{}>>(ctx, {
            type: ds.ASTType.DERIVATIVE,
            variable: ctx._var.text ?? "",
            body: this.visit(ctx._body)
        });
    }





    visitFunctionCallExpr(ctx: FunctionCallExprContext): ds.ASTExpr {
        return this.visit(ctx._call);
    }

    visitFunctionCall(ctx: FunctionCallContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTFunctionCall<{}>>(ctx, {
            name: this.visit(ctx._fnname),
            args: ctx._fnargs._args.map(arg => this.visit(arg)),
            type: ds.ASTType.FNCALL
        });
    }

    visitMacroCallExpr(ctx: MacroCallExprContext): ds.ASTExpr {
        return this.visit(ctx._call);
    }

    visitMacroCall(ctx: MacroCallContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTFunctionCall<{}>>(ctx, {
            name: this.visit(ctx._fnname),
            args: ctx._fnargs._args.map(arg => this.visit(arg)),
            type: ds.ASTType.MACROCALL
        });
    }

    visitFunctionDefinitionExpr(ctx: FunctionDefinitionExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTFunctionDef<{}>>(ctx, {
            name: this.visit(ctx._fnname),
            args: ctx._fnargs._args.map(arg => arg.text ?? ""),
            bodyExprs: ctx._exprs.map(expr => this.visit(expr)),
            type: ds.ASTType.FNDEF
        });
    }

    visitMacroDefinitionExpr(ctx: MacroDefinitionExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTFunctionDef<{}>>(ctx, {
            name: this.visit(ctx._macroname),
            args: ctx._macroargs._args.map(arg => arg.text ?? ""),
            bodyExprs: ctx._exprs.map(expr => this.visit(expr)),
            type: ds.ASTType.FNDEF
        });
    }

    // visitAnonymousFunctionDefinitionExpr(ctx: AnonymousFunctionDefinitionExprContext): ds.ASTExpr {
    //     return this.withLineCol<ds.ASTFunctionDef<{}>>(ctx, {
    //         args: ctx._fnargs._args.map(arg => this.visit(arg)),
    //         bodyExprs: ctx._exprs.map(expr => this.visit(expr)),
    //         type: ds.ASTType.FNDEF
    //     });
    // }



    visitNamespaceDefinitionExpr(ctx: NamespaceDefinitionExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTNamespace<{}>>(ctx, {
            name: ctx._nsname.text ?? "ERROR",
            bodyExprs: ctx._exprs.map(expr => this.visit(expr)),
            type: ds.ASTType.NAMESPACE
        });
    }

    visitBlockExpr(ctx: BlockExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTBlock<{}>>(ctx, {
            bodyExprs: ctx._exprs.map(expr => this.visit(expr)),
            type: ds.ASTType.BLOCK
        });
    }

    visitMatchExpr(ctx: MatchExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTMatch<{}>>(ctx, {
            branches: ctx._predicate.map(
                (e,i) => [this.visit(e), this.visit(ctx._result[i])] as [ds.ASTExpr, ds.ASTExpr]
            ),
            fallback: ctx._fallback[0] ? this.visit(ctx._fallback[0]) : undefined,
            type: ds.ASTType.MATCH
        });
    }



    visitImportExpr(ctx: ImportExprContext): ds.ASTExpr {
        return this.withLineCol<ds.ASTImport<{}>>(ctx, {
            filename: ctx._filename.text?.slice(1, -1) ?? "",
            alias: ctx._alias.text,
            type: ds.ASTType.IMPORT
        });
    }










    visitJSONExpr(ctx: JSONExprContext): ds.ASTExpr {
        return this.visit(ctx._jsonval);
    }

    visitNullDJson(ctx: NullDJsonContext): ds.ASTExpr { 
        return this.withLineCol<ds.ASTJSON<{}>>(ctx, {
            type: ds.ASTType.JSON,
            data: {
                jsontype: ds.JSONType.NULL,
                data: null
            }
        });
    }

    visitNumberDJson(ctx: NumberDJsonContext): ds.ASTExpr { 
        return this.withLineCol<ds.ASTJSON<{}>>(ctx, {
            type: ds.ASTType.JSON,
            data: {
                jsontype: ds.JSONType.NUMBER,
                data: Number(ctx._data.text)
            }
        });
    }

    visitStringDJson(ctx: StringDJsonContext): ds.ASTExpr { 
        return this.withLineCol<ds.ASTJSON<{}>>(ctx, {
            type: ds.ASTType.JSON,
            data: {
                jsontype: ds.JSONType.STRING,
                data: ctx._data.text ?? ""
            }
        });
    }

    visitBooleanDJson(ctx: BooleanDJsonContext): ds.ASTExpr { 
        return this.withLineCol<ds.ASTJSON<{}>>(ctx, {
            type: ds.ASTType.JSON,
            data: {
                jsontype: ds.JSONType.BOOLEAN,
                data: ctx._data.text == "true"
            }
        });
    }

    visitObjectDJson(ctx: ObjectDJsonContext): ds.ASTExpr { 
        const children: Record<string, ds.ASTJSON<{}>> = {};

        ctx._keys.forEach((key, i) => {
            children[key.text ?? ""] = this.visit(ctx._values[i]) as ds.ASTJSON<{}>;
        })
        
        return this.withLineCol<ds.ASTJSON<{}>>(ctx, {
            type: ds.ASTType.JSON,
            data: {
                jsontype: ds.JSONType.OBJECT,
                data: children
            }
        });
    }

    visitArrayDJson(ctx: ArrayDJsonContext): ds.ASTExpr { 
        const children: ds.ASTJSON<{}>[] = ctx._elements.map(elem => this.visit(elem) as ds.ASTJSON<{}>);
        
        return this.withLineCol<ds.ASTJSON<{}>>(ctx, {
            type: ds.ASTType.JSON,
            data: {
                jsontype: ds.JSONType.ARRAY,
                data: children
            }
        });
    }


    visitDesmoscriptDJson(ctx: DesmoscriptDJsonContext): ds.ASTExpr { 
        return this.withLineCol<ds.ASTJSON<{}>>(ctx, {
            type: ds.ASTType.JSON,
            data: {
                jsontype: ds.JSONType.DESMOSCRIPT,
                data: this.visit(ctx._expr)
            }
        });
    }






    visitDecoratedExpr(ctx: DecoratedExprContext): ds.ASTExpr {
        console.log("decorated \n" + ctx.text);
        return this.withLineCol<ds.ASTDecorator<{}>>(ctx, {
            type: ds.ASTType.DECORATOR,
            expr: this.visit(ctx._expr),
            name: ctx._qualifier.text ?? "",
            json: this.visit(ctx._jsonval)
        });
    }

    visitNamedJsonExpr(ctx: NamedJsonExprContext): ds.ASTExpr {
        console.log("namedjson \n" + ctx.text);
        return this.withLineCol<ds.ASTNamedJSON<{}>>(ctx, {
            type: ds.ASTType.NAMED_JSON,
            json: this.visit(ctx._jsonval),
            name: ctx._namedjsontype.text ?? ""
        });
    }

}
