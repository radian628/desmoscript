/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import {
  createConnection,
  ProposedFeatures,
} from "vscode-languageserver/node.js";

import { fileURLToPath, pathToFileURL } from "url";
import { runDesmoscriptLanguageServer } from "./server";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as chokidar from "chokidar";

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
    writeFile: async (str, data) => fs.writeFile(str, data),
    watchFile: (str, onchange) => {
      const watcher = chokidar.watch(str, {
        awaitWriteFinish: {
          pollInterval: 50,
          stabilityThreshold: 1000,
        },
      });

      watcher.on("change", onchange);
      watcher.on("unlink", onchange);

      return () => watcher.close();
    },
  },
  fileURLToPath,
  (str) => pathToFileURL(str).toString()
);
