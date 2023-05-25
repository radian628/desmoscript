import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener.js";
import { FunctionCallExprContext } from "./DesmoscriptParser.js";
import { MacroCallExprContext } from "./DesmoscriptParser.js";
import { UnaryMinusExprContext } from "./DesmoscriptParser.js";
import { LogicalNotExprContext } from "./DesmoscriptParser.js";
import { IdentifierExprContext } from "./DesmoscriptParser.js";
import { ListCompExprContext } from "./DesmoscriptParser.js";
import { ParentheticalExprContext } from "./DesmoscriptParser.js";
import { PointExprContext } from "./DesmoscriptParser.js";
import { MemberAccessExprContext } from "./DesmoscriptParser.js";
import { ListMemberAccessExprContext } from "./DesmoscriptParser.js";
import { MultOrDivExprContext } from "./DesmoscriptParser.js";
import { AddOrSubExprContext } from "./DesmoscriptParser.js";
import { ComparisonExprContext } from "./DesmoscriptParser.js";
import { LogicalExprContext } from "./DesmoscriptParser.js";
import { RangeExprContext } from "./DesmoscriptParser.js";
import { StepRangeExprContext } from "./DesmoscriptParser.js";
import { NumberExprContext } from "./DesmoscriptParser.js";
import { ListExprContext } from "./DesmoscriptParser.js";
import { SumProdIntegralExprContext } from "./DesmoscriptParser.js";
import { DerivativeExprContext } from "./DesmoscriptParser.js";
import { BlockExprContext } from "./DesmoscriptParser.js";
import { MatchExprContext } from "./DesmoscriptParser.js";
import { ActionExprContext } from "./DesmoscriptParser.js";
import { FunctionDefinitionStatementContext } from "./DesmoscriptParser.js";
import { AssignmentStatementContext } from "./DesmoscriptParser.js";
import { NamespaceDefinitionStatementContext } from "./DesmoscriptParser.js";
import { ImportStatementContext } from "./DesmoscriptParser.js";
import { StringStatementContext } from "./DesmoscriptParser.js";
import { NamedJsonStatementContext } from "./DesmoscriptParser.js";
import { NumberDJsonContext } from "./DesmoscriptParser.js";
import { StringDJsonContext } from "./DesmoscriptParser.js";
import { ObjectDJsonContext } from "./DesmoscriptParser.js";
import { ArrayDJsonContext } from "./DesmoscriptParser.js";
import { DesmoscriptDJsonContext } from "./DesmoscriptParser.js";
import { BooleanDJsonContext } from "./DesmoscriptParser.js";
import { NullDJsonContext } from "./DesmoscriptParser.js";
import { DjsonContext } from "./DesmoscriptParser.js";
import { DjsonExpressionContext } from "./DesmoscriptParser.js";
import { ExpressionContext } from "./DesmoscriptParser.js";
import { StatementContext } from "./DesmoscriptParser.js";
import { StatementListContext } from "./DesmoscriptParser.js";
import { FunctionDefArgListContext } from "./DesmoscriptParser.js";
import { FunctionCallArgListContext } from "./DesmoscriptParser.js";
import { ListContext } from "./DesmoscriptParser.js";
import { FunctionCallContext } from "./DesmoscriptParser.js";
import { MacroCallContext } from "./DesmoscriptParser.js";
import { IdentifierContext } from "./DesmoscriptParser.js";
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
     * Enter a parse tree produced by the `UnaryMinusExpr`
     * labeled alternative in `DesmoscriptParser.expression`.
     * @param ctx the parse tree
     */
    enterUnaryMinusExpr?: (ctx: UnaryMinusExprContext) => void;
    /**
     * Exit a parse tree produced by the `UnaryMinusExpr`
     * labeled alternative in `DesmoscriptParser.expression`.
     * @param ctx the parse tree
     */
    exitUnaryMinusExpr?: (ctx: UnaryMinusExprContext) => void;
    /**
     * Enter a parse tree produced by the `LogicalNotExpr`
     * labeled alternative in `DesmoscriptParser.expression`.
     * @param ctx the parse tree
     */
    enterLogicalNotExpr?: (ctx: LogicalNotExprContext) => void;
    /**
     * Exit a parse tree produced by the `LogicalNotExpr`
     * labeled alternative in `DesmoscriptParser.expression`.
     * @param ctx the parse tree
     */
    exitLogicalNotExpr?: (ctx: LogicalNotExprContext) => void;
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
     * Enter a parse tree produced by the `ComparisonExpr`
     * labeled alternative in `DesmoscriptParser.expression`.
     * @param ctx the parse tree
     */
    enterComparisonExpr?: (ctx: ComparisonExprContext) => void;
    /**
     * Exit a parse tree produced by the `ComparisonExpr`
     * labeled alternative in `DesmoscriptParser.expression`.
     * @param ctx the parse tree
     */
    exitComparisonExpr?: (ctx: ComparisonExprContext) => void;
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
     * Enter a parse tree produced by the `FunctionDefinitionStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    enterFunctionDefinitionStatement?: (ctx: FunctionDefinitionStatementContext) => void;
    /**
     * Exit a parse tree produced by the `FunctionDefinitionStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    exitFunctionDefinitionStatement?: (ctx: FunctionDefinitionStatementContext) => void;
    /**
     * Enter a parse tree produced by the `AssignmentStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    enterAssignmentStatement?: (ctx: AssignmentStatementContext) => void;
    /**
     * Exit a parse tree produced by the `AssignmentStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    exitAssignmentStatement?: (ctx: AssignmentStatementContext) => void;
    /**
     * Enter a parse tree produced by the `NamespaceDefinitionStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    enterNamespaceDefinitionStatement?: (ctx: NamespaceDefinitionStatementContext) => void;
    /**
     * Exit a parse tree produced by the `NamespaceDefinitionStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    exitNamespaceDefinitionStatement?: (ctx: NamespaceDefinitionStatementContext) => void;
    /**
     * Enter a parse tree produced by the `ImportStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    enterImportStatement?: (ctx: ImportStatementContext) => void;
    /**
     * Exit a parse tree produced by the `ImportStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    exitImportStatement?: (ctx: ImportStatementContext) => void;
    /**
     * Enter a parse tree produced by the `StringStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    enterStringStatement?: (ctx: StringStatementContext) => void;
    /**
     * Exit a parse tree produced by the `StringStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    exitStringStatement?: (ctx: StringStatementContext) => void;
    /**
     * Enter a parse tree produced by the `NamedJsonStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    enterNamedJsonStatement?: (ctx: NamedJsonStatementContext) => void;
    /**
     * Exit a parse tree produced by the `NamedJsonStatement`
     * labeled alternative in `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    exitNamedJsonStatement?: (ctx: NamedJsonStatementContext) => void;
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
     * Enter a parse tree produced by `DesmoscriptParser.djsonExpression`.
     * @param ctx the parse tree
     */
    enterDjsonExpression?: (ctx: DjsonExpressionContext) => void;
    /**
     * Exit a parse tree produced by `DesmoscriptParser.djsonExpression`.
     * @param ctx the parse tree
     */
    exitDjsonExpression?: (ctx: DjsonExpressionContext) => void;
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
     * Enter a parse tree produced by `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    enterStatement?: (ctx: StatementContext) => void;
    /**
     * Exit a parse tree produced by `DesmoscriptParser.statement`.
     * @param ctx the parse tree
     */
    exitStatement?: (ctx: StatementContext) => void;
    /**
     * Enter a parse tree produced by `DesmoscriptParser.statementList`.
     * @param ctx the parse tree
     */
    enterStatementList?: (ctx: StatementListContext) => void;
    /**
     * Exit a parse tree produced by `DesmoscriptParser.statementList`.
     * @param ctx the parse tree
     */
    exitStatementList?: (ctx: StatementListContext) => void;
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
