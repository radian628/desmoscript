import * as fs from "node:fs/promises";
import * as path from "node:path";

async function fixImportsInDir(dir) {
  const files = await fs.readdir(dir);

  for (const filename of files) {
    const ext = path.extname(filename);
    const filepath = path.join(dir, filename);
    if (ext == ".ts") {
      const content = (await fs.readFile(filepath))
        .toString()
        .split("\n")
        .map((str) => {
          let withext = str.slice(0, -3) + `.js"`;
          if (!str.startsWith("import ")) return str;
          if (str.match(/"antlr4ts\//)) return withext;
          if (str.match(/\"\.\//g) == null) return str;
          return withext;
        })
        .join("\n");
      fs.writeFile(filepath, content);
    }
  }
}

fixImportsInDir("./src/grammar");
