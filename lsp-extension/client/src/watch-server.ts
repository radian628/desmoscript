import { IOInterface } from "../../../desmoscript/src/io/io";
import { ExtensionContext } from "vscode";
import * as vscode from "vscode";
import * as desmoscript from "../../../desmoscript/src/";
import { runWatchServer } from "../../../standalone-compiler/src/watch-server";

import getPort, { portNumbers } from "get-port";
import { URI } from "vscode-uri";
import {
  WatchServerDefiner,
  WatchServerInterface,
} from "./watch-server-interface";
import { ChildProcess } from "child_process";
import { makeChannel } from "./channel-node";
import { setupRPCCallee } from "../../../desmoscript/dist";
import { ioPathVSCode } from "./io-path-vscode";
import { RPCIfied } from "../../../desmoscript/dist/rpc/rpc";

let serverId = 0;

export function setupDesmosWatchServer(
  context: ExtensionContext,
  serverDefiner: RPCIfied<WatchServerDefiner>,
  serverProcess: ChildProcess
  // io: IOInterface
) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "desmoscript.watch",
      async (providedFilename) => {
        const filename = (
          providedFilename ?? vscode.window.activeTextEditor.document.uri
        ).toString();

        const host = "127.0.0.1";
        const port = await getPort({ port: portNumbers(3000, 3100) });

        const panel = vscode.window.createWebviewPanel(
          "desmoscript",
          "Desmoscript Server: " + filename.split(/\/|\\/g).slice(-1)[0],
          vscode.ViewColumn.One,
          { enableScripts: true, retainContextWhenHidden: true }
        );

        panel.webview.html = `<!DOCTYPE html>
      <html><head>
      
    <meta http-equiv="Content-Security-Policy" content="default-src 'unsafe-inline' 'unsafe-eval' https://www.desmos.com/ blob:; frame-src 'unsafe-inline' https://www.desmos.com/ blob:; font-src data:">
      </head>
		<style>
.highlight-error { 
	text-decoration: var(--vscode-editorError-foreground) wavy underline; 
}
.highlight-deemphasize { opacity: 0.6; }
.highlight-gutter {
	opacity: 0.6;
}
.highlight-message {
	color: var(--vscode-editorInfo-foreground);
}

pre {
	font-family: Consolas;
}

#error-messages {
	word-wrap: break-word;
	white-space: pre-wrap
}
		</style>
	  <body>
    <label>Annotate expressions with equivalent desmoscript <input type="checkbox" id="annotate-exprs"></input></label>
	  <p>Server is running at <a href="http://${host}:${port}">http://${host}:${port}</a></p>
	  <p>Close this window to shut down the server.</p>
	  <p>Status: <span id="status">Nothing has happened yet...</span></p>
	  <pre id="error-messages"></pre>
      <script>
		const errorMessages = document.getElementById("error-messages");
		const status = document.getElementById("status");
    const annotateExprs = document.getElementById("annotate-exprs");
    annotateExprs.onchange = evt => postMessage({ type: "set-option", key: "annotateExpressionsWithEquivalentDesmoscript", value: evt.checked });
    
		addEventListener("message", (event) => {
			if (event.data.type == "set-status") status.innerText = event.data.data;

			// TODO: FIX ERROR DELIMITERS
			if (event.data.type == "set-error-messages") {
				errorMessages.innerHTML = "";
				(event.data.data).split("\\0").forEach(e => {
					if (e.length == 0) return;
					const span = document.createElement("span");
					span.innerText = e.slice(e.match(/^\\w+\\u0001/g)?.[0].length ?? 0);
					const firstWord = e.match(/^\\w+/g)[0];
					if (firstWord != "end") {
						span.className = "highlight-" + firstWord;
					}
					errorMessages.appendChild(span)
				});
			}
		})

      </script>
      </body></html>`;
        let annotateExpressionsWithEquivalentDesmoscript = false;

        panel.webview.onDidReceiveMessage((e) => {
          if (e.data && e.data.type == "set-option") {
            if (e.data.key == "annotateExpressionsWithEquivalentDesmoscript") {
              annotateExpressionsWithEquivalentDesmoscript = e.data
                .value as boolean;
            }
          }
        });

        const myID = "watch-server-" + (serverId++).toString();

        setupRPCCallee<WatchServerInterface>(
          makeChannel(myID, serverProcess, serverProcess),
          {
            onCompileStart: () => {
              panel.webview.postMessage({
                type: "set-status",
                data: "Compiling...",
              });
            },
            onCompile: (output, duration) => {
              let webviewMessage = "";

              panel.webview.postMessage({
                type: "set-error-messages",
                data:
                  "\0end\x01" +
                  output.errors
                    .map((err) =>
                      desmoscript.formatError(
                        {
                          io: ioPathVSCode,
                          entry: filename,
                          sourceCode: output.sourceCode,
                          maxWidth: 80,
                          format: (str, { type }) => {
                            return `\0${type}\x01${str}\0end\x01`;
                          },
                        },
                        err
                      )
                    )
                    .join("\n\n"),
              });

              if (output.type == "success") {
                if (output.errors.length == 0) {
                  vscode.window.showInformationMessage(
                    `Successfully compiled '${filename}'.`
                  );
                  webviewMessage = "Compilation was successful!";
                } else {
                  vscode.window.showWarningMessage(
                    `Successfully compiled '${filename}' with ${output.errors.length} errors.`
                  );
                  webviewMessage =
                    "Code was generated, but there were errors in the current build.";
                }
              } else {
                vscode.window.showErrorMessage(
                  `Desmoscript compilation of '${filename}' failed.`
                );
                webviewMessage =
                  "There were errors in the build, and code was not generated.";
              }

              panel.webview.postMessage({
                type: "set-status",
                data: `${webviewMessage} (took ${duration}ms)`,
              });
            },
            onLoad(host, port) {
              vscode.window.showInformationMessage(
                `Successfully started desmoscript server at http://${host}:${port}`
              );
            },
          }
        );

        await serverDefiner.defineWatchServer(myID, {
          options: {
            annotateExpressionsWithEquivalentDesmoscript,
          },
          entryPoint: filename,
          port,
          host,
          errorContext: 2,
        });

        panel.onDidDispose(() => {
          serverDefiner.deleteWatchServer(myID);
          vscode.window.showInformationMessage(`Closed desmoscript server`);
        });
      }
    )
  );
}
