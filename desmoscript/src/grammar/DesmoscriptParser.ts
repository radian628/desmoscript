// Generated from grammar/Desmoscript.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN.js"
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer.js"
import { FailedPredicateException } from "antlr4ts/FailedPredicateException.js"
import { NotNull } from "antlr4ts/Decorators.js"
import { NoViableAltException } from "antlr4ts/NoViableAltException.js"
import { Override } from "antlr4ts/Decorators.js"
import { Parser } from "antlr4ts/Parser.js"
import { ParserRuleContext } from "antlr4ts/ParserRuleContext.js"
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator.js"
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener.js"
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor.js"
import { RecognitionException } from "antlr4ts/RecognitionException.js"
import { RuleContext } from "antlr4ts/RuleContext.js"
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode.js"
import { Token } from "antlr4ts/Token.js"
import { TokenStream } from "antlr4ts/TokenStream.js"
import { Vocabulary } from "antlr4ts/Vocabulary.js"
import { VocabularyImpl } from "antlr4ts/VocabularyImpl.js"

import * as Utils from "antlr4ts/misc/Utils.js"

import { DesmoscriptListener } from "./DesmoscriptListener.js"
import { DesmoscriptVisitor } from "./DesmoscriptVisitor.js"


export class DesmoscriptParser extends Parser {
	public static readonly T__0 = 1;
	public static readonly T__1 = 2;
	public static readonly T__2 = 3;
	public static readonly T__3 = 4;
	public static readonly T__4 = 5;
	public static readonly T__5 = 6;
	public static readonly T__6 = 7;
	public static readonly T__7 = 8;
	public static readonly T__8 = 9;
	public static readonly T__9 = 10;
	public static readonly T__10 = 11;
	public static readonly T__11 = 12;
	public static readonly T__12 = 13;
	public static readonly T__13 = 14;
	public static readonly T__14 = 15;
	public static readonly T__15 = 16;
	public static readonly T__16 = 17;
	public static readonly T__17 = 18;
	public static readonly T__18 = 19;
	public static readonly T__19 = 20;
	public static readonly T__20 = 21;
	public static readonly T__21 = 22;
	public static readonly T__22 = 23;
	public static readonly T__23 = 24;
	public static readonly T__24 = 25;
	public static readonly T__25 = 26;
	public static readonly T__26 = 27;
	public static readonly T__27 = 28;
	public static readonly T__28 = 29;
	public static readonly T__29 = 30;
	public static readonly T__30 = 31;
	public static readonly T__31 = 32;
	public static readonly T__32 = 33;
	public static readonly T__33 = 34;
	public static readonly T__34 = 35;
	public static readonly T__35 = 36;
	public static readonly T__36 = 37;
	public static readonly T__37 = 38;
	public static readonly T__38 = 39;
	public static readonly T__39 = 40;
	public static readonly T__40 = 41;
	public static readonly T__41 = 42;
	public static readonly T__42 = 43;
	public static readonly T__43 = 44;
	public static readonly T__44 = 45;
	public static readonly T__45 = 46;
	public static readonly T__46 = 47;
	public static readonly T__47 = 48;
	public static readonly STRING = 49;
	public static readonly NUMBER = 50;
	public static readonly IDENTIFIER_SEGMENT = 51;
	public static readonly WS = 52;
	public static readonly COMMENT = 53;
	public static readonly RULE_djson = 0;
	public static readonly RULE_djsonExpression = 1;
	public static readonly RULE_expression = 2;
	public static readonly RULE_statement = 3;
	public static readonly RULE_statementList = 4;
	public static readonly RULE_functionDefArgList = 5;
	public static readonly RULE_functionCallArgList = 6;
	public static readonly RULE_list = 7;
	public static readonly RULE_functionCall = 8;
	public static readonly RULE_macroCall = 9;
	public static readonly RULE_identifier = 10;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"djson", "djsonExpression", "expression", "statement", "statementList", 
		"functionDefArgList", "functionCallArgList", "list", "functionCall", "macroCall", 
		"identifier",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'{'", "'}'", "':'", "','", "'['", "']'", "'ds'", "'('", "')'", 
		"'true'", "'false'", "'null'", "'@'", "'-'", "'!'", "'for'", "'='", "';'", 
		"'\\'", "'^'", "'*'", "'/'", "'%'", "'+'", "'=='", "'>'", "'<'", "'>='", 
		"'<='", "'&&'", "'||'", "'..'", "'sum'", "'product'", "'integral'", "'to'", 
		"'derivative'", "'case'", "'&'", "'->'", "'fn'", "'ns'", "'import'", "'as'", 
		"'()'", "'!()'", "'!('", "'.'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		"STRING", "NUMBER", "IDENTIFIER_SEGMENT", "WS", "COMMENT",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(DesmoscriptParser._LITERAL_NAMES, DesmoscriptParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return DesmoscriptParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "Desmoscript.g4"; }

