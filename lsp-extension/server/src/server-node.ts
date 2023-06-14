/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  ProposedFeatures,
  InitializeParams,
  DidChangeConfigurationNotification,
  CompletionItem,
  CompletionItemKind,
  TextDocumentPositionParams,
  TextDocumentSyncKind,
  InitializeResult,
  HandlerResult,
  Position,
  WorkDoneProgress,
  LocationLink,
  ColorInformation,
} from "vscode-languageserver/node.js";

import { TextDocument, TextEdit } from "vscode-languageserver-textdocument";

import {
  compileDesmoscript,
  compileDesmoscriptForLanguageSupport,
  getLinesAndCols,
  lex,
  parse,
} from "desmoscript";
import { CompilerError } from "desmoscript/dist/compiler-errors.mjs";
import { getErrors } from "desmoscript/dist/ast/ast.mjs";
import { CodegenError } from "desmoscript/dist/codegen/codegen.mjs";
import { TypeError } from "desmoscript/dist/scope-tree/typecheck/type-errors.mjs";
import { formatAST } from "desmoscript/dist/ast/fmt.mjs";
import { compareAST } from "desmoscript/dist/ast/compare-ast.mjs";
import { fileURLToPath, pathToFileURL } from "url";
import { runDesmoscriptLanguageServer } from "./server";
import * as fs from "node:fs/promises";
import * as path from "node:path";

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);
runDesmoscriptLanguageServer(
  connection,
  {
    readFile: async (str) => new Uint8Array((await fs.readFile(str)).buffer),
    resolvePath: path.resolve,
    dirname: path.dirname,
    relativePath: path.relative,
  },
  fileURLToPath,
  (str) => pathToFileURL(str).toString()
);
