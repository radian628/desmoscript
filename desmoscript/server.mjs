import * as desmoscript from "./dist";

desmoscript.runCompilerWebServer("./main.desmo", {
    watch: true,
    port: 8081
});