	// @Override
	public get ruleNames(): string[] { return DesmoscriptParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return DesmoscriptParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(DesmoscriptParser._ATN, this);
	}
	// @RuleVersion(0)
	public djson(): DjsonContext {
		let _localctx: DjsonContext = new DjsonContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, DesmoscriptParser.RULE_djson);
		let _la: number;
		try {
			this.state = 65;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case DesmoscriptParser.NUMBER:
				_localctx = new NumberDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 22;
				(_localctx as NumberDJsonContext)._data = this.match(DesmoscriptParser.NUMBER);
				}
				break;
			case DesmoscriptParser.STRING:
				_localctx = new StringDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 23;
				(_localctx as StringDJsonContext)._data = this.match(DesmoscriptParser.STRING);
				}
				break;
			case DesmoscriptParser.T__0:
				_localctx = new ObjectDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 41;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
				case 1:
					{
					this.state = 24;
					this.match(DesmoscriptParser.T__0);
					this.state = 25;
					this.match(DesmoscriptParser.T__1);
					}
					break;

				case 2:
					{
					this.state = 26;
					this.match(DesmoscriptParser.T__0);
					this.state = 27;
					(_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
					(_localctx as ObjectDJsonContext)._keys.push((_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT);
					this.state = 28;
					this.match(DesmoscriptParser.T__2);
					this.state = 29;
					(_localctx as ObjectDJsonContext)._djson = this.djson();
					(_localctx as ObjectDJsonContext)._values.push((_localctx as ObjectDJsonContext)._djson);
					this.state = 36;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === DesmoscriptParser.T__3) {
						{
						{
						this.state = 30;
						this.match(DesmoscriptParser.T__3);
						this.state = 31;
						(_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
						(_localctx as ObjectDJsonContext)._keys.push((_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT);
						this.state = 32;
						this.match(DesmoscriptParser.T__2);
						this.state = 33;
						(_localctx as ObjectDJsonContext)._djson = this.djson();
						(_localctx as ObjectDJsonContext)._values.push((_localctx as ObjectDJsonContext)._djson);
						}
						}
						this.state = 38;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 39;
					this.match(DesmoscriptParser.T__1);
					}
					break;
				}
				}
				break;
			case DesmoscriptParser.T__4:
				_localctx = new ArrayDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 56;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
				case 1:
					{
					this.state = 43;
					this.match(DesmoscriptParser.T__4);
					this.state = 44;
					this.match(DesmoscriptParser.T__5);
					}
					break;

				case 2:
					{
					this.state = 45;
					this.match(DesmoscriptParser.T__4);
					this.state = 46;
					(_localctx as ArrayDJsonContext)._djson = this.djson();
					(_localctx as ArrayDJsonContext)._elements.push((_localctx as ArrayDJsonContext)._djson);
					this.state = 51;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === DesmoscriptParser.T__3) {
						{
						{
						this.state = 47;
						this.match(DesmoscriptParser.T__3);
						this.state = 48;
						(_localctx as ArrayDJsonContext)._djson = this.djson();
						(_localctx as ArrayDJsonContext)._elements.push((_localctx as ArrayDJsonContext)._djson);
						}
						}
						this.state = 53;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 54;
					this.match(DesmoscriptParser.T__5);
					}
					break;
				}
				}
				break;
			case DesmoscriptParser.T__6:
				_localctx = new DesmoscriptDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 58;
				this.match(DesmoscriptParser.T__6);
				this.state = 59;
				this.match(DesmoscriptParser.T__7);
				this.state = 60;
				(_localctx as DesmoscriptDJsonContext)._expr = this.expression(0);
				this.state = 61;
				this.match(DesmoscriptParser.T__8);
				}
				break;
			case DesmoscriptParser.T__9:
			case DesmoscriptParser.T__10:
				_localctx = new BooleanDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 63;
				(_localctx as BooleanDJsonContext)._data = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === DesmoscriptParser.T__9 || _la === DesmoscriptParser.T__10)) {
					(_localctx as BooleanDJsonContext)._data = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				}
				break;
			case DesmoscriptParser.T__11:
				_localctx = new NullDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 64;
				this.match(DesmoscriptParser.T__11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public djsonExpression(): DjsonExpressionContext {
		let _localctx: DjsonExpressionContext = new DjsonExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, DesmoscriptParser.RULE_djsonExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 67;
			this.match(DesmoscriptParser.T__12);
			this.state = 68;
			_localctx._jsonval = this.djson();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 4;
		this.enterRecursionRule(_localctx, 4, DesmoscriptParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 171;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 12, this._ctx) ) {
			case 1:
				{
				_localctx = new FunctionCallExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 71;
				(_localctx as FunctionCallExprContext)._call = this.functionCall();
				}
				break;

			case 2:
				{
				_localctx = new MacroCallExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 72;
				(_localctx as MacroCallExprContext)._call = this.macroCall();
				}
				break;

			case 3:
				{
				_localctx = new UnaryMinusExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 73;
				this.match(DesmoscriptParser.T__13);
				this.state = 74;
				(_localctx as UnaryMinusExprContext)._expr = this.expression(22);
				}
				break;

			case 4:
				{
				_localctx = new LogicalNotExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 75;
				this.match(DesmoscriptParser.T__14);
				this.state = 76;
				(_localctx as LogicalNotExprContext)._expr = this.expression(21);
				}
				break;

			case 5:
				{
				_localctx = new IdentifierExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 77;
				(_localctx as IdentifierExprContext)._ident = this.identifier();
				}
				break;

			case 6:
				{
				_localctx = new ListCompExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 78;
				this.match(DesmoscriptParser.T__4);
				this.state = 79;
				(_localctx as ListCompExprContext)._body = this.expression(0);
				this.state = 80;
				this.match(DesmoscriptParser.T__15);
				this.state = 88;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 81;
						(_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
						(_localctx as ListCompExprContext)._variables.push((_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT);
						this.state = 82;
						this.match(DesmoscriptParser.T__16);
						this.state = 83;
						(_localctx as ListCompExprContext)._expression = this.expression(0);
						(_localctx as ListCompExprContext)._lists.push((_localctx as ListCompExprContext)._expression);
						this.state = 84;
						this.match(DesmoscriptParser.T__17);
						}
						}
					}
					this.state = 90;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 5, this._ctx);
				}
				{
				this.state = 91;
				(_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				(_localctx as ListCompExprContext)._variables.push((_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT);
				this.state = 92;
				this.match(DesmoscriptParser.T__16);
				this.state = 93;
				(_localctx as ListCompExprContext)._expression = this.expression(0);
				(_localctx as ListCompExprContext)._lists.push((_localctx as ListCompExprContext)._expression);
				}
				this.state = 95;
				this.match(DesmoscriptParser.T__5);
				}
				break;

			case 7:
				{
				_localctx = new ParentheticalExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 97;
				this.match(DesmoscriptParser.T__7);
				this.state = 98;
				(_localctx as ParentheticalExprContext)._expr = this.expression(0);
				this.state = 99;
				this.match(DesmoscriptParser.T__8);
				}
				break;

			case 8:
				{
				_localctx = new PointExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 101;
				this.match(DesmoscriptParser.T__7);
				this.state = 102;
				(_localctx as PointExprContext)._x = this.expression(0);
				this.state = 103;
				this.match(DesmoscriptParser.T__3);
				this.state = 104;
				(_localctx as PointExprContext)._y = this.expression(0);
				this.state = 105;
				this.match(DesmoscriptParser.T__8);
				}
				break;

			case 9:
				{
				_localctx = new NumberExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 107;
				this.match(DesmoscriptParser.NUMBER);
				}
				break;

			case 10:
				{
				_localctx = new ListExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 108;
				(_localctx as ListExprContext)._l = this.list();
				}
				break;

			case 11:
				{
				_localctx = new SumProdIntegralExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 109;
				(_localctx as SumProdIntegralExprContext)._op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (DesmoscriptParser.T__32 - 33)) | (1 << (DesmoscriptParser.T__33 - 33)) | (1 << (DesmoscriptParser.T__34 - 33)))) !== 0))) {
					(_localctx as SumProdIntegralExprContext)._op = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 110;
				this.match(DesmoscriptParser.T__7);
				this.state = 111;
				(_localctx as SumProdIntegralExprContext)._var = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 112;
				this.match(DesmoscriptParser.T__16);
				this.state = 113;
				(_localctx as SumProdIntegralExprContext)._lo = this.expression(0);
				this.state = 114;
				this.match(DesmoscriptParser.T__35);
				this.state = 115;
				(_localctx as SumProdIntegralExprContext)._hi = this.expression(0);
				this.state = 116;
				this.match(DesmoscriptParser.T__8);
				this.state = 117;
				(_localctx as SumProdIntegralExprContext)._body = this.expression(5);
				}
				break;

			case 12:
				{
				_localctx = new DerivativeExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 119;
				this.match(DesmoscriptParser.T__36);
				this.state = 120;
				this.match(DesmoscriptParser.T__7);
				this.state = 121;
				(_localctx as DerivativeExprContext)._var = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 122;
				this.match(DesmoscriptParser.T__8);
				this.state = 123;
				(_localctx as DerivativeExprContext)._body = this.expression(4);
				}
				break;

			case 13:
				{
				_localctx = new BlockExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 124;
				this.match(DesmoscriptParser.T__0);
				this.state = 126;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 125;
						(_localctx as BlockExprContext)._statement = this.statement();
						(_localctx as BlockExprContext)._statements.push((_localctx as BlockExprContext)._statement);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 128;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				this.state = 130;
				(_localctx as BlockExprContext)._expr = this.expression(0);
				this.state = 131;
				this.match(DesmoscriptParser.T__1);
				}
				break;

			case 14:
				{
				_localctx = new MatchExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 133;
				this.match(DesmoscriptParser.T__37);
				this.state = 134;
				this.match(DesmoscriptParser.T__0);
				this.state = 142;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 135;
						(_localctx as MatchExprContext)._expression = this.expression(0);
						(_localctx as MatchExprContext)._predicate.push((_localctx as MatchExprContext)._expression);
						this.state = 136;
						this.match(DesmoscriptParser.T__2);
						this.state = 137;
						(_localctx as MatchExprContext)._expression = this.expression(0);
						(_localctx as MatchExprContext)._result.push((_localctx as MatchExprContext)._expression);
						this.state = 138;
						this.match(DesmoscriptParser.T__3);
						}
						}
					}
					this.state = 144;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
				}
				this.state = 146;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__14))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (DesmoscriptParser.T__32 - 33)) | (1 << (DesmoscriptParser.T__33 - 33)) | (1 << (DesmoscriptParser.T__34 - 33)) | (1 << (DesmoscriptParser.T__36 - 33)) | (1 << (DesmoscriptParser.T__37 - 33)) | (1 << (DesmoscriptParser.T__38 - 33)) | (1 << (DesmoscriptParser.NUMBER - 33)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 33)))) !== 0)) {
					{
					this.state = 145;
					(_localctx as MatchExprContext)._fallback = this.expression(0);
					}
				}

				this.state = 148;
				this.match(DesmoscriptParser.T__1);
				}
				break;

			case 15:
				{
				_localctx = new ActionExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 149;
				this.match(DesmoscriptParser.T__38);
				this.state = 161;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 155;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 9, this._ctx) ) {
						case 1:
							{
							{
							this.state = 150;
							(_localctx as ActionExprContext)._expression = this.expression(0);
							(_localctx as ActionExprContext)._lefts.push((_localctx as ActionExprContext)._expression);
							this.state = 151;
							(_localctx as ActionExprContext)._op = this.match(DesmoscriptParser.T__39);
							this.state = 152;
							(_localctx as ActionExprContext)._expression = this.expression(0);
							(_localctx as ActionExprContext)._rights.push((_localctx as ActionExprContext)._expression);
							}
							}
							break;

						case 2:
							{
							this.state = 154;
							(_localctx as ActionExprContext)._expression = this.expression(0);
							(_localctx as ActionExprContext)._singles.push((_localctx as ActionExprContext)._expression);
							}
							break;
						}
						this.state = 157;
						this.match(DesmoscriptParser.T__3);
						}
						}
					}
					this.state = 163;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 10, this._ctx);
				}
				this.state = 169;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
				case 1:
					{
					{
					this.state = 164;
					(_localctx as ActionExprContext)._expression = this.expression(0);
					(_localctx as ActionExprContext)._lefts.push((_localctx as ActionExprContext)._expression);
					this.state = 165;
					(_localctx as ActionExprContext)._op = this.match(DesmoscriptParser.T__39);
					this.state = 166;
					(_localctx as ActionExprContext)._expression = this.expression(0);
					(_localctx as ActionExprContext)._rights.push((_localctx as ActionExprContext)._expression);
					}
					}
					break;

				case 2:
					{
					this.state = 168;
					(_localctx as ActionExprContext)._expression = this.expression(0);
					(_localctx as ActionExprContext)._singles.push((_localctx as ActionExprContext)._expression);
					}
					break;
				}
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 207;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 205;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
					case 1:
						{
						_localctx = new MultOrDivExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as MultOrDivExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 173;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 174;
						(_localctx as MultOrDivExprContext)._op = this.match(DesmoscriptParser.T__19);
						this.state = 175;
						(_localctx as MultOrDivExprContext)._right = this.expression(15);
						}
						break;

					case 2:
						{
						_localctx = new MultOrDivExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as MultOrDivExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 176;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 177;
						(_localctx as MultOrDivExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__20) | (1 << DesmoscriptParser.T__21) | (1 << DesmoscriptParser.T__22))) !== 0))) {
							(_localctx as MultOrDivExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 178;
						(_localctx as MultOrDivExprContext)._right = this.expression(14);
						}
						break;

					case 3:
						{
						_localctx = new AddOrSubExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as AddOrSubExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 179;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 180;
						(_localctx as AddOrSubExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === DesmoscriptParser.T__13 || _la === DesmoscriptParser.T__23)) {
							(_localctx as AddOrSubExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 181;
						(_localctx as AddOrSubExprContext)._right = this.expression(13);
						}
						break;

					case 4:
						{
						_localctx = new ComparisonExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as ComparisonExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 182;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 183;
						(_localctx as ComparisonExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__24) | (1 << DesmoscriptParser.T__25) | (1 << DesmoscriptParser.T__26) | (1 << DesmoscriptParser.T__27) | (1 << DesmoscriptParser.T__28))) !== 0))) {
							(_localctx as ComparisonExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 184;
						(_localctx as ComparisonExprContext)._right = this.expression(12);
						}
						break;

					case 5:
						{
						_localctx = new LogicalExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 185;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 186;
						(_localctx as LogicalExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === DesmoscriptParser.T__29 || _la === DesmoscriptParser.T__30)) {
							(_localctx as LogicalExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 187;
						(_localctx as LogicalExprContext)._right = this.expression(11);
						}
						break;

					case 6:
						{
						_localctx = new RangeExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as RangeExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 188;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 189;
						(_localctx as RangeExprContext)._op = this.match(DesmoscriptParser.T__31);
						this.state = 190;
						(_localctx as RangeExprContext)._right = this.expression(10);
						}
						break;

					case 7:
						{
						_localctx = new StepRangeExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as StepRangeExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 191;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 192;
						this.match(DesmoscriptParser.T__3);
						this.state = 193;
						(_localctx as StepRangeExprContext)._step = this.expression(0);
						this.state = 194;
						(_localctx as StepRangeExprContext)._op = this.match(DesmoscriptParser.T__31);
						this.state = 195;
						(_localctx as StepRangeExprContext)._right = this.expression(9);
						}
						break;

					case 8:
						{
						_localctx = new MemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as MemberAccessExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 197;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 198;
						(_localctx as MemberAccessExprContext)._op = this.match(DesmoscriptParser.T__18);
						this.state = 199;
						(_localctx as MemberAccessExprContext)._right = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
						}
						break;

					case 9:
						{
						_localctx = new ListMemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as ListMemberAccessExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 200;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 201;
						(_localctx as ListMemberAccessExprContext)._op = this.match(DesmoscriptParser.T__4);
						this.state = 202;
						(_localctx as ListMemberAccessExprContext)._right = this.expression(0);
						this.state = 203;
						this.match(DesmoscriptParser.T__5);
						}
						break;
					}
					}
				}
				this.state = 209;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 14, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, DesmoscriptParser.RULE_statement);
		let _la: number;
		try {
			this.state = 243;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 17, this._ctx) ) {
			case 1:
				_localctx = new FunctionDefinitionStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 210;
				this.match(DesmoscriptParser.T__40);
				this.state = 211;
				(_localctx as FunctionDefinitionStatementContext)._fnname = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 212;
				this.match(DesmoscriptParser.T__7);
				this.state = 213;
				(_localctx as FunctionDefinitionStatementContext)._fnargs = this.functionDefArgList();
				this.state = 214;
				this.match(DesmoscriptParser.T__8);
				this.state = 215;
				(_localctx as FunctionDefinitionStatementContext)._expr = this.expression(0);
				}
				break;

			case 2:
				_localctx = new AssignmentStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 217;
				(_localctx as AssignmentStatementContext)._left = this.expression(0);
				this.state = 218;
				(_localctx as AssignmentStatementContext)._op = this.match(DesmoscriptParser.T__16);
				this.state = 219;
				(_localctx as AssignmentStatementContext)._right = this.expression(0);
				this.state = 222;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === DesmoscriptParser.T__12) {
					{
					this.state = 220;
					this.match(DesmoscriptParser.T__12);
					this.state = 221;
					(_localctx as AssignmentStatementContext)._annotation = this.djsonExpression();
					}
				}

				this.state = 224;
				this.match(DesmoscriptParser.T__17);
				}
				break;

			case 3:
				_localctx = new NamespaceDefinitionStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 226;
				this.match(DesmoscriptParser.T__41);
				this.state = 227;
				(_localctx as NamespaceDefinitionStatementContext)._nsname = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 228;
				this.match(DesmoscriptParser.T__0);
				this.state = 230;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 229;
					(_localctx as NamespaceDefinitionStatementContext)._statement = this.statement();
					(_localctx as NamespaceDefinitionStatementContext)._statements.push((_localctx as NamespaceDefinitionStatementContext)._statement);
					}
					}
					this.state = 232;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__14))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (DesmoscriptParser.T__32 - 33)) | (1 << (DesmoscriptParser.T__33 - 33)) | (1 << (DesmoscriptParser.T__34 - 33)) | (1 << (DesmoscriptParser.T__36 - 33)) | (1 << (DesmoscriptParser.T__37 - 33)) | (1 << (DesmoscriptParser.T__38 - 33)) | (1 << (DesmoscriptParser.T__40 - 33)) | (1 << (DesmoscriptParser.T__41 - 33)) | (1 << (DesmoscriptParser.T__42 - 33)) | (1 << (DesmoscriptParser.STRING - 33)) | (1 << (DesmoscriptParser.NUMBER - 33)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 33)))) !== 0));
				this.state = 234;
				this.match(DesmoscriptParser.T__1);
				}
				break;

			case 4:
				_localctx = new ImportStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 236;
				this.match(DesmoscriptParser.T__42);
				this.state = 237;
				(_localctx as ImportStatementContext)._filename = this.match(DesmoscriptParser.STRING);
				this.state = 238;
				this.match(DesmoscriptParser.T__43);
				this.state = 239;
				(_localctx as ImportStatementContext)._alias = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				}
				break;

			case 5:
				_localctx = new StringStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 240;
				(_localctx as StringStatementContext)._str = this.match(DesmoscriptParser.STRING);
				}
				break;

			case 6:
				_localctx = new NamedJsonStatementContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 241;
				(_localctx as NamedJsonStatementContext)._namedjsontype = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 242;
				(_localctx as NamedJsonStatementContext)._jsonval = this.djsonExpression();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statementList(): StatementListContext {
		let _localctx: StatementListContext = new StatementListContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, DesmoscriptParser.RULE_statementList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 246;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 245;
				this.statement();
				}
				}
				this.state = 248;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__14))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (DesmoscriptParser.T__32 - 33)) | (1 << (DesmoscriptParser.T__33 - 33)) | (1 << (DesmoscriptParser.T__34 - 33)) | (1 << (DesmoscriptParser.T__36 - 33)) | (1 << (DesmoscriptParser.T__37 - 33)) | (1 << (DesmoscriptParser.T__38 - 33)) | (1 << (DesmoscriptParser.T__40 - 33)) | (1 << (DesmoscriptParser.T__41 - 33)) | (1 << (DesmoscriptParser.T__42 - 33)) | (1 << (DesmoscriptParser.STRING - 33)) | (1 << (DesmoscriptParser.NUMBER - 33)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 33)))) !== 0));
			this.state = 250;
			this.match(DesmoscriptParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionDefArgList(): FunctionDefArgListContext {
		let _localctx: FunctionDefArgListContext = new FunctionDefArgListContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, DesmoscriptParser.RULE_functionDefArgList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 256;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 252;
					_localctx._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
					_localctx._args.push(_localctx._IDENTIFIER_SEGMENT);
					this.state = 253;
					this.match(DesmoscriptParser.T__3);
					}
					}
				}
				this.state = 258;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
			}
			this.state = 259;
			_localctx._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
			_localctx._args.push(_localctx._IDENTIFIER_SEGMENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionCallArgList(): FunctionCallArgListContext {
		let _localctx: FunctionCallArgListContext = new FunctionCallArgListContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, DesmoscriptParser.RULE_functionCallArgList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 266;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 261;
					_localctx._expression = this.expression(0);
					_localctx._args.push(_localctx._expression);
					this.state = 262;
					this.match(DesmoscriptParser.T__3);
					}
					}
				}
				this.state = 268;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 20, this._ctx);
			}
			this.state = 269;
			_localctx._expression = this.expression(0);
			_localctx._args.push(_localctx._expression);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public list(): ListContext {
		let _localctx: ListContext = new ListContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, DesmoscriptParser.RULE_list);
		try {
			let _alt: number;
			this.state = 284;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 271;
				this.match(DesmoscriptParser.T__4);
				this.state = 275;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 272;
						_localctx._expression = this.expression(0);
						_localctx._elements.push(_localctx._expression);
						this.state = 273;
						this.match(DesmoscriptParser.T__3);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 277;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 21, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				this.state = 279;
				_localctx._expression = this.expression(0);
				_localctx._elements.push(_localctx._expression);
				this.state = 280;
				this.match(DesmoscriptParser.T__5);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 282;
				this.match(DesmoscriptParser.T__4);
				this.state = 283;
				this.match(DesmoscriptParser.T__5);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionCall(): FunctionCallContext {
		let _localctx: FunctionCallContext = new FunctionCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, DesmoscriptParser.RULE_functionCall);
		let _la: number;
		try {
			this.state = 296;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 286;
				_localctx._fnname = this.identifier();
				this.state = 287;
				this.match(DesmoscriptParser.T__44);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 289;
				_localctx._fnname = this.identifier();
				this.state = 290;
				this.match(DesmoscriptParser.T__7);
				this.state = 292;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__14))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (DesmoscriptParser.T__32 - 33)) | (1 << (DesmoscriptParser.T__33 - 33)) | (1 << (DesmoscriptParser.T__34 - 33)) | (1 << (DesmoscriptParser.T__36 - 33)) | (1 << (DesmoscriptParser.T__37 - 33)) | (1 << (DesmoscriptParser.T__38 - 33)) | (1 << (DesmoscriptParser.NUMBER - 33)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 33)))) !== 0)) {
					{
					this.state = 291;
					_localctx._fnargs = this.functionCallArgList();
					}
				}

				this.state = 294;
				this.match(DesmoscriptParser.T__8);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public macroCall(): MacroCallContext {
		let _localctx: MacroCallContext = new MacroCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, DesmoscriptParser.RULE_macroCall);
		let _la: number;
		try {
			this.state = 308;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 298;
				_localctx._fnname = this.identifier();
				this.state = 299;
				this.match(DesmoscriptParser.T__45);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 301;
				_localctx._fnname = this.identifier();
				this.state = 302;
				this.match(DesmoscriptParser.T__46);
				this.state = 304;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__14))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (DesmoscriptParser.T__32 - 33)) | (1 << (DesmoscriptParser.T__33 - 33)) | (1 << (DesmoscriptParser.T__34 - 33)) | (1 << (DesmoscriptParser.T__36 - 33)) | (1 << (DesmoscriptParser.T__37 - 33)) | (1 << (DesmoscriptParser.T__38 - 33)) | (1 << (DesmoscriptParser.NUMBER - 33)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 33)))) !== 0)) {
					{
					this.state = 303;
					_localctx._fnargs = this.functionCallArgList();
					}
				}

				this.state = 306;
				this.match(DesmoscriptParser.T__8);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, DesmoscriptParser.RULE_identifier);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 314;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 310;
					_localctx._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
					_localctx._segments.push(_localctx._IDENTIFIER_SEGMENT);
					this.state = 311;
					this.match(DesmoscriptParser.T__47);
					}
					}
				}
				this.state = 316;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 27, this._ctx);
			}
			this.state = 317;
			_localctx._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
			_localctx._segments.push(_localctx._IDENTIFIER_SEGMENT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 2:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 14);

		case 1:
			return this.precpred(this._ctx, 13);

		case 2:
			return this.precpred(this._ctx, 12);

		case 3:
			return this.precpred(this._ctx, 11);

		case 4:
			return this.precpred(this._ctx, 10);

		case 5:
			return this.precpred(this._ctx, 9);

		case 6:
			return this.precpred(this._ctx, 8);

		case 7:
			return this.precpred(this._ctx, 16);

		case 8:
			return this.precpred(this._ctx, 15);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x037\u0142\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x07\x02%\n\x02\f\x02\x0E\x02(\v\x02\x03\x02\x03\x02\x05\x02," +
		"\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x024\n\x02" +
		"\f\x02\x0E\x027\v\x02\x03\x02\x03\x02\x05\x02;\n\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x05\x02D\n\x02\x03\x03\x03\x03\x03" +
		"\x03\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x07\x04Y" +
		"\n\x04\f\x04\x0E\x04\\\v\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x06\x04\x81\n\x04\r\x04\x0E\x04\x82\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x07\x04" +
		"\x8F\n\x04\f\x04\x0E\x04\x92\v\x04\x03\x04\x05\x04\x95\n\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x05\x04\x9E\n\x04\x03\x04" +
		"\x03\x04\x07\x04\xA2\n\x04\f\x04\x0E\x04\xA5\v\x04\x03\x04\x03\x04\x03" +
		"\x04\x03\x04\x03\x04\x05\x04\xAC\n\x04\x05\x04\xAE\n\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x04" +
		"\x03\x04\x03\x04\x03\x04\x07\x04\xD0\n\x04\f\x04\x0E\x04\xD3\v\x04\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x05\x05\xE1\n\x05\x03\x05\x03\x05\x03\x05\x03\x05" +
		"\x03\x05\x03\x05\x06\x05\xE9\n\x05\r\x05\x0E\x05\xEA\x03\x05\x03\x05\x03" +
		"\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x03\x05\x05\x05\xF6\n\x05" +
		"\x03\x06\x06\x06\xF9\n\x06\r\x06\x0E\x06\xFA\x03\x06\x03\x06\x03\x07\x03" +
		"\x07\x07\x07\u0101\n\x07\f\x07\x0E\x07\u0104\v\x07\x03\x07\x03\x07\x03" +
		"\b\x03\b\x03\b\x07\b\u010B\n\b\f\b\x0E\b\u010E\v\b\x03\b\x03\b\x03\t\x03" +
		"\t\x03\t\x03\t\x06\t\u0116\n\t\r\t\x0E\t\u0117\x03\t\x03\t\x03\t\x03\t" +
		"\x03\t\x05\t\u011F\n\t\x03\n\x03\n\x03\n\x03\n\x03\n\x03\n\x05\n\u0127" +
		"\n\n\x03\n\x03\n\x05\n\u012B\n\n\x03\v\x03\v\x03\v\x03\v\x03\v\x03\v\x05" +
		"\v\u0133\n\v\x03\v\x03\v\x05\v\u0137\n\v\x03\f\x03\f\x07\f\u013B\n\f\f" +
		"\f\x0E\f\u013E\v\f\x03\f\x03\f\x03\f\x02\x02\x03\x06\r\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x02" +
		"\b\x03\x02\f\r\x03\x02#%\x03\x02\x17\x19\x04\x02\x10\x10\x1A\x1A\x03\x02" +
		"\x1B\x1F\x03\x02 !\x02\u016F\x02C\x03\x02\x02\x02\x04E\x03\x02\x02\x02" +
		"\x06\xAD\x03\x02\x02\x02\b\xF5\x03\x02\x02\x02\n\xF8\x03\x02\x02\x02\f" +
		"\u0102\x03\x02\x02\x02\x0E\u010C\x03\x02\x02\x02\x10\u011E\x03\x02\x02" +
		"\x02\x12\u012A\x03\x02\x02\x02\x14\u0136\x03\x02\x02\x02\x16\u013C\x03" +
		"\x02\x02\x02\x18D\x074\x02\x02\x19D\x073\x02\x02\x1A\x1B\x07\x03\x02\x02" +
		"\x1B,\x07\x04\x02\x02\x1C\x1D\x07\x03\x02\x02\x1D\x1E\x075\x02\x02\x1E" +
		"\x1F\x07\x05\x02\x02\x1F&\x05\x02\x02\x02 !\x07\x06\x02\x02!\"\x075\x02" +
		"\x02\"#\x07\x05\x02\x02#%\x05\x02\x02\x02$ \x03\x02\x02\x02%(\x03\x02" +
		"\x02\x02&$\x03\x02\x02\x02&\'\x03\x02\x02\x02\')\x03\x02\x02\x02(&\x03" +
		"\x02\x02\x02)*\x07\x04\x02\x02*,\x03\x02\x02\x02+\x1A\x03\x02\x02\x02" +
		"+\x1C\x03\x02\x02\x02,D\x03\x02\x02\x02-.\x07\x07\x02\x02.;\x07\b\x02" +
		"\x02/0\x07\x07\x02\x0205\x05\x02\x02\x0212\x07\x06\x02\x0224\x05\x02\x02" +
		"\x0231\x03\x02\x02\x0247\x03\x02\x02\x0253\x03\x02\x02\x0256\x03\x02\x02" +
		"\x0268\x03\x02\x02\x0275\x03\x02\x02\x0289\x07\b\x02\x029;\x03\x02\x02" +
		"\x02:-\x03\x02\x02\x02:/\x03\x02\x02\x02;D\x03\x02\x02\x02<=\x07\t\x02" +
		"\x02=>\x07\n\x02\x02>?\x05\x06\x04\x02?@\x07\v\x02\x02@D\x03\x02\x02\x02" +
		"AD\t\x02\x02\x02BD\x07\x0E\x02\x02C\x18\x03\x02\x02\x02C\x19\x03\x02\x02" +
		"\x02C+\x03\x02\x02\x02C:\x03\x02\x02\x02C<\x03\x02\x02\x02CA\x03\x02\x02" +
		"\x02CB\x03\x02\x02\x02D\x03\x03\x02\x02\x02EF\x07\x0F\x02\x02FG\x05\x02" +
		"\x02\x02G\x05\x03\x02\x02\x02HI\b\x04\x01\x02I\xAE\x05\x12\n\x02J\xAE" +
		"\x05\x14\v\x02KL\x07\x10\x02\x02L\xAE\x05\x06\x04\x18MN\x07\x11\x02\x02" +
		"N\xAE\x05\x06\x04\x17O\xAE\x05\x16\f\x02PQ\x07\x07\x02\x02QR\x05\x06\x04" +
		"\x02RZ\x07\x12\x02\x02ST\x075\x02\x02TU\x07\x13\x02\x02UV\x05\x06\x04" +
		"\x02VW\x07\x14\x02\x02WY\x03\x02\x02\x02XS\x03\x02\x02\x02Y\\\x03\x02" +
		"\x02\x02ZX\x03\x02\x02\x02Z[\x03\x02\x02\x02[]\x03\x02\x02\x02\\Z\x03" +
		"\x02\x02\x02]^\x075\x02\x02^_\x07\x13\x02\x02_`\x05\x06\x04\x02`a\x03" +
		"\x02\x02\x02ab\x07\b\x02\x02b\xAE\x03\x02\x02\x02cd\x07\n\x02\x02de\x05" +
		"\x06\x04\x02ef\x07\v\x02\x02f\xAE\x03\x02\x02\x02gh\x07\n\x02\x02hi\x05" +
		"\x06\x04\x02ij\x07\x06\x02\x02jk\x05\x06\x04\x02kl\x07\v\x02\x02l\xAE" +
		"\x03\x02\x02\x02m\xAE\x074\x02\x02n\xAE\x05\x10\t\x02op\t\x03\x02\x02" +
		"pq\x07\n\x02\x02qr\x075\x02\x02rs\x07\x13\x02\x02st\x05\x06\x04\x02tu" +
		"\x07&\x02\x02uv\x05\x06\x04\x02vw\x07\v\x02\x02wx\x05\x06\x04\x07x\xAE" +
		"\x03\x02\x02\x02yz\x07\'\x02\x02z{\x07\n\x02\x02{|\x075\x02\x02|}\x07" +
		"\v\x02\x02}\xAE\x05\x06\x04\x06~\x80\x07\x03\x02\x02\x7F\x81\x05\b\x05" +
		"\x02\x80\x7F\x03\x02\x02\x02\x81\x82\x03\x02\x02\x02\x82\x80\x03\x02\x02" +
		"\x02\x82\x83\x03\x02\x02\x02\x83\x84\x03\x02\x02\x02\x84\x85\x05\x06\x04" +
		"\x02\x85\x86\x07\x04\x02\x02\x86\xAE\x03\x02\x02\x02\x87\x88\x07(\x02" +
		"\x02\x88\x90\x07\x03\x02\x02\x89\x8A\x05\x06\x04\x02\x8A\x8B\x07\x05\x02" +
		"\x02\x8B\x8C\x05\x06\x04\x02\x8C\x8D\x07\x06\x02\x02\x8D\x8F\x03\x02\x02" +
		"\x02\x8E\x89\x03\x02\x02\x02\x8F\x92\x03\x02\x02\x02\x90\x8E\x03\x02\x02" +
		"\x02\x90\x91\x03\x02\x02\x02\x91\x94\x03\x02\x02\x02\x92\x90\x03\x02\x02" +
		"\x02\x93\x95\x05\x06\x04\x02\x94\x93\x03\x02\x02\x02\x94\x95\x03\x02\x02" +
		"\x02\x95\x96\x03\x02\x02\x02\x96\xAE\x07\x04\x02\x02\x97\xA3\x07)\x02" +
		"\x02\x98\x99\x05\x06\x04\x02\x99\x9A\x07*\x02\x02\x9A\x9B\x05\x06\x04" +
		"\x02\x9B\x9E\x03\x02\x02\x02\x9C\x9E\x05\x06\x04\x02\x9D\x98\x03\x02\x02" +
		"\x02\x9D\x9C\x03\x02\x02\x02\x9E\x9F\x03\x02\x02\x02\x9F\xA0\x07\x06\x02" +
		"\x02\xA0\xA2\x03\x02\x02\x02\xA1\x9D\x03\x02\x02\x02\xA2\xA5\x03\x02\x02" +
		"\x02\xA3\xA1\x03\x02\x02\x02\xA3\xA4\x03\x02\x02\x02\xA4\xAB\x03\x02\x02" +
		"\x02\xA5\xA3\x03\x02\x02\x02\xA6\xA7\x05\x06\x04\x02\xA7\xA8\x07*\x02" +
		"\x02\xA8\xA9\x05\x06\x04\x02\xA9\xAC\x03\x02\x02\x02\xAA\xAC\x05\x06\x04" +
		"\x02\xAB\xA6\x03\x02\x02\x02\xAB\xAA\x03\x02\x02\x02\xAC\xAE\x03\x02\x02" +
		"\x02\xADH\x03\x02\x02\x02\xADJ\x03\x02\x02\x02\xADK\x03\x02\x02\x02\xAD" +
		"M\x03\x02\x02\x02\xADO\x03\x02\x02\x02\xADP\x03\x02\x02\x02\xADc\x03\x02" +
		"\x02\x02\xADg\x03\x02\x02\x02\xADm\x03\x02\x02\x02\xADn\x03\x02\x02\x02" +
		"\xADo\x03\x02\x02\x02\xADy\x03\x02\x02\x02\xAD~\x03\x02\x02\x02\xAD\x87" +
		"\x03\x02\x02\x02\xAD\x97\x03\x02\x02\x02\xAE\xD1\x03\x02\x02\x02\xAF\xB0" +
		"\f\x10\x02\x02\xB0\xB1\x07\x16\x02\x02\xB1\xD0\x05\x06\x04\x11\xB2\xB3" +
		"\f\x0F\x02\x02\xB3\xB4\t\x04\x02\x02\xB4\xD0\x05\x06\x04\x10\xB5\xB6\f" +
		"\x0E\x02\x02\xB6\xB7\t\x05\x02\x02\xB7\xD0\x05\x06\x04\x0F\xB8\xB9\f\r" +
		"\x02\x02\xB9\xBA\t\x06\x02\x02\xBA\xD0\x05\x06\x04\x0E\xBB\xBC\f\f\x02" +
		"\x02\xBC\xBD\t\x07\x02\x02\xBD\xD0\x05\x06\x04\r\xBE\xBF\f\v\x02\x02\xBF" +
		"\xC0\x07\"\x02\x02\xC0\xD0\x05\x06\x04\f\xC1\xC2\f\n\x02\x02\xC2\xC3\x07" +
		"\x06\x02\x02\xC3\xC4\x05\x06\x04\x02\xC4\xC5\x07\"\x02\x02\xC5\xC6\x05" +
		"\x06\x04\v\xC6\xD0\x03\x02\x02\x02\xC7\xC8\f\x12\x02\x02\xC8\xC9\x07\x15" +
		"\x02\x02\xC9\xD0\x075\x02\x02\xCA\xCB\f\x11\x02\x02\xCB\xCC\x07\x07\x02" +
		"\x02\xCC\xCD\x05\x06\x04\x02\xCD\xCE\x07\b\x02\x02\xCE\xD0\x03\x02\x02" +
		"\x02\xCF\xAF\x03\x02\x02\x02\xCF\xB2\x03\x02\x02\x02\xCF\xB5\x03\x02\x02" +
		"\x02\xCF\xB8\x03\x02\x02\x02\xCF\xBB\x03\x02\x02\x02\xCF\xBE\x03\x02\x02" +
		"\x02\xCF\xC1\x03\x02\x02\x02\xCF\xC7\x03\x02\x02\x02\xCF\xCA\x03\x02\x02" +
		"\x02\xD0\xD3\x03\x02\x02\x02\xD1\xCF\x03\x02\x02\x02\xD1\xD2\x03\x02\x02" +
		"\x02\xD2\x07\x03\x02\x02\x02\xD3\xD1\x03\x02\x02\x02\xD4\xD5\x07+\x02" +
		"\x02\xD5\xD6\x075\x02\x02\xD6\xD7\x07\n\x02\x02\xD7\xD8\x05\f\x07\x02" +
		"\xD8\xD9\x07\v\x02\x02\xD9\xDA\x05\x06\x04\x02\xDA\xF6\x03\x02\x02\x02" +
		"\xDB\xDC\x05\x06\x04\x02\xDC\xDD\x07\x13\x02\x02\xDD\xE0\x05\x06\x04\x02" +
		"\xDE\xDF\x07\x0F\x02\x02\xDF\xE1\x05\x04\x03\x02\xE0\xDE\x03\x02\x02\x02" +
		"\xE0\xE1\x03\x02\x02\x02\xE1\xE2\x03\x02\x02\x02\xE2\xE3\x07\x14\x02\x02" +
		"\xE3\xF6\x03\x02\x02\x02\xE4\xE5\x07,\x02\x02\xE5\xE6\x075\x02\x02\xE6" +
		"\xE8\x07\x03\x02\x02\xE7\xE9\x05\b\x05\x02\xE8\xE7\x03\x02\x02\x02\xE9" +
		"\xEA\x03\x02\x02\x02\xEA\xE8\x03\x02\x02\x02\xEA\xEB\x03\x02\x02\x02\xEB" +
		"\xEC\x03\x02\x02\x02\xEC\xED\x07\x04\x02\x02\xED\xF6\x03\x02\x02\x02\xEE" +
		"\xEF\x07-\x02\x02\xEF\xF0\x073\x02\x02\xF0\xF1\x07.\x02\x02\xF1\xF6\x07" +
		"5\x02\x02\xF2\xF6\x073\x02\x02\xF3\xF4\x075\x02\x02\xF4\xF6\x05\x04\x03" +
		"\x02\xF5\xD4\x03\x02\x02\x02\xF5\xDB\x03\x02\x02\x02\xF5\xE4\x03\x02\x02" +
		"\x02\xF5\xEE\x03\x02\x02\x02\xF5\xF2\x03\x02\x02\x02\xF5\xF3\x03\x02\x02" +
		"\x02\xF6\t\x03\x02\x02\x02\xF7\xF9\x05\b\x05\x02\xF8\xF7\x03\x02\x02\x02" +
		"\xF9\xFA\x03\x02\x02\x02\xFA\xF8\x03\x02\x02\x02\xFA\xFB\x03\x02\x02\x02" +
		"\xFB\xFC\x03\x02\x02\x02\xFC\xFD\x07\x02\x02\x03\xFD\v\x03\x02\x02\x02" +
		"\xFE\xFF\x075\x02\x02\xFF\u0101\x07\x06\x02\x02\u0100\xFE\x03\x02\x02" +
		"\x02\u0101\u0104\x03\x02\x02\x02\u0102\u0100\x03\x02\x02\x02\u0102\u0103" +
		"\x03\x02\x02\x02\u0103\u0105\x03\x02\x02\x02\u0104\u0102\x03\x02\x02\x02" +
		"\u0105\u0106\x075\x02\x02\u0106\r\x03\x02\x02\x02\u0107\u0108\x05\x06" +
		"\x04\x02\u0108\u0109\x07\x06\x02\x02\u0109\u010B\x03\x02\x02\x02\u010A" +
		"\u0107\x03\x02\x02\x02\u010B\u010E\x03\x02\x02\x02\u010C\u010A\x03\x02" +
		"\x02\x02\u010C\u010D\x03\x02\x02\x02\u010D\u010F\x03\x02\x02\x02\u010E" +
		"\u010C\x03\x02\x02\x02\u010F\u0110\x05\x06\x04\x02\u0110\x0F\x03\x02\x02" +
		"\x02\u0111\u0115\x07\x07\x02\x02\u0112\u0113\x05\x06\x04\x02\u0113\u0114" +
		"\x07\x06\x02\x02\u0114\u0116\x03\x02\x02\x02\u0115\u0112\x03\x02\x02\x02" +
		"\u0116\u0117\x03\x02\x02\x02\u0117\u0115\x03\x02\x02\x02\u0117\u0118\x03" +
		"\x02\x02\x02\u0118\u0119\x03\x02\x02\x02\u0119\u011A\x05\x06\x04\x02\u011A" +
		"\u011B\x07\b\x02\x02\u011B\u011F\x03\x02\x02\x02\u011C\u011D\x07\x07\x02" +
		"\x02\u011D\u011F\x07\b\x02\x02\u011E\u0111\x03\x02\x02\x02\u011E\u011C" +
		"\x03\x02\x02\x02\u011F\x11\x03\x02\x02\x02\u0120\u0121\x05\x16\f\x02\u0121" +
		"\u0122\x07/\x02\x02\u0122\u012B\x03\x02\x02\x02\u0123\u0124\x05\x16\f" +
		"\x02\u0124\u0126\x07\n\x02\x02\u0125\u0127\x05\x0E\b\x02\u0126\u0125\x03" +
		"\x02\x02\x02\u0126\u0127\x03\x02\x02\x02\u0127\u0128\x03\x02\x02\x02\u0128" +
		"\u0129\x07\v\x02\x02\u0129\u012B\x03\x02\x02\x02\u012A\u0120\x03\x02\x02" +
		"\x02\u012A\u0123\x03\x02\x02\x02\u012B\x13\x03\x02\x02\x02\u012C\u012D" +
		"\x05\x16\f\x02\u012D\u012E\x070\x02\x02\u012E\u0137\x03\x02\x02\x02\u012F" +
		"\u0130\x05\x16\f\x02\u0130\u0132\x071\x02\x02\u0131\u0133\x05\x0E\b\x02" +
		"\u0132\u0131\x03\x02\x02\x02\u0132\u0133\x03\x02\x02\x02\u0133\u0134\x03" +
		"\x02\x02\x02\u0134\u0135\x07\v\x02\x02\u0135\u0137\x03\x02\x02\x02\u0136" +
		"\u012C\x03\x02\x02\x02\u0136\u012F\x03\x02\x02\x02\u0137\x15\x03\x02\x02" +
		"\x02\u0138\u0139\x075\x02\x02\u0139\u013B\x072\x02\x02\u013A\u0138\x03" +
		"\x02\x02\x02\u013B\u013E\x03\x02\x02\x02\u013C\u013A\x03\x02\x02\x02\u013C" +
		"\u013D\x03\x02\x02\x02\u013D\u013F\x03\x02\x02\x02\u013E\u013C\x03\x02" +
		"\x02\x02\u013F\u0140\x075\x02\x02\u0140\x17\x03\x02\x02\x02\x1E&+5:CZ" +
		"\x82\x90\x94\x9D\xA3\xAB\xAD\xCF\xD1\xE0\xEA\xF5\xFA\u0102\u010C\u0117" +
		"\u011E\u0126\u012A\u0132\u0136\u013C";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!DesmoscriptParser.__ATN) {
			DesmoscriptParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(DesmoscriptParser._serializedATN));
		}

		return DesmoscriptParser.__ATN;
	}

}

