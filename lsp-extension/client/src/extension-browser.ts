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

import * as desmoscript from "../../../desmoscript/src";
import {
  setupDesmosOutputToJson,
  setupDesmosPreview,
  setupLanguageFeatures,
} from "./extension";
import { ioVSCode } from "./io-vscode";

desmoscript.enableDebug();

let client: languageClient.LanguageClient;

export function activate(context: ExtensionContext) {
  vscode.window.showErrorMessage("THIS SHOULD DISPLAY FFS");

  console.log("does console.log show up here?");

  setupLanguageFeatures(context, ioVSCode);

  setupDesmosPreview(context, ioVSCode);
  setupDesmosOutputToJson(context, ioVSCode);
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
