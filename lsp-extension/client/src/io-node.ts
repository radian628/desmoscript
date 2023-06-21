import { IOInterface } from "../../../desmoscript/dist/io/io";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as chokidar from "chokidar";

export const ioNode: IOInterface = {
  watchFile: (str, onchange) => {
    const watcher = chokidar.watch(str, {
      awaitWriteFinish: {
        pollInterval: 50,
        stabilityThreshold: 1000,
      },
    });
    watcher.on("change", onchange);
    watcher.on("delete", onchange);

    return () => watcher.close();
  },
  writeFile: (str, data) => fs.writeFile(str, data),
  readFile: async (str) => new Uint8Array((await fs.readFile(str)).buffer),
  resolvePath: path.resolve,
  dirname: path.dirname,
  relativePath: path.relative,
};
