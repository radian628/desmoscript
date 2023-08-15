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

export default function ({ scope, addMacro }) {
  const dims = ["X", "Y", "Z"];

  addMacro({
    name: "four",
    fn: (node, a) => {
      return a.node({
        type: "number",
        number: 4,
      });
    },
  });

  for (let i = 0; i < 3; i++) {
    addMacro({
      name: "vertices" + dims[i],
      fn: async (node, a) => {
        const file = await a.readStringFile("./suzanne.obj");
        const verts = getVertices(file, i);
        return a.parseExpr(`[${verts.join(",")}]`);
      },
    });

    addMacro({
      name: "indices" + (i + 1),
      fn: async (node, a) => {
        const file = await a.readStringFile("./suzanne.obj");
        const idxs = getIndices(file, i);
        return a.parseExpr(`[${idxs.join(",")}]`);
      },
    });
  }
}
