/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  BrowserMessageReader,
  BrowserMessageWriter,
} from "vscode-languageserver/browser";

import { runDesmoscriptLanguageServer } from "./server";

import { URI, Utils as uriUtils } from "vscode-uri";
import * as desmoscript from "desmoscript";

console.log("THIS IS THE WORKER THIS SHOULD RUN");

// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.

desmoscript.enableDebug();

try {
  const connection = createConnection(
    new BrowserMessageReader(self),
    new BrowserMessageWriter(self)
  );
  runDesmoscriptLanguageServer(
    connection,
    {
      readFile: async (str) => {
        console.log("readfile", str);
        console.trace();
        return new Promise((resolve, reject) => {
          postMessage({ type: "file", url: str });
          addEventListener("message", (ev) => {
            if (ev.data && ev.data.type == "file") {
              resolve(ev.data.data);
            }
          });
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
    (str) => str
  );
} catch (err) {
  self.postMessage({
    type: "error",
    error: err,
    errStringify: JSON.stringify(err),
  });
}
