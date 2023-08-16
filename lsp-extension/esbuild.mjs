import * as esbuild from "esbuild";
import * as process from "process";

const buildNotify = (buildName) => {
  return {
    name: "build-notify",
    setup(build) {
      let time = Date.now();
      build.onStart(() => {
        time = Date.now();
        // eslint-disable-next-line no-undef
        console.log(`${buildName} build started!`);
      });
      build.onEnd(() => {
        // eslint-disable-next-line no-undef
        console.log(`${buildName} build ended! (took ${Date.now() - time}ms)`);
      });
    },
  };
};

const nodeCtx = await esbuild.context({
  entryPoints: [
    "./client/src/extension-node.ts",
    "./client/src/server-node.ts",
  ],
  bundle: true,
  outdir: "./client/out",
  external: ["vscode"],
  plugins: [buildNotify("Node")],
  platform: "node",
  sourcemap: true,
});

const browserCtx = await esbuild.context({
  entryPoints: ["./client/src/extension-browser.ts"],
  bundle: true,
  outdir: "./client/out",
  external: ["vscode"],
  plugins: [buildNotify("Browser")],
  sourcemap: true,
  platform: "browser",
  format: "cjs",
  supported: {
    "dynamic-import": true,
  },
  target: "es2020",
});

const browserCtxServer = await esbuild.context({
  entryPoints: ["./client/src/server-browser.ts"],
  bundle: true,
  outdir: "./client/out",
  plugins: [buildNotify("Browser Server")],
  sourcemap: true,
  platform: "browser",
  format: "esm",
  supported: {
    "dynamic-import": true,
  },
});

await nodeCtx.rebuild();
await browserCtx.rebuild();
await browserCtxServer.rebuild();

process.exit(0);
