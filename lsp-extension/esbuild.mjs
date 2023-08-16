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
});

await nodeCtx.rebuild();
await browserCtx.rebuild();

process.exit(0);
