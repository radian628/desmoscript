// Generated from grammar/Desmoscript.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";

import { FunctionCallExprContext } from "./DesmoscriptParser";
import { JSONExprContext } from "./DesmoscriptParser";
import { MacroCallExprContext } from "./DesmoscriptParser";
import { ImportExprContext } from "./DesmoscriptParser";
import { NamedJsonExprContext } from "./DesmoscriptParser";
import { IdentifierExprContext } from "./DesmoscriptParser";
import { ListCompExprContext } from "./DesmoscriptParser";
import { ParentheticalExprContext } from "./DesmoscriptParser";
import { PointExprContext } from "./DesmoscriptParser";
import { MemberAccessExprContext } from "./DesmoscriptParser";
import { ListMemberAccessExprContext } from "./DesmoscriptParser";
import { MultOrDivExprContext } from "./DesmoscriptParser";
import { AddOrSubExprContext } from "./DesmoscriptParser";
import { LogicalExprContext } from "./DesmoscriptParser";
import { RangeExprContext } from "./DesmoscriptParser";
import { StepRangeExprContext } from "./DesmoscriptParser";
import { NumberExprContext } from "./DesmoscriptParser";
import { ListExprContext } from "./DesmoscriptParser";
import { SumProdIntegralExprContext } from "./DesmoscriptParser";
import { DerivativeExprContext } from "./DesmoscriptParser";
import { MacroDefinitionExprContext } from "./DesmoscriptParser";
import { FunctionDefinitionExprContext } from "./DesmoscriptParser";
import { NamespaceDefinitionExprContext } from "./DesmoscriptParser";
import { DecoratedExprContext } from "./DesmoscriptParser";
import { BlockExprContext } from "./DesmoscriptParser";
import { MatchExprContext } from "./DesmoscriptParser";
import { ActionExprContext } from "./DesmoscriptParser";
import { AssignmentExprContext } from "./DesmoscriptParser";
import { NumberDJsonContext } from "./DesmoscriptParser";
import { StringDJsonContext } from "./DesmoscriptParser";
import { ObjectDJsonContext } from "./DesmoscriptParser";
import { ArrayDJsonContext } from "./DesmoscriptParser";
import { DesmoscriptDJsonContext } from "./DesmoscriptParser";
import { BooleanDJsonContext } from "./DesmoscriptParser";
import { NullDJsonContext } from "./DesmoscriptParser";
import { DjsonContext } from "./DesmoscriptParser";
import { ExpressionContext } from "./DesmoscriptParser";
import { ExpressionListContext } from "./DesmoscriptParser";
import { FunctionDefArgListContext } from "./DesmoscriptParser";
import { FunctionCallArgListContext } from "./DesmoscriptParser";
import { ListContext } from "./DesmoscriptParser";
import { FunctionCallContext } from "./DesmoscriptParser";
import { MacroCallContext } from "./DesmoscriptParser";
import { IdentifierContext } from "./DesmoscriptParser";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `DesmoscriptParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export interface DesmoscriptVisitor<Result> extends ParseTreeVisitor<Result> {
	/**
	 * Visit a parse tree produced by the `FunctionCallExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCallExpr?: (ctx: FunctionCallExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `JSONExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitJSONExpr?: (ctx: JSONExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MacroCallExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMacroCallExpr?: (ctx: MacroCallExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ImportExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportExpr?: (ctx: ImportExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NamedJsonExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedJsonExpr?: (ctx: NamedJsonExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `IdentifierExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifierExpr?: (ctx: IdentifierExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListCompExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListCompExpr?: (ctx: ListCompExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ParentheticalExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitParentheticalExpr?: (ctx: ParentheticalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `PointExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitPointExpr?: (ctx: PointExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MemberAccessExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMemberAccessExpr?: (ctx: MemberAccessExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListMemberAccessExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListMemberAccessExpr?: (ctx: ListMemberAccessExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MultOrDivExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMultOrDivExpr?: (ctx: MultOrDivExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AddOrSubExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAddOrSubExpr?: (ctx: AddOrSubExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `LogicalExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalExpr?: (ctx: LogicalExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `RangeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitRangeExpr?: (ctx: RangeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `StepRangeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStepRangeExpr?: (ctx: StepRangeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumberExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberExpr?: (ctx: NumberExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ListExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitListExpr?: (ctx: ListExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `SumProdIntegralExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitSumProdIntegralExpr?: (ctx: SumProdIntegralExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `DerivativeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDerivativeExpr?: (ctx: DerivativeExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MacroDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMacroDefinitionExpr?: (ctx: MacroDefinitionExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `FunctionDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDefinitionExpr?: (ctx: FunctionDefinitionExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NamespaceDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamespaceDefinitionExpr?: (ctx: NamespaceDefinitionExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `DecoratedExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDecoratedExpr?: (ctx: DecoratedExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `BlockExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBlockExpr?: (ctx: BlockExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `MatchExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMatchExpr?: (ctx: MatchExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `ActionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitActionExpr?: (ctx: ActionExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `AssignmentExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentExpr?: (ctx: AssignmentExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `NumberDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNumberDJson?: (ctx: NumberDJsonContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringDJson?: (ctx: StringDJsonContext) => Result;

	/**
	 * Visit a parse tree produced by the `ObjectDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitObjectDJson?: (ctx: ObjectDJsonContext) => Result;

	/**
	 * Visit a parse tree produced by the `ArrayDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitArrayDJson?: (ctx: ArrayDJsonContext) => Result;

	/**
	 * Visit a parse tree produced by the `DesmoscriptDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDesmoscriptDJson?: (ctx: DesmoscriptDJsonContext) => Result;

	/**
	 * Visit a parse tree produced by the `BooleanDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitBooleanDJson?: (ctx: BooleanDJsonContext) => Result;

	/**
	 * Visit a parse tree produced by the `NullDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNullDJson?: (ctx: NullDJsonContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDjson?: (ctx: DjsonContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.expressionList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpressionList?: (ctx: ExpressionListContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.functionDefArgList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDefArgList?: (ctx: FunctionDefArgListContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.functionCallArgList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCallArgList?: (ctx: FunctionCallArgListContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.list`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitList?: (ctx: ListContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.functionCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionCall?: (ctx: FunctionCallContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.macroCall`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMacroCall?: (ctx: MacroCallContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.identifier`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitIdentifier?: (ctx: IdentifierContext) => Result;
}

