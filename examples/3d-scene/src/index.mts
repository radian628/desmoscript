import * as desmoscript from "desmoscript";
import { DesmoscriptContext, Identifier, MacroDefinition, Scope, ScopedASTExpr, ScopeInfo } from "desmoscript/dist/semantic-analysis-types.mjs";
import { ASTFunctionCall, ASTType } from "desmoscript/dist/ast.mjs";

const entryPoint = "./desmo/main.desmo";

desmoscript.createDesmoscriptWatchServer(entryPoint);