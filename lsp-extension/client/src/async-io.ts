import * as vscode from "vscode";
import { URI, Utils as uriUtils } from "vscode-uri";

export const asyncSubsetIOInterface = {
  writeFile: async (str, data) => {
    await vscode.workspace.fs.writeFile(URI.parse(str), data);
  },
  readFile: async (str) => {
    const file = await vscode.workspace.fs.readFile(URI.parse(str));
    return file;
  },
};
