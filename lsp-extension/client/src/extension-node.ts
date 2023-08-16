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
import { URI } from "vscode-uri";
import { setupDesmosWatchServer } from "./watch-server";
import { ioVSCode } from "./io-vscode";
import { spawn, fork } from "node:child_process";
import { makeChannel } from "./channel-node";
import { setupRPCCallee, setupRPCCaller } from "../../../desmoscript/dist";
import { LanguageSupportFeatures } from "../../../desmoscript/dist/combined-functionality/language-support-compiler";
import { asyncSubsetIOInterface } from "./async-io";
import { attachLanguageServer } from "./attach-langserver";
import { WatchServerDefiner } from "./watch-server-interface";

desmoscript.enableDebug();

let client: languageClient.LanguageClient;

export async function activate(context: ExtensionContext) {
  const serverPath = context.asAbsolutePath(
    path.join("client", "out", "server-node.js")
  );

  const langserver = spawn(
    "node",
    [serverPath, "--trace-warnings", "--trace-exit", "--trace-sigint"],
    {
      stdio: ["pipe", "pipe", "pipe", "ipc"],
      serialization: "advanced",
    }
  );

  langserver.on("exit", (...args) => {
    //console.log("exited!", args);
  });

  langserver.stdout.on("data", (data) => {
    //console.log(new TextDecoder().decode(data));
  });
  langserver.stderr.on("data", (data) => {
    //console.log("stderr data", new TextDecoder().decode(data));
  });

  setupRPCCallee(
    makeChannel("io", langserver, langserver),
    asyncSubsetIOInterface
  );

  const desmoscriptCompiler = setupRPCCaller<LanguageSupportFeatures>(
    makeChannel("desmo", langserver, langserver)
  );

  attachLanguageServer(context, desmoscriptCompiler);

  setupDesmosWatchServer(
    context,
    setupRPCCaller<WatchServerDefiner>(
      makeChannel("define-watch-server", langserver, langserver)
    ),
    langserver
  );
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
