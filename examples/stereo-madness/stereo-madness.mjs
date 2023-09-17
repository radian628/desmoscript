export default function ({ scope, addMacro, addLatexMacro }) {
  addLatexMacro({
    name: "latexMacroTest",
    fn: async () => {
      return "\\left[1,2,3\\right]";
    },
    type: () => ({ type: "list", element: { type: "number" } }),
  });

  addLatexMacro({
    name: "getLevel",
    fn: async (node, a) => {
      const file = JSON.parse(await a.readStringFile("./level.json"));

      const arg1 = node.params[0]?.content;
      const arg2 = node.params[1]?.content;

      return `\\left[
        ${file?.data
          ?.map((e) => {
            if (arg1 && arg2) {
              return `\\left(${e[arg1]}, ${e[arg2]}\\right)`;
            } else if (arg1) {
              return e[arg1];
            }
          })
          .join(",")}
      \\right]`;
    },
    type: () => ({ type: "list", element: { type: "number" } }),
  });

  function noScientific(n) {
    return n.toLocaleString("fullwide", { useGrouping: false });
  }

  function toPoint(x, y) {
    return `\\left(${noScientific(x)}, ${noScientific(y)}\\right)`;
  }

  function drawPath(points) {
    return (obj) => {
      const r = ((obj.r ?? 0) / 180) * Math.PI;
      const renderPoint = (pt) => {
        const x = pt[0] * (obj.flipx ? -1 : 1);
        const y = pt[1] * (obj.flipy ? -1 : 1);
        return toPoint(
          x * Math.cos(r) - y * Math.sin(r) + obj.x,
          x * Math.sin(r) + y * Math.cos(r) + obj.y
        );
      };
      const path = `${points.map(renderPoint)},${renderPoint(
        points[0]
      )},\\left(0/0, 0/0\\right)`;

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
    18: drawPath([
      [-45, -15],
      [-39.7, -1.4],
      [-36, -10],
      [-29.4, 3.1],
      [-25.2, -4.2],
      [-19.4, 13.7],
      [-11.9, -6.9],
      [-9.2, -1.6],
      [-6.3, -8.6],
      [1.2, 2.6],
      [9.7, -9.5],
      [16.7, 10],
      [23.6, -10.6],
      [30.7, 3],
      [37.7, -10.7],
      [40.7, -3.8],
      [45.3, -14.7],
    ]),
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
      [-15, -5],
      [-15, 1.5],
      [-11.6, 5.3],
      [-9.6, 3],
      [-7.4, 8],
      [-5.28, 2.73],
      [-1.26, 10.14],
      [2.1, 3.52],
      [5.07, 6.7],
      [8.27, 2.9],
      [10, 6],
      [11.65, 2.9],
      [12.9, 4.48],
      [15.04, 1.6],
      [15.08, -4.7],
    ]),
  };

  addLatexMacro({
    name: "getLevelPolygons",
    type: () => ({ type: "list", element: { type: "polygon" } }),
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

      return `\\left[
        ${screens.map((screen) => {
          if (!screen) {
            return `\\operatorname{polygon}\\left(\\right)`;
          }

          return `\\operatorname{polygon}\\left(${screen.map((obj) => {
            const renderer = objectRenderers[obj.id];

            if (renderer) return renderer(obj);

            return `\\left(${obj.x - 15},${obj.y - 15}\\right),\\left(${
              obj.x + 15
            },${obj.y - 15}\\right),\\left(${obj.x + 15},${
              obj.y + 15
            }\\right),\\left(${obj.x - 15},${
              obj.y + 15
            }\\right),\\left(0/0,0/0\\right)`;
          })}\\right)`;
        })}
      \\right]`;
    },
  });
}
