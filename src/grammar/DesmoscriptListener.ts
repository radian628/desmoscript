// Generated from grammar/Desmoscript.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

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
 * This interface defines a complete listener for a parse tree produced by
 * `DesmoscriptParser`.
 */
export interface DesmoscriptListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by the `FunctionCallExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterFunctionCallExpr?: (ctx: FunctionCallExprContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionCallExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitFunctionCallExpr?: (ctx: FunctionCallExprContext) => void;

	/**
	 * Enter a parse tree produced by the `JSONExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterJSONExpr?: (ctx: JSONExprContext) => void;
	/**
	 * Exit a parse tree produced by the `JSONExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitJSONExpr?: (ctx: JSONExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MacroCallExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMacroCallExpr?: (ctx: MacroCallExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MacroCallExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMacroCallExpr?: (ctx: MacroCallExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ImportExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterImportExpr?: (ctx: ImportExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ImportExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitImportExpr?: (ctx: ImportExprContext) => void;

	/**
	 * Enter a parse tree produced by the `NamedJsonExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNamedJsonExpr?: (ctx: NamedJsonExprContext) => void;
	/**
	 * Exit a parse tree produced by the `NamedJsonExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNamedJsonExpr?: (ctx: NamedJsonExprContext) => void;

	/**
	 * Enter a parse tree produced by the `IdentifierExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIdentifierExpr?: (ctx: IdentifierExprContext) => void;
	/**
	 * Exit a parse tree produced by the `IdentifierExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIdentifierExpr?: (ctx: IdentifierExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ListCompExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterListCompExpr?: (ctx: ListCompExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ListCompExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitListCompExpr?: (ctx: ListCompExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ParentheticalExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterParentheticalExpr?: (ctx: ParentheticalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ParentheticalExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitParentheticalExpr?: (ctx: ParentheticalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `PointExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterPointExpr?: (ctx: PointExprContext) => void;
	/**
	 * Exit a parse tree produced by the `PointExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitPointExpr?: (ctx: PointExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MemberAccessExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMemberAccessExpr?: (ctx: MemberAccessExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MemberAccessExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMemberAccessExpr?: (ctx: MemberAccessExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ListMemberAccessExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterListMemberAccessExpr?: (ctx: ListMemberAccessExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ListMemberAccessExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitListMemberAccessExpr?: (ctx: ListMemberAccessExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MultOrDivExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultOrDivExpr?: (ctx: MultOrDivExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MultOrDivExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultOrDivExpr?: (ctx: MultOrDivExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AddOrSubExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAddOrSubExpr?: (ctx: AddOrSubExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AddOrSubExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAddOrSubExpr?: (ctx: AddOrSubExprContext) => void;

	/**
	 * Enter a parse tree produced by the `LogicalExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterLogicalExpr?: (ctx: LogicalExprContext) => void;
	/**
	 * Exit a parse tree produced by the `LogicalExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitLogicalExpr?: (ctx: LogicalExprContext) => void;

	/**
	 * Enter a parse tree produced by the `RangeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterRangeExpr?: (ctx: RangeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `RangeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitRangeExpr?: (ctx: RangeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `StepRangeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterStepRangeExpr?: (ctx: StepRangeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `StepRangeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitStepRangeExpr?: (ctx: StepRangeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `NumberExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNumberExpr?: (ctx: NumberExprContext) => void;
	/**
	 * Exit a parse tree produced by the `NumberExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNumberExpr?: (ctx: NumberExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ListExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterListExpr?: (ctx: ListExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ListExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitListExpr?: (ctx: ListExprContext) => void;

	/**
	 * Enter a parse tree produced by the `SumProdIntegralExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterSumProdIntegralExpr?: (ctx: SumProdIntegralExprContext) => void;
	/**
	 * Exit a parse tree produced by the `SumProdIntegralExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitSumProdIntegralExpr?: (ctx: SumProdIntegralExprContext) => void;

	/**
	 * Enter a parse tree produced by the `DerivativeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDerivativeExpr?: (ctx: DerivativeExprContext) => void;
	/**
	 * Exit a parse tree produced by the `DerivativeExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDerivativeExpr?: (ctx: DerivativeExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MacroDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMacroDefinitionExpr?: (ctx: MacroDefinitionExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MacroDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMacroDefinitionExpr?: (ctx: MacroDefinitionExprContext) => void;

	/**
	 * Enter a parse tree produced by the `FunctionDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterFunctionDefinitionExpr?: (ctx: FunctionDefinitionExprContext) => void;
	/**
	 * Exit a parse tree produced by the `FunctionDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitFunctionDefinitionExpr?: (ctx: FunctionDefinitionExprContext) => void;

	/**
	 * Enter a parse tree produced by the `NamespaceDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNamespaceDefinitionExpr?: (ctx: NamespaceDefinitionExprContext) => void;
	/**
	 * Exit a parse tree produced by the `NamespaceDefinitionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNamespaceDefinitionExpr?: (ctx: NamespaceDefinitionExprContext) => void;

	/**
	 * Enter a parse tree produced by the `DecoratedExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDecoratedExpr?: (ctx: DecoratedExprContext) => void;
	/**
	 * Exit a parse tree produced by the `DecoratedExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDecoratedExpr?: (ctx: DecoratedExprContext) => void;

	/**
	 * Enter a parse tree produced by the `BlockExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBlockExpr?: (ctx: BlockExprContext) => void;
	/**
	 * Exit a parse tree produced by the `BlockExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBlockExpr?: (ctx: BlockExprContext) => void;

	/**
	 * Enter a parse tree produced by the `MatchExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMatchExpr?: (ctx: MatchExprContext) => void;
	/**
	 * Exit a parse tree produced by the `MatchExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMatchExpr?: (ctx: MatchExprContext) => void;

	/**
	 * Enter a parse tree produced by the `ActionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterActionExpr?: (ctx: ActionExprContext) => void;
	/**
	 * Exit a parse tree produced by the `ActionExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitActionExpr?: (ctx: ActionExprContext) => void;

	/**
	 * Enter a parse tree produced by the `AssignmentExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAssignmentExpr?: (ctx: AssignmentExprContext) => void;
	/**
	 * Exit a parse tree produced by the `AssignmentExpr`
	 * labeled alternative in `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAssignmentExpr?: (ctx: AssignmentExprContext) => void;

	/**
	 * Enter a parse tree produced by the `NumberDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterNumberDJson?: (ctx: NumberDJsonContext) => void;
	/**
	 * Exit a parse tree produced by the `NumberDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitNumberDJson?: (ctx: NumberDJsonContext) => void;

	/**
	 * Enter a parse tree produced by the `StringDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterStringDJson?: (ctx: StringDJsonContext) => void;
	/**
	 * Exit a parse tree produced by the `StringDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitStringDJson?: (ctx: StringDJsonContext) => void;

	/**
	 * Enter a parse tree produced by the `ObjectDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterObjectDJson?: (ctx: ObjectDJsonContext) => void;
	/**
	 * Exit a parse tree produced by the `ObjectDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitObjectDJson?: (ctx: ObjectDJsonContext) => void;

	/**
	 * Enter a parse tree produced by the `ArrayDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterArrayDJson?: (ctx: ArrayDJsonContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrayDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitArrayDJson?: (ctx: ArrayDJsonContext) => void;

	/**
	 * Enter a parse tree produced by the `DesmoscriptDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterDesmoscriptDJson?: (ctx: DesmoscriptDJsonContext) => void;
	/**
	 * Exit a parse tree produced by the `DesmoscriptDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitDesmoscriptDJson?: (ctx: DesmoscriptDJsonContext) => void;

	/**
	 * Enter a parse tree produced by the `BooleanDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterBooleanDJson?: (ctx: BooleanDJsonContext) => void;
	/**
	 * Exit a parse tree produced by the `BooleanDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitBooleanDJson?: (ctx: BooleanDJsonContext) => void;

	/**
	 * Enter a parse tree produced by the `NullDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterNullDJson?: (ctx: NullDJsonContext) => void;
	/**
	 * Exit a parse tree produced by the `NullDJson`
	 * labeled alternative in `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitNullDJson?: (ctx: NullDJsonContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	enterDjson?: (ctx: DjsonContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.djson`.
	 * @param ctx the parse tree
	 */
	exitDjson?: (ctx: DjsonContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExpression?: (ctx: ExpressionContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExpression?: (ctx: ExpressionContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.expressionList`.
	 * @param ctx the parse tree
	 */
	enterExpressionList?: (ctx: ExpressionListContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.expressionList`.
	 * @param ctx the parse tree
	 */
	exitExpressionList?: (ctx: ExpressionListContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.functionDefArgList`.
	 * @param ctx the parse tree
	 */
	enterFunctionDefArgList?: (ctx: FunctionDefArgListContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.functionDefArgList`.
	 * @param ctx the parse tree
	 */
	exitFunctionDefArgList?: (ctx: FunctionDefArgListContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.functionCallArgList`.
	 * @param ctx the parse tree
	 */
	enterFunctionCallArgList?: (ctx: FunctionCallArgListContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.functionCallArgList`.
	 * @param ctx the parse tree
	 */
	exitFunctionCallArgList?: (ctx: FunctionCallArgListContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.list`.
	 * @param ctx the parse tree
	 */
	enterList?: (ctx: ListContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.list`.
	 * @param ctx the parse tree
	 */
	exitList?: (ctx: ListContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.functionCall`.
	 * @param ctx the parse tree
	 */
	enterFunctionCall?: (ctx: FunctionCallContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.functionCall`.
	 * @param ctx the parse tree
	 */
	exitFunctionCall?: (ctx: FunctionCallContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.macroCall`.
	 * @param ctx the parse tree
	 */
	enterMacroCall?: (ctx: MacroCallContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.macroCall`.
	 * @param ctx the parse tree
	 */
	exitMacroCall?: (ctx: MacroCallContext) => void;

	/**
	 * Enter a parse tree produced by `DesmoscriptParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterIdentifier?: (ctx: IdentifierContext) => void;
	/**
	 * Exit a parse tree produced by `DesmoscriptParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitIdentifier?: (ctx: IdentifierContext) => void;
}

