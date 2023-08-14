import {
  DocumentSemanticTokensProvider,
  ExtensionContext,
  Range,
  SemanticTokensBuilder,
  SemanticTokensLegend,
  workspace,
} from "vscode";

import * as desmoscript from "../../../desmoscript/src/index";

import * as vscode from "vscode";
import { URI } from "vscode-uri";

export function setupLanguageFeatures(
  context: ExtensionContext,
  io: desmoscript.IOInterface
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
  const desmoscriptCompiler =
    desmoscript.compileDesmoscriptForLanguageSupport(io);

  (async () => {
    // syntax highlighting
    const provider: DocumentSemanticTokensProvider = {
      async provideDocumentSemanticTokens(document) {
        const tokensBuilder = new SemanticTokensBuilder(legend);
        const documentPath = document.uri.toString();
        desmoscriptCompiler.updateFile(documentPath, document.getText());

        try {
          await desmoscriptCompiler.highlightSyntax(
            documentPath,
            (token, start, end, type) => {
              const startpos = document.positionAt(start);
              const endpos = document.positionAt(end);
              if (startpos.line != endpos.line) return;

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
              err.stack
          );
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

  vscode.languages.registerColorProvider(
    { language: "desmo" },
    {
      async provideColorPresentations(color, context, token) {
        return [
          new vscode.ColorPresentation(
            `rgb(${Math.round(color.red * 256)}, ${Math.round(
              color.green * 256
            )}, ${Math.round(color.blue * 256)})`
          ),
        ];
      },

      async provideDocumentColors(document, token) {
        const documentPath = document.uri.toString();
        desmoscriptCompiler.updateFile(documentPath, document.getText());
        const colors: vscode.ColorInformation[] = [];

        await desmoscriptCompiler.getColors(
          documentPath,
          (start, end, color) => {
            colors.push(
              new vscode.ColorInformation(
                new vscode.Range(
                  document.positionAt(start),
                  document.positionAt(end)
                ),
                new vscode.Color(
                  color[0] / 256,
                  color[1] / 256,
                  color[2] / 256,
                  1
                )
              )
            );
          }
        );

        return colors;
      },
    }
  );

  vscode.languages.registerDefinitionProvider(
    { language: "desmo" },
    {
      async provideDefinition(document, position, token) {
        const def = await desmoscriptCompiler.goToDefinition(
          document.uri.toString(),
          document.offsetAt(position)
        );

        if (!def) return [];

        const dstDocURL = URI.parse(def.unit);
        const dstDocument = await vscode.workspace.openTextDocument(dstDocURL);

        return [
          new vscode.Location(
            dstDocURL,
            new Range(
              dstDocument.positionAt(def.start),
              dstDocument.positionAt(def.end)
            )
          ),
        ];
      },
    }
  );

  vscode.languages.registerHoverProvider(
    { language: "desmo" },
    {
      async provideHover(document, position, token) {
        try {
          const hoverResult = await desmoscriptCompiler.onHover(
            document.uri.toString(),
            document.offsetAt(position)
          );

          if (!hoverResult) return;
          new vscode.Hover({
            language: "desmo",
            value: hoverResult,
          });
        } catch (err) {
          return new vscode.Hover({
            language: "desmo",
            value: `${err?.toString()} ${(err as any)?.stack}`,
          });
        }
      },
    }
  );

  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("desmo");

  const updateDiagnostics = async (change: {
    document: vscode.TextDocument;
  }) => {
    if (change.document.languageId !== "desmo") return;

    const diagnostics: vscode.Diagnostic[] = [];

    await desmoscriptCompiler.getErrors(
      change.document.uri.toString(),
      (start, end, reason) => {
        diagnostics.push({
          severity: vscode.DiagnosticSeverity.Error,
          range: new vscode.Range(
            change.document.positionAt(start),
            change.document.positionAt(end)
          ),
          message: reason,
          source: "desmoscript",
        });
      }
    );

    diagnosticCollection.clear();
    diagnosticCollection.set(change.document.uri, diagnostics);
  };

  vscode.workspace.onDidChangeTextDocument(updateDiagnostics);
  vscode.workspace.onDidOpenTextDocument((doc) => {
    updateDiagnostics({ document: doc });
  });

  vscode.languages.registerDocumentFormattingEditProvider(
    {
      language: "desmo",
    },
    {
      async provideDocumentFormattingEdits(document, options, token) {
        const filepath = document.uri.toString();

        await desmoscriptCompiler.updateFile(filepath, document.getText());

        const text = document.getText();

        const start = document.positionAt(0);
        const end = document.positionAt(text.length);

        const fmtted = await desmoscriptCompiler.formatFile(filepath);

        if (!fmtted) return [];

        return [new vscode.TextEdit(new vscode.Range(start, end), fmtted)];
      },
    }
  );

  vscode.languages.registerCompletionItemProvider(
    { language: "desmo" },
    {
      async provideCompletionItems(document, position, token, context) {
        const items: vscode.CompletionItem[] = [];

        try {
          await desmoscriptCompiler.getAutocomplete(
            document.uri.toString(),
            document.offsetAt(position),
            (label, type) => {
              items.push({
                label,
                kind: {
                  variable: vscode.CompletionItemKind.Variable,
                  function: vscode.CompletionItemKind.Function,
                  scope: vscode.CompletionItemKind.Module,
                  macro: vscode.CompletionItemKind.Constructor,
                }[type],
              });
            }
          );
        } catch (err) {
          console.log("err during autocomplete", err);
        }

        return items;
      },
    }
  );
}

export function setupDesmosOutputToJson(
  context: ExtensionContext,
  io: desmoscript.IOInterface
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "desmoscript.outputToJson",
      async (providedFilename) => {
        const filename = (
          providedFilename ?? vscode.window.activeTextEditor.document.uri
        ).toString();

        const start = Date.now();
        const compilerOutput = await desmoscript.compileDesmoscript(filename, {
          unsavedFiles: new Map(),
          io,
          watchFiles: new Set(),
          options: {
            annotateExpressionsWithEquivalentDesmoscript: false,
          },
        });
        const end = Date.now();
        if (compilerOutput.type == "success") {
          vscode.window.showInformationMessage(
            `Desmos graphstate JSON copied to clipboard! (took ${
              end - start
            }ms)`
          );
          vscode.env.clipboard.writeText(JSON.stringify(compilerOutput.state));
        }
        if (compilerOutput.errors.length > 0) {
          vscode.window.showErrorMessage(
            `Desmoscript compiled with ${
              compilerOutput.errors.length
            } errors:\n${compilerOutput.errors
              .map((err) =>
                desmoscript.formatError(
                  {
                    sourceCode: compilerOutput.sourceCode,
                    entry: filename,
                    maxWidth: 60,
                    format: (str) => str,
                    io,
                  },
                  err
                )
              )
              .join("\n")}`
          );
        }
      }
    )
  );
}

export function setupDesmosPreview(
  context: ExtensionContext,
  io: desmoscript.IOInterface
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "desmoscript.run",
      async (providedFilename) => {
        try {
          const filename = (
            providedFilename ?? vscode.window.activeTextEditor.document.uri
          ).toString();

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

        window.addEventListener("message", event => {
          console.log("RECEIVED MESSAGE", event.data);
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
                options: {
                  annotateExpressionsWithEquivalentDesmoscript: false,
                },
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
      }
    )
  );
}
