import { CharStreams, CommonTokenStream } from "antlr4ts";
import { DesmoscriptLexer } from "./grammar/DesmoscriptLexer";
import { DesmoscriptParser } from "./grammar/DesmoscriptParser";
import { DesmoscriptASTBuilder } from "./parse.mjs";
import * as ds from "./ast.mjs";
import { DesmoscriptError } from "./semantic-analysis-types.mjs";
import { compileDesmoscriptScopeTree } from "./compile.mjs";
import * as fs from "fs/promises";
import { semanticallyAnalyzeDesmoscript } from "./semantic-analysis.mjs";
import { makeDefaultDesmoscriptContext } from "./builtins.mjs";

process.on("unhandledRejection", (reason, p) => {
    //@ts-ignore
    console.log("Unhandled rejection: ", reason);
});

await compileDesmoscriptFromFile("./test.desmo", "out.json");

async function compileDesmoscriptFromFile(infile: string, outfile: string) {

    const input = (await fs.readFile(infile)).toString();
    try {
        console.log("Parsing...");
        // Create the lexer and parser
        let lexer = new DesmoscriptLexer(CharStreams.fromString(input));
        let tokenStream = new CommonTokenStream(lexer);
        let parser = new DesmoscriptParser(tokenStream);
    
        // Parse the input, where `compilationUnit` is whatever entry point you defined
        let tree = parser.expressionList();
    
        //console.log("tree:", tree);
    
        const astBuilder = new DesmoscriptASTBuilder(infile);
    
        const ast = astBuilder.visit(tree);
    
        console.log("Analyzing...");
        const analyzedAST = await semanticallyAnalyzeDesmoscript(ast, makeDefaultDesmoscriptContext());
    
        console.log("Compiling...");
        const compiledAST = compileDesmoscriptScopeTree(analyzedAST);
    
        console.log("Writing...");
        await fs.writeFile(outfile, JSON.stringify(compiledAST));
        console.log("Done!");
    } catch (err) {
        const dserr: DesmoscriptError = err as DesmoscriptError;
        if (!dserr.expr) console.error(`err: ${JSON.stringify(dserr)}`);
        console.error(`line ${dserr.expr.line}; col ${dserr.expr.col}; ${dserr.reason}`);
    }
}
