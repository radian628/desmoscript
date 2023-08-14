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
  setupLanguageFeatures,
} from "./extension";
import { URI } from "vscode-uri";
import { setupDesmosWatchServer } from "./watch-server";
import { ioVSCode } from "./io-vscode";

desmoscript.enableDebug();

let client: languageClient.LanguageClient;

export function activate(context: ExtensionContext) {
  setupLanguageFeatures(context, ioVSCode);

  setupDesmosPreview(context, ioVSCode);

  setupDesmosOutputToJson(context, ioVSCode);

  setupDesmosWatchServer(context, ioVSCode);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
