/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from "node:path";
import * as fs from "node:fs/promises";
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
import * as languageClient from "vscode-languageclient/node";

import * as desmoscript from "../../../desmoscript/src/";
import {
  setupDesmosOutputToJson,
  setupDesmosPreview,
  setupSyntaxHighlighting,
} from "./extension";
import { URI } from "vscode-uri";
import { ioNode } from "./io-node";
import { setupDesmosWatchServer } from "./watch-server";

desmoscript.enableDebug();

let client: languageClient.LanguageClient;

export function activate(context: ExtensionContext) {
  const serverModule = context.asAbsolutePath(
    path.join("server", "out", "server-node.js")
  );

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  const serverOptions = {
    run: { module: serverModule, transport: languageClient.TransportKind.ipc },
    debug: {
      module: serverModule,
      transport: languageClient.TransportKind.ipc,
    },
  };

  // Options to control the language client
  const clientOptions = {
    // Register the server for plain text documents
    documentSelector: [{ scheme: "file", language: "desmo" }],
    synchronize: {
      // Notify the server about file changes to '.clientrc files contained in the workspace
      fileEvents: workspace.createFileSystemWatcher("**/.clientrc"),
    },
  };

  // Create the language client and start the client.
  client = new languageClient.LanguageClient(
    "languageServerExample",
    "Language Server Example",
    serverOptions,
    clientOptions
  );

  // Start the client. This will also launch the server
  client.start();

  setupSyntaxHighlighting(context, ioNode, (str) => URI.parse(str).fsPath);

  setupDesmosPreview(context, ioNode, (str) => URI.parse(str).fsPath);

  setupDesmosOutputToJson(context, ioNode, (str) => URI.parse(str).fsPath);

  setupDesmosWatchServer(context, ioNode, (str) => URI.parse(str).fsPath);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
