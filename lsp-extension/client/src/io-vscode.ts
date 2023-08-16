import { IOInterface } from "../../../desmoscript/dist";
import * as vscode from "vscode";
import { URI, Utils as uriUtils } from "vscode-uri";
import { IOPathInterface } from "../../../desmoscript/dist/io/io";
import { ioPathVSCode } from "./io-path-vscode";

export const ioVSCode: IOInterface = {
  // watchFile: (str, onchange) => {
  //   const watcher = vscode.workspace.createFileSystemWatcher(
  //     str,
  //     true,
  //     false,
  //     false
  //   );
  //   watcher.onDidChange(onchange);
  //   watcher.onDidDelete(onchange);
  //   let disposed = false;
  //   return () => {
  //     if (!disposed) {
  //       watcher.dispose();
  //       disposed = true;
  //     }
  //   };
  // },
  ...ioPathVSCode,
  writeFile: async (str, data) => {
    await vscode.workspace.fs.writeFile(URI.parse(str), data);
  },
  readFile: async (str) => {
    return await vscode.workspace.fs.readFile(URI.parse(str));
  },
};
