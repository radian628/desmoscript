import {
  DocumentSemanticTokensProvider,
  ExtensionContext,
  Range,
  SemanticTokensBuilder,
  SemanticTokensLegend,
  workspace,
} from "vscode";

import * as desmoscript from "desmoscript";

import * as vscode from "vscode";
import { IOInterface } from "desmoscript/dist/io/io";

export function setupSyntaxHighlighting(
  context: ExtensionContext,
  io: IOInterface,
  formatPath: (path: string) => string
) {
  const tokenTypes = [
    "variable",
    "string",
    "operator",
    "comment",
    "number",
    "keyword",
    "bracket",
    "function",
    "macro",
    "other",
    "namespace",
    "type",
    "enumMember",
  ];
  const tokenModifiers = ["declaration", "documentation"];
  const legend = new SemanticTokensLegend(tokenTypes, tokenModifiers);
  (async () => {
    const desmoscriptCompiler =
      desmoscript.compileDesmoscriptForLanguageSupport(io);

    // syntax highlighting
    const provider: DocumentSemanticTokensProvider = {
      async provideDocumentSemanticTokens(document) {
        const tokensBuilder = new SemanticTokensBuilder(legend);
        const documentPath = formatPath(document.uri.toString());
        desmoscriptCompiler.updateFile(documentPath, document.getText());

        try {
          await desmoscriptCompiler.highlightSyntax(
            documentPath,
            (token, start, end, type) => {
              const startpos = document.positionAt(start);
              const endpos = document.positionAt(end);
              if (startpos.line != endpos.line) return;

              console.log("got here");
              tokensBuilder.push(new Range(startpos, endpos), type);
            }
          );
        } catch (err) {
          vscode.window.showErrorMessage(
            "error while highlighting syntax " +
              JSON.stringify(err) +
              " err as str " +
              err +
              " err.toString() " +
              err.toString() +
              " TRACE: " +
              err.trace
          );
          //console.log("lemme guess this thing cant handle newlines", err);
        }

        try {
          const builtTokens = tokensBuilder.build();
          console.log("builtTokens made");
          return builtTokens;
        } catch (err) {
          vscode.window.showErrorMessage(
            "error building tokens " + JSON.stringify(err)
          );
        }
      },
    };

    context.subscriptions.push(
      vscode.languages.registerDocumentSemanticTokensProvider(
        { language: "desmo" },
        provider,
        legend
      )
    );
  })();
}

export function setupDesmosPreview(
  context: ExtensionContext,
  io: IOInterface,
  formatPath: (str: string) => string
) {
  context.subscriptions.push(
    vscode.commands.registerCommand("desmoscript.run", async () => {
      try {
        const filename = formatPath(
          vscode.window.activeTextEditor.document.uri.toString()
        );
        console.log("using filename", filename);
        const panel = vscode.window.createWebviewPanel(
          "desmoscript",
          "Desmos: " + filename.split(/\/|\\/g).slice(-1)[0],
          vscode.ViewColumn.One,
          { enableScripts: true, retainContextWhenHidden: true }
        );

        panel.webview.html = `<!DOCTYPE html>
      <html><head>
      
    <meta http-equiv="Content-Security-Policy" content="default-src 'unsafe-inline' 'unsafe-eval' https://www.desmos.com/ blob:; frame-src 'unsafe-inline' https://www.desmos.com/ blob:; font-src data:">
      </head><body>
      <div style="width: 100vw; height: 100vh;" id="calculator"></div>
      <button style="position: absolute; bottom: 10px; right: 10px; padding: 20px;" id="recompile">Recompile</button>
      <script src="https://www.desmos.com/api/v1.9/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6"></script>
      <script>
        let elt = document.getElementById("calculator");
        let calc = Desmos.GraphingCalculator(elt);
        //calc.setExpression({ id: "696969", latex: "y=x" })

        window.addEventListener("message", event => {
          calc.setState(event.data);
        });

        const vscode = acquireVsCodeApi();

        let recompile = document.getElementById("recompile");
        recompile.onclick = () => vscode.postMessage("recompile");

      </script>
      </body></html>`;

        const compile = async () => {
          const start = Date.now();
          const compilerOutput = await desmoscript.compileDesmoscript(
            filename,
            {
              unsavedFiles: new Map(),
              io,
              watchFiles: new Set(),
            }
          );
          const end = Date.now();
          console.log(`Compilation took ${end - start} milliseconds!`);
          if (compilerOutput.errors.length > 0) {
            vscode.window.showErrorMessage(
              JSON.stringify(compilerOutput.errors)
            );
          }
          console.log("complier output: ", compilerOutput);
          console.log(
            "sourcecode files: ",
            Array.from(compilerOutput.sourceCode.keys())
          );
          return compilerOutput;
        };

        let result = await compile();

        const sendToDesmos = async () => {
          result = await compile();
          if (result.type == "success") {
            panel.webview.postMessage(result.state);
          }
        };

        panel.webview.onDidReceiveMessage((e) => {
          if (e == "recompile") {
            sendToDesmos();
          }
        });

        sendToDesmos();
      } catch (err) {
        vscode.window.showErrorMessage(
          "ERROR CAUGHT: " + err.toString() + " stacktrace: " + err.stack
        );
      }
    })
  );
}
