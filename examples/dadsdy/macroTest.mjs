export default function ({ scope, addMacro }) {
  addMacro({
    name: "identity",
    fn: async (node, a) => node.params[0],
  });
}
