import { CompilerOutput } from "../../../desmoscript/src/combined-functionality/full-compiler";

/*
Define a server for watching for file changes.
This will open a channel for the server.
You can then create an RPC Caller on the client
for interacting with the server.
*/
export type WatchServerDefiner = {
  defineWatchServer: (
    id: string,
    opts: {
      options: {
        annotateExpressionsWithEquivalentDesmoscript: boolean;
      };
      entryPoint: string;
      host: string;
      port: number;
      errorContext: number;
    }
  ) => void;
  deleteWatchServer: (id: string) => void;
};

/*
Client defines WatchServerInterface; server calls it.
This allows the client to update the webview whenever the
server updates (as the server can call the WatchServerInterface methods).
*/
export type WatchServerInterface = {
  onCompileStart: () => void;
  onCompile: (output: CompilerOutput, duration: number) => void;
  onLoad: (host, port) => void;
};
