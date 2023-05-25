// Generated from c:\Users\baker\Documents\GitHub\desmoscript\desmoscript\grammar\DJson.g4 by ANTLR 4.9.2
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class DJsonLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.9.2", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, STRING=13, IDENTIFIER_SEGMENT=14, NUMBER=15;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", "T__8", 
			"T__9", "T__10", "T__11", "STRING", "ESC", "UNICODE", "HEX", "SAFECODEPOINT", 
			"IDENTIFIER_SEGMENT", "NUMBER", "INT", "EXP"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'{'", "'}'", "':'", "','", "'['", "']'", "'ds'", "'('", "')'", 
			"'true'", "'false'", "'null'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, "STRING", "IDENTIFIER_SEGMENT", "NUMBER"
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


	public DJsonLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "DJson.g4"; }

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
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\21\u008f\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\4\21\t\21\4\22"+
		"\t\22\4\23\t\23\4\24\t\24\4\25\t\25\4\26\t\26\3\2\3\2\3\3\3\3\3\4\3\4"+
		"\3\5\3\5\3\6\3\6\3\7\3\7\3\b\3\b\3\b\3\t\3\t\3\n\3\n\3\13\3\13\3\13\3"+
		"\13\3\13\3\f\3\f\3\f\3\f\3\f\3\f\3\r\3\r\3\r\3\r\3\r\3\16\3\16\3\16\7"+
		"\16T\n\16\f\16\16\16W\13\16\3\16\3\16\3\17\3\17\3\17\5\17^\n\17\3\20\3"+
		"\20\3\20\3\20\3\20\3\20\3\21\3\21\3\22\3\22\3\23\3\23\7\23l\n\23\f\23"+
		"\16\23o\13\23\3\24\5\24r\n\24\3\24\3\24\3\24\6\24w\n\24\r\24\16\24x\5"+
		"\24{\n\24\3\24\5\24~\n\24\3\25\3\25\3\25\7\25\u0083\n\25\f\25\16\25\u0086"+
		"\13\25\5\25\u0088\n\25\3\26\3\26\5\26\u008c\n\26\3\26\3\26\2\2\27\3\3"+
		"\5\4\7\5\t\6\13\7\r\b\17\t\21\n\23\13\25\f\27\r\31\16\33\17\35\2\37\2"+
		"!\2#\2%\20\'\21)\2+\2\3\2\13\13\2$$\61\61^^ddhhppttvv\u0080\u0080\5\2"+
		"\62;CHch\5\2\2!$$^^\4\2C\\c|\5\2\62;C\\c|\3\2\62;\3\2\63;\4\2GGgg\4\2"+
		"--//\2\u0093\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2"+
		"\2\2\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2"+
		"\27\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2%\3\2\2\2\2\'\3\2\2\2\3-\3\2\2"+
		"\2\5/\3\2\2\2\7\61\3\2\2\2\t\63\3\2\2\2\13\65\3\2\2\2\r\67\3\2\2\2\17"+
		"9\3\2\2\2\21<\3\2\2\2\23>\3\2\2\2\25@\3\2\2\2\27E\3\2\2\2\31K\3\2\2\2"+
		"\33P\3\2\2\2\35Z\3\2\2\2\37_\3\2\2\2!e\3\2\2\2#g\3\2\2\2%i\3\2\2\2\'q"+
		"\3\2\2\2)\u0087\3\2\2\2+\u0089\3\2\2\2-.\7}\2\2.\4\3\2\2\2/\60\7\177\2"+
		"\2\60\6\3\2\2\2\61\62\7<\2\2\62\b\3\2\2\2\63\64\7.\2\2\64\n\3\2\2\2\65"+
		"\66\7]\2\2\66\f\3\2\2\2\678\7_\2\28\16\3\2\2\29:\7f\2\2:;\7u\2\2;\20\3"+
		"\2\2\2<=\7*\2\2=\22\3\2\2\2>?\7+\2\2?\24\3\2\2\2@A\7v\2\2AB\7t\2\2BC\7"+
		"w\2\2CD\7g\2\2D\26\3\2\2\2EF\7h\2\2FG\7c\2\2GH\7n\2\2HI\7u\2\2IJ\7g\2"+
		"\2J\30\3\2\2\2KL\7p\2\2LM\7w\2\2MN\7n\2\2NO\7n\2\2O\32\3\2\2\2PU\7$\2"+
		"\2QT\5\35\17\2RT\5#\22\2SQ\3\2\2\2SR\3\2\2\2TW\3\2\2\2US\3\2\2\2UV\3\2"+
		"\2\2VX\3\2\2\2WU\3\2\2\2XY\7$\2\2Y\34\3\2\2\2Z]\7^\2\2[^\t\2\2\2\\^\5"+
		"\37\20\2][\3\2\2\2]\\\3\2\2\2^\36\3\2\2\2_`\7w\2\2`a\5!\21\2ab\5!\21\2"+
		"bc\5!\21\2cd\5!\21\2d \3\2\2\2ef\t\3\2\2f\"\3\2\2\2gh\n\4\2\2h$\3\2\2"+
		"\2im\t\5\2\2jl\t\6\2\2kj\3\2\2\2lo\3\2\2\2mk\3\2\2\2mn\3\2\2\2n&\3\2\2"+
		"\2om\3\2\2\2pr\7/\2\2qp\3\2\2\2qr\3\2\2\2rs\3\2\2\2sz\5)\25\2tv\7\60\2"+
		"\2uw\t\7\2\2vu\3\2\2\2wx\3\2\2\2xv\3\2\2\2xy\3\2\2\2y{\3\2\2\2zt\3\2\2"+
		"\2z{\3\2\2\2{}\3\2\2\2|~\5+\26\2}|\3\2\2\2}~\3\2\2\2~(\3\2\2\2\177\u0088"+
		"\7\62\2\2\u0080\u0084\t\b\2\2\u0081\u0083\t\7\2\2\u0082\u0081\3\2\2\2"+
		"\u0083\u0086\3\2\2\2\u0084\u0082\3\2\2\2\u0084\u0085\3\2\2\2\u0085\u0088"+
		"\3\2\2\2\u0086\u0084\3\2\2\2\u0087\177\3\2\2\2\u0087\u0080\3\2\2\2\u0088"+
		"*\3\2\2\2\u0089\u008b\t\t\2\2\u008a\u008c\t\n\2\2\u008b\u008a\3\2\2\2"+
		"\u008b\u008c\3\2\2\2\u008c\u008d\3\2\2\2\u008d\u008e\5)\25\2\u008e,\3"+
		"\2\2\2\17\2SU]kmqxz}\u0084\u0087\u008b\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}