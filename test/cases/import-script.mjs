export default function ({ scope }) {
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
}
