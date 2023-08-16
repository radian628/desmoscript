export default function ({ scope, addMacro }) {
  addMacro({
    name: "identity",
    fn: async (node, a) => {
      return a.node({
        type: "list",
        elements: new Array(10).fill(a.node(node.params[0])),
      });
    },
  });
}
