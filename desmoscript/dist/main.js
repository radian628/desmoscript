import * as nearley from "nearley";
import grammar from "./grammar/grammar";
const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
parser.feed("test = 3.141592;");
