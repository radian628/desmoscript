import * as desmoscript from "./dist";
import * as fs from "node:fs/promises";

fs.writeFile("desmoscript-output.json", JSON.stringify(await desmoscript.test()));