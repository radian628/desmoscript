// Generated from grammar/Desmoscript.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { DesmoscriptListener } from "./DesmoscriptListener";
import { DesmoscriptVisitor } from "./DesmoscriptVisitor";


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
	public static readonly STRING = 48;
	public static readonly NUMBER = 49;
	public static readonly IDENTIFIER_SEGMENT = 50;
	public static readonly WS = 51;
	public static readonly RULE_djson = 0;
	public static readonly RULE_expression = 1;
	public static readonly RULE_expressionList = 2;
	public static readonly RULE_functionDefArgList = 3;
	public static readonly RULE_functionCallArgList = 4;
	public static readonly RULE_list = 5;
	public static readonly RULE_functionCall = 6;
	public static readonly RULE_macroCall = 7;
	public static readonly RULE_identifier = 8;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"djson", "expression", "expressionList", "functionDefArgList", "functionCallArgList", 
		"list", "functionCall", "macroCall", "identifier",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'{'", "'}'", "':'", "','", "'['", "']'", "'ds'", "'('", "')'", 
		"'true'", "'false'", "'null'", "'@'", "'import'", "'as'", "';'", "'settings'", 
		"'for'", "'='", "'\\'", "'*'", "'/'", "'%'", "'+'", "'-'", "'=='", "'>'", 
		"'<'", "'>='", "'<='", "'..'", "'sum'", "'product'", "'integral'", "'to'", 
		"'derivative'", "'macro'", "'fn'", "'ns'", "'with'", "'match'", "'=>'", 
		"'->'", "'()'", "'!()'", "'!('", "'.'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, undefined, undefined, "STRING", 
		"NUMBER", "IDENTIFIER_SEGMENT", "WS",
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
			this.state = 61;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case DesmoscriptParser.NUMBER:
				_localctx = new NumberDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 18;
				(_localctx as NumberDJsonContext)._data = this.match(DesmoscriptParser.NUMBER);
				}
				break;
			case DesmoscriptParser.STRING:
				_localctx = new StringDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 19;
				(_localctx as StringDJsonContext)._data = this.match(DesmoscriptParser.STRING);
				}
				break;
			case DesmoscriptParser.T__0:
				_localctx = new ObjectDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 37;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
				case 1:
					{
					this.state = 20;
					this.match(DesmoscriptParser.T__0);
					this.state = 21;
					this.match(DesmoscriptParser.T__1);
					}
					break;

				case 2:
					{
					this.state = 22;
					this.match(DesmoscriptParser.T__0);
					this.state = 23;
					(_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
					(_localctx as ObjectDJsonContext)._keys.push((_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT);
					this.state = 24;
					this.match(DesmoscriptParser.T__2);
					this.state = 25;
					(_localctx as ObjectDJsonContext)._djson = this.djson();
					(_localctx as ObjectDJsonContext)._values.push((_localctx as ObjectDJsonContext)._djson);
					this.state = 32;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === DesmoscriptParser.T__3) {
						{
						{
						this.state = 26;
						this.match(DesmoscriptParser.T__3);
						this.state = 27;
						(_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
						(_localctx as ObjectDJsonContext)._keys.push((_localctx as ObjectDJsonContext)._IDENTIFIER_SEGMENT);
						this.state = 28;
						this.match(DesmoscriptParser.T__2);
						this.state = 29;
						(_localctx as ObjectDJsonContext)._djson = this.djson();
						(_localctx as ObjectDJsonContext)._values.push((_localctx as ObjectDJsonContext)._djson);
						}
						}
						this.state = 34;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 35;
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
				this.state = 52;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 3, this._ctx) ) {
				case 1:
					{
					this.state = 39;
					this.match(DesmoscriptParser.T__4);
					this.state = 40;
					this.match(DesmoscriptParser.T__5);
					}
					break;

				case 2:
					{
					this.state = 41;
					this.match(DesmoscriptParser.T__4);
					this.state = 42;
					(_localctx as ArrayDJsonContext)._djson = this.djson();
					(_localctx as ArrayDJsonContext)._elements.push((_localctx as ArrayDJsonContext)._djson);
					this.state = 47;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					while (_la === DesmoscriptParser.T__3) {
						{
						{
						this.state = 43;
						this.match(DesmoscriptParser.T__3);
						this.state = 44;
						(_localctx as ArrayDJsonContext)._djson = this.djson();
						(_localctx as ArrayDJsonContext)._elements.push((_localctx as ArrayDJsonContext)._djson);
						}
						}
						this.state = 49;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					}
					this.state = 50;
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
				this.state = 54;
				this.match(DesmoscriptParser.T__6);
				this.state = 55;
				this.match(DesmoscriptParser.T__7);
				this.state = 56;
				(_localctx as DesmoscriptDJsonContext)._expr = this.expression(0);
				this.state = 57;
				this.match(DesmoscriptParser.T__8);
				}
				break;
			case DesmoscriptParser.T__9:
			case DesmoscriptParser.T__10:
				_localctx = new BooleanDJsonContext(_localctx);
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 59;
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
				this.state = 60;
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
		let _startState: number = 2;
		this.enterRecursionRule(_localctx, 2, DesmoscriptParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 191;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 13, this._ctx) ) {
			case 1:
				{
				_localctx = new FunctionCallExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;

				this.state = 64;
				(_localctx as FunctionCallExprContext)._call = this.functionCall();
				}
				break;

			case 2:
				{
				_localctx = new JSONExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 65;
				this.match(DesmoscriptParser.T__12);
				this.state = 66;
				(_localctx as JSONExprContext)._jsonval = this.djson();
				}
				break;

			case 3:
				{
				_localctx = new MacroCallExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 67;
				(_localctx as MacroCallExprContext)._call = this.macroCall();
				}
				break;

			case 4:
				{
				_localctx = new ImportExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 68;
				this.match(DesmoscriptParser.T__13);
				this.state = 69;
				(_localctx as ImportExprContext)._filename = this.match(DesmoscriptParser.STRING);
				this.state = 72;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === DesmoscriptParser.T__14) {
					{
					this.state = 70;
					this.match(DesmoscriptParser.T__14);
					this.state = 71;
					(_localctx as ImportExprContext)._alias = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
					}
				}

				this.state = 74;
				this.match(DesmoscriptParser.T__15);
				}
				break;

			case 5:
				{
				_localctx = new NamedJsonExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 75;
				(_localctx as NamedJsonExprContext)._namedjsontype = this.match(DesmoscriptParser.T__16);
				this.state = 76;
				(_localctx as NamedJsonExprContext)._jsonval = this.expression(24);
				}
				break;

			case 6:
				{
				_localctx = new IdentifierExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 77;
				(_localctx as IdentifierExprContext)._ident = this.identifier();
				}
				break;

			case 7:
				{
				_localctx = new ListCompExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 78;
				this.match(DesmoscriptParser.T__4);
				this.state = 79;
				(_localctx as ListCompExprContext)._body = this.expression(0);
				this.state = 80;
				this.match(DesmoscriptParser.T__17);
				this.state = 88;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 81;
						(_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
						(_localctx as ListCompExprContext)._variables.push((_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT);
						this.state = 82;
						this.match(DesmoscriptParser.T__18);
						this.state = 83;
						(_localctx as ListCompExprContext)._expression = this.expression(0);
						(_localctx as ListCompExprContext)._lists.push((_localctx as ListCompExprContext)._expression);
						this.state = 84;
						this.match(DesmoscriptParser.T__15);
						}
						}
					}
					this.state = 90;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 6, this._ctx);
				}
				{
				this.state = 91;
				(_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				(_localctx as ListCompExprContext)._variables.push((_localctx as ListCompExprContext)._IDENTIFIER_SEGMENT);
				this.state = 92;
				this.match(DesmoscriptParser.T__18);
				this.state = 93;
				(_localctx as ListCompExprContext)._expression = this.expression(0);
				(_localctx as ListCompExprContext)._lists.push((_localctx as ListCompExprContext)._expression);
				}
				this.state = 95;
				this.match(DesmoscriptParser.T__5);
				}
				break;

			case 8:
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

			case 9:
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

			case 10:
				{
				_localctx = new NumberExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 107;
				this.match(DesmoscriptParser.NUMBER);
				}
				break;

			case 11:
				{
				_localctx = new ListExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 108;
				(_localctx as ListExprContext)._l = this.list();
				}
				break;

			case 12:
				{
				_localctx = new SumProdIntegralExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 109;
				(_localctx as SumProdIntegralExprContext)._op = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)))) !== 0))) {
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
				this.match(DesmoscriptParser.T__18);
				this.state = 113;
				(_localctx as SumProdIntegralExprContext)._lo = this.expression(0);
				this.state = 114;
				this.match(DesmoscriptParser.T__34);
				this.state = 115;
				(_localctx as SumProdIntegralExprContext)._hi = this.expression(0);
				this.state = 116;
				this.match(DesmoscriptParser.T__8);
				this.state = 117;
				(_localctx as SumProdIntegralExprContext)._body = this.expression(10);
				}
				break;

			case 13:
				{
				_localctx = new DerivativeExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 119;
				this.match(DesmoscriptParser.T__35);
				this.state = 120;
				this.match(DesmoscriptParser.T__7);
				this.state = 121;
				(_localctx as DerivativeExprContext)._var = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 122;
				this.match(DesmoscriptParser.T__8);
				this.state = 123;
				(_localctx as DerivativeExprContext)._body = this.expression(9);
				}
				break;

			case 14:
				{
				_localctx = new MacroDefinitionExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 124;
				this.match(DesmoscriptParser.T__36);
				this.state = 125;
				(_localctx as MacroDefinitionExprContext)._macroname = this.identifier();
				this.state = 126;
				this.match(DesmoscriptParser.T__7);
				this.state = 127;
				(_localctx as MacroDefinitionExprContext)._macroargs = this.functionDefArgList();
				this.state = 128;
				this.match(DesmoscriptParser.T__8);
				this.state = 129;
				this.match(DesmoscriptParser.T__0);
				this.state = 131;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 130;
					(_localctx as MacroDefinitionExprContext)._expression = this.expression(0);
					(_localctx as MacroDefinitionExprContext)._exprs.push((_localctx as MacroDefinitionExprContext)._expression);
					}
					}
					this.state = 133;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0));
				this.state = 135;
				this.match(DesmoscriptParser.T__1);
				}
				break;

			case 15:
				{
				_localctx = new FunctionDefinitionExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 137;
				this.match(DesmoscriptParser.T__37);
				this.state = 138;
				(_localctx as FunctionDefinitionExprContext)._fnname = this.identifier();
				this.state = 139;
				this.match(DesmoscriptParser.T__7);
				this.state = 140;
				(_localctx as FunctionDefinitionExprContext)._fnargs = this.functionDefArgList();
				this.state = 141;
				this.match(DesmoscriptParser.T__8);
				this.state = 142;
				this.match(DesmoscriptParser.T__0);
				this.state = 144;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 143;
					(_localctx as FunctionDefinitionExprContext)._expression = this.expression(0);
					(_localctx as FunctionDefinitionExprContext)._exprs.push((_localctx as FunctionDefinitionExprContext)._expression);
					}
					}
					this.state = 146;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0));
				this.state = 148;
				this.match(DesmoscriptParser.T__1);
				}
				break;

			case 16:
				{
				_localctx = new NamespaceDefinitionExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 150;
				this.match(DesmoscriptParser.T__38);
				this.state = 151;
				(_localctx as NamespaceDefinitionExprContext)._nsname = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 152;
				this.match(DesmoscriptParser.T__0);
				this.state = 154;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 153;
					(_localctx as NamespaceDefinitionExprContext)._expression = this.expression(0);
					(_localctx as NamespaceDefinitionExprContext)._exprs.push((_localctx as NamespaceDefinitionExprContext)._expression);
					}
					}
					this.state = 156;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0));
				this.state = 158;
				this.match(DesmoscriptParser.T__1);
				}
				break;

			case 17:
				{
				_localctx = new DecoratedExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 160;
				(_localctx as DecoratedExprContext)._qualifier = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
				this.state = 161;
				(_localctx as DecoratedExprContext)._expr = this.expression(0);
				this.state = 162;
				this.match(DesmoscriptParser.T__39);
				this.state = 163;
				(_localctx as DecoratedExprContext)._jsonval = this.expression(5);
				}
				break;

			case 18:
				{
				_localctx = new BlockExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 165;
				this.match(DesmoscriptParser.T__0);
				this.state = 167;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				do {
					{
					{
					this.state = 166;
					(_localctx as BlockExprContext)._expression = this.expression(0);
					(_localctx as BlockExprContext)._exprs.push((_localctx as BlockExprContext)._expression);
					}
					}
					this.state = 169;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0));
				this.state = 171;
				this.match(DesmoscriptParser.T__1);
				}
				break;

			case 19:
				{
				_localctx = new MatchExprContext(_localctx);
				this._ctx = _localctx;
				_prevctx = _localctx;
				this.state = 173;
				this.match(DesmoscriptParser.T__40);
				this.state = 174;
				this.match(DesmoscriptParser.T__0);
				this.state = 182;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 175;
						(_localctx as MatchExprContext)._expression = this.expression(0);
						(_localctx as MatchExprContext)._predicate.push((_localctx as MatchExprContext)._expression);
						this.state = 176;
						this.match(DesmoscriptParser.T__41);
						this.state = 177;
						(_localctx as MatchExprContext)._expression = this.expression(0);
						(_localctx as MatchExprContext)._result.push((_localctx as MatchExprContext)._expression);
						this.state = 178;
						this.match(DesmoscriptParser.T__15);
						}
						}
					}
					this.state = 184;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 11, this._ctx);
				}
				this.state = 188;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0)) {
					{
					this.state = 185;
					(_localctx as MatchExprContext)._expression = this.expression(0);
					(_localctx as MatchExprContext)._fallback.push((_localctx as MatchExprContext)._expression);
					this.state = 186;
					this.match(DesmoscriptParser.T__15);
					}
				}

				this.state = 190;
				this.match(DesmoscriptParser.T__1);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 229;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 227;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
					case 1:
						{
						_localctx = new MultOrDivExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as MultOrDivExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 193;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 194;
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
						this.state = 195;
						(_localctx as MultOrDivExprContext)._right = this.expression(18);
						}
						break;

					case 2:
						{
						_localctx = new AddOrSubExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as AddOrSubExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 196;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 197;
						(_localctx as AddOrSubExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === DesmoscriptParser.T__23 || _la === DesmoscriptParser.T__24)) {
							(_localctx as AddOrSubExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 198;
						(_localctx as AddOrSubExprContext)._right = this.expression(17);
						}
						break;

					case 3:
						{
						_localctx = new LogicalExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as LogicalExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 199;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 200;
						(_localctx as LogicalExprContext)._op = this._input.LT(1);
						_la = this._input.LA(1);
						if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__25) | (1 << DesmoscriptParser.T__26) | (1 << DesmoscriptParser.T__27) | (1 << DesmoscriptParser.T__28) | (1 << DesmoscriptParser.T__29))) !== 0))) {
							(_localctx as LogicalExprContext)._op = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 201;
						(_localctx as LogicalExprContext)._right = this.expression(16);
						}
						break;

					case 4:
						{
						_localctx = new RangeExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as RangeExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 202;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 203;
						(_localctx as RangeExprContext)._op = this.match(DesmoscriptParser.T__30);
						this.state = 204;
						(_localctx as RangeExprContext)._right = this.expression(15);
						}
						break;

					case 5:
						{
						_localctx = new StepRangeExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as StepRangeExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 205;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 206;
						this.match(DesmoscriptParser.T__3);
						this.state = 207;
						(_localctx as StepRangeExprContext)._step = this.expression(0);
						this.state = 208;
						(_localctx as StepRangeExprContext)._op = this.match(DesmoscriptParser.T__30);
						this.state = 209;
						(_localctx as StepRangeExprContext)._right = this.expression(14);
						}
						break;

					case 6:
						{
						_localctx = new ActionExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as ActionExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 211;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 212;
						(_localctx as ActionExprContext)._op = this.match(DesmoscriptParser.T__42);
						this.state = 213;
						(_localctx as ActionExprContext)._right = this.expression(3);
						}
						break;

					case 7:
						{
						_localctx = new MemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as MemberAccessExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 214;
						if (!(this.precpred(this._ctx, 19))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 19)");
						}
						this.state = 215;
						(_localctx as MemberAccessExprContext)._op = this.match(DesmoscriptParser.T__19);
						this.state = 216;
						(_localctx as MemberAccessExprContext)._right = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
						}
						break;

					case 8:
						{
						_localctx = new ListMemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as ListMemberAccessExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 217;
						if (!(this.precpred(this._ctx, 18))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 18)");
						}
						this.state = 218;
						(_localctx as ListMemberAccessExprContext)._op = this.match(DesmoscriptParser.T__4);
						this.state = 219;
						(_localctx as ListMemberAccessExprContext)._right = this.expression(0);
						this.state = 220;
						this.match(DesmoscriptParser.T__5);
						}
						break;

					case 9:
						{
						_localctx = new AssignmentExprContext(new ExpressionContext(_parentctx, _parentState));
						(_localctx as AssignmentExprContext)._left = _prevctx;
						this.pushNewRecursionContext(_localctx, _startState, DesmoscriptParser.RULE_expression);
						this.state = 222;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 223;
						(_localctx as AssignmentExprContext)._op = this.match(DesmoscriptParser.T__18);
						this.state = 224;
						(_localctx as AssignmentExprContext)._right = this.expression(0);
						this.state = 225;
						this.match(DesmoscriptParser.T__15);
						}
						break;
					}
					}
				}
				this.state = 231;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 15, this._ctx);
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
	public expressionList(): ExpressionListContext {
		let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, DesmoscriptParser.RULE_expressionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 233;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 232;
				this.expression(0);
				}
				}
				this.state = 235;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0));
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
		this.enterRule(_localctx, 6, DesmoscriptParser.RULE_functionDefArgList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 241;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 17, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 237;
					_localctx._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
					_localctx._args.push(_localctx._IDENTIFIER_SEGMENT);
					this.state = 238;
					this.match(DesmoscriptParser.T__3);
					}
					}
				}
				this.state = 243;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 17, this._ctx);
			}
			this.state = 244;
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
		this.enterRule(_localctx, 8, DesmoscriptParser.RULE_functionCallArgList);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 251;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 246;
					_localctx._expression = this.expression(0);
					_localctx._args.push(_localctx._expression);
					this.state = 247;
					this.match(DesmoscriptParser.T__3);
					}
					}
				}
				this.state = 253;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 18, this._ctx);
			}
			this.state = 254;
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
		this.enterRule(_localctx, 10, DesmoscriptParser.RULE_list);
		try {
			let _alt: number;
			this.state = 269;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 20, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 256;
				this.match(DesmoscriptParser.T__4);
				this.state = 260;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 257;
						_localctx._expression = this.expression(0);
						_localctx._elements.push(_localctx._expression);
						this.state = 258;
						this.match(DesmoscriptParser.T__3);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 262;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 19, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				this.state = 264;
				_localctx._expression = this.expression(0);
				_localctx._elements.push(_localctx._expression);
				this.state = 265;
				this.match(DesmoscriptParser.T__5);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 267;
				this.match(DesmoscriptParser.T__4);
				this.state = 268;
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
		this.enterRule(_localctx, 12, DesmoscriptParser.RULE_functionCall);
		let _la: number;
		try {
			this.state = 281;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 22, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 271;
				_localctx._fnname = this.identifier();
				this.state = 272;
				this.match(DesmoscriptParser.T__43);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 274;
				_localctx._fnname = this.identifier();
				this.state = 275;
				this.match(DesmoscriptParser.T__7);
				this.state = 277;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0)) {
					{
					this.state = 276;
					_localctx._fnargs = this.functionCallArgList();
					}
				}

				this.state = 279;
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
		this.enterRule(_localctx, 14, DesmoscriptParser.RULE_macroCall);
		let _la: number;
		try {
			this.state = 293;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 24, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 283;
				_localctx._fnname = this.identifier();
				this.state = 284;
				this.match(DesmoscriptParser.T__44);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 286;
				_localctx._fnname = this.identifier();
				this.state = 287;
				this.match(DesmoscriptParser.T__45);
				this.state = 289;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << DesmoscriptParser.T__0) | (1 << DesmoscriptParser.T__4) | (1 << DesmoscriptParser.T__7) | (1 << DesmoscriptParser.T__12) | (1 << DesmoscriptParser.T__13) | (1 << DesmoscriptParser.T__16))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (DesmoscriptParser.T__31 - 32)) | (1 << (DesmoscriptParser.T__32 - 32)) | (1 << (DesmoscriptParser.T__33 - 32)) | (1 << (DesmoscriptParser.T__35 - 32)) | (1 << (DesmoscriptParser.T__36 - 32)) | (1 << (DesmoscriptParser.T__37 - 32)) | (1 << (DesmoscriptParser.T__38 - 32)) | (1 << (DesmoscriptParser.T__40 - 32)) | (1 << (DesmoscriptParser.NUMBER - 32)) | (1 << (DesmoscriptParser.IDENTIFIER_SEGMENT - 32)))) !== 0)) {
					{
					this.state = 288;
					_localctx._fnargs = this.functionCallArgList();
					}
				}

				this.state = 291;
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
		this.enterRule(_localctx, 16, DesmoscriptParser.RULE_identifier);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 299;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 295;
					_localctx._IDENTIFIER_SEGMENT = this.match(DesmoscriptParser.IDENTIFIER_SEGMENT);
					_localctx._segments.push(_localctx._IDENTIFIER_SEGMENT);
					this.state = 296;
					this.match(DesmoscriptParser.T__46);
					}
					}
				}
				this.state = 301;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 25, this._ctx);
			}
			this.state = 302;
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
		case 1:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 17);

		case 1:
			return this.precpred(this._ctx, 16);

		case 2:
			return this.precpred(this._ctx, 15);

		case 3:
			return this.precpred(this._ctx, 14);

		case 4:
			return this.precpred(this._ctx, 13);

		case 5:
			return this.precpred(this._ctx, 2);

		case 6:
			return this.precpred(this._ctx, 19);

		case 7:
			return this.precpred(this._ctx, 18);

		case 8:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x035\u0133\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x03\x02\x03\x02\x03\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x02!" +
		"\n\x02\f\x02\x0E\x02$\v\x02\x03\x02\x03\x02\x05\x02(\n\x02\x03\x02\x03" +
		"\x02\x03\x02\x03\x02\x03\x02\x03\x02\x07\x020\n\x02\f\x02\x0E\x023\v\x02" +
		"\x03\x02\x03\x02\x05\x027\n\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02" +
		"\x03\x02\x03\x02\x05\x02@\n\x02\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03K\n\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x07\x03Y\n\x03\f\x03\x0E\x03\\\v\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x06\x03\x86\n\x03\r\x03\x0E\x03\x87\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x06\x03\x93\n\x03\r\x03\x0E\x03\x94" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x06\x03\x9D\n\x03\r\x03" +
		"\x0E\x03\x9E\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x06\x03\xAA\n\x03\r\x03\x0E\x03\xAB\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x07\x03\xB7\n\x03\f\x03" +
		"\x0E\x03\xBA\v\x03\x03\x03\x03\x03\x03\x03\x05\x03\xBF\n\x03\x03\x03\x05" +
		"\x03\xC2\n\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x07\x03\xE6\n\x03\f\x03\x0E\x03\xE9\v\x03\x03\x04\x06\x04\xEC\n\x04\r" +
		"\x04\x0E\x04\xED\x03\x05\x03\x05\x07\x05\xF2\n\x05\f\x05\x0E\x05\xF5\v" +
		"\x05\x03\x05\x03\x05\x03\x06\x03\x06\x03\x06\x07\x06\xFC\n\x06\f\x06\x0E" +
		"\x06\xFF\v\x06\x03\x06\x03\x06\x03\x07\x03\x07\x03\x07\x03\x07\x06\x07" +
		"\u0107\n\x07\r\x07\x0E\x07\u0108\x03\x07\x03\x07\x03\x07\x03\x07\x03\x07" +
		"\x05\x07\u0110\n\x07\x03\b\x03\b\x03\b\x03\b\x03\b\x03\b\x05\b\u0118\n" +
		"\b\x03\b\x03\b\x05\b\u011C\n\b\x03\t\x03\t\x03\t\x03\t\x03\t\x03\t\x05" +
		"\t\u0124\n\t\x03\t\x03\t\x05\t\u0128\n\t\x03\n\x03\n\x07\n\u012C\n\n\f" +
		"\n\x0E\n\u012F\v\n\x03\n\x03\n\x03\n\x02\x02\x03\x04\v\x02\x02\x04\x02" +
		"\x06\x02\b\x02\n\x02\f\x02\x0E\x02\x10\x02\x12\x02\x02\x07\x03\x02\f\r" +
		"\x03\x02\"$\x03\x02\x17\x19\x03\x02\x1A\x1B\x03\x02\x1C \x02\u0160\x02" +
		"?\x03\x02\x02\x02\x04\xC1\x03\x02\x02\x02\x06\xEB\x03\x02\x02\x02\b\xF3" +
		"\x03\x02\x02\x02\n\xFD\x03\x02\x02\x02\f\u010F\x03\x02\x02\x02\x0E\u011B" +
		"\x03\x02\x02\x02\x10\u0127\x03\x02\x02\x02\x12\u012D\x03\x02\x02\x02\x14" +
		"@\x073\x02\x02\x15@\x072\x02\x02\x16\x17\x07\x03\x02\x02\x17(\x07\x04" +
		"\x02\x02\x18\x19\x07\x03\x02\x02\x19\x1A\x074\x02\x02\x1A\x1B\x07\x05" +
		"\x02\x02\x1B\"\x05\x02\x02\x02\x1C\x1D\x07\x06\x02\x02\x1D\x1E\x074\x02" +
		"\x02\x1E\x1F\x07\x05\x02\x02\x1F!\x05\x02\x02\x02 \x1C\x03\x02\x02\x02" +
		"!$\x03\x02\x02\x02\" \x03\x02\x02\x02\"#\x03\x02\x02\x02#%\x03\x02\x02" +
		"\x02$\"\x03\x02\x02\x02%&\x07\x04\x02\x02&(\x03\x02\x02\x02\'\x16\x03" +
		"\x02\x02\x02\'\x18\x03\x02\x02\x02(@\x03\x02\x02\x02)*\x07\x07\x02\x02" +
		"*7\x07\b\x02\x02+,\x07\x07\x02\x02,1\x05\x02\x02\x02-.\x07\x06\x02\x02" +
		".0\x05\x02\x02\x02/-\x03\x02\x02\x0203\x03\x02\x02\x021/\x03\x02\x02\x02" +
		"12\x03\x02\x02\x0224\x03\x02\x02\x0231\x03\x02\x02\x0245\x07\b\x02\x02" +
		"57\x03\x02\x02\x026)\x03\x02\x02\x026+\x03\x02\x02\x027@\x03\x02\x02\x02" +
		"89\x07\t\x02\x029:\x07\n\x02\x02:;\x05\x04\x03\x02;<\x07\v\x02\x02<@\x03" +
		"\x02\x02\x02=@\t\x02\x02\x02>@\x07\x0E\x02\x02?\x14\x03\x02\x02\x02?\x15" +
		"\x03\x02\x02\x02?\'\x03\x02\x02\x02?6\x03\x02\x02\x02?8\x03\x02\x02\x02" +
		"?=\x03\x02\x02\x02?>\x03\x02\x02\x02@\x03\x03\x02\x02\x02AB\b\x03\x01" +
		"\x02B\xC2\x05\x0E\b\x02CD\x07\x0F\x02\x02D\xC2\x05\x02\x02\x02E\xC2\x05" +
		"\x10\t\x02FG\x07\x10\x02\x02GJ\x072\x02\x02HI\x07\x11\x02\x02IK\x074\x02" +
		"\x02JH\x03\x02\x02\x02JK\x03\x02\x02\x02KL\x03\x02\x02\x02L\xC2\x07\x12" +
		"\x02\x02MN\x07\x13\x02\x02N\xC2\x05\x04\x03\x1AO\xC2\x05\x12\n\x02PQ\x07" +
		"\x07\x02\x02QR\x05\x04\x03\x02RZ\x07\x14\x02\x02ST\x074\x02\x02TU\x07" +
		"\x15\x02\x02UV\x05\x04\x03\x02VW\x07\x12\x02\x02WY\x03\x02\x02\x02XS\x03" +
		"\x02\x02\x02Y\\\x03\x02\x02\x02ZX\x03\x02\x02\x02Z[\x03\x02\x02\x02[]" +
		"\x03\x02\x02\x02\\Z\x03\x02\x02\x02]^\x074\x02\x02^_\x07\x15\x02\x02_" +
		"`\x05\x04\x03\x02`a\x03\x02\x02\x02ab\x07\b\x02\x02b\xC2\x03\x02\x02\x02" +
		"cd\x07\n\x02\x02de\x05\x04\x03\x02ef\x07\v\x02\x02f\xC2\x03\x02\x02\x02" +
		"gh\x07\n\x02\x02hi\x05\x04\x03\x02ij\x07\x06\x02\x02jk\x05\x04\x03\x02" +
		"kl\x07\v\x02\x02l\xC2\x03\x02\x02\x02m\xC2\x073\x02\x02n\xC2\x05\f\x07" +
		"\x02op\t\x03\x02\x02pq\x07\n\x02\x02qr\x074\x02\x02rs\x07\x15\x02\x02" +
		"st\x05\x04\x03\x02tu\x07%\x02\x02uv\x05\x04\x03\x02vw\x07\v\x02\x02wx" +
		"\x05\x04\x03\fx\xC2\x03\x02\x02\x02yz\x07&\x02\x02z{\x07\n\x02\x02{|\x07" +
		"4\x02\x02|}\x07\v\x02\x02}\xC2\x05\x04\x03\v~\x7F\x07\'\x02\x02\x7F\x80" +
		"\x05\x12\n\x02\x80\x81\x07\n\x02\x02\x81\x82\x05\b\x05\x02\x82\x83\x07" +
		"\v\x02\x02\x83\x85\x07\x03\x02\x02\x84\x86\x05\x04\x03\x02\x85\x84\x03" +
		"\x02\x02\x02\x86\x87\x03\x02\x02\x02\x87\x85\x03\x02\x02\x02\x87\x88\x03" +
		"\x02\x02\x02\x88\x89\x03\x02\x02\x02\x89\x8A\x07\x04\x02\x02\x8A\xC2\x03" +
		"\x02\x02\x02\x8B\x8C\x07(\x02\x02\x8C\x8D\x05\x12\n\x02\x8D\x8E\x07\n" +
		"\x02\x02\x8E\x8F\x05\b\x05\x02\x8F\x90\x07\v\x02\x02\x90\x92\x07\x03\x02" +
		"\x02\x91\x93\x05\x04\x03\x02\x92\x91\x03\x02\x02\x02\x93\x94\x03\x02\x02" +
		"\x02\x94\x92\x03\x02\x02\x02\x94\x95\x03\x02\x02\x02\x95\x96\x03\x02\x02" +
		"\x02\x96\x97\x07\x04\x02\x02\x97\xC2\x03\x02\x02\x02\x98\x99\x07)\x02" +
		"\x02\x99\x9A\x074\x02\x02\x9A\x9C\x07\x03\x02\x02\x9B\x9D\x05\x04\x03" +
		"\x02\x9C\x9B\x03\x02\x02\x02\x9D\x9E\x03\x02\x02\x02\x9E\x9C\x03\x02\x02" +
		"\x02\x9E\x9F\x03\x02\x02\x02\x9F\xA0\x03\x02\x02\x02\xA0\xA1\x07\x04\x02" +
		"\x02\xA1\xC2\x03\x02\x02\x02\xA2\xA3\x074\x02\x02\xA3\xA4\x05\x04\x03" +
		"\x02\xA4\xA5\x07*\x02\x02\xA5\xA6\x05\x04\x03\x07\xA6\xC2\x03\x02\x02" +
		"\x02\xA7\xA9\x07\x03\x02\x02\xA8\xAA\x05\x04\x03\x02\xA9\xA8\x03\x02\x02" +
		"\x02\xAA\xAB\x03\x02\x02\x02\xAB\xA9\x03\x02\x02\x02\xAB\xAC\x03\x02\x02" +
		"\x02\xAC\xAD\x03\x02\x02\x02\xAD\xAE\x07\x04\x02\x02\xAE\xC2\x03\x02\x02" +
		"\x02\xAF\xB0\x07+\x02\x02\xB0\xB8\x07\x03\x02\x02\xB1\xB2\x05\x04\x03" +
		"\x02\xB2\xB3\x07,\x02\x02\xB3\xB4\x05\x04\x03\x02\xB4\xB5\x07\x12\x02" +
		"\x02\xB5\xB7\x03\x02\x02\x02\xB6\xB1\x03\x02\x02\x02\xB7\xBA\x03\x02\x02" +
		"\x02\xB8\xB6\x03\x02\x02\x02\xB8\xB9\x03\x02\x02\x02\xB9\xBE\x03\x02\x02" +
		"\x02\xBA\xB8\x03\x02\x02\x02\xBB\xBC\x05\x04\x03\x02\xBC\xBD\x07\x12\x02" +
		"\x02\xBD\xBF\x03\x02\x02\x02\xBE\xBB\x03\x02\x02\x02\xBE\xBF\x03\x02\x02" +
		"\x02\xBF\xC0\x03\x02\x02\x02\xC0\xC2\x07\x04\x02\x02\xC1A\x03\x02\x02" +
		"\x02\xC1C\x03\x02\x02\x02\xC1E\x03\x02\x02\x02\xC1F\x03\x02\x02\x02\xC1" +
		"M\x03\x02\x02\x02\xC1O\x03\x02\x02\x02\xC1P\x03\x02\x02\x02\xC1c\x03\x02" +
		"\x02\x02\xC1g\x03\x02\x02\x02\xC1m\x03\x02\x02\x02\xC1n\x03\x02\x02\x02" +
		"\xC1o\x03\x02\x02\x02\xC1y\x03\x02\x02\x02\xC1~\x03\x02\x02\x02\xC1\x8B" +
		"\x03\x02\x02\x02\xC1\x98\x03\x02\x02\x02\xC1\xA2\x03\x02\x02\x02\xC1\xA7" +
		"\x03\x02\x02\x02\xC1\xAF\x03\x02\x02\x02\xC2\xE7\x03\x02\x02\x02\xC3\xC4" +
		"\f\x13\x02\x02\xC4\xC5\t\x04\x02\x02\xC5\xE6\x05\x04\x03\x14\xC6\xC7\f" +
		"\x12\x02\x02\xC7\xC8\t\x05\x02\x02\xC8\xE6\x05\x04\x03\x13\xC9\xCA\f\x11" +
		"\x02\x02\xCA\xCB\t\x06\x02\x02\xCB\xE6\x05\x04\x03\x12\xCC\xCD\f\x10\x02" +
		"\x02\xCD\xCE\x07!\x02\x02\xCE\xE6\x05\x04\x03\x11\xCF\xD0\f\x0F\x02\x02" +
		"\xD0\xD1\x07\x06\x02\x02\xD1\xD2\x05\x04\x03\x02\xD2\xD3\x07!\x02\x02" +
		"\xD3\xD4\x05\x04\x03\x10\xD4\xE6\x03\x02\x02\x02\xD5\xD6\f\x04\x02\x02" +
		"\xD6\xD7\x07-\x02\x02\xD7\xE6\x05\x04\x03\x05\xD8\xD9\f\x15\x02\x02\xD9" +
		"\xDA\x07\x16\x02\x02\xDA\xE6\x074\x02\x02\xDB\xDC\f\x14\x02\x02\xDC\xDD" +
		"\x07\x07\x02\x02\xDD\xDE\x05\x04\x03\x02\xDE\xDF\x07\b\x02\x02\xDF\xE6" +
		"\x03\x02\x02\x02\xE0\xE1\f\x03\x02\x02\xE1\xE2\x07\x15\x02\x02\xE2\xE3" +
		"\x05\x04\x03\x02\xE3\xE4\x07\x12\x02\x02\xE4\xE6\x03\x02\x02\x02\xE5\xC3" +
		"\x03\x02\x02\x02\xE5\xC6\x03\x02\x02\x02\xE5\xC9\x03\x02\x02\x02\xE5\xCC" +
		"\x03\x02\x02\x02\xE5\xCF\x03\x02\x02\x02\xE5\xD5\x03\x02\x02\x02\xE5\xD8" +
		"\x03\x02\x02\x02\xE5\xDB\x03\x02\x02\x02\xE5\xE0\x03\x02\x02\x02\xE6\xE9" +
		"\x03\x02\x02\x02\xE7\xE5\x03\x02\x02\x02\xE7\xE8\x03\x02\x02\x02\xE8\x05" +
		"\x03\x02\x02\x02\xE9\xE7\x03\x02\x02\x02\xEA\xEC\x05\x04\x03\x02\xEB\xEA" +
		"\x03\x02\x02\x02\xEC\xED\x03\x02\x02\x02\xED\xEB\x03\x02\x02\x02\xED\xEE" +
		"\x03\x02\x02\x02\xEE\x07\x03\x02\x02\x02\xEF\xF0\x074\x02\x02\xF0\xF2" +
		"\x07\x06\x02\x02\xF1\xEF\x03\x02\x02\x02\xF2\xF5\x03\x02\x02\x02\xF3\xF1" +
		"\x03\x02\x02\x02\xF3\xF4\x03\x02\x02\x02\xF4\xF6\x03\x02\x02\x02\xF5\xF3" +
		"\x03\x02\x02\x02\xF6\xF7\x074\x02\x02\xF7\t\x03\x02\x02\x02\xF8\xF9\x05" +
		"\x04\x03\x02\xF9\xFA\x07\x06\x02\x02\xFA\xFC\x03\x02\x02\x02\xFB\xF8\x03" +
		"\x02\x02\x02\xFC\xFF\x03\x02\x02\x02\xFD\xFB\x03\x02\x02\x02\xFD\xFE\x03" +
		"\x02\x02\x02\xFE\u0100\x03\x02\x02\x02\xFF\xFD\x03\x02\x02\x02\u0100\u0101" +
		"\x05\x04\x03\x02\u0101\v\x03\x02\x02\x02\u0102\u0106\x07\x07\x02\x02\u0103" +
		"\u0104\x05\x04\x03\x02\u0104\u0105\x07\x06\x02\x02\u0105\u0107\x03\x02" +
		"\x02\x02\u0106\u0103\x03\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u0108" +
		"\u0106\x03\x02\x02\x02\u0108\u0109\x03\x02\x02\x02\u0109\u010A\x03\x02" +
		"\x02\x02\u010A\u010B\x05\x04\x03\x02\u010B\u010C\x07\b\x02\x02\u010C\u0110" +
		"\x03\x02\x02\x02\u010D\u010E\x07\x07\x02\x02\u010E\u0110\x07\b\x02\x02" +
		"\u010F\u0102\x03\x02\x02\x02\u010F\u010D\x03\x02\x02\x02\u0110\r\x03\x02" +
		"\x02\x02\u0111\u0112\x05\x12\n\x02\u0112\u0113\x07.\x02\x02\u0113\u011C" +
		"\x03\x02\x02\x02\u0114\u0115\x05\x12\n\x02\u0115\u0117\x07\n\x02\x02\u0116" +
		"\u0118\x05\n\x06\x02\u0117\u0116\x03\x02\x02\x02\u0117\u0118\x03\x02\x02" +
		"\x02\u0118\u0119\x03\x02\x02\x02\u0119\u011A\x07\v\x02\x02\u011A\u011C" +
		"\x03\x02\x02\x02\u011B\u0111\x03\x02\x02\x02\u011B\u0114\x03\x02\x02\x02" +
		"\u011C\x0F\x03\x02\x02\x02\u011D\u011E\x05\x12\n\x02\u011E\u011F\x07/" +
		"\x02\x02\u011F\u0128\x03\x02\x02\x02\u0120\u0121\x05\x12\n\x02\u0121\u0123" +
		"\x070\x02\x02\u0122\u0124\x05\n\x06\x02\u0123\u0122\x03\x02\x02\x02\u0123" +
		"\u0124\x03\x02\x02\x02\u0124\u0125\x03\x02\x02\x02\u0125\u0126\x07\v\x02" +
		"\x02\u0126\u0128\x03\x02\x02\x02\u0127\u011D\x03\x02\x02\x02\u0127\u0120" +
		"\x03\x02\x02\x02\u0128\x11\x03\x02\x02\x02\u0129\u012A\x074\x02\x02\u012A" +
		"\u012C\x071\x02\x02\u012B\u0129\x03\x02\x02\x02\u012C\u012F\x03\x02\x02" +
		"\x02\u012D\u012B\x03\x02\x02\x02\u012D\u012E\x03\x02\x02\x02\u012E\u0130" +
		"\x03\x02\x02\x02\u012F\u012D\x03\x02\x02\x02\u0130\u0131\x074\x02\x02" +
		"\u0131\x13\x03\x02\x02\x02\x1C\"\'16?JZ\x87\x94\x9E\xAB\xB8\xBE\xC1\xE5" +
		"\xE7\xED\xF3\xFD\u0108\u010F\u0117\u011B\u0123\u0127\u012D";
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
export class JSONExprContext extends ExpressionContext {
	public _jsonval!: DjsonContext;
	public djson(): DjsonContext {
		return this.getRuleContext(0, DjsonContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterJSONExpr) {
			listener.enterJSONExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitJSONExpr) {
			listener.exitJSONExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitJSONExpr) {
			return visitor.visitJSONExpr(this);
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
export class ImportExprContext extends ExpressionContext {
	public _filename!: Token;
	public _alias!: Token;
	public STRING(): TerminalNode { return this.getToken(DesmoscriptParser.STRING, 0); }
	public IDENTIFIER_SEGMENT(): TerminalNode | undefined { return this.tryGetToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterImportExpr) {
			listener.enterImportExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitImportExpr) {
			listener.exitImportExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitImportExpr) {
			return visitor.visitImportExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NamedJsonExprContext extends ExpressionContext {
	public _namedjsontype!: Token;
	public _jsonval!: ExpressionContext;
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	constructor(ctx: ExpressionContext) {
		super(ctx.parent, ctx.invokingState);
		this.copyFrom(ctx);
	}
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterNamedJsonExpr) {
			listener.enterNamedJsonExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitNamedJsonExpr) {
			listener.exitNamedJsonExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitNamedJsonExpr) {
			return visitor.visitNamedJsonExpr(this);
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
export class MacroDefinitionExprContext extends ExpressionContext {
	public _macroname!: IdentifierContext;
	public _macroargs!: FunctionDefArgListContext;
	public _expression!: ExpressionContext;
	public _exprs: ExpressionContext[] = [];
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public functionDefArgList(): FunctionDefArgListContext {
		return this.getRuleContext(0, FunctionDefArgListContext);
	}
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
		if (listener.enterMacroDefinitionExpr) {
			listener.enterMacroDefinitionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitMacroDefinitionExpr) {
			listener.exitMacroDefinitionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitMacroDefinitionExpr) {
			return visitor.visitMacroDefinitionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class FunctionDefinitionExprContext extends ExpressionContext {
	public _fnname!: IdentifierContext;
	public _fnargs!: FunctionDefArgListContext;
	public _expression!: ExpressionContext;
	public _exprs: ExpressionContext[] = [];
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public functionDefArgList(): FunctionDefArgListContext {
		return this.getRuleContext(0, FunctionDefArgListContext);
	}
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
		if (listener.enterFunctionDefinitionExpr) {
			listener.enterFunctionDefinitionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitFunctionDefinitionExpr) {
			listener.exitFunctionDefinitionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitFunctionDefinitionExpr) {
			return visitor.visitFunctionDefinitionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class NamespaceDefinitionExprContext extends ExpressionContext {
	public _nsname!: Token;
	public _expression!: ExpressionContext;
	public _exprs: ExpressionContext[] = [];
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
		if (listener.enterNamespaceDefinitionExpr) {
			listener.enterNamespaceDefinitionExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitNamespaceDefinitionExpr) {
			listener.exitNamespaceDefinitionExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitNamespaceDefinitionExpr) {
			return visitor.visitNamespaceDefinitionExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class DecoratedExprContext extends ExpressionContext {
	public _qualifier!: Token;
	public _expr!: ExpressionContext;
	public _jsonval!: ExpressionContext;
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
		if (listener.enterDecoratedExpr) {
			listener.enterDecoratedExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitDecoratedExpr) {
			listener.exitDecoratedExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitDecoratedExpr) {
			return visitor.visitDecoratedExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}
export class BlockExprContext extends ExpressionContext {
	public _expression!: ExpressionContext;
	public _exprs: ExpressionContext[] = [];
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
	public _fallback: ExpressionContext[] = [];
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
export class AssignmentExprContext extends ExpressionContext {
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
		if (listener.enterAssignmentExpr) {
			listener.enterAssignmentExpr(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitAssignmentExpr) {
			listener.exitAssignmentExpr(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitAssignmentExpr) {
			return visitor.visitAssignmentExpr(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
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
	public get ruleIndex(): number { return DesmoscriptParser.RULE_expressionList; }
	// @Override
	public enterRule(listener: DesmoscriptListener): void {
		if (listener.enterExpressionList) {
			listener.enterExpressionList(this);
		}
	}
	// @Override
	public exitRule(listener: DesmoscriptListener): void {
		if (listener.exitExpressionList) {
			listener.exitExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: DesmoscriptVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
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


