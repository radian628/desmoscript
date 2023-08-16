import {
  compileDesmoscriptForLanguageSupport,
  setupRPCCallee,
  setupRPCCaller,
} from "../../../desmoscript/dist";
import { AsyncIOInterface } from "./async-io-interface";
import { makeBrowserChannelInWorker } from "./browser-channel";
import { ioPathVSCode } from "./io-path-vscode";

const asyncIO = setupRPCCaller<AsyncIOInterface>(
  makeBrowserChannelInWorker("io")
);

const io = {
  ...ioPathVSCode,
  readFile: asyncIO.readFile,
  writeFile: asyncIO.writeFile,
};

const compiler = compileDesmoscriptForLanguageSupport(io);

setupRPCCallee(makeBrowserChannelInWorker("desmo"), compiler);
