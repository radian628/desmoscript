import { IOInterface } from "../../../desmoscript/dist";
import * as vscode from "vscode";
import { URI, Utils as uriUtils } from "vscode-uri";
import { IOPathInterface } from "../../../desmoscript/dist/io/io";
import { ioPathVSCode } from "./io-path-vscode";

export const ioVSCode: IOInterface = {
  ...ioPathVSCode,
  writeFile: async (str, data) => {
    await vscode.workspace.fs.writeFile(URI.parse(str), data);
  },
  readFile: async (str) => {
    return await vscode.workspace.fs.readFile(URI.parse(str));
  },
};
