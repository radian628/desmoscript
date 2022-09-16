import { CharStreams, CommonTokenStream } from "antlr4ts";
import { DesmoscriptLexer } from "./grammar/DesmoscriptLexer";
import { DesmoscriptParser } from "./grammar/DesmoscriptParser";
import { DesmoscriptASTBuilder } from "./parse.mjs";
import * as ds from "./ast.mjs";
import { DesmoscriptError } from "./semantic-analysis-types.mjs";
import { compileDesmoscriptScopeTree } from "./compile.mjs";
import * as fs from "fs/promises";
import { getDesmoscriptScopes, semanticallyAnalyzeDesmoscript } from "./semantic-analysis.mjs";
import { makeDefaultDesmoscriptContext } from "./builtins.mjs";

process.on("unhandledRejection", (reason, p) => {
    //@ts-ignore
    console.log("Unhandled rejection: ", reason);
});

// export async function compileDesmoscriptToString(code: string, filename: string): Promise<string> {
//     try {
//         let lexer = new DesmoscriptLexer(CharStreams.fromString(code));
//         let tokenStream = new CommonTokenStream(lexer);
//         let parser = new DesmoscriptParser(tokenStream);
    
//         // Parse the input, where `compilationUnit` is whatever entry point you defined
//         let tree = parser.expressionList();
    
//         //console.log("tree:", tree);
    
//         const astBuilder = new DesmoscriptASTBuilder(filename);
    
//         const ast = astBuilder.visit(tree);
//         const analyzedAST = await semanticallyAnalyzeDesmoscript(ast, makeDefaultDesmoscriptContext());
//         const compiledAST = compileDesmoscriptScopeTree(analyzedAST);
//         return JSON.stringify(compiledAST);
//     } catch (err) {
//         const dserr: DesmoscriptError = err as DesmoscriptError;
//         if (!dserr.expr) console.error(`err: ${JSON.stringify(dserr)}`);
//         console.error(`line ${dserr.expr.line}; col ${dserr.expr.col}; ${dserr.reason}`);
//         return "";
//     }
// }

export async function compileDesmoscriptFromFile(infile: string, outfile: string, options?: {
    logProgress?: boolean
}) {

    const input = (await fs.readFile(infile)).toString();
    try {
        if (options?.logProgress) console.log("Parsing...");
        // // Create the lexer and parser
        // let lexer = new DesmoscriptLexer(CharStreams.fromString(input));
        // let tokenStream = new CommonTokenStream(lexer);
        // let parser = new DesmoscriptParser(tokenStream);
    
        // // Parse the input, where `compilationUnit` is whatever entry point you defined
        // let tree = parser.expressionList();
    
        // //console.log("tree:", tree);
    
        // const astBuilder = new DesmoscriptASTBuilder(infile);
    
        // const ast = astBuilder.visit(tree);
    
        // if (options?.logProgress) console.log("Analyzing...");
        // const analyzedAST = await semanticallyAnalyzeDesmoscript(ast, makeDefaultDesmoscriptContext());
        const analyzedAST = (await getDesmoscriptScopes(infile));
    
        if (options?.logProgress) console.log("Compiling...");
        const compiledAST = compileDesmoscriptScopeTree(analyzedAST);
    
        if (options?.logProgress) console.log("Writing...");
        await fs.writeFile(outfile, JSON.stringify(compiledAST));
        if (options?.logProgress) console.log("Done!");
    } catch (err) {
        const dserr: DesmoscriptError = err as DesmoscriptError;
        if (!dserr.expr) console.error(`err: ${JSON.stringify(dserr)}`);
        console.error(`line ${dserr.expr.line}; col ${dserr.expr.col}; ${dserr.reason}`);
    }
}
