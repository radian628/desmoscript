import * as desmoscript from "desmoscript";
const entryPoint = "./desmo/main.desmo";
desmoscript.createCompilerWatcherServer(entryPoint, 8081, () => new Map());
