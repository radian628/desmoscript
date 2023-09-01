import GD from "gd.js";
import gdparse from "gdparse";
import * as fs from "node:fs/promises";

const gdid = "2577156";

const gd = new GD();

const stereoMadness = await gd.levels.get(gdid);

const levelString = await (await stereoMadness.resolve()).decodeData();

const levelData = gdparse.parseLevel(levelString.raw);

fs.writeFile("./level.json", JSON.stringify(levelData));
