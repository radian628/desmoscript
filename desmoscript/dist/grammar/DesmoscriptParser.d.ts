import { ATN } from "antlr4ts/atn/ATN.js";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException.js";
import { Parser } from "antlr4ts/Parser.js";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext.js";
import { RuleContext } from "antlr4ts/RuleContext.js";
import { TerminalNode } from "antlr4ts/tree/TerminalNode.js";
import { Token } from "antlr4ts/Token.js";
import { TokenStream } from "antlr4ts/TokenStream.js";
import { Vocabulary } from "antlr4ts/Vocabulary.js";
import { DesmoscriptListener } from "./DesmoscriptListener.js";
import { DesmoscriptVisitor } from "./DesmoscriptVisitor.js";
export declare class DesmoscriptParser extends Parser {
    static readonly T__0 = 1;
    static readonly T__1 = 2;
    static readonly T__2 = 3;
    static readonly T__3 = 4;
    static readonly T__4 = 5;
    static readonly T__5 = 6;
    static readonly T__6 = 7;
    static readonly T__7 = 8;
    static readonly T__8 = 9;
    static readonly T__9 = 10;
    static readonly T__10 = 11;
    static readonly T__11 = 12;
    static readonly T__12 = 13;
    static readonly T__13 = 14;
    static readonly T__14 = 15;
    static readonly T__15 = 16;
    static readonly T__16 = 17;
    static readonly T__17 = 18;
    static readonly T__18 = 19;
    static readonly T__19 = 20;
    static readonly T__20 = 21;
    static readonly T__21 = 22;
    static readonly T__22 = 23;
    static readonly T__23 = 24;
    static readonly T__24 = 25;
    static readonly T__25 = 26;
    static readonly T__26 = 27;
    static readonly T__27 = 28;
    static readonly T__28 = 29;
    static readonly T__29 = 30;
    static readonly T__30 = 31;
    static readonly T__31 = 32;
    static readonly T__32 = 33;
    static readonly T__33 = 34;
    static readonly T__34 = 35;
    static readonly T__35 = 36;
    static readonly T__36 = 37;
    static readonly T__37 = 38;
    static readonly T__38 = 39;
    static readonly T__39 = 40;
    static readonly T__40 = 41;
    static readonly T__41 = 42;
    static readonly T__42 = 43;
    static readonly T__43 = 44;
    static readonly T__44 = 45;
    static readonly T__45 = 46;
    static readonly T__46 = 47;
    static readonly T__47 = 48;
    static readonly STRING = 49;
    static readonly NUMBER = 50;
    static readonly IDENTIFIER_SEGMENT = 51;
    static readonly WS = 52;
    static readonly COMMENT = 53;
    static readonly RULE_djson = 0;
    static readonly RULE_djsonExpression = 1;
    static readonly RULE_expression = 2;
    static readonly RULE_statement = 3;
    static readonly RULE_statementList = 4;
    static readonly RULE_functionDefArgList = 5;
    static readonly RULE_functionCallArgList = 6;
    static readonly RULE_list = 7;
    static readonly RULE_functionCall = 8;
    static readonly RULE_macroCall = 9;
    static readonly RULE_identifier = 10;
    static readonly ruleNames: string[];
    private static readonly _LITERAL_NAMES;
    private static readonly _SYMBOLIC_NAMES;
    static readonly VOCABULARY: Vocabulary;
    get vocabulary(): Vocabulary;
    get grammarFileName(): string;
    get ruleNames(): string[];
    get serializedATN(): string;
    protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException;
    constructor(input: TokenStream);
    djson(): DjsonContext;
    djsonExpression(): DjsonExpressionContext;
    expression(): ExpressionContext;
    expression(_p: number): ExpressionContext;
    statement(): StatementContext;
    statementList(): StatementListContext;
    functionDefArgList(): FunctionDefArgListContext;
    functionCallArgList(): FunctionCallArgListContext;
    list(): ListContext;
    functionCall(): FunctionCallContext;
    macroCall(): MacroCallContext;
    identifier(): IdentifierContext;
    sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean;
    private expression_sempred;
    static readonly _serializedATN: string;
    static __ATN: ATN;
    static get _ATN(): ATN;
}
export declare class DjsonContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    copyFrom(ctx: DjsonContext): void;
}
export declare class NumberDJsonContext extends DjsonContext {
    _data: Token;
    NUMBER(): TerminalNode;
    constructor(ctx: DjsonContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class StringDJsonContext extends DjsonContext {
    _data: Token;
    STRING(): TerminalNode;
    constructor(ctx: DjsonContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ObjectDJsonContext extends DjsonContext {
    _IDENTIFIER_SEGMENT: Token;
    _keys: Token[];
    _djson: DjsonContext;
    _values: DjsonContext[];
    IDENTIFIER_SEGMENT(): TerminalNode[];
    IDENTIFIER_SEGMENT(i: number): TerminalNode;
    djson(): DjsonContext[];
    djson(i: number): DjsonContext;
    constructor(ctx: DjsonContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ArrayDJsonContext extends DjsonContext {
    _djson: DjsonContext;
    _elements: DjsonContext[];
    djson(): DjsonContext[];
    djson(i: number): DjsonContext;
    constructor(ctx: DjsonContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class DesmoscriptDJsonContext extends DjsonContext {
    _expr: ExpressionContext;
    expression(): ExpressionContext;
    constructor(ctx: DjsonContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class BooleanDJsonContext extends DjsonContext {
    _data: Token;
    constructor(ctx: DjsonContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class NullDJsonContext extends DjsonContext {
    constructor(ctx: DjsonContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class DjsonExpressionContext extends ParserRuleContext {
    _jsonval: DjsonContext;
    djson(): DjsonContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ExpressionContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    copyFrom(ctx: ExpressionContext): void;
}
export declare class FunctionCallExprContext extends ExpressionContext {
    _call: FunctionCallContext;
    functionCall(): FunctionCallContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class MacroCallExprContext extends ExpressionContext {
    _call: MacroCallContext;
    macroCall(): MacroCallContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class UnaryMinusExprContext extends ExpressionContext {
    _expr: ExpressionContext;
    expression(): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class LogicalNotExprContext extends ExpressionContext {
    _expr: ExpressionContext;
    expression(): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class IdentifierExprContext extends ExpressionContext {
    _ident: IdentifierContext;
    identifier(): IdentifierContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ListCompExprContext extends ExpressionContext {
    _body: ExpressionContext;
    _IDENTIFIER_SEGMENT: Token;
    _variables: Token[];
    _expression: ExpressionContext;
    _lists: ExpressionContext[];
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    IDENTIFIER_SEGMENT(): TerminalNode[];
    IDENTIFIER_SEGMENT(i: number): TerminalNode;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ParentheticalExprContext extends ExpressionContext {
    _expr: ExpressionContext;
    expression(): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class PointExprContext extends ExpressionContext {
    _x: ExpressionContext;
    _y: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class MemberAccessExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _op: Token;
    _right: Token;
    expression(): ExpressionContext;
    IDENTIFIER_SEGMENT(): TerminalNode;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ListMemberAccessExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class MultOrDivExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class AddOrSubExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ComparisonExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class LogicalExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class RangeExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class StepRangeExprContext extends ExpressionContext {
    _left: ExpressionContext;
    _step: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class NumberExprContext extends ExpressionContext {
    NUMBER(): TerminalNode;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ListExprContext extends ExpressionContext {
    _l: ListContext;
    list(): ListContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class SumProdIntegralExprContext extends ExpressionContext {
    _op: Token;
    _var: Token;
    _lo: ExpressionContext;
    _hi: ExpressionContext;
    _body: ExpressionContext;
    IDENTIFIER_SEGMENT(): TerminalNode;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class DerivativeExprContext extends ExpressionContext {
    _var: Token;
    _body: ExpressionContext;
    IDENTIFIER_SEGMENT(): TerminalNode;
    expression(): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class BlockExprContext extends ExpressionContext {
    _statement: StatementContext;
    _statements: StatementContext[];
    _expr: ExpressionContext;
    expression(): ExpressionContext;
    statement(): StatementContext[];
    statement(i: number): StatementContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class MatchExprContext extends ExpressionContext {
    _expression: ExpressionContext;
    _predicate: ExpressionContext[];
    _result: ExpressionContext[];
    _fallback: ExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ActionExprContext extends ExpressionContext {
    _expression: ExpressionContext;
    _lefts: ExpressionContext[];
    _op: Token;
    _rights: ExpressionContext[];
    _singles: ExpressionContext[];
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(ctx: ExpressionContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class StatementContext extends ParserRuleContext {
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    copyFrom(ctx: StatementContext): void;
}
export declare class FunctionDefinitionStatementContext extends StatementContext {
    _fnname: Token;
    _fnargs: FunctionDefArgListContext;
    _expr: ExpressionContext;
    IDENTIFIER_SEGMENT(): TerminalNode;
    functionDefArgList(): FunctionDefArgListContext;
    expression(): ExpressionContext;
    constructor(ctx: StatementContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class AssignmentStatementContext extends StatementContext {
    _left: ExpressionContext;
    _op: Token;
    _right: ExpressionContext;
    _annotation: DjsonExpressionContext;
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    djsonExpression(): DjsonExpressionContext | undefined;
    constructor(ctx: StatementContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class NamespaceDefinitionStatementContext extends StatementContext {
    _nsname: Token;
    _statement: StatementContext;
    _statements: StatementContext[];
    IDENTIFIER_SEGMENT(): TerminalNode;
    statement(): StatementContext[];
    statement(i: number): StatementContext;
    constructor(ctx: StatementContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ImportStatementContext extends StatementContext {
    _filename: Token;
    _alias: Token;
    STRING(): TerminalNode;
    IDENTIFIER_SEGMENT(): TerminalNode;
    constructor(ctx: StatementContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class StringStatementContext extends StatementContext {
    _str: Token;
    STRING(): TerminalNode;
    constructor(ctx: StatementContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class NamedJsonStatementContext extends StatementContext {
    _namedjsontype: Token;
    _jsonval: DjsonExpressionContext;
    IDENTIFIER_SEGMENT(): TerminalNode;
    djsonExpression(): DjsonExpressionContext;
    constructor(ctx: StatementContext);
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class StatementListContext extends ParserRuleContext {
    EOF(): TerminalNode;
    statement(): StatementContext[];
    statement(i: number): StatementContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class FunctionDefArgListContext extends ParserRuleContext {
    _IDENTIFIER_SEGMENT: Token;
    _args: Token[];
    IDENTIFIER_SEGMENT(): TerminalNode[];
    IDENTIFIER_SEGMENT(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class FunctionCallArgListContext extends ParserRuleContext {
    _expression: ExpressionContext;
    _args: ExpressionContext[];
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class ListContext extends ParserRuleContext {
    _expression: ExpressionContext;
    _elements: ExpressionContext[];
    expression(): ExpressionContext[];
    expression(i: number): ExpressionContext;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class FunctionCallContext extends ParserRuleContext {
    _fnname: IdentifierContext;
    _fnargs: FunctionCallArgListContext;
    identifier(): IdentifierContext;
    functionCallArgList(): FunctionCallArgListContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class MacroCallContext extends ParserRuleContext {
    _fnname: IdentifierContext;
    _fnargs: FunctionCallArgListContext;
    identifier(): IdentifierContext;
    functionCallArgList(): FunctionCallArgListContext | undefined;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
export declare class IdentifierContext extends ParserRuleContext {
    _IDENTIFIER_SEGMENT: Token;
    _segments: Token[];
    IDENTIFIER_SEGMENT(): TerminalNode[];
    IDENTIFIER_SEGMENT(i: number): TerminalNode;
    constructor(parent: ParserRuleContext | undefined, invokingState: number);
    get ruleIndex(): number;
    enterRule(listener: DesmoscriptListener): void;
    exitRule(listener: DesmoscriptListener): void;
    accept<Result>(visitor: DesmoscriptVisitor<Result>): Result;
}
