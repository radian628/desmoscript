function getVertices(src, dim) {
  return src
    .split("\n")
    .map((line) => line.split(" "))
    .filter((e) => e[0] === "v")
    .map((e) => Number(e[1 + dim]));
}

function getIndices(src, dim) {
  return src
    .split("\n")
    .map((line) => line.split(" ").map((segment) => segment.split("/")))
    .filter((e) => e[0][0] === "f")
    .map((e) => Number(e[dim + 1][0]));
}

desmo(({ scope }) => {
  console.log("ran desmo script!", scope);
  scope.elements.set("four", {
    type: "macro",
    id: -1,
    unitName: "",
    macroOperation: async (node, a) => {
      return {
        type: "number",
        number: 4,
      };
    },
  });

  const dims = ["X", "Y", "Z"];

  for (let i = 0; i < 3; i++) {
    scope.elements.set("vertices" + dims[i], {
      type: "macro",
      id: -1 - i,
      unitName: "",
      macroOperation: async (node, a) => {
        const file = await a.readStringFile("./suzanne.obj");
        const verts = getVertices(file, i);
        // return {
        //   type: "note",
        //   content: JSON.stringify(verts),
        // };
        return a.parseExpr(`[${verts.join(",")}]`);
      },
    });

    scope.elements.set("indices" + (i + 1), {
      type: "macro",
      id: -10 - i,
      unitName: "",
      macroOperation: async (node, a) => {
        const file = await a.readStringFile("./suzanne.obj");
        const idxs = getIndices(file, i);
        return a.parseExpr(`[${idxs.join(",")}]`);
      },
    });
  }
});
