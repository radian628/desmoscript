import { expect, test, describe } from "@jest/globals";
import * as desmoscript from "../desmoscript/dist/index.js";
import { IOInterface } from "../desmoscript/src/io/io";
import * as chokidar from "chokidar";
import * as fs from "node:fs/promises";
import * as path from "node:path";

function stateWith(exprs: any) {
  return {
    version: 9,
    graph: {
      viewport: {
        xmin: -10,
        xmax: 10,
        ymin: -10,
        ymax: 10,
      },
    },
    randomSeed: "",
    expressions: exprs,
  };
}

function matchExpressions(state: any, exprs: any[]) {
  const list = state?.expressions?.list;

  expect(list).not.toBeUndefined();

  let i = 0;

  for (const e of list) {
    expect(e).toMatchObject(exprs[i]);
    i++;
  }
}

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

process.chdir("test/cases");

function testExpressionsList(filename: string, expected: any[]) {
  test(filename, async () => {
    const output = await desmoscript.compileDesmoscript(filename, {
      unsavedFiles: new Map(),
      watchFiles: new Set([]),
      options: {
        annotateExpressionsWithEquivalentDesmoscript: false,
      },
      io: ioNode,
    });

    console.log(output.errors);

    expect(output.type).toEqual("success");

    if (output.type === "success") {
      console.log(output.state.expressions.list);
      matchExpressions(output.state, expected);
    }
  });
}

function testGraphState(filename: string, expected: any) {
  test(filename, async () => {
    const output = await desmoscript.compileDesmoscript(filename, {
      unsavedFiles: new Map(),
      watchFiles: new Set([]),
      options: {
        annotateExpressionsWithEquivalentDesmoscript: false,
      },
      io: ioNode,
    });

    expect(output.type).toEqual("success");

    if (output.type === "success") {
      console.log(output.state.expressions.list);
      expect(output.state).toEqual(expected);
    }
  });
}

describe("General tests of syntax", () => {
  testExpressionsList("number.desmo", [
    {
      type: "expression",
      latex: "1",
      folderId: undefined,
    },
  ]);
  testExpressionsList("general.desmo", [
    {
      type: "expression",
      latex: "123",
      folderId: undefined,
    },
    {
      type: "expression",
      latex: "\\left(1+2\\right)",
      folderId: undefined,
    },
    {
      type: "text",
      text: "note",
      folderId: undefined,
    },
    {
      type: "expression",
      latex: "\\left(1,2\\right)",
      folderId: undefined,
    },
    {
      type: "expression",
      latex: "\\left[1,2,3,4,5\\right]",
      folderId: undefined,
    },
    {
      type: "expression",
      latex: "\\left[1...9\\right]",
      folderId: undefined,
    },
    {
      type: "expression",
      latex: "Y_{2}=x",
      folderId: undefined,
    },
    {
      type: "expression",
      latex: "Y=x",
      folderId: undefined,
      colorLatex: "\\operatorname{rgb}\\left(69,69,69\\right)",
      lineStyle: "DOTTED",
    },
    {
      type: "expression",
      latex:
        "\\operatorname{polygon}\\left(\\left(1,1\\right),\\left(2,2\\right)\\right)",
      folderId: undefined,
    },
    {
      type: "folder",
    },
    {
      type: "expression",
      latex: "D_{bl}\\left(X\\right)=\\left(X*2\\right)",
    },
    {
      type: "folder",
    },
    {
      latex: "I_{nner}=321",
    },
  ]);
  testGraphState("settings.desmo", {
    graph: {
      viewport: {
        xmin: -3,
        ymin: -3,
        xmax: 3,
        ymax: 3,
      },
    },
    version: 9,
    expressions: {
      list: [],
      ticker: {
        handlerLatex: "y",
      },
    },
  });
});
