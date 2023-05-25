// Generated from grammar/Desmoscript.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor.js"

import { FunctionCallExprContext } from "./DesmoscriptParser.js"
import { MacroCallExprContext } from "./DesmoscriptParser.js"
import { UnaryMinusExprContext } from "./DesmoscriptParser.js"
import { LogicalNotExprContext } from "./DesmoscriptParser.js"
import { IdentifierExprContext } from "./DesmoscriptParser.js"
import { ListCompExprContext } from "./DesmoscriptParser.js"
import { ParentheticalExprContext } from "./DesmoscriptParser.js"
import { PointExprContext } from "./DesmoscriptParser.js"
import { MemberAccessExprContext } from "./DesmoscriptParser.js"
import { ListMemberAccessExprContext } from "./DesmoscriptParser.js"
import { MultOrDivExprContext } from "./DesmoscriptParser.js"
import { AddOrSubExprContext } from "./DesmoscriptParser.js"
import { ComparisonExprContext } from "./DesmoscriptParser.js"
import { LogicalExprContext } from "./DesmoscriptParser.js"
import { RangeExprContext } from "./DesmoscriptParser.js"
import { StepRangeExprContext } from "./DesmoscriptParser.js"
import { NumberExprContext } from "./DesmoscriptParser.js"
import { ListExprContext } from "./DesmoscriptParser.js"
import { SumProdIntegralExprContext } from "./DesmoscriptParser.js"
import { DerivativeExprContext } from "./DesmoscriptParser.js"
import { BlockExprContext } from "./DesmoscriptParser.js"
import { MatchExprContext } from "./DesmoscriptParser.js"
import { ActionExprContext } from "./DesmoscriptParser.js"
import { FunctionDefinitionStatementContext } from "./DesmoscriptParser.js"
import { AssignmentStatementContext } from "./DesmoscriptParser.js"
import { NamespaceDefinitionStatementContext } from "./DesmoscriptParser.js"
import { ImportStatementContext } from "./DesmoscriptParser.js"
import { StringStatementContext } from "./DesmoscriptParser.js"
import { NamedJsonStatementContext } from "./DesmoscriptParser.js"
import { NumberDJsonContext } from "./DesmoscriptParser.js"
import { StringDJsonContext } from "./DesmoscriptParser.js"
import { ObjectDJsonContext } from "./DesmoscriptParser.js"
import { ArrayDJsonContext } from "./DesmoscriptParser.js"
import { DesmoscriptDJsonContext } from "./DesmoscriptParser.js"
import { BooleanDJsonContext } from "./DesmoscriptParser.js"
import { NullDJsonContext } from "./DesmoscriptParser.js"
import { DjsonContext } from "./DesmoscriptParser.js"
import { DjsonExpressionContext } from "./DesmoscriptParser.js"
import { ExpressionContext } from "./DesmoscriptParser.js"
import { StatementContext } from "./DesmoscriptParser.js"
import { StatementListContext } from "./DesmoscriptParser.js"
import { FunctionDefArgListContext } from "./DesmoscriptParser.js"
import { FunctionCallArgListContext } from "./DesmoscriptParser.js"
import { ListContext } from "./DesmoscriptParser.js"
import { FunctionCallContext } from "./DesmoscriptParser.js"
import { MacroCallContext } from "./DesmoscriptParser.js"
import { IdentifierContext } from "./DesmoscriptParser.js"


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
	 * Visit a parse tree produced by the `MacroCallExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitMacroCallExpr?: (ctx: MacroCallExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `UnaryMinusExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitUnaryMinusExpr?: (ctx: UnaryMinusExprContext) => Result;

	/**
	 * Visit a parse tree produced by the `LogicalNotExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitLogicalNotExpr?: (ctx: LogicalNotExprContext) => Result;

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
	 * Visit a parse tree produced by the `ComparisonExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitComparisonExpr?: (ctx: ComparisonExprContext) => Result;

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
	 * Visit a parse tree produced by the `FunctionDefinitionStatement`
	 * labeled alternative in `DesmoscriptParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitFunctionDefinitionStatement?: (ctx: FunctionDefinitionStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `AssignmentStatement`
	 * labeled alternative in `DesmoscriptParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitAssignmentStatement?: (ctx: AssignmentStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `NamespaceDefinitionStatement`
	 * labeled alternative in `DesmoscriptParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamespaceDefinitionStatement?: (ctx: NamespaceDefinitionStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `ImportStatement`
	 * labeled alternative in `DesmoscriptParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitImportStatement?: (ctx: ImportStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `StringStatement`
	 * labeled alternative in `DesmoscriptParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStringStatement?: (ctx: StringStatementContext) => Result;

	/**
	 * Visit a parse tree produced by the `NamedJsonStatement`
	 * labeled alternative in `DesmoscriptParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitNamedJsonStatement?: (ctx: NamedJsonStatementContext) => Result;

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
	 * Visit a parse tree produced by `DesmoscriptParser.djsonExpression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitDjsonExpression?: (ctx: DjsonExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitExpression?: (ctx: ExpressionContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.statement`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatement?: (ctx: StatementContext) => Result;

	/**
	 * Visit a parse tree produced by `DesmoscriptParser.statementList`.
	 * @param ctx the parse tree
	 * @return the visitor result
	 */
	visitStatementList?: (ctx: StatementListContext) => Result;

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

