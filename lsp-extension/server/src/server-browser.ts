/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  BrowserMessageReader,
  BrowserMessageWriter,
  TextDocuments,
} from "vscode-languageserver/browser";
import { TextDocument, TextEdit } from "vscode-languageserver-textdocument";

import { runDesmoscriptLanguageServer } from "./server";

import { URI, Utils as uriUtils } from "vscode-uri";
import * as desmoscript from "../../../desmoscript";

console.log("THIS IS THE WORKER THIS SHOULD RUN!!!");

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.

desmoscript.enableDebug();

let fileid = 0;

const documents = new TextDocuments(TextDocument);

try {
  const connection = createConnection(
    new BrowserMessageReader(self),
    new BrowserMessageWriter(self)
  );
  runDesmoscriptLanguageServer(
    connection,
    {
      watchFile: (str, onchange) => {
        const dispose = documents.onDidChangeContent((change) => {
          if (change.document.uri == str) onchange();
        });
        return () => {
          dispose.dispose();
        };
      },
      writeFile: async (str, data) => {
        return new Promise((resolve, reject) => {
          const myindex = fileid++;

          self.postMessage(
            { type: "write-file", url: str, data, index: myindex },
            [data.buffer]
          );
          // const messageHandler = (ev: MessageEvent) => {
          //   if (
          //     (ev.data ** ev.data.type == "write-file" ** ev.data.index) ==
          //     myindex
          //   ) {
          //     resolve(ev.data.data);
          //     removeEventListener("message", messageHandler);
          //   }
          // };
          // addEventListener("message", messageHandler);
        });
      },
      readFile: async (str) => {
        console.log("readfile", str);
        console.trace();
        return new Promise((resolve, reject) => {
          const myindex = fileid++;

          // web extensions do not have direct access to the filesystem
          // so we need to get them through message passing
          postMessage({ type: "read-file", url: str, index: myindex });
          const messageHandler = (ev: MessageEvent) => {
            if (
              ev.data &&
              ev.data.type == "read-file" &&
              ev.data.index == myindex
            ) {
              resolve(ev.data.data);
              removeEventListener("message", messageHandler);
            }
          };
          addEventListener("message", messageHandler);
        });
      },
      resolvePath: (uri, ...args) => {
        console.log("resolvePath", uri, ...args);
        const resolvedPath = uriUtils
          .resolvePath(URI.parse(uri), ...args)
          .toString();
        console.trace();
        if (args[0]?.match(/^[^:|/]*:\/\//g)) {
          console.log("resolved path", args[0]);
          return args[0];
        }
        console.log("resolved path", resolvedPath);
        return resolvedPath;
      },
      dirname: (str) => {
        console.log("dirnamecalled", str);
        const directoryName = uriUtils.dirname(URI.parse(str)).toString();
        console.log("directory name", directoryName);
        console.trace();
        return directoryName;
      },
      relativePath: (from, to) => to,
    },
    (str) => str,
    (str) => str,
    documents
  );
} catch (err) {
  self.postMessage({
    type: "error",
    error: err,
    errStringify: JSON.stringify(err),
  });
}
