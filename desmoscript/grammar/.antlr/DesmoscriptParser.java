// Generated from c:\Users\baker\Documents\GitHub\desmoscript\desmoscript\grammar\Desmoscript.g4 by ANTLR 4.9.2
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class DesmoscriptParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.9.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, T__13=14, T__14=15, T__15=16, T__16=17, 
		T__17=18, T__18=19, T__19=20, T__20=21, T__21=22, T__22=23, T__23=24, 
		T__24=25, T__25=26, T__26=27, T__27=28, T__28=29, T__29=30, T__30=31, 
		T__31=32, T__32=33, T__33=34, T__34=35, T__35=36, T__36=37, T__37=38, 
		T__38=39, T__39=40, T__40=41, T__41=42, T__42=43, T__43=44, T__44=45, 
		T__45=46, T__46=47, T__47=48, STRING=49, NUMBER=50, IDENTIFIER_SEGMENT=51, 
		WS=52, COMMENT=53;
	public static final int
		RULE_djson = 0, RULE_djsonExpression = 1, RULE_expression = 2, RULE_statement = 3, 
		RULE_statementList = 4, RULE_functionDefArgList = 5, RULE_functionCallArgList = 6, 
		RULE_list = 7, RULE_functionCall = 8, RULE_macroCall = 9, RULE_identifier = 10;
	private static String[] makeRuleNames() {
		return new String[] {
			"djson", "djsonExpression", "expression", "statement", "statementList", 
			"functionDefArgList", "functionCallArgList", "list", "functionCall", 
			"macroCall", "identifier"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'{'", "'}'", "':'", "','", "'['", "']'", "'ds'", "'('", "')'", 
			"'true'", "'false'", "'null'", "'@'", "'-'", "'!'", "'for'", "'='", "';'", 
			"'\\'", "'^'", "'*'", "'/'", "'%'", "'+'", "'=='", "'>'", "'<'", "'>='", 
			"'<='", "'&&'", "'||'", "'..'", "'sum'", "'product'", "'integral'", "'to'", 
			"'derivative'", "'case'", "'&'", "'->'", "'fn'", "'ns'", "'import'", 
			"'as'", "'()'", "'!()'", "'!('", "'.'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, "STRING", "NUMBER", "IDENTIFIER_SEGMENT", "WS", "COMMENT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Desmoscript.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public DesmoscriptParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class DjsonContext extends ParserRuleContext {
		public DjsonContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_djson; }
	 
		public DjsonContext() { }
		public void copyFrom(DjsonContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class BooleanDJsonContext extends DjsonContext {
		public Token data;
		public BooleanDJsonContext(DjsonContext ctx) { copyFrom(ctx); }
	}
	public static class ObjectDJsonContext extends DjsonContext {
		public Token IDENTIFIER_SEGMENT;
		public List<Token> keys = new ArrayList<Token>();
		public DjsonContext djson;
		public List<DjsonContext> values = new ArrayList<DjsonContext>();
		public List<TerminalNode> IDENTIFIER_SEGMENT() { return getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT); }
		public TerminalNode IDENTIFIER_SEGMENT(int i) {
			return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
		public List<DjsonContext> djson() {
			return getRuleContexts(DjsonContext.class);
		}
		public DjsonContext djson(int i) {
			return getRuleContext(DjsonContext.class,i);
		}
		public ObjectDJsonContext(DjsonContext ctx) { copyFrom(ctx); }
	}
	public static class NullDJsonContext extends DjsonContext {
		public NullDJsonContext(DjsonContext ctx) { copyFrom(ctx); }
	}
	public static class NumberDJsonContext extends DjsonContext {
		public Token data;
		public TerminalNode NUMBER() { return getToken(DesmoscriptParser.NUMBER, 0); }
		public NumberDJsonContext(DjsonContext ctx) { copyFrom(ctx); }
	}
	public static class DesmoscriptDJsonContext extends DjsonContext {
		public ExpressionContext expr;
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public DesmoscriptDJsonContext(DjsonContext ctx) { copyFrom(ctx); }
	}
	public static class ArrayDJsonContext extends DjsonContext {
		public DjsonContext djson;
		public List<DjsonContext> elements = new ArrayList<DjsonContext>();
		public List<DjsonContext> djson() {
			return getRuleContexts(DjsonContext.class);
		}
		public DjsonContext djson(int i) {
			return getRuleContext(DjsonContext.class,i);
		}
		public ArrayDJsonContext(DjsonContext ctx) { copyFrom(ctx); }
	}
	public static class StringDJsonContext extends DjsonContext {
		public Token data;
		public TerminalNode STRING() { return getToken(DesmoscriptParser.STRING, 0); }
		public StringDJsonContext(DjsonContext ctx) { copyFrom(ctx); }
	}

	public final DjsonContext djson() throws RecognitionException {
		DjsonContext _localctx = new DjsonContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_djson);
		int _la;
		try {
			setState(65);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUMBER:
				_localctx = new NumberDJsonContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(22);
				((NumberDJsonContext)_localctx).data = match(NUMBER);
				}
				break;
			case STRING:
				_localctx = new StringDJsonContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(23);
				((StringDJsonContext)_localctx).data = match(STRING);
				}
				break;
			case T__0:
				_localctx = new ObjectDJsonContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(41);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
				case 1:
					{
					setState(24);
					match(T__0);
					setState(25);
					match(T__1);
					}
					break;
				case 2:
					{
					setState(26);
					match(T__0);
					setState(27);
					((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
					((ObjectDJsonContext)_localctx).keys.add(((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT);
					setState(28);
					match(T__2);
					setState(29);
					((ObjectDJsonContext)_localctx).djson = djson();
					((ObjectDJsonContext)_localctx).values.add(((ObjectDJsonContext)_localctx).djson);
					setState(36);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==T__3) {
						{
						{
						setState(30);
						match(T__3);
						setState(31);
						((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
						((ObjectDJsonContext)_localctx).keys.add(((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT);
						setState(32);
						match(T__2);
						setState(33);
						((ObjectDJsonContext)_localctx).djson = djson();
						((ObjectDJsonContext)_localctx).values.add(((ObjectDJsonContext)_localctx).djson);
						}
						}
						setState(38);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(39);
					match(T__1);
					}
					break;
				}
				}
				break;
			case T__4:
				_localctx = new ArrayDJsonContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(56);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
				case 1:
					{
					setState(43);
					match(T__4);
					setState(44);
					match(T__5);
					}
					break;
				case 2:
					{
					setState(45);
					match(T__4);
					setState(46);
					((ArrayDJsonContext)_localctx).djson = djson();
					((ArrayDJsonContext)_localctx).elements.add(((ArrayDJsonContext)_localctx).djson);
					setState(51);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==T__3) {
						{
						{
						setState(47);
						match(T__3);
						setState(48);
						((ArrayDJsonContext)_localctx).djson = djson();
						((ArrayDJsonContext)_localctx).elements.add(((ArrayDJsonContext)_localctx).djson);
						}
						}
						setState(53);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(54);
					match(T__5);
					}
					break;
				}
				}
				break;
			case T__6:
				_localctx = new DesmoscriptDJsonContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(58);
				match(T__6);
				setState(59);
				match(T__7);
				setState(60);
				((DesmoscriptDJsonContext)_localctx).expr = expression(0);
				setState(61);
				match(T__8);
				}
				break;
			case T__9:
			case T__10:
				_localctx = new BooleanDJsonContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(63);
				((BooleanDJsonContext)_localctx).data = _input.LT(1);
				_la = _input.LA(1);
				if ( !(_la==T__9 || _la==T__10) ) {
					((BooleanDJsonContext)_localctx).data = (Token)_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				}
				break;
			case T__11:
				_localctx = new NullDJsonContext(_localctx);
				enterOuterAlt(_localctx, 7);
				{
				setState(64);
				match(T__11);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class DjsonExpressionContext extends ParserRuleContext {
		public DjsonContext jsonval;
		public DjsonContext djson() {
			return getRuleContext(DjsonContext.class,0);
		}
		public DjsonExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_djsonExpression; }
	}

	public final DjsonExpressionContext djsonExpression() throws RecognitionException {
		DjsonExpressionContext _localctx = new DjsonExpressionContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_djsonExpression);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(67);
			match(T__12);
			setState(68);
			((DjsonExpressionContext)_localctx).jsonval = djson();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExpressionContext extends ParserRuleContext {
		public ExpressionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expression; }
	 
		public ExpressionContext() { }
		public void copyFrom(ExpressionContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class ComparisonExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ComparisonExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MultOrDivExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public MultOrDivExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class AddOrSubExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public AddOrSubExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ActionExprContext extends ExpressionContext {
		public ExpressionContext expression;
		public List<ExpressionContext> lefts = new ArrayList<ExpressionContext>();
		public Token op;
		public List<ExpressionContext> rights = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> singles = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ActionExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class LogicalNotExprContext extends ExpressionContext {
		public ExpressionContext expr;
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public LogicalNotExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class PointExprContext extends ExpressionContext {
		public ExpressionContext x;
		public ExpressionContext y;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public PointExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MacroCallExprContext extends ExpressionContext {
		public MacroCallContext call;
		public MacroCallContext macroCall() {
			return getRuleContext(MacroCallContext.class,0);
		}
		public MacroCallExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class RangeExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public RangeExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class SumProdIntegralExprContext extends ExpressionContext {
		public Token op;
		public Token var;
		public ExpressionContext lo;
		public ExpressionContext hi;
		public ExpressionContext body;
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public SumProdIntegralExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class BlockExprContext extends ExpressionContext {
		public StatementContext statement;
		public List<StatementContext> statements = new ArrayList<StatementContext>();
		public ExpressionContext expr;
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public BlockExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ListMemberAccessExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ListMemberAccessExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class StepRangeExprContext extends ExpressionContext {
		public ExpressionContext left;
		public ExpressionContext step;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public StepRangeExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class FunctionCallExprContext extends ExpressionContext {
		public FunctionCallContext call;
		public FunctionCallContext functionCall() {
			return getRuleContext(FunctionCallContext.class,0);
		}
		public FunctionCallExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class DerivativeExprContext extends ExpressionContext {
		public Token var;
		public ExpressionContext body;
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public DerivativeExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class NumberExprContext extends ExpressionContext {
		public TerminalNode NUMBER() { return getToken(DesmoscriptParser.NUMBER, 0); }
		public NumberExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class IdentifierExprContext extends ExpressionContext {
		public IdentifierContext ident;
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public IdentifierExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ParentheticalExprContext extends ExpressionContext {
		public ExpressionContext expr;
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public ParentheticalExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ListCompExprContext extends ExpressionContext {
		public ExpressionContext body;
		public Token IDENTIFIER_SEGMENT;
		public List<Token> variables = new ArrayList<Token>();
		public ExpressionContext expression;
		public List<ExpressionContext> lists = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public List<TerminalNode> IDENTIFIER_SEGMENT() { return getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT); }
		public TerminalNode IDENTIFIER_SEGMENT(int i) {
			return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
		public ListCompExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ListExprContext extends ExpressionContext {
		public ListContext l;
		public ListContext list() {
			return getRuleContext(ListContext.class,0);
		}
		public ListExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MemberAccessExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public Token right;
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public MemberAccessExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class LogicalExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public LogicalExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MatchExprContext extends ExpressionContext {
		public ExpressionContext expression;
		public List<ExpressionContext> predicate = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> result = new ArrayList<ExpressionContext>();
		public ExpressionContext fallback;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public MatchExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class UnaryMinusExprContext extends ExpressionContext {
		public ExpressionContext expr;
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public UnaryMinusExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 4;
		enterRecursionRule(_localctx, 4, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(171);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,12,_ctx) ) {
			case 1:
				{
				_localctx = new FunctionCallExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(71);
				((FunctionCallExprContext)_localctx).call = functionCall();
				}
				break;
			case 2:
				{
				_localctx = new MacroCallExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(72);
				((MacroCallExprContext)_localctx).call = macroCall();
				}
				break;
			case 3:
				{
				_localctx = new UnaryMinusExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(73);
				match(T__13);
				setState(74);
				((UnaryMinusExprContext)_localctx).expr = expression(22);
				}
				break;
			case 4:
				{
				_localctx = new LogicalNotExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(75);
				match(T__14);
				setState(76);
				((LogicalNotExprContext)_localctx).expr = expression(21);
				}
				break;
			case 5:
				{
				_localctx = new IdentifierExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(77);
				((IdentifierExprContext)_localctx).ident = identifier();
				}
				break;
			case 6:
				{
				_localctx = new ListCompExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(78);
				match(T__4);
				setState(79);
				((ListCompExprContext)_localctx).body = expression(0);
				setState(80);
				match(T__15);
				setState(88);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(81);
						((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
						((ListCompExprContext)_localctx).variables.add(((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT);
						setState(82);
						match(T__16);
						setState(83);
						((ListCompExprContext)_localctx).expression = expression(0);
						((ListCompExprContext)_localctx).lists.add(((ListCompExprContext)_localctx).expression);
						setState(84);
						match(T__17);
						}
						} 
					}
					setState(90);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
				}
				{
				setState(91);
				((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
				((ListCompExprContext)_localctx).variables.add(((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT);
				setState(92);
				match(T__16);
				setState(93);
				((ListCompExprContext)_localctx).expression = expression(0);
				((ListCompExprContext)_localctx).lists.add(((ListCompExprContext)_localctx).expression);
				}
				setState(95);
				match(T__5);
				}
				break;
			case 7:
				{
				_localctx = new ParentheticalExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(97);
				match(T__7);
				setState(98);
				((ParentheticalExprContext)_localctx).expr = expression(0);
				setState(99);
				match(T__8);
				}
				break;
			case 8:
				{
				_localctx = new PointExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(101);
				match(T__7);
				setState(102);
				((PointExprContext)_localctx).x = expression(0);
				setState(103);
				match(T__3);
				setState(104);
				((PointExprContext)_localctx).y = expression(0);
				setState(105);
				match(T__8);
				}
				break;
			case 9:
				{
				_localctx = new NumberExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(107);
				match(NUMBER);
				}
				break;
			case 10:
				{
				_localctx = new ListExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(108);
				((ListExprContext)_localctx).l = list();
				}
				break;
			case 11:
				{
				_localctx = new SumProdIntegralExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(109);
				((SumProdIntegralExprContext)_localctx).op = _input.LT(1);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__32) | (1L << T__33) | (1L << T__34))) != 0)) ) {
					((SumProdIntegralExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(110);
				match(T__7);
				setState(111);
				((SumProdIntegralExprContext)_localctx).var = match(IDENTIFIER_SEGMENT);
				setState(112);
				match(T__16);
				setState(113);
				((SumProdIntegralExprContext)_localctx).lo = expression(0);
				setState(114);
				match(T__35);
				setState(115);
				((SumProdIntegralExprContext)_localctx).hi = expression(0);
				setState(116);
				match(T__8);
				setState(117);
				((SumProdIntegralExprContext)_localctx).body = expression(5);
				}
				break;
			case 12:
				{
				_localctx = new DerivativeExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(119);
				match(T__36);
				setState(120);
				match(T__7);
				setState(121);
				((DerivativeExprContext)_localctx).var = match(IDENTIFIER_SEGMENT);
				setState(122);
				match(T__8);
				setState(123);
				((DerivativeExprContext)_localctx).body = expression(4);
				}
				break;
			case 13:
				{
				_localctx = new BlockExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(124);
				match(T__0);
				setState(126); 
				_errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						setState(125);
						((BlockExprContext)_localctx).statement = statement();
						((BlockExprContext)_localctx).statements.add(((BlockExprContext)_localctx).statement);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					setState(128); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,6,_ctx);
				} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
				setState(130);
				((BlockExprContext)_localctx).expr = expression(0);
				setState(131);
				match(T__1);
				}
				break;
			case 14:
				{
				_localctx = new MatchExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(133);
				match(T__37);
				setState(134);
				match(T__0);
				setState(142);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(135);
						((MatchExprContext)_localctx).expression = expression(0);
						((MatchExprContext)_localctx).predicate.add(((MatchExprContext)_localctx).expression);
						setState(136);
						match(T__2);
						setState(137);
						((MatchExprContext)_localctx).expression = expression(0);
						((MatchExprContext)_localctx).result.add(((MatchExprContext)_localctx).expression);
						setState(138);
						match(T__3);
						}
						} 
					}
					setState(144);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,7,_ctx);
				}
				setState(146);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__13) | (1L << T__14) | (1L << T__32) | (1L << T__33) | (1L << T__34) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0)) {
					{
					setState(145);
					((MatchExprContext)_localctx).fallback = expression(0);
					}
				}

				setState(148);
				match(T__1);
				}
				break;
			case 15:
				{
				_localctx = new ActionExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(149);
				match(T__38);
				setState(161);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(155);
						_errHandler.sync(this);
						switch ( getInterpreter().adaptivePredict(_input,9,_ctx) ) {
						case 1:
							{
							{
							setState(150);
							((ActionExprContext)_localctx).expression = expression(0);
							((ActionExprContext)_localctx).lefts.add(((ActionExprContext)_localctx).expression);
							setState(151);
							((ActionExprContext)_localctx).op = match(T__39);
							setState(152);
							((ActionExprContext)_localctx).expression = expression(0);
							((ActionExprContext)_localctx).rights.add(((ActionExprContext)_localctx).expression);
							}
							}
							break;
						case 2:
							{
							setState(154);
							((ActionExprContext)_localctx).expression = expression(0);
							((ActionExprContext)_localctx).singles.add(((ActionExprContext)_localctx).expression);
							}
							break;
						}
						setState(157);
						match(T__3);
						}
						} 
					}
					setState(163);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,10,_ctx);
				}
				setState(169);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,11,_ctx) ) {
				case 1:
					{
					{
					setState(164);
					((ActionExprContext)_localctx).expression = expression(0);
					((ActionExprContext)_localctx).lefts.add(((ActionExprContext)_localctx).expression);
					setState(165);
					((ActionExprContext)_localctx).op = match(T__39);
					setState(166);
					((ActionExprContext)_localctx).expression = expression(0);
					((ActionExprContext)_localctx).rights.add(((ActionExprContext)_localctx).expression);
					}
					}
					break;
				case 2:
					{
					setState(168);
					((ActionExprContext)_localctx).expression = expression(0);
					((ActionExprContext)_localctx).singles.add(((ActionExprContext)_localctx).expression);
					}
					break;
				}
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(207);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,14,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(205);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,13,_ctx) ) {
					case 1:
						{
						_localctx = new MultOrDivExprContext(new ExpressionContext(_parentctx, _parentState));
						((MultOrDivExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(173);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(174);
						((MultOrDivExprContext)_localctx).op = match(T__19);
						setState(175);
						((MultOrDivExprContext)_localctx).right = expression(15);
						}
						break;
					case 2:
						{
						_localctx = new MultOrDivExprContext(new ExpressionContext(_parentctx, _parentState));
						((MultOrDivExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(176);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(177);
						((MultOrDivExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__20) | (1L << T__21) | (1L << T__22))) != 0)) ) {
							((MultOrDivExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(178);
						((MultOrDivExprContext)_localctx).right = expression(14);
						}
						break;
					case 3:
						{
						_localctx = new AddOrSubExprContext(new ExpressionContext(_parentctx, _parentState));
						((AddOrSubExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(179);
						if (!(precpred(_ctx, 12))) throw new FailedPredicateException(this, "precpred(_ctx, 12)");
						setState(180);
						((AddOrSubExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__13 || _la==T__23) ) {
							((AddOrSubExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(181);
						((AddOrSubExprContext)_localctx).right = expression(13);
						}
						break;
					case 4:
						{
						_localctx = new ComparisonExprContext(new ExpressionContext(_parentctx, _parentState));
						((ComparisonExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(182);
						if (!(precpred(_ctx, 11))) throw new FailedPredicateException(this, "precpred(_ctx, 11)");
						setState(183);
						((ComparisonExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__24) | (1L << T__25) | (1L << T__26) | (1L << T__27) | (1L << T__28))) != 0)) ) {
							((ComparisonExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(184);
						((ComparisonExprContext)_localctx).right = expression(12);
						}
						break;
					case 5:
						{
						_localctx = new LogicalExprContext(new ExpressionContext(_parentctx, _parentState));
						((LogicalExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(185);
						if (!(precpred(_ctx, 10))) throw new FailedPredicateException(this, "precpred(_ctx, 10)");
						setState(186);
						((LogicalExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__29 || _la==T__30) ) {
							((LogicalExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(187);
						((LogicalExprContext)_localctx).right = expression(11);
						}
						break;
					case 6:
						{
						_localctx = new RangeExprContext(new ExpressionContext(_parentctx, _parentState));
						((RangeExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(188);
						if (!(precpred(_ctx, 9))) throw new FailedPredicateException(this, "precpred(_ctx, 9)");
						setState(189);
						((RangeExprContext)_localctx).op = match(T__31);
						setState(190);
						((RangeExprContext)_localctx).right = expression(10);
						}
						break;
					case 7:
						{
						_localctx = new StepRangeExprContext(new ExpressionContext(_parentctx, _parentState));
						((StepRangeExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(191);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(192);
						match(T__3);
						setState(193);
						((StepRangeExprContext)_localctx).step = expression(0);
						setState(194);
						((StepRangeExprContext)_localctx).op = match(T__31);
						setState(195);
						((StepRangeExprContext)_localctx).right = expression(9);
						}
						break;
					case 8:
						{
						_localctx = new MemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						((MemberAccessExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(197);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(198);
						((MemberAccessExprContext)_localctx).op = match(T__18);
						setState(199);
						((MemberAccessExprContext)_localctx).right = match(IDENTIFIER_SEGMENT);
						}
						break;
					case 9:
						{
						_localctx = new ListMemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						((ListMemberAccessExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(200);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(201);
						((ListMemberAccessExprContext)_localctx).op = match(T__4);
						setState(202);
						((ListMemberAccessExprContext)_localctx).right = expression(0);
						setState(203);
						match(T__5);
						}
						break;
					}
					} 
				}
				setState(209);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,14,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class StatementContext extends ParserRuleContext {
		public StatementContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statement; }
	 
		public StatementContext() { }
		public void copyFrom(StatementContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class FunctionDefinitionStatementContext extends StatementContext {
		public Token fnname;
		public FunctionDefArgListContext fnargs;
		public ExpressionContext expr;
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public FunctionDefArgListContext functionDefArgList() {
			return getRuleContext(FunctionDefArgListContext.class,0);
		}
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public FunctionDefinitionStatementContext(StatementContext ctx) { copyFrom(ctx); }
	}
	public static class NamedJsonStatementContext extends StatementContext {
		public Token namedjsontype;
		public DjsonExpressionContext jsonval;
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public DjsonExpressionContext djsonExpression() {
			return getRuleContext(DjsonExpressionContext.class,0);
		}
		public NamedJsonStatementContext(StatementContext ctx) { copyFrom(ctx); }
	}
	public static class AssignmentStatementContext extends StatementContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public DjsonExpressionContext annotation;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public DjsonExpressionContext djsonExpression() {
			return getRuleContext(DjsonExpressionContext.class,0);
		}
		public AssignmentStatementContext(StatementContext ctx) { copyFrom(ctx); }
	}
	public static class ImportStatementContext extends StatementContext {
		public Token filename;
		public Token alias;
		public TerminalNode STRING() { return getToken(DesmoscriptParser.STRING, 0); }
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public ImportStatementContext(StatementContext ctx) { copyFrom(ctx); }
	}
	public static class StringStatementContext extends StatementContext {
		public Token str;
		public TerminalNode STRING() { return getToken(DesmoscriptParser.STRING, 0); }
		public StringStatementContext(StatementContext ctx) { copyFrom(ctx); }
	}
	public static class NamespaceDefinitionStatementContext extends StatementContext {
		public Token nsname;
		public StatementContext statement;
		public List<StatementContext> statements = new ArrayList<StatementContext>();
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public NamespaceDefinitionStatementContext(StatementContext ctx) { copyFrom(ctx); }
	}

	public final StatementContext statement() throws RecognitionException {
		StatementContext _localctx = new StatementContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_statement);
		int _la;
		try {
			setState(243);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
			case 1:
				_localctx = new FunctionDefinitionStatementContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(210);
				match(T__40);
				setState(211);
				((FunctionDefinitionStatementContext)_localctx).fnname = match(IDENTIFIER_SEGMENT);
				setState(212);
				match(T__7);
				setState(213);
				((FunctionDefinitionStatementContext)_localctx).fnargs = functionDefArgList();
				setState(214);
				match(T__8);
				setState(215);
				((FunctionDefinitionStatementContext)_localctx).expr = expression(0);
				}
				break;
			case 2:
				_localctx = new AssignmentStatementContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(217);
				((AssignmentStatementContext)_localctx).left = expression(0);
				setState(218);
				((AssignmentStatementContext)_localctx).op = match(T__16);
				setState(219);
				((AssignmentStatementContext)_localctx).right = expression(0);
				setState(222);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__12) {
					{
					setState(220);
					match(T__12);
					setState(221);
					((AssignmentStatementContext)_localctx).annotation = djsonExpression();
					}
				}

				setState(224);
				match(T__17);
				}
				break;
			case 3:
				_localctx = new NamespaceDefinitionStatementContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(226);
				match(T__41);
				setState(227);
				((NamespaceDefinitionStatementContext)_localctx).nsname = match(IDENTIFIER_SEGMENT);
				setState(228);
				match(T__0);
				setState(230); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(229);
					((NamespaceDefinitionStatementContext)_localctx).statement = statement();
					((NamespaceDefinitionStatementContext)_localctx).statements.add(((NamespaceDefinitionStatementContext)_localctx).statement);
					}
					}
					setState(232); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__13) | (1L << T__14) | (1L << T__32) | (1L << T__33) | (1L << T__34) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << T__41) | (1L << T__42) | (1L << STRING) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0) );
				setState(234);
				match(T__1);
				}
				break;
			case 4:
				_localctx = new ImportStatementContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(236);
				match(T__42);
				setState(237);
				((ImportStatementContext)_localctx).filename = match(STRING);
				setState(238);
				match(T__43);
				setState(239);
				((ImportStatementContext)_localctx).alias = match(IDENTIFIER_SEGMENT);
				}
				break;
			case 5:
				_localctx = new StringStatementContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(240);
				((StringStatementContext)_localctx).str = match(STRING);
				}
				break;
			case 6:
				_localctx = new NamedJsonStatementContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(241);
				((NamedJsonStatementContext)_localctx).namedjsontype = match(IDENTIFIER_SEGMENT);
				setState(242);
				((NamedJsonStatementContext)_localctx).jsonval = djsonExpression();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StatementListContext extends ParserRuleContext {
		public TerminalNode EOF() { return getToken(DesmoscriptParser.EOF, 0); }
		public List<StatementContext> statement() {
			return getRuleContexts(StatementContext.class);
		}
		public StatementContext statement(int i) {
			return getRuleContext(StatementContext.class,i);
		}
		public StatementListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_statementList; }
	}

	public final StatementListContext statementList() throws RecognitionException {
		StatementListContext _localctx = new StatementListContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_statementList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(246); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(245);
				statement();
				}
				}
				setState(248); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__13) | (1L << T__14) | (1L << T__32) | (1L << T__33) | (1L << T__34) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << T__41) | (1L << T__42) | (1L << STRING) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0) );
			setState(250);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionDefArgListContext extends ParserRuleContext {
		public Token IDENTIFIER_SEGMENT;
		public List<Token> args = new ArrayList<Token>();
		public List<TerminalNode> IDENTIFIER_SEGMENT() { return getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT); }
		public TerminalNode IDENTIFIER_SEGMENT(int i) {
			return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
		public FunctionDefArgListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionDefArgList; }
	}

	public final FunctionDefArgListContext functionDefArgList() throws RecognitionException {
		FunctionDefArgListContext _localctx = new FunctionDefArgListContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_functionDefArgList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(256);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,19,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(252);
					((FunctionDefArgListContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
					((FunctionDefArgListContext)_localctx).args.add(((FunctionDefArgListContext)_localctx).IDENTIFIER_SEGMENT);
					setState(253);
					match(T__3);
					}
					} 
				}
				setState(258);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,19,_ctx);
			}
			setState(259);
			((FunctionDefArgListContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
			((FunctionDefArgListContext)_localctx).args.add(((FunctionDefArgListContext)_localctx).IDENTIFIER_SEGMENT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionCallArgListContext extends ParserRuleContext {
		public ExpressionContext expression;
		public List<ExpressionContext> args = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public FunctionCallArgListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionCallArgList; }
	}

	public final FunctionCallArgListContext functionCallArgList() throws RecognitionException {
		FunctionCallArgListContext _localctx = new FunctionCallArgListContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_functionCallArgList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(266);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(261);
					((FunctionCallArgListContext)_localctx).expression = expression(0);
					((FunctionCallArgListContext)_localctx).args.add(((FunctionCallArgListContext)_localctx).expression);
					setState(262);
					match(T__3);
					}
					} 
				}
				setState(268);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,20,_ctx);
			}
			setState(269);
			((FunctionCallArgListContext)_localctx).expression = expression(0);
			((FunctionCallArgListContext)_localctx).args.add(((FunctionCallArgListContext)_localctx).expression);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ListContext extends ParserRuleContext {
		public ExpressionContext expression;
		public List<ExpressionContext> elements = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_list; }
	}

	public final ListContext list() throws RecognitionException {
		ListContext _localctx = new ListContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_list);
		try {
			int _alt;
			setState(284);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,22,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(271);
				match(T__4);
				setState(275); 
				_errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						setState(272);
						((ListContext)_localctx).expression = expression(0);
						((ListContext)_localctx).elements.add(((ListContext)_localctx).expression);
						setState(273);
						match(T__3);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					setState(277); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,21,_ctx);
				} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
				setState(279);
				((ListContext)_localctx).expression = expression(0);
				((ListContext)_localctx).elements.add(((ListContext)_localctx).expression);
				setState(280);
				match(T__5);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(282);
				match(T__4);
				setState(283);
				match(T__5);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionCallContext extends ParserRuleContext {
		public IdentifierContext fnname;
		public FunctionCallArgListContext fnargs;
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public FunctionCallArgListContext functionCallArgList() {
			return getRuleContext(FunctionCallArgListContext.class,0);
		}
		public FunctionCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_functionCall; }
	}

	public final FunctionCallContext functionCall() throws RecognitionException {
		FunctionCallContext _localctx = new FunctionCallContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_functionCall);
		int _la;
		try {
			setState(296);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,24,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(286);
				((FunctionCallContext)_localctx).fnname = identifier();
				setState(287);
				match(T__44);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(289);
				((FunctionCallContext)_localctx).fnname = identifier();
				setState(290);
				match(T__7);
				setState(292);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__13) | (1L << T__14) | (1L << T__32) | (1L << T__33) | (1L << T__34) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0)) {
					{
					setState(291);
					((FunctionCallContext)_localctx).fnargs = functionCallArgList();
					}
				}

				setState(294);
				match(T__8);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class MacroCallContext extends ParserRuleContext {
		public IdentifierContext fnname;
		public FunctionCallArgListContext fnargs;
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public FunctionCallArgListContext functionCallArgList() {
			return getRuleContext(FunctionCallArgListContext.class,0);
		}
		public MacroCallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_macroCall; }
	}

	public final MacroCallContext macroCall() throws RecognitionException {
		MacroCallContext _localctx = new MacroCallContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_macroCall);
		int _la;
		try {
			setState(308);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,26,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(298);
				((MacroCallContext)_localctx).fnname = identifier();
				setState(299);
				match(T__45);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(301);
				((MacroCallContext)_localctx).fnname = identifier();
				setState(302);
				match(T__46);
				setState(304);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__13) | (1L << T__14) | (1L << T__32) | (1L << T__33) | (1L << T__34) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0)) {
					{
					setState(303);
					((MacroCallContext)_localctx).fnargs = functionCallArgList();
					}
				}

				setState(306);
				match(T__8);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierContext extends ParserRuleContext {
		public Token IDENTIFIER_SEGMENT;
		public List<Token> segments = new ArrayList<Token>();
		public List<TerminalNode> IDENTIFIER_SEGMENT() { return getTokens(DesmoscriptParser.IDENTIFIER_SEGMENT); }
		public TerminalNode IDENTIFIER_SEGMENT(int i) {
			return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, i);
		}
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(314);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(310);
					((IdentifierContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
					((IdentifierContext)_localctx).segments.add(((IdentifierContext)_localctx).IDENTIFIER_SEGMENT);
					setState(311);
					match(T__47);
					}
					} 
				}
				setState(316);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,27,_ctx);
			}
			setState(317);
			((IdentifierContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
			((IdentifierContext)_localctx).segments.add(((IdentifierContext)_localctx).IDENTIFIER_SEGMENT);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 2:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 14);
		case 1:
			return precpred(_ctx, 13);
		case 2:
			return precpred(_ctx, 12);
		case 3:
			return precpred(_ctx, 11);
		case 4:
			return precpred(_ctx, 10);
		case 5:
			return precpred(_ctx, 9);
		case 6:
			return precpred(_ctx, 8);
		case 7:
			return precpred(_ctx, 16);
		case 8:
			return precpred(_ctx, 15);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\67\u0142\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\7\2%\n\2"+
		"\f\2\16\2(\13\2\3\2\3\2\5\2,\n\2\3\2\3\2\3\2\3\2\3\2\3\2\7\2\64\n\2\f"+
		"\2\16\2\67\13\2\3\2\3\2\5\2;\n\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\5\2D\n\2"+
		"\3\3\3\3\3\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3"+
		"\4\3\4\7\4Y\n\4\f\4\16\4\\\13\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3"+
		"\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4"+
		"\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\6\4\u0081\n\4\r\4\16\4\u0082\3\4\3\4"+
		"\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\7\4\u008f\n\4\f\4\16\4\u0092\13\4\3\4"+
		"\5\4\u0095\n\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\5\4\u009e\n\4\3\4\3\4\7\4\u00a2"+
		"\n\4\f\4\16\4\u00a5\13\4\3\4\3\4\3\4\3\4\3\4\5\4\u00ac\n\4\5\4\u00ae\n"+
		"\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4"+
		"\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\7\4\u00d0"+
		"\n\4\f\4\16\4\u00d3\13\4\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3"+
		"\5\5\5\u00e1\n\5\3\5\3\5\3\5\3\5\3\5\3\5\6\5\u00e9\n\5\r\5\16\5\u00ea"+
		"\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\5\5\u00f6\n\5\3\6\6\6\u00f9\n\6\r"+
		"\6\16\6\u00fa\3\6\3\6\3\7\3\7\7\7\u0101\n\7\f\7\16\7\u0104\13\7\3\7\3"+
		"\7\3\b\3\b\3\b\7\b\u010b\n\b\f\b\16\b\u010e\13\b\3\b\3\b\3\t\3\t\3\t\3"+
		"\t\6\t\u0116\n\t\r\t\16\t\u0117\3\t\3\t\3\t\3\t\3\t\5\t\u011f\n\t\3\n"+
		"\3\n\3\n\3\n\3\n\3\n\5\n\u0127\n\n\3\n\3\n\5\n\u012b\n\n\3\13\3\13\3\13"+
		"\3\13\3\13\3\13\5\13\u0133\n\13\3\13\3\13\5\13\u0137\n\13\3\f\3\f\7\f"+
		"\u013b\n\f\f\f\16\f\u013e\13\f\3\f\3\f\3\f\2\3\6\r\2\4\6\b\n\f\16\20\22"+
		"\24\26\2\b\3\2\f\r\3\2#%\3\2\27\31\4\2\20\20\32\32\3\2\33\37\3\2 !\2\u016f"+
		"\2C\3\2\2\2\4E\3\2\2\2\6\u00ad\3\2\2\2\b\u00f5\3\2\2\2\n\u00f8\3\2\2\2"+
		"\f\u0102\3\2\2\2\16\u010c\3\2\2\2\20\u011e\3\2\2\2\22\u012a\3\2\2\2\24"+
		"\u0136\3\2\2\2\26\u013c\3\2\2\2\30D\7\64\2\2\31D\7\63\2\2\32\33\7\3\2"+
		"\2\33,\7\4\2\2\34\35\7\3\2\2\35\36\7\65\2\2\36\37\7\5\2\2\37&\5\2\2\2"+
		" !\7\6\2\2!\"\7\65\2\2\"#\7\5\2\2#%\5\2\2\2$ \3\2\2\2%(\3\2\2\2&$\3\2"+
		"\2\2&\'\3\2\2\2\')\3\2\2\2(&\3\2\2\2)*\7\4\2\2*,\3\2\2\2+\32\3\2\2\2+"+
		"\34\3\2\2\2,D\3\2\2\2-.\7\7\2\2.;\7\b\2\2/\60\7\7\2\2\60\65\5\2\2\2\61"+
		"\62\7\6\2\2\62\64\5\2\2\2\63\61\3\2\2\2\64\67\3\2\2\2\65\63\3\2\2\2\65"+
		"\66\3\2\2\2\668\3\2\2\2\67\65\3\2\2\289\7\b\2\29;\3\2\2\2:-\3\2\2\2:/"+
		"\3\2\2\2;D\3\2\2\2<=\7\t\2\2=>\7\n\2\2>?\5\6\4\2?@\7\13\2\2@D\3\2\2\2"+
		"AD\t\2\2\2BD\7\16\2\2C\30\3\2\2\2C\31\3\2\2\2C+\3\2\2\2C:\3\2\2\2C<\3"+
		"\2\2\2CA\3\2\2\2CB\3\2\2\2D\3\3\2\2\2EF\7\17\2\2FG\5\2\2\2G\5\3\2\2\2"+
		"HI\b\4\1\2I\u00ae\5\22\n\2J\u00ae\5\24\13\2KL\7\20\2\2L\u00ae\5\6\4\30"+
		"MN\7\21\2\2N\u00ae\5\6\4\27O\u00ae\5\26\f\2PQ\7\7\2\2QR\5\6\4\2RZ\7\22"+
		"\2\2ST\7\65\2\2TU\7\23\2\2UV\5\6\4\2VW\7\24\2\2WY\3\2\2\2XS\3\2\2\2Y\\"+
		"\3\2\2\2ZX\3\2\2\2Z[\3\2\2\2[]\3\2\2\2\\Z\3\2\2\2]^\7\65\2\2^_\7\23\2"+
		"\2_`\5\6\4\2`a\3\2\2\2ab\7\b\2\2b\u00ae\3\2\2\2cd\7\n\2\2de\5\6\4\2ef"+
		"\7\13\2\2f\u00ae\3\2\2\2gh\7\n\2\2hi\5\6\4\2ij\7\6\2\2jk\5\6\4\2kl\7\13"+
		"\2\2l\u00ae\3\2\2\2m\u00ae\7\64\2\2n\u00ae\5\20\t\2op\t\3\2\2pq\7\n\2"+
		"\2qr\7\65\2\2rs\7\23\2\2st\5\6\4\2tu\7&\2\2uv\5\6\4\2vw\7\13\2\2wx\5\6"+
		"\4\7x\u00ae\3\2\2\2yz\7\'\2\2z{\7\n\2\2{|\7\65\2\2|}\7\13\2\2}\u00ae\5"+
		"\6\4\6~\u0080\7\3\2\2\177\u0081\5\b\5\2\u0080\177\3\2\2\2\u0081\u0082"+
		"\3\2\2\2\u0082\u0080\3\2\2\2\u0082\u0083\3\2\2\2\u0083\u0084\3\2\2\2\u0084"+
		"\u0085\5\6\4\2\u0085\u0086\7\4\2\2\u0086\u00ae\3\2\2\2\u0087\u0088\7("+
		"\2\2\u0088\u0090\7\3\2\2\u0089\u008a\5\6\4\2\u008a\u008b\7\5\2\2\u008b"+
		"\u008c\5\6\4\2\u008c\u008d\7\6\2\2\u008d\u008f\3\2\2\2\u008e\u0089\3\2"+
		"\2\2\u008f\u0092\3\2\2\2\u0090\u008e\3\2\2\2\u0090\u0091\3\2\2\2\u0091"+
		"\u0094\3\2\2\2\u0092\u0090\3\2\2\2\u0093\u0095\5\6\4\2\u0094\u0093\3\2"+
		"\2\2\u0094\u0095\3\2\2\2\u0095\u0096\3\2\2\2\u0096\u00ae\7\4\2\2\u0097"+
		"\u00a3\7)\2\2\u0098\u0099\5\6\4\2\u0099\u009a\7*\2\2\u009a\u009b\5\6\4"+
		"\2\u009b\u009e\3\2\2\2\u009c\u009e\5\6\4\2\u009d\u0098\3\2\2\2\u009d\u009c"+
		"\3\2\2\2\u009e\u009f\3\2\2\2\u009f\u00a0\7\6\2\2\u00a0\u00a2\3\2\2\2\u00a1"+
		"\u009d\3\2\2\2\u00a2\u00a5\3\2\2\2\u00a3\u00a1\3\2\2\2\u00a3\u00a4\3\2"+
		"\2\2\u00a4\u00ab\3\2\2\2\u00a5\u00a3\3\2\2\2\u00a6\u00a7\5\6\4\2\u00a7"+
		"\u00a8\7*\2\2\u00a8\u00a9\5\6\4\2\u00a9\u00ac\3\2\2\2\u00aa\u00ac\5\6"+
		"\4\2\u00ab\u00a6\3\2\2\2\u00ab\u00aa\3\2\2\2\u00ac\u00ae\3\2\2\2\u00ad"+
		"H\3\2\2\2\u00adJ\3\2\2\2\u00adK\3\2\2\2\u00adM\3\2\2\2\u00adO\3\2\2\2"+
		"\u00adP\3\2\2\2\u00adc\3\2\2\2\u00adg\3\2\2\2\u00adm\3\2\2\2\u00adn\3"+
		"\2\2\2\u00ado\3\2\2\2\u00ady\3\2\2\2\u00ad~\3\2\2\2\u00ad\u0087\3\2\2"+
		"\2\u00ad\u0097\3\2\2\2\u00ae\u00d1\3\2\2\2\u00af\u00b0\f\20\2\2\u00b0"+
		"\u00b1\7\26\2\2\u00b1\u00d0\5\6\4\21\u00b2\u00b3\f\17\2\2\u00b3\u00b4"+
		"\t\4\2\2\u00b4\u00d0\5\6\4\20\u00b5\u00b6\f\16\2\2\u00b6\u00b7\t\5\2\2"+
		"\u00b7\u00d0\5\6\4\17\u00b8\u00b9\f\r\2\2\u00b9\u00ba\t\6\2\2\u00ba\u00d0"+
		"\5\6\4\16\u00bb\u00bc\f\f\2\2\u00bc\u00bd\t\7\2\2\u00bd\u00d0\5\6\4\r"+
		"\u00be\u00bf\f\13\2\2\u00bf\u00c0\7\"\2\2\u00c0\u00d0\5\6\4\f\u00c1\u00c2"+
		"\f\n\2\2\u00c2\u00c3\7\6\2\2\u00c3\u00c4\5\6\4\2\u00c4\u00c5\7\"\2\2\u00c5"+
		"\u00c6\5\6\4\13\u00c6\u00d0\3\2\2\2\u00c7\u00c8\f\22\2\2\u00c8\u00c9\7"+
		"\25\2\2\u00c9\u00d0\7\65\2\2\u00ca\u00cb\f\21\2\2\u00cb\u00cc\7\7\2\2"+
		"\u00cc\u00cd\5\6\4\2\u00cd\u00ce\7\b\2\2\u00ce\u00d0\3\2\2\2\u00cf\u00af"+
		"\3\2\2\2\u00cf\u00b2\3\2\2\2\u00cf\u00b5\3\2\2\2\u00cf\u00b8\3\2\2\2\u00cf"+
		"\u00bb\3\2\2\2\u00cf\u00be\3\2\2\2\u00cf\u00c1\3\2\2\2\u00cf\u00c7\3\2"+
		"\2\2\u00cf\u00ca\3\2\2\2\u00d0\u00d3\3\2\2\2\u00d1\u00cf\3\2\2\2\u00d1"+
		"\u00d2\3\2\2\2\u00d2\7\3\2\2\2\u00d3\u00d1\3\2\2\2\u00d4\u00d5\7+\2\2"+
		"\u00d5\u00d6\7\65\2\2\u00d6\u00d7\7\n\2\2\u00d7\u00d8\5\f\7\2\u00d8\u00d9"+
		"\7\13\2\2\u00d9\u00da\5\6\4\2\u00da\u00f6\3\2\2\2\u00db\u00dc\5\6\4\2"+
		"\u00dc\u00dd\7\23\2\2\u00dd\u00e0\5\6\4\2\u00de\u00df\7\17\2\2\u00df\u00e1"+
		"\5\4\3\2\u00e0\u00de\3\2\2\2\u00e0\u00e1\3\2\2\2\u00e1\u00e2\3\2\2\2\u00e2"+
		"\u00e3\7\24\2\2\u00e3\u00f6\3\2\2\2\u00e4\u00e5\7,\2\2\u00e5\u00e6\7\65"+
		"\2\2\u00e6\u00e8\7\3\2\2\u00e7\u00e9\5\b\5\2\u00e8\u00e7\3\2\2\2\u00e9"+
		"\u00ea\3\2\2\2\u00ea\u00e8\3\2\2\2\u00ea\u00eb\3\2\2\2\u00eb\u00ec\3\2"+
		"\2\2\u00ec\u00ed\7\4\2\2\u00ed\u00f6\3\2\2\2\u00ee\u00ef\7-\2\2\u00ef"+
		"\u00f0\7\63\2\2\u00f0\u00f1\7.\2\2\u00f1\u00f6\7\65\2\2\u00f2\u00f6\7"+
		"\63\2\2\u00f3\u00f4\7\65\2\2\u00f4\u00f6\5\4\3\2\u00f5\u00d4\3\2\2\2\u00f5"+
		"\u00db\3\2\2\2\u00f5\u00e4\3\2\2\2\u00f5\u00ee\3\2\2\2\u00f5\u00f2\3\2"+
		"\2\2\u00f5\u00f3\3\2\2\2\u00f6\t\3\2\2\2\u00f7\u00f9\5\b\5\2\u00f8\u00f7"+
		"\3\2\2\2\u00f9\u00fa\3\2\2\2\u00fa\u00f8\3\2\2\2\u00fa\u00fb\3\2\2\2\u00fb"+
		"\u00fc\3\2\2\2\u00fc\u00fd\7\2\2\3\u00fd\13\3\2\2\2\u00fe\u00ff\7\65\2"+
		"\2\u00ff\u0101\7\6\2\2\u0100\u00fe\3\2\2\2\u0101\u0104\3\2\2\2\u0102\u0100"+
		"\3\2\2\2\u0102\u0103\3\2\2\2\u0103\u0105\3\2\2\2\u0104\u0102\3\2\2\2\u0105"+
		"\u0106\7\65\2\2\u0106\r\3\2\2\2\u0107\u0108\5\6\4\2\u0108\u0109\7\6\2"+
		"\2\u0109\u010b\3\2\2\2\u010a\u0107\3\2\2\2\u010b\u010e\3\2\2\2\u010c\u010a"+
		"\3\2\2\2\u010c\u010d\3\2\2\2\u010d\u010f\3\2\2\2\u010e\u010c\3\2\2\2\u010f"+
		"\u0110\5\6\4\2\u0110\17\3\2\2\2\u0111\u0115\7\7\2\2\u0112\u0113\5\6\4"+
		"\2\u0113\u0114\7\6\2\2\u0114\u0116\3\2\2\2\u0115\u0112\3\2\2\2\u0116\u0117"+
		"\3\2\2\2\u0117\u0115\3\2\2\2\u0117\u0118\3\2\2\2\u0118\u0119\3\2\2\2\u0119"+
		"\u011a\5\6\4\2\u011a\u011b\7\b\2\2\u011b\u011f\3\2\2\2\u011c\u011d\7\7"+
		"\2\2\u011d\u011f\7\b\2\2\u011e\u0111\3\2\2\2\u011e\u011c\3\2\2\2\u011f"+
		"\21\3\2\2\2\u0120\u0121\5\26\f\2\u0121\u0122\7/\2\2\u0122\u012b\3\2\2"+
		"\2\u0123\u0124\5\26\f\2\u0124\u0126\7\n\2\2\u0125\u0127\5\16\b\2\u0126"+
		"\u0125\3\2\2\2\u0126\u0127\3\2\2\2\u0127\u0128\3\2\2\2\u0128\u0129\7\13"+
		"\2\2\u0129\u012b\3\2\2\2\u012a\u0120\3\2\2\2\u012a\u0123\3\2\2\2\u012b"+
		"\23\3\2\2\2\u012c\u012d\5\26\f\2\u012d\u012e\7\60\2\2\u012e\u0137\3\2"+
		"\2\2\u012f\u0130\5\26\f\2\u0130\u0132\7\61\2\2\u0131\u0133\5\16\b\2\u0132"+
		"\u0131\3\2\2\2\u0132\u0133\3\2\2\2\u0133\u0134\3\2\2\2\u0134\u0135\7\13"+
		"\2\2\u0135\u0137\3\2\2\2\u0136\u012c\3\2\2\2\u0136\u012f\3\2\2\2\u0137"+
		"\25\3\2\2\2\u0138\u0139\7\65\2\2\u0139\u013b\7\62\2\2\u013a\u0138\3\2"+
		"\2\2\u013b\u013e\3\2\2\2\u013c\u013a\3\2\2\2\u013c\u013d\3\2\2\2\u013d"+
		"\u013f\3\2\2\2\u013e\u013c\3\2\2\2\u013f\u0140\7\65\2\2\u0140\27\3\2\2"+
		"\2\36&+\65:CZ\u0082\u0090\u0094\u009d\u00a3\u00ab\u00ad\u00cf\u00d1\u00e0"+
		"\u00ea\u00f5\u00fa\u0102\u010c\u0117\u011e\u0126\u012a\u0132\u0136\u013c";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}