import { IOInterface } from "../../../desmoscript/src/io/io";
import * as vscode from "vscode";
import { URI, Utils as uriUtils } from "vscode-uri";

export const ioBrowser: IOInterface = {
  watchFile: (str, onchange) => {
    const watcher = vscode.workspace.createFileSystemWatcher(
      str,
      true,
      false,
      false
    );
    watcher.onDidChange(onchange);
    watcher.onDidDelete(onchange);
    return watcher.dispose;
  },
  writeFile: async (str, data) => {
    await vscode.workspace.fs.writeFile(URI.parse(str), data);
  },
  readFile: async (str) => {
    console.log("readfile", str);
    console.trace();
    return await vscode.workspace.fs.readFile(URI.parse(str));
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
};
