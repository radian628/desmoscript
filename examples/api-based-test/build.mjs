import { runWatchServer } from "../../desmoscript/dist/server.js";

runWatchServer({
  entryPoint: "main.desmo",
  errorContext: 2,
  port: 8080,
  host: "localhost",
  onCompile: (output, io, duration) => {
    console.log(`Compiled in ${duration}ms.`);
  },
  onLoad: (host, port) => {
    console.log("Loaded!");
  },
  options: {
    annotateExpressionsWithEquivalentDesmoscript: false,
  },
});