export class DjsonContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_djson; }
	public copyFrom(ctx: DjsonContext): void {
		super.copyFrom(ctx);
	}
}
export class NumberDJsonContext extends DjsonContext {
	public _data!: Token;
	public NUMBER(): TerminalNode { return this.getToken(DesmoscriptParser.NUMBER, 0); }
	constructor(ctx: DjsonContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterNumberDJson) {
			listener.enterNumberDJson(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitNumberDJson) {
			listener.exitNumberDJson(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitNumberDJson) {
			return visitor.visitNumberDJson(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringDJsonContext extends DjsonContext {
	public _data!: Token;
	public STRING(): TerminalNode { return this.getToken(DesmoscriptParser.STRING, 0); }
	constructor(ctx: DjsonContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterStringDJson) {
			listener.enterStringDJson(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitStringDJson) {
			listener.exitStringDJson(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitStringDJson) {
			return visitor.visitStringDJson(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ObjectDJsonContext extends DjsonContext {
	public _IDENTIFIER_SEGMENT!: Token;
	public _keys: Token[] = [];
	public _djson!: DjsonContext;
	public _values: DjsonContext[] = [];
	public IDENTIFIER_SEGMENT(): TerminalNode[];
	public IDENTIFIER_SEGMENT(i: number): TerminalNode;
	public IDENTIFIER_SEGMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT);
		} else {
			return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
	}
	public djson(): DjsonContext[];
	public djson(i: number): DjsonContext;
	public djson(i?: number): DjsonContext | DjsonContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DjsonContext);
		} else {
			return this.getRuleContext(i, DjsonContext);
		}
	}
	constructor(ctx: DjsonContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterObjectDJson) {
			listener.enterObjectDJson(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitObjectDJson) {
			listener.exitObjectDJson(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitObjectDJson) {
			return visitor.visitObjectDJson(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ArrayDJsonContext extends DjsonContext {
	public _djson!: DjsonContext;
	public _elements: DjsonContext[] = [];
	public djson(): DjsonContext[];
	public djson(i: number): DjsonContext;
	public djson(i?: number): DjsonContext | DjsonContext[] {
		if (i === undefined) {
			return this.getRuleContexts(DjsonContext);
		} else {
			return this.getRuleContext(i, DjsonContext);
		}
	}
	constructor(ctx: DjsonContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterArrayDJson) {
			listener.enterArrayDJson(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitArrayDJson) {
			listener.exitArrayDJson(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitArrayDJson) {
			return visitor.visitArrayDJson(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DesmoscriptDJsonContext extends DjsonContext {
	public _expr!: ExpressionContext;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: DjsonContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterDesmoscriptDJson) {
			listener.enterDesmoscriptDJson(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitDesmoscriptDJson) {
			listener.exitDesmoscriptDJson(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitDesmoscriptDJson) {
			return visitor.visitDesmoscriptDJson(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BooleanDJsonContext extends DjsonContext {
	public _data!: Token;
	constructor(ctx: DjsonContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterBooleanDJson) {
			listener.enterBooleanDJson(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitBooleanDJson) {
			listener.exitBooleanDJson(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitBooleanDJson) {
			return visitor.visitBooleanDJson(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NullDJsonContext extends DjsonContext {
	constructor(ctx: DjsonContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterNullDJson) {
			listener.enterNullDJson(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitNullDJson) {
			listener.exitNullDJson(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitNullDJson) {
			return visitor.visitNullDJson(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DjsonExpressionContext extends ParserRuleContext {
	public _jsonval!: DjsonContext;
	public djson(): DjsonContext {
		return this.getRuleContext(0, DjsonContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_djsonExpression; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterDjsonExpression) {
			listener.enterDjsonExpression(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitDjsonExpression) {
			listener.exitDjsonExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitDjsonExpression) {
			return visitor.visitDjsonExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_expression; }
	public copyFrom(ctx: ExpressionContext): void {
		super.copyFrom(ctx);
	}
}
export class FunctionCallExprContext extends ExpressionContext {
	public _call!: FunctionCallContext;
	public functionCall(): FunctionCallContext {
		return this.getRuleContext(0, FunctionCallContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterFunctionCallExpr) {
			listener.enterFunctionCallExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitFunctionCallExpr) {
			listener.exitFunctionCallExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitFunctionCallExpr) {
			return visitor.visitFunctionCallExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MacroCallExprContext extends ExpressionContext {
	public _call!: MacroCallContext;
	public macroCall(): MacroCallContext {
		return this.getRuleContext(0, MacroCallContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterMacroCallExpr) {
			listener.enterMacroCallExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitMacroCallExpr) {
			listener.exitMacroCallExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitMacroCallExpr) {
			return visitor.visitMacroCallExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class UnaryMinusExprContext extends ExpressionContext {
	public _expr!: ExpressionContext;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterUnaryMinusExpr) {
			listener.enterUnaryMinusExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitUnaryMinusExpr) {
			listener.exitUnaryMinusExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitUnaryMinusExpr) {
			return visitor.visitUnaryMinusExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalNotExprContext extends ExpressionContext {
	public _expr!: ExpressionContext;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterLogicalNotExpr) {
			listener.enterLogicalNotExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitLogicalNotExpr) {
			listener.exitLogicalNotExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitLogicalNotExpr) {
			return visitor.visitLogicalNotExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class IdentifierExprContext extends ExpressionContext {
	public _ident!: IdentifierContext;
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterIdentifierExpr) {
			listener.enterIdentifierExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitIdentifierExpr) {
			listener.exitIdentifierExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitIdentifierExpr) {
			return visitor.visitIdentifierExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListCompExprContext extends ExpressionContext {
	public _body!: ExpressionContext;
	public _IDENTIFIER_SEGMENT!: Token;
	public _variables: Token[] = [];
	public _expression!: ExpressionContext;
	public _lists: ExpressionContext[] = [];
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public IDENTIFIER_SEGMENT(): TerminalNode[];
	public IDENTIFIER_SEGMENT(i: number): TerminalNode;
	public IDENTIFIER_SEGMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT);
		} else {
			return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterListCompExpr) {
			listener.enterListCompExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitListCompExpr) {
			listener.exitListCompExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitListCompExpr) {
			return visitor.visitListCompExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ParentheticalExprContext extends ExpressionContext {
	public _expr!: ExpressionContext;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterParentheticalExpr) {
			listener.enterParentheticalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitParentheticalExpr) {
			listener.exitParentheticalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitParentheticalExpr) {
			return visitor.visitParentheticalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class PointExprContext extends ExpressionContext {
	public _x!: ExpressionContext;
	public _y!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterPointExpr) {
			listener.enterPointExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitPointExpr) {
			listener.exitPointExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitPointExpr) {
			return visitor.visitPointExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MemberAccessExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: Token;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public IDENTIFIER_SEGMENT(): TerminalNode { return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterMemberAccessExpr) {
			listener.enterMemberAccessExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitMemberAccessExpr) {
			listener.exitMemberAccessExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitMemberAccessExpr) {
			return visitor.visitMemberAccessExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListMemberAccessExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterListMemberAccessExpr) {
			listener.enterListMemberAccessExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitListMemberAccessExpr) {
			listener.exitListMemberAccessExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitListMemberAccessExpr) {
			return visitor.visitListMemberAccessExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MultOrDivExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterMultOrDivExpr) {
			listener.enterMultOrDivExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitMultOrDivExpr) {
			listener.exitMultOrDivExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitMultOrDivExpr) {
			return visitor.visitMultOrDivExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AddOrSubExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterAddOrSubExpr) {
			listener.enterAddOrSubExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitAddOrSubExpr) {
			listener.exitAddOrSubExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitAddOrSubExpr) {
			return visitor.visitAddOrSubExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ComparisonExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterComparisonExpr) {
			listener.enterComparisonExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitComparisonExpr) {
			listener.exitComparisonExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitComparisonExpr) {
			return visitor.visitComparisonExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class LogicalExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterLogicalExpr) {
			listener.enterLogicalExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitLogicalExpr) {
			listener.exitLogicalExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitLogicalExpr) {
			return visitor.visitLogicalExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class RangeExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterRangeExpr) {
			listener.enterRangeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitRangeExpr) {
			listener.exitRangeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitRangeExpr) {
			return visitor.visitRangeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StepRangeExprContext extends ExpressionContext {
	public _left!: ExpressionContext;
	public _step!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterStepRangeExpr) {
			listener.enterStepRangeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitStepRangeExpr) {
			listener.exitStepRangeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitStepRangeExpr) {
			return visitor.visitStepRangeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NumberExprContext extends ExpressionContext {
	public NUMBER(): TerminalNode { return this.getToken(DesmoscriptParser.NUMBER, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterNumberExpr) {
			listener.enterNumberExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitNumberExpr) {
			listener.exitNumberExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitNumberExpr) {
			return visitor.visitNumberExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ListExprContext extends ExpressionContext {
	public _l!: ListContext;
	public list(): ListContext {
		return this.getRuleContext(0, ListContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterListExpr) {
			listener.enterListExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitListExpr) {
			listener.exitListExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitListExpr) {
			return visitor.visitListExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class SumProdIntegralExprContext extends ExpressionContext {
	public _op!: Token;
	public _var!: Token;
	public _lo!: ExpressionContext;
	public _hi!: ExpressionContext;
	public _body!: ExpressionContext;
	public IDENTIFIER_SEGMENT(): TerminalNode { return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterSumProdIntegralExpr) {
			listener.enterSumProdIntegralExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitSumProdIntegralExpr) {
			listener.exitSumProdIntegralExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitSumProdIntegralExpr) {
			return visitor.visitSumProdIntegralExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DerivativeExprContext extends ExpressionContext {
	public _var!: Token;
	public _body!: ExpressionContext;
	public IDENTIFIER_SEGMENT(): TerminalNode { return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterDerivativeExpr) {
			listener.enterDerivativeExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitDerivativeExpr) {
			listener.exitDerivativeExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitDerivativeExpr) {
			return visitor.visitDerivativeExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BlockExprContext extends ExpressionContext {
	public _statement!: StatementContext;
	public _statements: StatementContext[] = [];
	public _expr!: ExpressionContext;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterBlockExpr) {
			listener.enterBlockExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitBlockExpr) {
			listener.exitBlockExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitBlockExpr) {
			return visitor.visitBlockExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class MatchExprContext extends ExpressionContext {
	public _expression!: ExpressionContext;
	public _predicate: ExpressionContext[] = [];
	public _result: ExpressionContext[] = [];
	public _fallback!: ExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterMatchExpr) {
			listener.enterMatchExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitMatchExpr) {
			listener.exitMatchExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitMatchExpr) {
			return visitor.visitMatchExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ActionExprContext extends ExpressionContext {
	public _expression!: ExpressionContext;
	public _lefts: ExpressionContext[] = [];
	public _op!: Token;
	public _rights: ExpressionContext[] = [];
	public _singles: ExpressionContext[] = [];
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterActionExpr) {
			listener.enterActionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitActionExpr) {
			listener.exitActionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitActionExpr) {
			return visitor.visitActionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_statement; }
	public copyFrom(ctx: StatementContext): void {
		super.copyFrom(ctx);
	}
}
export class FunctionDefinitionStatementContext extends StatementContext {
	public _fnname!: Token;
	public _fnargs!: FunctionDefArgListContext;
	public _expr!: ExpressionContext;
	public IDENTIFIER_SEGMENT(): TerminalNode { return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	public functionDefArgList(): FunctionDefArgListContext {
		return this.getRuleContext(0, FunctionDefArgListContext);
	}
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterFunctionDefinitionStatement) {
			listener.enterFunctionDefinitionStatement(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitFunctionDefinitionStatement) {
			listener.exitFunctionDefinitionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitFunctionDefinitionStatement) {
			return visitor.visitFunctionDefinitionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class AssignmentStatementContext extends StatementContext {
	public _left!: ExpressionContext;
	public _op!: Token;
	public _right!: ExpressionContext;
	public _annotation!: DjsonExpressionContext;
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public djsonExpression(): DjsonExpressionContext | undefined {
		return this.tryGetRuleContext(0, DjsonExpressionContext);
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterAssignmentStatement) {
			listener.enterAssignmentStatement(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitAssignmentStatement) {
			listener.exitAssignmentStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitAssignmentStatement) {
			return visitor.visitAssignmentStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NamespaceDefinitionStatementContext extends StatementContext {
	public _nsname!: Token;
	public _statement!: StatementContext;
	public _statements: StatementContext[] = [];
	public IDENTIFIER_SEGMENT(): TerminalNode { return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterNamespaceDefinitionStatement) {
			listener.enterNamespaceDefinitionStatement(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitNamespaceDefinitionStatement) {
			listener.exitNamespaceDefinitionStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitNamespaceDefinitionStatement) {
			return visitor.visitNamespaceDefinitionStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class ImportStatementContext extends StatementContext {
	public _filename!: Token;
	public _alias!: Token;
	public STRING(): TerminalNode { return this.getToken(DesmoscriptParser.STRING, 0); }
	public IDENTIFIER_SEGMENT(): TerminalNode { return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterImportStatement) {
			listener.enterImportStatement(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitImportStatement) {
			listener.exitImportStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitImportStatement) {
			return visitor.visitImportStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class StringStatementContext extends StatementContext {
	public _str!: Token;
	public STRING(): TerminalNode { return this.getToken(DesmoscriptParser.STRING, 0); }
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterStringStatement) {
			listener.enterStringStatement(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitStringStatement) {
			listener.exitStringStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitStringStatement) {
			return visitor.visitStringStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NamedJsonStatementContext extends StatementContext {
	public _namedjsontype!: Token;
	public _jsonval!: DjsonExpressionContext;
	public IDENTIFIER_SEGMENT(): TerminalNode { return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	public djsonExpression(): DjsonExpressionContext {
		return this.getRuleContext(0, DjsonExpressionContext);
	}
	constructor(ctx: StatementContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterNamedJsonStatement) {
			listener.enterNamedJsonStatement(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitNamedJsonStatement) {
			listener.exitNamedJsonStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitNamedJsonStatement) {
			return visitor.visitNamedJsonStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementListContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(DesmoscriptParser.EOF, 0); }
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_statementList; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterStatementList) {
			listener.enterStatementList(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitStatementList) {
			listener.exitStatementList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitStatementList) {
			return visitor.visitStatementList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionDefArgListContext extends ParserRuleContext {
	public _IDENTIFIER_SEGMENT!: Token;
	public _args: Token[] = [];
	public IDENTIFIER_SEGMENT(): TerminalNode[];
	public IDENTIFIER_SEGMENT(i: number): TerminalNode;
	public IDENTIFIER_SEGMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT);
		} else {
			return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_functionDefArgList; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterFunctionDefArgList) {
			listener.enterFunctionDefArgList(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitFunctionDefArgList) {
			listener.exitFunctionDefArgList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitFunctionDefArgList) {
			return visitor.visitFunctionDefArgList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionCallArgListContext extends ParserRuleContext {
	public _expression!: ExpressionContext;
	public _args: ExpressionContext[] = [];
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_functionCallArgList; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterFunctionCallArgList) {
			listener.enterFunctionCallArgList(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitFunctionCallArgList) {
			listener.exitFunctionCallArgList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitFunctionCallArgList) {
			return visitor.visitFunctionCallArgList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ListContext extends ParserRuleContext {
	public _expression!: ExpressionContext;
	public _elements: ExpressionContext[] = [];
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_list; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterList) {
			listener.enterList(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitList) {
			listener.exitList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitList) {
			return visitor.visitList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionCallContext extends ParserRuleContext {
	public _fnname!: IdentifierContext;
	public _fnargs!: FunctionCallArgListContext;
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public functionCallArgList(): FunctionCallArgListContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallArgListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_functionCall; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterFunctionCall) {
			listener.enterFunctionCall(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitFunctionCall) {
			listener.exitFunctionCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitFunctionCall) {
			return visitor.visitFunctionCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MacroCallContext extends ParserRuleContext {
	public _fnname!: IdentifierContext;
	public _fnargs!: FunctionCallArgListContext;
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public functionCallArgList(): FunctionCallArgListContext | undefined {
		return this.tryGetRuleContext(0, FunctionCallArgListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_macroCall; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterMacroCall) {
			listener.enterMacroCall(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitMacroCall) {
			listener.exitMacroCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitMacroCall) {
			return visitor.visitMacroCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public _IDENTIFIER_SEGMENT!: Token;
	public _segments: Token[] = [];
	public IDENTIFIER_SEGMENT(): TerminalNode[];
	public IDENTIFIER_SEGMENT(i: number): TerminalNode;
	public IDENTIFIER_SEGMENT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT);
		} else {
			return this.getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return DesmoscriptParser.RULE_identifier; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitIdentifier) {
			return visitor.visitIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}

