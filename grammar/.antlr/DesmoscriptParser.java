// Generated from /Users/adrian/Documents/GitHub/desmoscript/grammar/Desmoscript.g4 by ANTLR 4.9.2
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
		T__45=46, T__46=47, STRING=48, NUMBER=49, IDENTIFIER_SEGMENT=50, WS=51;
	public static final int
		RULE_djson = 0, RULE_expression = 1, RULE_expressionList = 2, RULE_functionDefArgList = 3, 
		RULE_functionCallArgList = 4, RULE_list = 5, RULE_functionCall = 6, RULE_macroCall = 7, 
		RULE_identifier = 8;
	private static String[] makeRuleNames() {
		return new String[] {
			"djson", "expression", "expressionList", "functionDefArgList", "functionCallArgList", 
			"list", "functionCall", "macroCall", "identifier"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'{'", "'}'", "':'", "','", "'['", "']'", "'ds'", "'('", "')'", 
			"'true'", "'false'", "'null'", "'@'", "'import'", "'as'", "';'", "'settings'", 
			"'for'", "'='", "'\\'", "'*'", "'/'", "'%'", "'+'", "'-'", "'=='", "'>'", 
			"'<'", "'>='", "'<='", "'..'", "'sum'", "'product'", "'integral'", "'to'", 
			"'derivative'", "'macro'", "'fn'", "'ns'", "'with'", "'match'", "'=>'", 
			"'->'", "'()'", "'!()'", "'!('", "'.'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, null, null, null, null, null, null, null, null, null, null, 
			"STRING", "NUMBER", "IDENTIFIER_SEGMENT", "WS"
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
			setState(61);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case NUMBER:
				_localctx = new NumberDJsonContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(18);
				((NumberDJsonContext)_localctx).data = match(NUMBER);
				}
				break;
			case STRING:
				_localctx = new StringDJsonContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(19);
				((StringDJsonContext)_localctx).data = match(STRING);
				}
				break;
			case T__0:
				_localctx = new ObjectDJsonContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(37);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
				case 1:
					{
					setState(20);
					match(T__0);
					setState(21);
					match(T__1);
					}
					break;
				case 2:
					{
					setState(22);
					match(T__0);
					setState(23);
					((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
					((ObjectDJsonContext)_localctx).keys.add(((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT);
					setState(24);
					match(T__2);
					setState(25);
					((ObjectDJsonContext)_localctx).djson = djson();
					((ObjectDJsonContext)_localctx).values.add(((ObjectDJsonContext)_localctx).djson);
					setState(32);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==T__3) {
						{
						{
						setState(26);
						match(T__3);
						setState(27);
						((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
						((ObjectDJsonContext)_localctx).keys.add(((ObjectDJsonContext)_localctx).IDENTIFIER_SEGMENT);
						setState(28);
						match(T__2);
						setState(29);
						((ObjectDJsonContext)_localctx).djson = djson();
						((ObjectDJsonContext)_localctx).values.add(((ObjectDJsonContext)_localctx).djson);
						}
						}
						setState(34);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(35);
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
				setState(52);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,3,_ctx) ) {
				case 1:
					{
					setState(39);
					match(T__4);
					setState(40);
					match(T__5);
					}
					break;
				case 2:
					{
					setState(41);
					match(T__4);
					setState(42);
					((ArrayDJsonContext)_localctx).djson = djson();
					((ArrayDJsonContext)_localctx).elements.add(((ArrayDJsonContext)_localctx).djson);
					setState(47);
					_errHandler.sync(this);
					_la = _input.LA(1);
					while (_la==T__3) {
						{
						{
						setState(43);
						match(T__3);
						setState(44);
						((ArrayDJsonContext)_localctx).djson = djson();
						((ArrayDJsonContext)_localctx).elements.add(((ArrayDJsonContext)_localctx).djson);
						}
						}
						setState(49);
						_errHandler.sync(this);
						_la = _input.LA(1);
					}
					setState(50);
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
				setState(54);
				match(T__6);
				setState(55);
				match(T__7);
				setState(56);
				((DesmoscriptDJsonContext)_localctx).expr = expression(0);
				setState(57);
				match(T__8);
				}
				break;
			case T__9:
			case T__10:
				_localctx = new BooleanDJsonContext(_localctx);
				enterOuterAlt(_localctx, 6);
				{
				setState(59);
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
				setState(60);
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
	public static class ActionExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ActionExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class JSONExprContext extends ExpressionContext {
		public DjsonContext jsonval;
		public DjsonContext djson() {
			return getRuleContext(DjsonContext.class,0);
		}
		public JSONExprContext(ExpressionContext ctx) { copyFrom(ctx); }
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
	public static class FunctionDefinitionExprContext extends ExpressionContext {
		public IdentifierContext fnname;
		public FunctionDefArgListContext fnargs;
		public ExpressionContext expression;
		public List<ExpressionContext> exprs = new ArrayList<ExpressionContext>();
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public FunctionDefArgListContext functionDefArgList() {
			return getRuleContext(FunctionDefArgListContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public FunctionDefinitionExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class NumberExprContext extends ExpressionContext {
		public TerminalNode NUMBER() { return getToken(DesmoscriptParser.NUMBER, 0); }
		public NumberExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class NamespaceDefinitionExprContext extends ExpressionContext {
		public Token nsname;
		public ExpressionContext expression;
		public List<ExpressionContext> exprs = new ArrayList<ExpressionContext>();
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public NamespaceDefinitionExprContext(ExpressionContext ctx) { copyFrom(ctx); }
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
	public static class NamedJsonExprContext extends ExpressionContext {
		public Token namedjsontype;
		public ExpressionContext jsonval;
		public ExpressionContext expression() {
			return getRuleContext(ExpressionContext.class,0);
		}
		public NamedJsonExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ListExprContext extends ExpressionContext {
		public ListContext l;
		public ListContext list() {
			return getRuleContext(ListContext.class,0);
		}
		public ListExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class MacroDefinitionExprContext extends ExpressionContext {
		public IdentifierContext macroname;
		public FunctionDefArgListContext macroargs;
		public ExpressionContext expression;
		public List<ExpressionContext> exprs = new ArrayList<ExpressionContext>();
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public FunctionDefArgListContext functionDefArgList() {
			return getRuleContext(FunctionDefArgListContext.class,0);
		}
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public MacroDefinitionExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class ImportExprContext extends ExpressionContext {
		public Token filename;
		public Token alias;
		public TerminalNode STRING() { return getToken(DesmoscriptParser.STRING, 0); }
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public ImportExprContext(ExpressionContext ctx) { copyFrom(ctx); }
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
	public static class DecoratedExprContext extends ExpressionContext {
		public Token qualifier;
		public ExpressionContext expr;
		public ExpressionContext jsonval;
		public TerminalNode IDENTIFIER_SEGMENT() { return getToken(DesmoscriptParser.IDENTIFIER_SEGMENT, 0); }
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public DecoratedExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}
	public static class AssignmentExprContext extends ExpressionContext {
		public ExpressionContext left;
		public Token op;
		public ExpressionContext right;
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public AssignmentExprContext(ExpressionContext ctx) { copyFrom(ctx); }
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
	public static class BlockExprContext extends ExpressionContext {
		public ExpressionContext expression;
		public List<ExpressionContext> exprs = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public BlockExprContext(ExpressionContext ctx) { copyFrom(ctx); }
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
		public List<ExpressionContext> fallback = new ArrayList<ExpressionContext>();
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public MatchExprContext(ExpressionContext ctx) { copyFrom(ctx); }
	}

	public final ExpressionContext expression() throws RecognitionException {
		return expression(0);
	}

	private ExpressionContext expression(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExpressionContext _localctx = new ExpressionContext(_ctx, _parentState);
		ExpressionContext _prevctx = _localctx;
		int _startState = 2;
		enterRecursionRule(_localctx, 2, RULE_expression, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(191);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,13,_ctx) ) {
			case 1:
				{
				_localctx = new FunctionCallExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(64);
				((FunctionCallExprContext)_localctx).call = functionCall();
				}
				break;
			case 2:
				{
				_localctx = new JSONExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(65);
				match(T__12);
				setState(66);
				((JSONExprContext)_localctx).jsonval = djson();
				}
				break;
			case 3:
				{
				_localctx = new MacroCallExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(67);
				((MacroCallExprContext)_localctx).call = macroCall();
				}
				break;
			case 4:
				{
				_localctx = new ImportExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(68);
				match(T__13);
				setState(69);
				((ImportExprContext)_localctx).filename = match(STRING);
				setState(72);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if (_la==T__14) {
					{
					setState(70);
					match(T__14);
					setState(71);
					((ImportExprContext)_localctx).alias = match(IDENTIFIER_SEGMENT);
					}
				}

				setState(74);
				match(T__15);
				}
				break;
			case 5:
				{
				_localctx = new NamedJsonExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(75);
				((NamedJsonExprContext)_localctx).namedjsontype = match(T__16);
				setState(76);
				((NamedJsonExprContext)_localctx).jsonval = expression(24);
				}
				break;
			case 6:
				{
				_localctx = new IdentifierExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(77);
				((IdentifierExprContext)_localctx).ident = identifier();
				}
				break;
			case 7:
				{
				_localctx = new ListCompExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(78);
				match(T__4);
				setState(79);
				((ListCompExprContext)_localctx).body = expression(0);
				setState(80);
				match(T__17);
				setState(88);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,6,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(81);
						((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
						((ListCompExprContext)_localctx).variables.add(((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT);
						setState(82);
						match(T__18);
						setState(83);
						((ListCompExprContext)_localctx).expression = expression(0);
						((ListCompExprContext)_localctx).lists.add(((ListCompExprContext)_localctx).expression);
						setState(84);
						match(T__15);
						}
						} 
					}
					setState(90);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,6,_ctx);
				}
				{
				setState(91);
				((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
				((ListCompExprContext)_localctx).variables.add(((ListCompExprContext)_localctx).IDENTIFIER_SEGMENT);
				setState(92);
				match(T__18);
				setState(93);
				((ListCompExprContext)_localctx).expression = expression(0);
				((ListCompExprContext)_localctx).lists.add(((ListCompExprContext)_localctx).expression);
				}
				setState(95);
				match(T__5);
				}
				break;
			case 8:
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
			case 9:
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
			case 10:
				{
				_localctx = new NumberExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(107);
				match(NUMBER);
				}
				break;
			case 11:
				{
				_localctx = new ListExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(108);
				((ListExprContext)_localctx).l = list();
				}
				break;
			case 12:
				{
				_localctx = new SumProdIntegralExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(109);
				((SumProdIntegralExprContext)_localctx).op = _input.LT(1);
				_la = _input.LA(1);
				if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__31) | (1L << T__32) | (1L << T__33))) != 0)) ) {
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
				match(T__18);
				setState(113);
				((SumProdIntegralExprContext)_localctx).lo = expression(0);
				setState(114);
				match(T__34);
				setState(115);
				((SumProdIntegralExprContext)_localctx).hi = expression(0);
				setState(116);
				match(T__8);
				setState(117);
				((SumProdIntegralExprContext)_localctx).body = expression(10);
				}
				break;
			case 13:
				{
				_localctx = new DerivativeExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(119);
				match(T__35);
				setState(120);
				match(T__7);
				setState(121);
				((DerivativeExprContext)_localctx).var = match(IDENTIFIER_SEGMENT);
				setState(122);
				match(T__8);
				setState(123);
				((DerivativeExprContext)_localctx).body = expression(9);
				}
				break;
			case 14:
				{
				_localctx = new MacroDefinitionExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(124);
				match(T__36);
				setState(125);
				((MacroDefinitionExprContext)_localctx).macroname = identifier();
				setState(126);
				match(T__7);
				setState(127);
				((MacroDefinitionExprContext)_localctx).macroargs = functionDefArgList();
				setState(128);
				match(T__8);
				setState(129);
				match(T__0);
				setState(131); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(130);
					((MacroDefinitionExprContext)_localctx).expression = expression(0);
					((MacroDefinitionExprContext)_localctx).exprs.add(((MacroDefinitionExprContext)_localctx).expression);
					}
					}
					setState(133); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0) );
				setState(135);
				match(T__1);
				}
				break;
			case 15:
				{
				_localctx = new FunctionDefinitionExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(137);
				match(T__37);
				setState(138);
				((FunctionDefinitionExprContext)_localctx).fnname = identifier();
				setState(139);
				match(T__7);
				setState(140);
				((FunctionDefinitionExprContext)_localctx).fnargs = functionDefArgList();
				setState(141);
				match(T__8);
				setState(142);
				match(T__0);
				setState(144); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(143);
					((FunctionDefinitionExprContext)_localctx).expression = expression(0);
					((FunctionDefinitionExprContext)_localctx).exprs.add(((FunctionDefinitionExprContext)_localctx).expression);
					}
					}
					setState(146); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0) );
				setState(148);
				match(T__1);
				}
				break;
			case 16:
				{
				_localctx = new NamespaceDefinitionExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(150);
				match(T__38);
				setState(151);
				((NamespaceDefinitionExprContext)_localctx).nsname = match(IDENTIFIER_SEGMENT);
				setState(152);
				match(T__0);
				setState(154); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(153);
					((NamespaceDefinitionExprContext)_localctx).expression = expression(0);
					((NamespaceDefinitionExprContext)_localctx).exprs.add(((NamespaceDefinitionExprContext)_localctx).expression);
					}
					}
					setState(156); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0) );
				setState(158);
				match(T__1);
				}
				break;
			case 17:
				{
				_localctx = new DecoratedExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(160);
				((DecoratedExprContext)_localctx).qualifier = match(IDENTIFIER_SEGMENT);
				setState(161);
				((DecoratedExprContext)_localctx).expr = expression(0);
				setState(162);
				match(T__39);
				setState(163);
				((DecoratedExprContext)_localctx).jsonval = expression(5);
				}
				break;
			case 18:
				{
				_localctx = new BlockExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(165);
				match(T__0);
				setState(167); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(166);
					((BlockExprContext)_localctx).expression = expression(0);
					((BlockExprContext)_localctx).exprs.add(((BlockExprContext)_localctx).expression);
					}
					}
					setState(169); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0) );
				setState(171);
				match(T__1);
				}
				break;
			case 19:
				{
				_localctx = new MatchExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(173);
				match(T__40);
				setState(174);
				match(T__0);
				setState(182);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(175);
						((MatchExprContext)_localctx).expression = expression(0);
						((MatchExprContext)_localctx).predicate.add(((MatchExprContext)_localctx).expression);
						setState(176);
						match(T__41);
						setState(177);
						((MatchExprContext)_localctx).expression = expression(0);
						((MatchExprContext)_localctx).result.add(((MatchExprContext)_localctx).expression);
						setState(178);
						match(T__15);
						}
						} 
					}
					setState(184);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
				}
				setState(188);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0)) {
					{
					setState(185);
					((MatchExprContext)_localctx).expression = expression(0);
					((MatchExprContext)_localctx).fallback.add(((MatchExprContext)_localctx).expression);
					setState(186);
					match(T__15);
					}
				}

				setState(190);
				match(T__1);
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(229);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,15,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(227);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,14,_ctx) ) {
					case 1:
						{
						_localctx = new MultOrDivExprContext(new ExpressionContext(_parentctx, _parentState));
						((MultOrDivExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(193);
						if (!(precpred(_ctx, 17))) throw new FailedPredicateException(this, "precpred(_ctx, 17)");
						setState(194);
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
						setState(195);
						((MultOrDivExprContext)_localctx).right = expression(18);
						}
						break;
					case 2:
						{
						_localctx = new AddOrSubExprContext(new ExpressionContext(_parentctx, _parentState));
						((AddOrSubExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(196);
						if (!(precpred(_ctx, 16))) throw new FailedPredicateException(this, "precpred(_ctx, 16)");
						setState(197);
						((AddOrSubExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==T__23 || _la==T__24) ) {
							((AddOrSubExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(198);
						((AddOrSubExprContext)_localctx).right = expression(17);
						}
						break;
					case 3:
						{
						_localctx = new LogicalExprContext(new ExpressionContext(_parentctx, _parentState));
						((LogicalExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(199);
						if (!(precpred(_ctx, 15))) throw new FailedPredicateException(this, "precpred(_ctx, 15)");
						setState(200);
						((LogicalExprContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__25) | (1L << T__26) | (1L << T__27) | (1L << T__28) | (1L << T__29))) != 0)) ) {
							((LogicalExprContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(201);
						((LogicalExprContext)_localctx).right = expression(16);
						}
						break;
					case 4:
						{
						_localctx = new RangeExprContext(new ExpressionContext(_parentctx, _parentState));
						((RangeExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(202);
						if (!(precpred(_ctx, 14))) throw new FailedPredicateException(this, "precpred(_ctx, 14)");
						setState(203);
						((RangeExprContext)_localctx).op = match(T__30);
						setState(204);
						((RangeExprContext)_localctx).right = expression(15);
						}
						break;
					case 5:
						{
						_localctx = new StepRangeExprContext(new ExpressionContext(_parentctx, _parentState));
						((StepRangeExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(205);
						if (!(precpred(_ctx, 13))) throw new FailedPredicateException(this, "precpred(_ctx, 13)");
						setState(206);
						match(T__3);
						setState(207);
						((StepRangeExprContext)_localctx).step = expression(0);
						setState(208);
						((StepRangeExprContext)_localctx).op = match(T__30);
						setState(209);
						((StepRangeExprContext)_localctx).right = expression(14);
						}
						break;
					case 6:
						{
						_localctx = new ActionExprContext(new ExpressionContext(_parentctx, _parentState));
						((ActionExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(211);
						if (!(precpred(_ctx, 2))) throw new FailedPredicateException(this, "precpred(_ctx, 2)");
						setState(212);
						((ActionExprContext)_localctx).op = match(T__42);
						setState(213);
						((ActionExprContext)_localctx).right = expression(3);
						}
						break;
					case 7:
						{
						_localctx = new MemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						((MemberAccessExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(214);
						if (!(precpred(_ctx, 19))) throw new FailedPredicateException(this, "precpred(_ctx, 19)");
						setState(215);
						((MemberAccessExprContext)_localctx).op = match(T__19);
						setState(216);
						((MemberAccessExprContext)_localctx).right = match(IDENTIFIER_SEGMENT);
						}
						break;
					case 8:
						{
						_localctx = new ListMemberAccessExprContext(new ExpressionContext(_parentctx, _parentState));
						((ListMemberAccessExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(217);
						if (!(precpred(_ctx, 18))) throw new FailedPredicateException(this, "precpred(_ctx, 18)");
						setState(218);
						((ListMemberAccessExprContext)_localctx).op = match(T__4);
						setState(219);
						((ListMemberAccessExprContext)_localctx).right = expression(0);
						setState(220);
						match(T__5);
						}
						break;
					case 9:
						{
						_localctx = new AssignmentExprContext(new ExpressionContext(_parentctx, _parentState));
						((AssignmentExprContext)_localctx).left = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expression);
						setState(222);
						if (!(precpred(_ctx, 1))) throw new FailedPredicateException(this, "precpred(_ctx, 1)");
						setState(223);
						((AssignmentExprContext)_localctx).op = match(T__18);
						setState(224);
						((AssignmentExprContext)_localctx).right = expression(0);
						setState(225);
						match(T__15);
						}
						break;
					}
					} 
				}
				setState(231);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,15,_ctx);
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

	public static class ExpressionListContext extends ParserRuleContext {
		public List<ExpressionContext> expression() {
			return getRuleContexts(ExpressionContext.class);
		}
		public ExpressionContext expression(int i) {
			return getRuleContext(ExpressionContext.class,i);
		}
		public ExpressionListContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expressionList; }
	}

	public final ExpressionListContext expressionList() throws RecognitionException {
		ExpressionListContext _localctx = new ExpressionListContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_expressionList);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(233); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(232);
				expression(0);
				}
				}
				setState(235); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( (((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0) );
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
		enterRule(_localctx, 6, RULE_functionDefArgList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(241);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,17,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(237);
					((FunctionDefArgListContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
					((FunctionDefArgListContext)_localctx).args.add(((FunctionDefArgListContext)_localctx).IDENTIFIER_SEGMENT);
					setState(238);
					match(T__3);
					}
					} 
				}
				setState(243);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,17,_ctx);
			}
			setState(244);
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
		enterRule(_localctx, 8, RULE_functionCallArgList);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(251);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,18,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(246);
					((FunctionCallArgListContext)_localctx).expression = expression(0);
					((FunctionCallArgListContext)_localctx).args.add(((FunctionCallArgListContext)_localctx).expression);
					setState(247);
					match(T__3);
					}
					} 
				}
				setState(253);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,18,_ctx);
			}
			setState(254);
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
		enterRule(_localctx, 10, RULE_list);
		try {
			int _alt;
			setState(269);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,20,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(256);
				match(T__4);
				setState(260); 
				_errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						setState(257);
						((ListContext)_localctx).expression = expression(0);
						((ListContext)_localctx).elements.add(((ListContext)_localctx).expression);
						setState(258);
						match(T__3);
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					setState(262); 
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,19,_ctx);
				} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
				setState(264);
				((ListContext)_localctx).expression = expression(0);
				((ListContext)_localctx).elements.add(((ListContext)_localctx).expression);
				setState(265);
				match(T__5);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(267);
				match(T__4);
				setState(268);
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
		enterRule(_localctx, 12, RULE_functionCall);
		int _la;
		try {
			setState(281);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,22,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(271);
				((FunctionCallContext)_localctx).fnname = identifier();
				setState(272);
				match(T__43);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(274);
				((FunctionCallContext)_localctx).fnname = identifier();
				setState(275);
				match(T__7);
				setState(277);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0)) {
					{
					setState(276);
					((FunctionCallContext)_localctx).fnargs = functionCallArgList();
					}
				}

				setState(279);
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
		enterRule(_localctx, 14, RULE_macroCall);
		int _la;
		try {
			setState(293);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,24,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(283);
				((MacroCallContext)_localctx).fnname = identifier();
				setState(284);
				match(T__44);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(286);
				((MacroCallContext)_localctx).fnname = identifier();
				setState(287);
				match(T__45);
				setState(289);
				_errHandler.sync(this);
				_la = _input.LA(1);
				if ((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__0) | (1L << T__4) | (1L << T__7) | (1L << T__12) | (1L << T__13) | (1L << T__16) | (1L << T__31) | (1L << T__32) | (1L << T__33) | (1L << T__35) | (1L << T__36) | (1L << T__37) | (1L << T__38) | (1L << T__40) | (1L << NUMBER) | (1L << IDENTIFIER_SEGMENT))) != 0)) {
					{
					setState(288);
					((MacroCallContext)_localctx).fnargs = functionCallArgList();
					}
				}

				setState(291);
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
		enterRule(_localctx, 16, RULE_identifier);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(299);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(295);
					((IdentifierContext)_localctx).IDENTIFIER_SEGMENT = match(IDENTIFIER_SEGMENT);
					((IdentifierContext)_localctx).segments.add(((IdentifierContext)_localctx).IDENTIFIER_SEGMENT);
					setState(296);
					match(T__46);
					}
					} 
				}
				setState(301);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,25,_ctx);
			}
			setState(302);
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
		case 1:
			return expression_sempred((ExpressionContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expression_sempred(ExpressionContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 17);
		case 1:
			return precpred(_ctx, 16);
		case 2:
			return precpred(_ctx, 15);
		case 3:
			return precpred(_ctx, 14);
		case 4:
			return precpred(_ctx, 13);
		case 5:
			return precpred(_ctx, 2);
		case 6:
			return precpred(_ctx, 19);
		case 7:
			return precpred(_ctx, 18);
		case 8:
			return precpred(_ctx, 1);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\65\u0133\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\3\2\3"+
		"\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\7\2!\n\2\f\2\16\2$\13\2\3\2"+
		"\3\2\5\2(\n\2\3\2\3\2\3\2\3\2\3\2\3\2\7\2\60\n\2\f\2\16\2\63\13\2\3\2"+
		"\3\2\5\2\67\n\2\3\2\3\2\3\2\3\2\3\2\3\2\3\2\5\2@\n\2\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\5\3K\n\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\7\3Y\n\3\f\3\16\3\\\13\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\6\3\u0086\n\3\r\3"+
		"\16\3\u0087\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\6\3\u0093\n\3\r\3\16\3"+
		"\u0094\3\3\3\3\3\3\3\3\3\3\3\3\6\3\u009d\n\3\r\3\16\3\u009e\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\6\3\u00aa\n\3\r\3\16\3\u00ab\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\7\3\u00b7\n\3\f\3\16\3\u00ba\13\3\3\3\3\3\3\3\5"+
		"\3\u00bf\n\3\3\3\5\3\u00c2\n\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\3\3\3\3\3\3\3\7\3\u00e6\n\3\f\3\16\3\u00e9\13\3\3\4\6\4\u00ec"+
		"\n\4\r\4\16\4\u00ed\3\5\3\5\7\5\u00f2\n\5\f\5\16\5\u00f5\13\5\3\5\3\5"+
		"\3\6\3\6\3\6\7\6\u00fc\n\6\f\6\16\6\u00ff\13\6\3\6\3\6\3\7\3\7\3\7\3\7"+
		"\6\7\u0107\n\7\r\7\16\7\u0108\3\7\3\7\3\7\3\7\3\7\5\7\u0110\n\7\3\b\3"+
		"\b\3\b\3\b\3\b\3\b\5\b\u0118\n\b\3\b\3\b\5\b\u011c\n\b\3\t\3\t\3\t\3\t"+
		"\3\t\3\t\5\t\u0124\n\t\3\t\3\t\5\t\u0128\n\t\3\n\3\n\7\n\u012c\n\n\f\n"+
		"\16\n\u012f\13\n\3\n\3\n\3\n\2\3\4\13\2\4\6\b\n\f\16\20\22\2\7\3\2\f\r"+
		"\3\2\"$\3\2\27\31\3\2\32\33\3\2\34 \2\u0160\2?\3\2\2\2\4\u00c1\3\2\2\2"+
		"\6\u00eb\3\2\2\2\b\u00f3\3\2\2\2\n\u00fd\3\2\2\2\f\u010f\3\2\2\2\16\u011b"+
		"\3\2\2\2\20\u0127\3\2\2\2\22\u012d\3\2\2\2\24@\7\63\2\2\25@\7\62\2\2\26"+
		"\27\7\3\2\2\27(\7\4\2\2\30\31\7\3\2\2\31\32\7\64\2\2\32\33\7\5\2\2\33"+
		"\"\5\2\2\2\34\35\7\6\2\2\35\36\7\64\2\2\36\37\7\5\2\2\37!\5\2\2\2 \34"+
		"\3\2\2\2!$\3\2\2\2\" \3\2\2\2\"#\3\2\2\2#%\3\2\2\2$\"\3\2\2\2%&\7\4\2"+
		"\2&(\3\2\2\2\'\26\3\2\2\2\'\30\3\2\2\2(@\3\2\2\2)*\7\7\2\2*\67\7\b\2\2"+
		"+,\7\7\2\2,\61\5\2\2\2-.\7\6\2\2.\60\5\2\2\2/-\3\2\2\2\60\63\3\2\2\2\61"+
		"/\3\2\2\2\61\62\3\2\2\2\62\64\3\2\2\2\63\61\3\2\2\2\64\65\7\b\2\2\65\67"+
		"\3\2\2\2\66)\3\2\2\2\66+\3\2\2\2\67@\3\2\2\289\7\t\2\29:\7\n\2\2:;\5\4"+
		"\3\2;<\7\13\2\2<@\3\2\2\2=@\t\2\2\2>@\7\16\2\2?\24\3\2\2\2?\25\3\2\2\2"+
		"?\'\3\2\2\2?\66\3\2\2\2?8\3\2\2\2?=\3\2\2\2?>\3\2\2\2@\3\3\2\2\2AB\b\3"+
		"\1\2B\u00c2\5\16\b\2CD\7\17\2\2D\u00c2\5\2\2\2E\u00c2\5\20\t\2FG\7\20"+
		"\2\2GJ\7\62\2\2HI\7\21\2\2IK\7\64\2\2JH\3\2\2\2JK\3\2\2\2KL\3\2\2\2L\u00c2"+
		"\7\22\2\2MN\7\23\2\2N\u00c2\5\4\3\32O\u00c2\5\22\n\2PQ\7\7\2\2QR\5\4\3"+
		"\2RZ\7\24\2\2ST\7\64\2\2TU\7\25\2\2UV\5\4\3\2VW\7\22\2\2WY\3\2\2\2XS\3"+
		"\2\2\2Y\\\3\2\2\2ZX\3\2\2\2Z[\3\2\2\2[]\3\2\2\2\\Z\3\2\2\2]^\7\64\2\2"+
		"^_\7\25\2\2_`\5\4\3\2`a\3\2\2\2ab\7\b\2\2b\u00c2\3\2\2\2cd\7\n\2\2de\5"+
		"\4\3\2ef\7\13\2\2f\u00c2\3\2\2\2gh\7\n\2\2hi\5\4\3\2ij\7\6\2\2jk\5\4\3"+
		"\2kl\7\13\2\2l\u00c2\3\2\2\2m\u00c2\7\63\2\2n\u00c2\5\f\7\2op\t\3\2\2"+
		"pq\7\n\2\2qr\7\64\2\2rs\7\25\2\2st\5\4\3\2tu\7%\2\2uv\5\4\3\2vw\7\13\2"+
		"\2wx\5\4\3\fx\u00c2\3\2\2\2yz\7&\2\2z{\7\n\2\2{|\7\64\2\2|}\7\13\2\2}"+
		"\u00c2\5\4\3\13~\177\7\'\2\2\177\u0080\5\22\n\2\u0080\u0081\7\n\2\2\u0081"+
		"\u0082\5\b\5\2\u0082\u0083\7\13\2\2\u0083\u0085\7\3\2\2\u0084\u0086\5"+
		"\4\3\2\u0085\u0084\3\2\2\2\u0086\u0087\3\2\2\2\u0087\u0085\3\2\2\2\u0087"+
		"\u0088\3\2\2\2\u0088\u0089\3\2\2\2\u0089\u008a\7\4\2\2\u008a\u00c2\3\2"+
		"\2\2\u008b\u008c\7(\2\2\u008c\u008d\5\22\n\2\u008d\u008e\7\n\2\2\u008e"+
		"\u008f\5\b\5\2\u008f\u0090\7\13\2\2\u0090\u0092\7\3\2\2\u0091\u0093\5"+
		"\4\3\2\u0092\u0091\3\2\2\2\u0093\u0094\3\2\2\2\u0094\u0092\3\2\2\2\u0094"+
		"\u0095\3\2\2\2\u0095\u0096\3\2\2\2\u0096\u0097\7\4\2\2\u0097\u00c2\3\2"+
		"\2\2\u0098\u0099\7)\2\2\u0099\u009a\7\64\2\2\u009a\u009c\7\3\2\2\u009b"+
		"\u009d\5\4\3\2\u009c\u009b\3\2\2\2\u009d\u009e\3\2\2\2\u009e\u009c\3\2"+
		"\2\2\u009e\u009f\3\2\2\2\u009f\u00a0\3\2\2\2\u00a0\u00a1\7\4\2\2\u00a1"+
		"\u00c2\3\2\2\2\u00a2\u00a3\7\64\2\2\u00a3\u00a4\5\4\3\2\u00a4\u00a5\7"+
		"*\2\2\u00a5\u00a6\5\4\3\7\u00a6\u00c2\3\2\2\2\u00a7\u00a9\7\3\2\2\u00a8"+
		"\u00aa\5\4\3\2\u00a9\u00a8\3\2\2\2\u00aa\u00ab\3\2\2\2\u00ab\u00a9\3\2"+
		"\2\2\u00ab\u00ac\3\2\2\2\u00ac\u00ad\3\2\2\2\u00ad\u00ae\7\4\2\2\u00ae"+
		"\u00c2\3\2\2\2\u00af\u00b0\7+\2\2\u00b0\u00b8\7\3\2\2\u00b1\u00b2\5\4"+
		"\3\2\u00b2\u00b3\7,\2\2\u00b3\u00b4\5\4\3\2\u00b4\u00b5\7\22\2\2\u00b5"+
		"\u00b7\3\2\2\2\u00b6\u00b1\3\2\2\2\u00b7\u00ba\3\2\2\2\u00b8\u00b6\3\2"+
		"\2\2\u00b8\u00b9\3\2\2\2\u00b9\u00be\3\2\2\2\u00ba\u00b8\3\2\2\2\u00bb"+
		"\u00bc\5\4\3\2\u00bc\u00bd\7\22\2\2\u00bd\u00bf\3\2\2\2\u00be\u00bb\3"+
		"\2\2\2\u00be\u00bf\3\2\2\2\u00bf\u00c0\3\2\2\2\u00c0\u00c2\7\4\2\2\u00c1"+
		"A\3\2\2\2\u00c1C\3\2\2\2\u00c1E\3\2\2\2\u00c1F\3\2\2\2\u00c1M\3\2\2\2"+
		"\u00c1O\3\2\2\2\u00c1P\3\2\2\2\u00c1c\3\2\2\2\u00c1g\3\2\2\2\u00c1m\3"+
		"\2\2\2\u00c1n\3\2\2\2\u00c1o\3\2\2\2\u00c1y\3\2\2\2\u00c1~\3\2\2\2\u00c1"+
		"\u008b\3\2\2\2\u00c1\u0098\3\2\2\2\u00c1\u00a2\3\2\2\2\u00c1\u00a7\3\2"+
		"\2\2\u00c1\u00af\3\2\2\2\u00c2\u00e7\3\2\2\2\u00c3\u00c4\f\23\2\2\u00c4"+
		"\u00c5\t\4\2\2\u00c5\u00e6\5\4\3\24\u00c6\u00c7\f\22\2\2\u00c7\u00c8\t"+
		"\5\2\2\u00c8\u00e6\5\4\3\23\u00c9\u00ca\f\21\2\2\u00ca\u00cb\t\6\2\2\u00cb"+
		"\u00e6\5\4\3\22\u00cc\u00cd\f\20\2\2\u00cd\u00ce\7!\2\2\u00ce\u00e6\5"+
		"\4\3\21\u00cf\u00d0\f\17\2\2\u00d0\u00d1\7\6\2\2\u00d1\u00d2\5\4\3\2\u00d2"+
		"\u00d3\7!\2\2\u00d3\u00d4\5\4\3\20\u00d4\u00e6\3\2\2\2\u00d5\u00d6\f\4"+
		"\2\2\u00d6\u00d7\7-\2\2\u00d7\u00e6\5\4\3\5\u00d8\u00d9\f\25\2\2\u00d9"+
		"\u00da\7\26\2\2\u00da\u00e6\7\64\2\2\u00db\u00dc\f\24\2\2\u00dc\u00dd"+
		"\7\7\2\2\u00dd\u00de\5\4\3\2\u00de\u00df\7\b\2\2\u00df\u00e6\3\2\2\2\u00e0"+
		"\u00e1\f\3\2\2\u00e1\u00e2\7\25\2\2\u00e2\u00e3\5\4\3\2\u00e3\u00e4\7"+
		"\22\2\2\u00e4\u00e6\3\2\2\2\u00e5\u00c3\3\2\2\2\u00e5\u00c6\3\2\2\2\u00e5"+
		"\u00c9\3\2\2\2\u00e5\u00cc\3\2\2\2\u00e5\u00cf\3\2\2\2\u00e5\u00d5\3\2"+
		"\2\2\u00e5\u00d8\3\2\2\2\u00e5\u00db\3\2\2\2\u00e5\u00e0\3\2\2\2\u00e6"+
		"\u00e9\3\2\2\2\u00e7\u00e5\3\2\2\2\u00e7\u00e8\3\2\2\2\u00e8\5\3\2\2\2"+
		"\u00e9\u00e7\3\2\2\2\u00ea\u00ec\5\4\3\2\u00eb\u00ea\3\2\2\2\u00ec\u00ed"+
		"\3\2\2\2\u00ed\u00eb\3\2\2\2\u00ed\u00ee\3\2\2\2\u00ee\7\3\2\2\2\u00ef"+
		"\u00f0\7\64\2\2\u00f0\u00f2\7\6\2\2\u00f1\u00ef\3\2\2\2\u00f2\u00f5\3"+
		"\2\2\2\u00f3\u00f1\3\2\2\2\u00f3\u00f4\3\2\2\2\u00f4\u00f6\3\2\2\2\u00f5"+
		"\u00f3\3\2\2\2\u00f6\u00f7\7\64\2\2\u00f7\t\3\2\2\2\u00f8\u00f9\5\4\3"+
		"\2\u00f9\u00fa\7\6\2\2\u00fa\u00fc\3\2\2\2\u00fb\u00f8\3\2\2\2\u00fc\u00ff"+
		"\3\2\2\2\u00fd\u00fb\3\2\2\2\u00fd\u00fe\3\2\2\2\u00fe\u0100\3\2\2\2\u00ff"+
		"\u00fd\3\2\2\2\u0100\u0101\5\4\3\2\u0101\13\3\2\2\2\u0102\u0106\7\7\2"+
		"\2\u0103\u0104\5\4\3\2\u0104\u0105\7\6\2\2\u0105\u0107\3\2\2\2\u0106\u0103"+
		"\3\2\2\2\u0107\u0108\3\2\2\2\u0108\u0106\3\2\2\2\u0108\u0109\3\2\2\2\u0109"+
		"\u010a\3\2\2\2\u010a\u010b\5\4\3\2\u010b\u010c\7\b\2\2\u010c\u0110\3\2"+
		"\2\2\u010d\u010e\7\7\2\2\u010e\u0110\7\b\2\2\u010f\u0102\3\2\2\2\u010f"+
		"\u010d\3\2\2\2\u0110\r\3\2\2\2\u0111\u0112\5\22\n\2\u0112\u0113\7.\2\2"+
		"\u0113\u011c\3\2\2\2\u0114\u0115\5\22\n\2\u0115\u0117\7\n\2\2\u0116\u0118"+
		"\5\n\6\2\u0117\u0116\3\2\2\2\u0117\u0118\3\2\2\2\u0118\u0119\3\2\2\2\u0119"+
		"\u011a\7\13\2\2\u011a\u011c\3\2\2\2\u011b\u0111\3\2\2\2\u011b\u0114\3"+
		"\2\2\2\u011c\17\3\2\2\2\u011d\u011e\5\22\n\2\u011e\u011f\7/\2\2\u011f"+
		"\u0128\3\2\2\2\u0120\u0121\5\22\n\2\u0121\u0123\7\60\2\2\u0122\u0124\5"+
		"\n\6\2\u0123\u0122\3\2\2\2\u0123\u0124\3\2\2\2\u0124\u0125\3\2\2\2\u0125"+
		"\u0126\7\13\2\2\u0126\u0128\3\2\2\2\u0127\u011d\3\2\2\2\u0127\u0120\3"+
		"\2\2\2\u0128\21\3\2\2\2\u0129\u012a\7\64\2\2\u012a\u012c\7\61\2\2\u012b"+
		"\u0129\3\2\2\2\u012c\u012f\3\2\2\2\u012d\u012b\3\2\2\2\u012d\u012e\3\2"+
		"\2\2\u012e\u0130\3\2\2\2\u012f\u012d\3\2\2\2\u0130\u0131\7\64\2\2\u0131"+
		"\23\3\2\2\2\34\"\'\61\66?JZ\u0087\u0094\u009e\u00ab\u00b8\u00be\u00c1"+
		"\u00e5\u00e7\u00ed\u00f3\u00fd\u0108\u010f\u0117\u011b\u0123\u0127\u012d";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}