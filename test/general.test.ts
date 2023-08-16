import { expect, test, describe } from "@jest/globals";
import * as desmoscript from "../desmoscript/dist/index.js";
import { IOInterface } from "../desmoscript/src/io/io";
import * as chokidar from "chokidar";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { CompilerOutput } from "../desmoscript/dist/combined-functionality/full-compiler.js";

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

export const ioNode: IOInterface = {
  writeFile: (str, data) => fs.writeFile(str, data),
  readFile: async (str) => new Uint8Array((await fs.readFile(str)).buffer),
  resolvePath: path.resolve,
  dirname: path.dirname,
  relativePath: path.relative,
};

process.chdir("test/cases");

function testExpressionsList(filename: string, expected: any[]) {
  describe(filename, () => {
    let output!: CompilerOutput;

    beforeEach(async () => {
      output = await desmoscript.compileDesmoscript(filename, {
        unsavedFiles: new Map(),
        watchFiles: new Set([]),
        options: {
          annotateExpressionsWithEquivalentDesmoscript: false,
        },
        io: ioNode,
      });
    });

    test("No errors?", () => {
      console.log("got here");
      expect(output.errors).toEqual([]);
      expect(output.type).toEqual("success");
    });

    test("Exprlist exists?", () => {
      const list = (output as any).state?.expressions?.list;
      expect(list).not.toBeUndefined();
    });

    let i = 0;

    for (const e of expected) {
      const i2 = i;
      test(e.latex ?? e.type ?? JSON.stringify(e), () => {
        console.log("got here", e.latex);
        expect((output as any)?.state?.expressions?.list?.[i2]).toMatchObject(
          e
        );
      });
      i++;
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
      expect(output.state).toEqual(expected);
    }
  });
}

function noNewlines(str: string) {
  return str.replace(/\n/g, "");
}

test("y u no work", () => {
  expect(1).toEqual(2);
});

testExpressionsList("anon-block.desmo", [
  {
    latex:
      "T_{est}=\\left(\\left(I_{ntermediate}+I_{ntermediate}\\right)+1\\right)",
  },
  {
    type: "folder",
  },
  {
    latex: "I_{ntermediate}=\\left(1+1\\right)",
  },
]);
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
  {
    latex: "D_{blInner}=\\left(I_{nner}*2\\right)",
  },
  {
    type: "folder",
  },
  {
    latex:
      "\\left[\\left(2*N\\right)\\operatorname{for}N=\\left[1...10\\right]\\right]",
  },
  {
    latex: "\\left\\{x>0:x,x<0:-\\left(x\\right),0\\right\\}",
  },
  {
    latex: "\\left[1,3...9\\right]",
  },
]);
testExpressionsList("actions.desmo", [
  {
    type: "expression",
    latex: "A=0",
  },
  {
    type: "expression",
    latex: "B=A\\to \\left(A+1\\right)",
  },
  {
    latex: "C=\\left\\{A>3:A\\to \\left(A+1\\right)\\right\\}",
  },
  {
    latex: "D=0",
  },
  {
    latex:
      "M_{ultiAction}=\\left(A\\to \\left(A+1\\right),D\\to \\left(D+1\\right)\\right)",
  },
  {
    latex:
      "M_{ultiActionParen}=\\left(A\\to \\left(A+1\\right),D\\to \\left(D+1\\right)\\right)",
  },
  {
    latex: noNewlines(`
M_{ActMatch}=\\left\\{
A>1:
\\left(
A\\to \\left(A+1\\right),
D\\to \\left(D+1\\right)
\\right),
A\\to \\left(A+1\\right)
\\right\\}`),
  },
]);
testExpressionsList("import-script.desmo", [
  {
    latex: "Y=4",
  },
]);
// testGraphState("settings.desmo", {
//   graph: {
//     viewport: {
//       xmin: -3,
//       ymin: -3,
//       xmax: 3,
//       ymax: 3,
//     },
//   },
//   version: 9,
//   expressions: {
//     list: [],
//     ticker: {
//       handlerLatex: "y",
//     },
//   },
// });
