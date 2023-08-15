export default function ({ scope }) {
  scope.elements.set("identity", {
    type: "macro",
    id: -1,
    unitName: "",
    macroOperation: async (node, a) => node.params[0],
  });
}
