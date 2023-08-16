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
import { attachLanguageServer } from "./attach-langserver";
import { LanguageSupportFeatures } from "../../../desmoscript/src/combined-functionality/language-support-compiler";
import { makeBrowserChannelInMain } from "./browser-channel";
import { asyncSubsetIOInterface } from "./async-io";

let client: languageClient.LanguageClient;
console.log("does console.log show up here?");

// @ts-expect-error getting dynamic imports owrking
globalThis.require = (src: string) => import(src);

export function activate(context: ExtensionContext) {
  vscode.window.showErrorMessage("THIS SHOULD DISPLAY");

  console.log("does console.log show up here?");

  const serverPath = vscode.Uri.joinPath(
    context.extensionUri,
    "client/out/server-browser.js"
  ).toString(true);

  const langserver = new Worker(serverPath);

  desmoscript.setupRPCCallee(
    makeBrowserChannelInMain("io", langserver),
    asyncSubsetIOInterface
  );

  attachLanguageServer(
    context,
    desmoscript.setupRPCCaller<LanguageSupportFeatures>(
      makeBrowserChannelInMain("desmo", langserver)
    )
  );
}

export function deactivate(): Thenable<void> | undefined {
  console.log("deactivate?");
  if (!client) {
    return undefined;
  }
  return client.stop();
}
