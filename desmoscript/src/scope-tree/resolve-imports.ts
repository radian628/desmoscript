import {
  ASTNode,
  ImportScriptNode,
  Scope,
  forEachASTAsync,
} from "../ast/ast.js";
import { DesmoCallback, getLinesAndCols } from "../index.js";
import { CompilerError, Result, compilerError } from "../compiler-errors.js";
import { Highlights } from "../parse/parse.js";

import { IOInterface } from "../io/io.js";
import { ImportScriptsMap } from "../combined-functionality/language-support-compiler.js";

export const untranspilableDynamicImport = new Function(
  "src",
  "return import(src);"
);

export function evalModule(src: string) {
  return untranspilableDynamicImport(
    `data:text/javascript,${encodeURIComponent(src)}`
  );
}

export async function resolveFileImports(
  filename: string,
  importer: string,
  expr: ASTNode | undefined,
  ctx: {
    imports: Map<
      string,
      {
        name: string;
        src: string;
        ast: ASTNode;
      }
    >;
    sourceCode: Map<string, { src: string; linesAndCols: [number, number][] }>;
    lexAndParse: (
      filename: string,
      src: string,
      errors: CompilerError[],
      highlights?: Highlights
    ) => ASTNode;
    errors: CompilerError[];
    getFile: (filepath: string) => Promise<string>;
    highlightsMap?: Map<string, Highlights>;
    io: IOInterface;
    watchFiles: Set<string>;
    importScripts: ImportScriptsMap;
  }
) {
  // get absolute path to file
  const fullpath = ctx.io.resolvePath(ctx.io.dirname(importer), filename);
  if (ctx.imports.has(fullpath)) return;

  try {
    // read file and store source code in case there are parse errors
    // that result in an import being unavailable
    const src = await ctx.getFile(fullpath);
    ctx.watchFiles.add(fullpath);
    ctx.sourceCode.set(fullpath, { src, linesAndCols: getLinesAndCols(src) });

    // try lex/parse
    const highlights: Highlights = [];
    const ast = ctx.lexAndParse(fullpath, src, ctx.errors, highlights);
    ctx.highlightsMap?.set(fullpath, highlights);

    // add import
    ctx.imports.set(fullpath, {
      name: fullpath,
      src,
      ast: ast,
    });

    // recursively find more imports
    await forEachASTAsync(ast, undefined, async (node) => {
      if (node.type == "import") {
        await resolveFileImports(node.src, fullpath, node, ctx);
      } else if (node.type == "import-script") {
        if (!ctx.importScripts.has(node.src)) {
          const iscriptFullPath = ctx.io.resolvePath(
            ctx.io.dirname(importer),
            node.src
          );
          const iscriptSrc = await ctx.getFile(iscriptFullPath);
          ctx.watchFiles.add(iscriptFullPath);
          try {
            const importScript = await evalModule(iscriptSrc);
            ctx.importScripts.set(iscriptFullPath, {
              run: importScript.default,
            });
          } catch (err) {
            ctx.errors.push({
              type: "general",
              start: node.start,
              end: node.end,
              unit: fullpath,
              reason: `failed to load '${node.src}': ${err}'`,
            });
          }
        }
      }
    });
  } catch {
    ctx.errors.push(
      compilerError(
        `failed to import '${filename}' (full path: ${fullpath})`,
        expr?.start ?? 0,
        expr?.end ?? 0,
        importer
      )
    );
  }
}
