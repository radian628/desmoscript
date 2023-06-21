/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from "path-browserify";
import { URI, Utils as uriUtils } from "vscode-uri";
import {
  workspace,
  ExtensionContext,
  DocumentSemanticTokensProvider,
  SemanticTokensBuilder,
  SemanticTokensLegend,
  Range,
  Position,
} from "vscode";

import * as vscode from "vscode";
import * as languageClient from "vscode-languageclient/browser";

import * as desmoscript from "../../../desmoscript";
import {
  setupDesmosOutputToJson,
  setupDesmosPreview,
  setupSyntaxHighlighting,
} from "./extension";
import { ioBrowser } from "./io-browser";

desmoscript.enableDebug();

let client: languageClient.LanguageClient;

export function activate(context: ExtensionContext) {
  vscode.window.showErrorMessage("THIS SHOULD DISPLAY FFS");

  // The server is implemented in node
  const serverModule = vscode.Uri.joinPath(
    context.extensionUri,
    "server/out/server-browser.js"
  ).toString(true);

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const worker = new Worker(serverModule);

  worker.addEventListener("message", async (ev) => {
    console.log("WORKER MSG", ev);
    if (ev.data) {
      if (ev.data.type == "read-file") {
        worker.postMessage({
          type: "read-file",
          data: (
            await vscode.workspace.fs.readFile(URI.parse(ev.data.url))
          ).toString(),
          index: ev.data.index,
        });
      } else if (ev.data.type == "write-file") {
        vscode.workspace.fs.writeFile(URI.parse(ev.data.url), ev.data.data);
      }
    }
  });

  worker.addEventListener("error", (ev) => {
    console.log("WORKER ERROR", ev, ev.error);
  });

  // Options to control the language client
  const clientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ language: "desmo" }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      //fileEvents: workspace.createFileSystemWatcher("**/.clientrc"),
    },
    initializationOptions: {},
  };

  // Create the language client and start the client.
  client = new languageClient.LanguageClient(
    "languageServerExample",
    "Language Server Example",
    clientOptions,
    worker
  );

  // Start the client. This will also launch the server
  client.start();

  console.log("does console.log show up here?");

  setupSyntaxHighlighting(context, ioBrowser, (str) => str);

  setupDesmosPreview(context, ioBrowser, (str) => str);
  setupDesmosOutputToJson(context, ioBrowser, (str) => str);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}

type TEST1 = { asdf: string } & { asdf: any };

type TEST2 = TEST1["asdf"];
