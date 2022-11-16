import { Parser, Grammar } from "nearley";
import grammar from "./grammar/grammar.mjs"

const parser = new Parser(Grammar.fromCompiled(grammar));
parser.feed("test = 3.141592;");