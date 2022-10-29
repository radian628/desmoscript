import * as desmoscript from "desmoscript";
const entryPoint = "./desmo-src/main.desmo";
const additionalDefines = new Map();
// additionalDefines.set("three", {
//     type: Identifier.MACRO,
//     fn: (ast: ASTFunctionCall<ScopeInfo>, ctx: DesmoscriptContext) => {
//         return {
//             ...desmoscript.getExprContext(ast),
//             type: ASTType.NUMBER,
//             number: 3
//         };
//     }
// });
// additionalDefines.set("apiTest", {
//   type: Identifier.MACRO,
//   fn: (ast, ctx, m) => {
//     return new Promise((resolve) => {
//       resolve(m.number(12345));
//     })
//   }
// });
desmoscript.runCompilerWebServer(entryPoint, {
    watch: true,
    port: 8081,
    additionalDefines
});
