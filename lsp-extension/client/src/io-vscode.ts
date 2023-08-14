import { IOInterface } from "../../../desmoscript/dist";
import * as vscode from "vscode";
import { URI, Utils as uriUtils } from "vscode-uri";

export const ioVSCode: IOInterface = {
  watchFile: (str, onchange) => {
    const watcher = vscode.workspace.createFileSystemWatcher(
      str,
      true,
      false,
      false
    );
    watcher.onDidChange(onchange);
    watcher.onDidDelete(onchange);
    let disposed = false;
    return () => {
      if (!disposed) {
        watcher.dispose();
        disposed = true;
      }
    };
  },
  writeFile: async (str, data) => {
    await vscode.workspace.fs.writeFile(URI.parse(str), data);
  },
  readFile: async (str) => {
    return await vscode.workspace.fs.readFile(URI.parse(str));
  },
  resolvePath: (uri, ...args) => {
    if (args[0]) {
      // if the supplied path is absolute, just ignore the prev path
      try {
        const parsedArg0 = URI.parse(args[0], true);
        return ioVSCode.resolvePath(parsedArg0.toString(), ...args.slice(1));
      } catch {
        // no-op
      }
    }

    const resolvedPath = uriUtils
      .resolvePath(URI.parse(uri), ...args)
      .toString();

    return resolvedPath;
  },
  dirname: (str) => {
    const directoryName = uriUtils.dirname(URI.parse(str)).toString();
    return directoryName;
  },
  relativePath: (from, to) => to,
};
