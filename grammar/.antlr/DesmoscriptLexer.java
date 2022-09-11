// Generated from /Users/adrian/Documents/GitHub/desmoscript/grammar/Desmoscript.g4 by ANTLR 4.9.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class DesmoscriptLexer extends Lexer {
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
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
			"T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", "T__16", 
			"T__17", "T__18", "T__19", "T__20", "T__21", "T__22", "T__23", "T__24", 
			"T__25", "T__26", "T__27", "T__28", "T__29", "T__30", "T__31", "T__32", 
			"T__33", "T__34", "T__35", "T__36", "T__37", "T__38", "T__39", "T__40", 
			"T__41", "T__42", "T__43", "T__44", "T__45", "T__46", "STRING", "ESC", 
			"UNICODE", "HEX", "SAFECODEPOINT", "NUMBER", "INT", "EXP", "IDENTIFIER_SEGMENT", 
			"WS"
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


	public DesmoscriptLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Desmoscript.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\65\u0163\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\4\27\t\27\4\30\t\30\4\31"+
		"\t\31\4\32\t\32\4\33\t\33\4\34\t\34\4\35\t\35\4\36\t\36\4\37\t\37\4 \t"+
		" \4!\t!\4\"\t\"\4#\t#\4$\t$\4%\t%\4&\t&\4\'\t\'\4(\t(\4)\t)\4*\t*\4+\t"+
		"+\4,\t,\4-\t-\4.\t.\4/\t/\4\60\t\60\4\61\t\61\4\62\t\62\4\63\t\63\4\64"+
		"\t\64\4\65\t\65\4\66\t\66\4\67\t\67\48\t8\49\t9\4:\t:\3\2\3\2\3\3\3\3"+
		"\3\4\3\4\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\b\3\t\3\t\3\n\3\n\3\13\3\13"+
		"\3\13\3\13\3\13\3\f\3\f\3\f\3\f\3\f\3\f\3\r\3\r\3\r\3\r\3\r\3\16\3\16"+
		"\3\17\3\17\3\17\3\17\3\17\3\17\3\17\3\20\3\20\3\20\3\21\3\21\3\22\3\22"+
		"\3\22\3\22\3\22\3\22\3\22\3\22\3\22\3\23\3\23\3\23\3\23\3\24\3\24\3\25"+
		"\3\25\3\26\3\26\3\27\3\27\3\30\3\30\3\31\3\31\3\32\3\32\3\33\3\33\3\33"+
		"\3\34\3\34\3\35\3\35\3\36\3\36\3\36\3\37\3\37\3\37\3 \3 \3 \3!\3!\3!\3"+
		"!\3\"\3\"\3\"\3\"\3\"\3\"\3\"\3\"\3#\3#\3#\3#\3#\3#\3#\3#\3#\3$\3$\3$"+
		"\3%\3%\3%\3%\3%\3%\3%\3%\3%\3%\3%\3&\3&\3&\3&\3&\3&\3\'\3\'\3\'\3(\3("+
		"\3(\3)\3)\3)\3)\3)\3*\3*\3*\3*\3*\3*\3+\3+\3+\3,\3,\3,\3-\3-\3-\3.\3."+
		"\3.\3.\3/\3/\3/\3\60\3\60\3\61\3\61\3\61\7\61\u0121\n\61\f\61\16\61\u0124"+
		"\13\61\3\61\3\61\3\62\3\62\3\62\5\62\u012b\n\62\3\63\3\63\3\63\3\63\3"+
		"\63\3\63\3\64\3\64\3\65\3\65\3\66\5\66\u0138\n\66\3\66\3\66\3\66\6\66"+
		"\u013d\n\66\r\66\16\66\u013e\5\66\u0141\n\66\3\66\5\66\u0144\n\66\3\67"+
		"\3\67\3\67\7\67\u0149\n\67\f\67\16\67\u014c\13\67\5\67\u014e\n\67\38\3"+
		"8\58\u0152\n8\38\38\39\39\79\u0158\n9\f9\169\u015b\139\3:\6:\u015e\n:"+
		"\r:\16:\u015f\3:\3:\2\2;\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f"+
		"\27\r\31\16\33\17\35\20\37\21!\22#\23%\24\'\25)\26+\27-\30/\31\61\32\63"+
		"\33\65\34\67\359\36;\37= ?!A\"C#E$G%I&K\'M(O)Q*S+U,W-Y.[/]\60_\61a\62"+
		"c\2e\2g\2i\2k\63m\2o\2q\64s\65\3\2\f\n\2$$\61\61^^ddhhppttvv\5\2\62;C"+
		"Hch\5\2\2!$$^^\3\2\62;\3\2\63;\4\2GGgg\4\2--//\4\2C\\c|\5\2\62;C\\c|\5"+
		"\2\13\f\17\17\"\"\2\u0168\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2"+
		"\2\2\2\13\3\2\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2"+
		"\25\3\2\2\2\2\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3"+
		"\2\2\2\2!\3\2\2\2\2#\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\2)\3\2\2\2\2+\3\2"+
		"\2\2\2-\3\2\2\2\2/\3\2\2\2\2\61\3\2\2\2\2\63\3\2\2\2\2\65\3\2\2\2\2\67"+
		"\3\2\2\2\29\3\2\2\2\2;\3\2\2\2\2=\3\2\2\2\2?\3\2\2\2\2A\3\2\2\2\2C\3\2"+
		"\2\2\2E\3\2\2\2\2G\3\2\2\2\2I\3\2\2\2\2K\3\2\2\2\2M\3\2\2\2\2O\3\2\2\2"+
		"\2Q\3\2\2\2\2S\3\2\2\2\2U\3\2\2\2\2W\3\2\2\2\2Y\3\2\2\2\2[\3\2\2\2\2]"+
		"\3\2\2\2\2_\3\2\2\2\2a\3\2\2\2\2k\3\2\2\2\2q\3\2\2\2\2s\3\2\2\2\3u\3\2"+
		"\2\2\5w\3\2\2\2\7y\3\2\2\2\t{\3\2\2\2\13}\3\2\2\2\r\177\3\2\2\2\17\u0081"+
		"\3\2\2\2\21\u0084\3\2\2\2\23\u0086\3\2\2\2\25\u0088\3\2\2\2\27\u008d\3"+
		"\2\2\2\31\u0093\3\2\2\2\33\u0098\3\2\2\2\35\u009a\3\2\2\2\37\u00a1\3\2"+
		"\2\2!\u00a4\3\2\2\2#\u00a6\3\2\2\2%\u00af\3\2\2\2\'\u00b3\3\2\2\2)\u00b5"+
		"\3\2\2\2+\u00b7\3\2\2\2-\u00b9\3\2\2\2/\u00bb\3\2\2\2\61\u00bd\3\2\2\2"+
		"\63\u00bf\3\2\2\2\65\u00c1\3\2\2\2\67\u00c4\3\2\2\29\u00c6\3\2\2\2;\u00c8"+
		"\3\2\2\2=\u00cb\3\2\2\2?\u00ce\3\2\2\2A\u00d1\3\2\2\2C\u00d5\3\2\2\2E"+
		"\u00dd\3\2\2\2G\u00e6\3\2\2\2I\u00e9\3\2\2\2K\u00f4\3\2\2\2M\u00fa\3\2"+
		"\2\2O\u00fd\3\2\2\2Q\u0100\3\2\2\2S\u0105\3\2\2\2U\u010b\3\2\2\2W\u010e"+
		"\3\2\2\2Y\u0111\3\2\2\2[\u0114\3\2\2\2]\u0118\3\2\2\2_\u011b\3\2\2\2a"+
		"\u011d\3\2\2\2c\u0127\3\2\2\2e\u012c\3\2\2\2g\u0132\3\2\2\2i\u0134\3\2"+
		"\2\2k\u0137\3\2\2\2m\u014d\3\2\2\2o\u014f\3\2\2\2q\u0155\3\2\2\2s\u015d"+
		"\3\2\2\2uv\7}\2\2v\4\3\2\2\2wx\7\177\2\2x\6\3\2\2\2yz\7<\2\2z\b\3\2\2"+
		"\2{|\7.\2\2|\n\3\2\2\2}~\7]\2\2~\f\3\2\2\2\177\u0080\7_\2\2\u0080\16\3"+
		"\2\2\2\u0081\u0082\7f\2\2\u0082\u0083\7u\2\2\u0083\20\3\2\2\2\u0084\u0085"+
		"\7*\2\2\u0085\22\3\2\2\2\u0086\u0087\7+\2\2\u0087\24\3\2\2\2\u0088\u0089"+
		"\7v\2\2\u0089\u008a\7t\2\2\u008a\u008b\7w\2\2\u008b\u008c\7g\2\2\u008c"+
		"\26\3\2\2\2\u008d\u008e\7h\2\2\u008e\u008f\7c\2\2\u008f\u0090\7n\2\2\u0090"+
		"\u0091\7u\2\2\u0091\u0092\7g\2\2\u0092\30\3\2\2\2\u0093\u0094\7p\2\2\u0094"+
		"\u0095\7w\2\2\u0095\u0096\7n\2\2\u0096\u0097\7n\2\2\u0097\32\3\2\2\2\u0098"+
		"\u0099\7B\2\2\u0099\34\3\2\2\2\u009a\u009b\7k\2\2\u009b\u009c\7o\2\2\u009c"+
		"\u009d\7r\2\2\u009d\u009e\7q\2\2\u009e\u009f\7t\2\2\u009f\u00a0\7v\2\2"+
		"\u00a0\36\3\2\2\2\u00a1\u00a2\7c\2\2\u00a2\u00a3\7u\2\2\u00a3 \3\2\2\2"+
		"\u00a4\u00a5\7=\2\2\u00a5\"\3\2\2\2\u00a6\u00a7\7u\2\2\u00a7\u00a8\7g"+
		"\2\2\u00a8\u00a9\7v\2\2\u00a9\u00aa\7v\2\2\u00aa\u00ab\7k\2\2\u00ab\u00ac"+
		"\7p\2\2\u00ac\u00ad\7i\2\2\u00ad\u00ae\7u\2\2\u00ae$\3\2\2\2\u00af\u00b0"+
		"\7h\2\2\u00b0\u00b1\7q\2\2\u00b1\u00b2\7t\2\2\u00b2&\3\2\2\2\u00b3\u00b4"+
		"\7?\2\2\u00b4(\3\2\2\2\u00b5\u00b6\7^\2\2\u00b6*\3\2\2\2\u00b7\u00b8\7"+
		",\2\2\u00b8,\3\2\2\2\u00b9\u00ba\7\61\2\2\u00ba.\3\2\2\2\u00bb\u00bc\7"+
		"\'\2\2\u00bc\60\3\2\2\2\u00bd\u00be\7-\2\2\u00be\62\3\2\2\2\u00bf\u00c0"+
		"\7/\2\2\u00c0\64\3\2\2\2\u00c1\u00c2\7?\2\2\u00c2\u00c3\7?\2\2\u00c3\66"+
		"\3\2\2\2\u00c4\u00c5\7@\2\2\u00c58\3\2\2\2\u00c6\u00c7\7>\2\2\u00c7:\3"+
		"\2\2\2\u00c8\u00c9\7@\2\2\u00c9\u00ca\7?\2\2\u00ca<\3\2\2\2\u00cb\u00cc"+
		"\7>\2\2\u00cc\u00cd\7?\2\2\u00cd>\3\2\2\2\u00ce\u00cf\7\60\2\2\u00cf\u00d0"+
		"\7\60\2\2\u00d0@\3\2\2\2\u00d1\u00d2\7u\2\2\u00d2\u00d3\7w\2\2\u00d3\u00d4"+
		"\7o\2\2\u00d4B\3\2\2\2\u00d5\u00d6\7r\2\2\u00d6\u00d7\7t\2\2\u00d7\u00d8"+
		"\7q\2\2\u00d8\u00d9\7f\2\2\u00d9\u00da\7w\2\2\u00da\u00db\7e\2\2\u00db"+
		"\u00dc\7v\2\2\u00dcD\3\2\2\2\u00dd\u00de\7k\2\2\u00de\u00df\7p\2\2\u00df"+
		"\u00e0\7v\2\2\u00e0\u00e1\7g\2\2\u00e1\u00e2\7i\2\2\u00e2\u00e3\7t\2\2"+
		"\u00e3\u00e4\7c\2\2\u00e4\u00e5\7n\2\2\u00e5F\3\2\2\2\u00e6\u00e7\7v\2"+
		"\2\u00e7\u00e8\7q\2\2\u00e8H\3\2\2\2\u00e9\u00ea\7f\2\2\u00ea\u00eb\7"+
		"g\2\2\u00eb\u00ec\7t\2\2\u00ec\u00ed\7k\2\2\u00ed\u00ee\7x\2\2\u00ee\u00ef"+
		"\7c\2\2\u00ef\u00f0\7v\2\2\u00f0\u00f1\7k\2\2\u00f1\u00f2\7x\2\2\u00f2"+
		"\u00f3\7g\2\2\u00f3J\3\2\2\2\u00f4\u00f5\7o\2\2\u00f5\u00f6\7c\2\2\u00f6"+
		"\u00f7\7e\2\2\u00f7\u00f8\7t\2\2\u00f8\u00f9\7q\2\2\u00f9L\3\2\2\2\u00fa"+
		"\u00fb\7h\2\2\u00fb\u00fc\7p\2\2\u00fcN\3\2\2\2\u00fd\u00fe\7p\2\2\u00fe"+
		"\u00ff\7u\2\2\u00ffP\3\2\2\2\u0100\u0101\7y\2\2\u0101\u0102\7k\2\2\u0102"+
		"\u0103\7v\2\2\u0103\u0104\7j\2\2\u0104R\3\2\2\2\u0105\u0106\7o\2\2\u0106"+
		"\u0107\7c\2\2\u0107\u0108\7v\2\2\u0108\u0109\7e\2\2\u0109\u010a\7j\2\2"+
		"\u010aT\3\2\2\2\u010b\u010c\7?\2\2\u010c\u010d\7@\2\2\u010dV\3\2\2\2\u010e"+
		"\u010f\7/\2\2\u010f\u0110\7@\2\2\u0110X\3\2\2\2\u0111\u0112\7*\2\2\u0112"+
		"\u0113\7+\2\2\u0113Z\3\2\2\2\u0114\u0115\7#\2\2\u0115\u0116\7*\2\2\u0116"+
		"\u0117\7+\2\2\u0117\\\3\2\2\2\u0118\u0119\7#\2\2\u0119\u011a\7*\2\2\u011a"+
		"^\3\2\2\2\u011b\u011c\7\60\2\2\u011c`\3\2\2\2\u011d\u0122\7$\2\2\u011e"+
		"\u0121\5c\62\2\u011f\u0121\5i\65\2\u0120\u011e\3\2\2\2\u0120\u011f\3\2"+
		"\2\2\u0121\u0124\3\2\2\2\u0122\u0120\3\2\2\2\u0122\u0123\3\2\2\2\u0123"+
		"\u0125\3\2\2\2\u0124\u0122\3\2\2\2\u0125\u0126\7$\2\2\u0126b\3\2\2\2\u0127"+
		"\u012a\7^\2\2\u0128\u012b\t\2\2\2\u0129\u012b\5e\63\2\u012a\u0128\3\2"+
		"\2\2\u012a\u0129\3\2\2\2\u012bd\3\2\2\2\u012c\u012d\7w\2\2\u012d\u012e"+
		"\5g\64\2\u012e\u012f\5g\64\2\u012f\u0130\5g\64\2\u0130\u0131\5g\64\2\u0131"+
		"f\3\2\2\2\u0132\u0133\t\3\2\2\u0133h\3\2\2\2\u0134\u0135\n\4\2\2\u0135"+
		"j\3\2\2\2\u0136\u0138\7/\2\2\u0137\u0136\3\2\2\2\u0137\u0138\3\2\2\2\u0138"+
		"\u0139\3\2\2\2\u0139\u0140\5m\67\2\u013a\u013c\7\60\2\2\u013b\u013d\t"+
		"\5\2\2\u013c\u013b\3\2\2\2\u013d\u013e\3\2\2\2\u013e\u013c\3\2\2\2\u013e"+
		"\u013f\3\2\2\2\u013f\u0141\3\2\2\2\u0140\u013a\3\2\2\2\u0140\u0141\3\2"+
		"\2\2\u0141\u0143\3\2\2\2\u0142\u0144\5o8\2\u0143\u0142\3\2\2\2\u0143\u0144"+
		"\3\2\2\2\u0144l\3\2\2\2\u0145\u014e\7\62\2\2\u0146\u014a\t\6\2\2\u0147"+
		"\u0149\t\5\2\2\u0148\u0147\3\2\2\2\u0149\u014c\3\2\2\2\u014a\u0148\3\2"+
		"\2\2\u014a\u014b\3\2\2\2\u014b\u014e\3\2\2\2\u014c\u014a\3\2\2\2\u014d"+
		"\u0145\3\2\2\2\u014d\u0146\3\2\2\2\u014en\3\2\2\2\u014f\u0151\t\7\2\2"+
		"\u0150\u0152\t\b\2\2\u0151\u0150\3\2\2\2\u0151\u0152\3\2\2\2\u0152\u0153"+
		"\3\2\2\2\u0153\u0154\5m\67\2\u0154p\3\2\2\2\u0155\u0159\t\t\2\2\u0156"+
		"\u0158\t\n\2\2\u0157\u0156\3\2\2\2\u0158\u015b\3\2\2\2\u0159\u0157\3\2"+
		"\2\2\u0159\u015a\3\2\2\2\u015ar\3\2\2\2\u015b\u0159\3\2\2\2\u015c\u015e"+
		"\t\13\2\2\u015d\u015c\3\2\2\2\u015e\u015f\3\2\2\2\u015f\u015d\3\2\2\2"+
		"\u015f\u0160\3\2\2\2\u0160\u0161\3\2\2\2\u0161\u0162\b:\2\2\u0162t\3\2"+
		"\2\2\20\2\u0120\u0122\u012a\u0137\u013e\u0140\u0143\u014a\u014d\u0151"+
		"\u0157\u0159\u015f\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}