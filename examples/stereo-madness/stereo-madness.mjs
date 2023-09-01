export default function ({ scope, addMacro, addLatexMacro }) {
  addLatexMacro({
    name: "latexMacroTest",
    fn: async () => {
      return "\\left[1,2,3\\right]";
    },
    type: () => ({ type: "list", element: { type: "number" } }),
  });

  addMacro({
    name: "getLevel",
    fn: async (node, a) => {
      const file = JSON.parse(await a.readStringFile("./level.json"));

      const arg1 = node.params[0]?.content;
      const arg2 = node.params[1]?.content;

      return a.parseExpr(`[
        ${file?.data
          ?.map((e) => {
            if (arg1 && arg2) {
              return `(${e[arg1]}, ${e[arg2]})`;
            } else if (arg1) {
              return e[arg1];
            }
          })
          .join(",")}
      ]`);
    },
  });

  function noScientific(n) {
    return n.toLocaleString("fullwide", { useGrouping: false });
  }

  function toPoint(x, y) {
    return `(${noScientific(x)}, ${noScientific(y)})`;
  }

  function drawPath(points) {
    return (obj) => {
      const r = ((obj.r ?? 0) / 180) * Math.PI;
      const renderPoint = (pt) =>
        toPoint(
          pt[0] * Math.cos(r) - pt[1] * Math.sin(r) + obj.x,
          pt[0] * Math.sin(r) + pt[1] * Math.cos(r) + obj.y
        );
      const path = `${points.map(renderPoint)},${renderPoint(
        points[0]
      )},(0/0, 0/0)`;

      return path;
    };
  }

  function spikeDecoration(size) {
    return [
      [-40, -20],
      //[-40, 0],
      ...new Array(16)
        .fill(0)
        .map((e, i) => [(i / 15) * 80 - 40, Math.random() * 20 - 10]),
      //[40, 0],
      [40, -20],
    ].map((e) => [e[0] * size, e[1] * size]);
  }

  const blockPath = [
    [-15, -15],
    [-15, 15],
    [15, 15],
    [15, -15],
  ];

  const objectRenderers = {
    // ========================== DECORATIONS

    // blinking pole thingies
    15: drawPath([
      [0, -20],
      [0, 50],
    ]),
    16: drawPath([
      [0, -13],
      [0, 30],
    ]),
    17: drawPath([
      [0, -7],
      [0, 20],
    ]),

    // spike decorations
    18: drawPath(spikeDecoration(1)),
    19: drawPath(spikeDecoration(0.8)),
    20: drawPath(spikeDecoration(0.5)),
    21: drawPath(spikeDecoration(0.3)),

    // ========================== BLOCKS

    // block
    1: drawPath(blockPath),
    2: drawPath(blockPath),
    3: drawPath(blockPath),
    4: drawPath(blockPath),
    5: drawPath(blockPath),
    6: drawPath(blockPath),
    7: drawPath(blockPath),
    // half block
    40: drawPath([
      [-15, -7.5],
      [15, -7.5],
      [15, 7.5],
      [-15, 7.5],
    ]),

    // ========================= SPIKES

    // normal spike
    8: drawPath([
      [-15, -15],
      [0, 15],
      [15, -15],
    ]),
    // short spike
    39: drawPath([
      [-15, -5],
      [0, 10],
      [15, -5],
    ]),
    // lots of tiny rock looking spike thingies (TODO: figure out the actual vertices here)
    9: drawPath([
      [-15, -3],
      ...new Array(11)
        .fill(0)
        .map((_, i) => [(i * 30) / 10 - 15, Math.random() * 6 + 1]),
      [15, -3],
    ]),
  };

  addMacro({
    name: "getLevelPolygons",
    fn: async (node, a) => {
      const level = JSON.parse(await a.readStringFile("./level.json"));

      const objects = level.data;

      const screenSize = 1000;

      const xmax = Math.max(...objects.map((o) => o.x));

      const screenCount = Math.ceil(xmax / screenSize);

      const screens = [];

      for (let i = 0; i < screenCount; i++) screens.push([]);

      for (const o of objects) {
        const screenIndex = Math.floor(o.x / screenSize);
        const screen = screens[screenIndex];

        screen.push(o);
      }

      return a.parseExpr(`[
        ${screens.map((screen) => {
          if (!screen) {
            return `polygon()`;
          }

          return `polygon(${screen.map((obj) => {
            const renderer = objectRenderers[obj.id];

            if (renderer) return renderer(obj);

            return `(${obj.x - 15},${obj.y - 15}),(${obj.x + 15},${
              obj.y - 15
            }),(${obj.x + 15},${obj.y + 15}),(${obj.x - 15},${
              obj.y + 15
            }),(0/0,0/0)`;
          })})`;
        })}
      ]`);
    },
  });
}
