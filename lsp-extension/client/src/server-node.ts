import { setupRPCCallee, setupRPCCaller } from "../../../desmoscript/dist";
import { compileDesmoscriptForLanguageSupport } from "../../../desmoscript/src";
import { AsyncIOInterface } from "./async-io-interface";
import { makeChannel } from "./channel-node";
import { URI, Utils as uriUtils } from "vscode-uri";
import {
  WatchServerDefiner,
  WatchServerInterface,
} from "./watch-server-interface";
import { runWatchServer } from "../../../standalone-compiler/src/watch-server";
import { ioPathVSCode } from "./io-path-vscode";

process.on("beforeExit", (code) => {
  // console.log("exit code: ", code);
});
process.on("unhandledRejection", (code) => {
  // console.log("unhandled rejection: ", code);
});

try {
  const asyncIO = setupRPCCaller<AsyncIOInterface>(
    makeChannel("io", process, process)
  );

  process.on("message", (msg) => {
    // console.log("langserver received", msg);
  });

  const io = {
    ...ioPathVSCode,
    readFile: asyncIO.readFile,
    writeFile: asyncIO.writeFile,
  };

  const compiler = compileDesmoscriptForLanguageSupport(io);

  setupRPCCallee(makeChannel("desmo", process, process), compiler);

  const runningWatchServers = new Map<string, () => void>();

  setupRPCCallee<WatchServerDefiner>(
    makeChannel("define-watch-server", process, process),
    {
      async defineWatchServer(id, opts) {
        const caller = setupRPCCaller<WatchServerInterface>(
          makeChannel(id, process, process)
        );
        runningWatchServers.set(
          id,
          await runWatchServer({
            translateFilePath: (p) => URI.parse(p).fsPath,
            ...opts,
            io: {
              ...ioPathVSCode,
              readFile: asyncIO.readFile,
              writeFile: asyncIO.writeFile,
            },
            onCompile(output, io, duration) {
              caller.onCompile(output, duration);
            },
            onCompileStart: caller.onCompileStart,
            onLoad: caller.onLoad,
          })
        );
      },
      deleteWatchServer(id) {
        runningWatchServers.get(id)?.();
        runningWatchServers.delete(id);
      },
    }
  );
} catch (err) {
  console.log("caught error!", err);
  process.send({
    type: "ERROR",
    err,
  });
}
