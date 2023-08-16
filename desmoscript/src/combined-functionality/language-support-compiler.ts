import {
  ASTNode,
  CompilationUnit,
  IdentifierNode,
  Scope,
  Scoped,
} from "../ast/ast.js";
import {
  CodegenError,
  defaultGraphstate,
  generateCode,
} from "../codegen/codegen.js";
import {
  CompilerError,
  ResultOk,
  assertNotUndefined,
} from "../compiler-errors.js";
import { DesmoCallback, lex, parse, typecheckScopeTree } from "../index.js";
import { resolveFileImports } from "../scope-tree/resolve-imports.js";
import {
  CompileDesmoscriptSettings,
  CompilerOutput,
  compileDesmoscript,
  createASTLookupTableMultipleCompilationUnits,
  handleMacros,
  lexAndParse,
  resolveScopes,
} from "./full-compiler.js";
import { TypeError, formatError } from "../scope-tree/typecheck/type-errors.js";

import { forEachAST } from "../ast/ast.js";
import { findIdentifierScopeItem } from "../scope-tree/create-scope-tree.js";
import { formatAST } from "../ast/fmt.js";
import { compareAST } from "../ast/compare-ast.js";
import { Token } from "../parse/lex.js";
import { Highlights } from "../parse/parse.js";
import { debugPrint } from "../debug/debug.js";
import { IOInterface, uint8ArrayToString } from "../io/io.js";

export type SyntaxHighlightingType =
  | "function"
  | "variable"
  | "macro"
  | "bracket"
  | "operator"
  | "number"
  | "string"
  | "namespace"
  | "keyword"
  | "type"
  | "enumMember";

type HighlightData = {
  token: string;
  start: number;
  end: number;
  type: SyntaxHighlightingType;
};

type Definition = {
  name: string;
  start: number;
  end: number;
  definitionStart: number;
  definitionEnd: number;
  definitionFile: string;
};

type Diagnostic = {
  start: number;
  end: number;
  reason: string;
};

type ColorWidgetLocation = {
  start: number;
  end: number;
  color: [number, number, number];
};

type AutocompleteOption = {
  completedText: string;
  type: "variable" | "function" | "scope" | "macro";
};

export type LanguageSupportFeatures = {
  // added to make RPC easier to implement
  compile: (
    entryPoint: string,
    options: Omit<CompileDesmoscriptSettings, "io">
  ) => Promise<CompilerOutput>;

  // pass in a handler to highlight the syntax of everything in a given file
  highlightSyntax: (filename: string) => Promise<HighlightData[]>;

  // pass in a handler to get definition info of everything in a file
  // for implemeting "go to definition" functionality
  getDefinitions: (filename: string) => Promise<Definition[]>;

  goToDefinition(
    filename: string,
    position: number
  ): Promise<{ unit: string; start: number; end: number } | undefined>;

  getErrors: (filename: string) => Promise<Diagnostic[]>;

  getColors: (filename: string) => Promise<ColorWidgetLocation[]>;

  getAutocomplete: (
    filename: string,
    position: number
  ) => Promise<AutocompleteOption[]>;

  formatFile(filename: string): Promise<string | undefined>;

  onHover: (filename: string, position: number) => Promise<string | undefined>;

  // for files being updated by vscode but haven't been saved
  updateFile: (filename: string, src: string) => void;

  getOpenFilePaths: () => string[];
};

type RecompileResult = {
  erroredAt?: "import" | "scopes" | "typechecking";
  errors: CompilerError[];
  sourceCode: Map<string, { src: string; linesAndCols: [number, number][] }>;
  highlightsMap?: Map<string, Highlights>;
  compilationUnits?: Map<string, CompilationUnit>;
};

export type ImportScriptsMap = Map<string, { run: DesmoCallback }>;

function findSmallestEnclosingScope(scope: Scope, position: number): Scope {
  for (const [itemName, item] of scope.elements) {
    if (
      item.type == "scope" &&
      position >= item.start &&
      position <= item.end
    ) {
      return findSmallestEnclosingScope(item.scope, position);
    }
  }
  return scope;
}

// i'll probably have chokidar support later so that changes from
// other sources can be properly picked up
export function compileDesmoscriptForLanguageSupport(
  io: IOInterface
): LanguageSupportFeatures {
  const unsavedFiles = new Map<string, string>();

  const watchFiles = new Set<string>();

  async function recompile(entryPoint: string): Promise<RecompileResult> {
    if (cachedRecompilation) return cachedRecompilation;

    const imports = new Map<
      string,
      {
        name: string;
        src: string;
        ast: ASTNode;
      }
    >();

    const importScripts: ImportScriptsMap = new Map();

    const sourceCode = new Map<
      string,
      { src: string; linesAndCols: [number, number][] }
    >();

    const errors: CompilerError[] = [];

    const compilationUnits = new Map<string, CompilationUnit>();

    const alreadyVisitedFiles = new Set<string>();

    const highlightsMap = new Map<string, Highlights>();

    // lex/parse entry point and import all files
    await resolveFileImports(entryPoint, entryPoint, undefined, {
      imports,
      sourceCode,
      lexAndParse,
      errors,
      getFile: async (filepath) => {
        if (unsavedFiles.has(filepath))
          return unsavedFiles.get(filepath) as string;
        return uint8ArrayToString(await io.readFile(filepath));
      },
      highlightsMap,
      io,
      watchFiles,
      importScripts,
    });

    // create scope trees for everything
    resolveScopes(
      entryPoint,
      entryPoint,
      alreadyVisitedFiles,
      errors,
      imports,
      compilationUnits,
      io,
      importScripts
    );

    const getAbsolutePath = (cwdfile: string, path: string) =>
      io.resolvePath(io.dirname(cwdfile), path);

    await handleMacros(
      compilationUnits,
      alreadyVisitedFiles,
      errors,
      imports,
      sourceCode,
      io,
      watchFiles,
      importScripts,
      getAbsolutePath
    );

    const astNodes =
      createASTLookupTableMultipleCompilationUnits(compilationUnits);

    // typecheck everything
    const entryPointFullPath = io.resolvePath(entryPoint);
    const entryCompilationUnit = assertNotUndefined(
      compilationUnits.get(entryPointFullPath),
      `${entryPointFullPath} not found in compileDesmoscriptForLanguageSupport (available are ${JSON.stringify(
        Array.from(compilationUnits.keys())
      )}) (sourcecode: ${JSON.stringify(Array.from(sourceCode.keys()))})`
    );

    errors.push(
      ...(typecheckScopeTree(entryCompilationUnit.scopeTree, {
        units: compilationUnits,
        unitName: entryPointFullPath,
        astNodes,
        dependencyChain: new Map(),
        knownTypes: new Map(),
        knownCircularDependencies: new Set(),
      })?.why ?? [])
    );

    cachedRecompilation = {
      errors,
      compilationUnits,
      sourceCode,
      highlightsMap,
    };

    return cachedRecompilation;
  }

  let cachedRecompilation: RecompileResult | undefined;

  return {
    getOpenFilePaths: () => Array.from(watchFiles),

    compile: (entry, opts) =>
      compileDesmoscript(entry, {
        ...opts,
        io,
      }),

    updateFile(filename, src) {
      cachedRecompilation = undefined;
      unsavedFiles.set(filename, src);
    },

    async highlightSyntax(filename) {
      console.log("GOT HERE!", filename);

      const ctx = await recompile(filename);
      const code = ctx.sourceCode.get(filename);

      console.log("highlightSyntax", filename, ctx);

      if (!code) return [];

      const highlightData: HighlightData[] = [];

      const handler = (
        str: string,
        start: number,
        end: number,
        type: SyntaxHighlightingType
      ) => {
        if (start == end) return;
        const splitStr = str.split("\n");
        for (const substr of splitStr) {
          let end = start + substr.length;
          highlightData.push({
            start,
            end,
            type,
            token: substr,
          });
          start = end + 1;
        }
      };

      if (!ctx.highlightsMap) return highlightData;
      const highlights = ctx.highlightsMap.get(filename);
      if (highlights) {
        for (const hl of highlights) {
          highlightData.push({
            start: hl.start,
            end: hl.end,
            type: hl.type,
            token: code.src.slice(hl.start, hl.end),
          });
        }
      }

      if (!ctx.compilationUnits) return highlightData;
      const unit = ctx.compilationUnits.get(filename);
      if (!unit) return highlightData;

      forEachAST(unit.ast, undefined, (node) => {
        if (!ctx.compilationUnits) return;
        if (node.type == "identifier") {
          const def = findIdentifierScopeItem(
            unit,
            (node as Scoped<IdentifierNode>).enclosingScope,
            node.segments,
            { compilationUnits: ctx.compilationUnits }
          );

          if (def.result != "found") return;

          handler(
            node.segments[node.segments.length - 1],
            node.start +
              node.segments.slice(0, -1).join(".").length +
              (node.segments.length > 1 ? 1 : 0),
            node.end,
            (
              {
                variable: "variable",
                function: "function",
                scope: "namespace",
                "builtin-variable": "variable",
                "builtin-function": "function",
                note: "string",
                macro: "macro",
                expression: "variable",
                import: "namespace",
                settings: "variable",
              } as const
            )[def.identifier.type]
          );
          return;
        }
      });

      return highlightData;
    },

    async getDefinitions(filename) {
      const ctx = await recompile(filename);
      if (!ctx.compilationUnits) return [];
      const unit = ctx.compilationUnits.get(filename);
      if (!unit) return [];

      const defs: Definition[] = [];

      forEachAST(unit.ast, undefined, (node) => {
        if (!ctx.compilationUnits) return [];
        if (node.type == "identifier") {
          const def = findIdentifierScopeItem(
            unit,
            (node as Scoped<IdentifierNode>).enclosingScope,
            node.segments,
            { compilationUnits: ctx.compilationUnits }
          );

          if (def.result != "found") return [];
          if (
            def.identifier.type != "function" &&
            def.identifier.type != "variable"
          )
            return [];

          defs.push({
            name: node.segments.join("."),
            start: node.start,
            end: node.end,
            definitionFile: def.identifier.unitName,
            definitionStart: def.identifier.start,
            definitionEnd: def.identifier.end,
          });
        }
        return [];
      });

      return defs;
    },

    async goToDefinition(filename, position) {
      const ctx = await recompile(filename);
      if (!ctx.compilationUnits) return;
      const unit = ctx.compilationUnits.get(filename);
      if (!unit) return;

      let clickedOnNode: Scoped<IdentifierNode> | undefined;
      forEachAST(unit.ast, undefined, (node) => {
        if (!ctx.compilationUnits) return;
        if (
          node.type == "identifier" &&
          position >= node.start &&
          position <= node.end
        )
          clickedOnNode = node as Scoped<IdentifierNode>;
      });

      if (!clickedOnNode) return;

      const def = findIdentifierScopeItem(
        unit,
        clickedOnNode.enclosingScope,
        clickedOnNode.segments,
        { compilationUnits: ctx.compilationUnits }
      );

      if (def.result != "found") return;
      if (
        def.identifier.type != "function" &&
        def.identifier.type != "variable"
      )
        return;

      return {
        start: def.identifier.start,
        end: def.identifier.end,
        unit: def.identifier.unitName,
      };
    },

    async getErrors(filename) {
      const ctx = await recompile(filename);

      const errs: Diagnostic[] = [];

      const handler = (start: number, end: number, reason: string) => {
        errs.push({ start, end, reason });
      };

      for (const err of ctx.errors) {
        if (err.unit == filename) {
          handler(
            err.start,
            err.end,
            formatError(
              {
                format: (str, opts) => str,
                entry: filename,
                sourceCode: ctx.sourceCode,
                maxWidth: 80,
                hideSourceCode: true,
                io,
              },
              err
            )
          );

          if (err.type == "circular-dependency") {
            for (const patherr of err.path) {
              handler(
                patherr.start,
                patherr.end,
                "this is part of a circular dependency chain"
              );
            }
          }
        }
      }

      return errs;
    },

    async formatFile(filename) {
      const ctx = await recompile(filename);
      if (!ctx.compilationUnits) return;
      const unit = ctx.compilationUnits.get(filename);
      if (!unit) return undefined;

      const fmtted = formatAST(unit.ast);

      const flexed = lex(fmtted, unit.name, []);

      const fast = parse(flexed, unit.name, []);

      // make sure formatter is implemented properly
      // if formatted AST doesn't match wtih non formatted AST, then
      // don't accept the result
      const astComparison = compareAST(unit.ast, fast);
      if (astComparison.length > 0) {
        debugPrint("AST DIFFERENCE IN FORMATTER: ", astComparison);
        return;
      }

      return fmtted;
    },

    async getColors(filename) {
      const ctx = await recompile(filename);
      if (!ctx.compilationUnits) return [];
      const unit = ctx.compilationUnits.get(filename);
      if (!unit) return [];

      const ast = unit.ast;

      const colors: ColorWidgetLocation[] = [];

      forEachAST(ast, undefined, (node) => {
        if (
          node.type == "fncall" &&
          node.name.segments[0] == "rgb" &&
          node.params[0]?.type == "number" &&
          node.params[1]?.type == "number" &&
          node.params[2]?.type == "number"
        ) {
          colors.push({
            start: node.start,
            end: node.end,
            color: [
              node.params[0].number,
              node.params[1].number,
              node.params[2].number,
            ],
          });
        }
      });

      return colors;
    },

    async getAutocomplete(filename, position) {
      const ctx = await recompile(filename);
      if (!ctx.compilationUnits) return [];
      const unit = ctx.compilationUnits.get(filename);
      if (!unit) return [];

      const suggestions: AutocompleteOption[] = [];

      const searchScope = findSmallestEnclosingScope(unit.scopeTree, position);

      let searchString = "";
      let pos = position - 1;
      while (unit.src[pos] && unit.src[pos].match(/[a-zA-Z_0-9\.]/g)) {
        searchString = unit.src[pos] + searchString;
        pos--;
      }
      pos = position;
      while (unit.src[pos] && unit.src[pos].match(/[a-zA-Z_0-9\.]/g)) {
        searchString += unit.src[pos];
        pos++;
      }

      const segments = searchString.split(".");

      const pathToFinalScope = segments.slice(0, -1);
      const lastSegment = segments[segments.length - 1];

      let innerScope: Scope;

      if (pathToFinalScope.length != 0) {
        const scopeItem = findIdentifierScopeItem(
          unit,
          searchScope,
          pathToFinalScope,
          { compilationUnits: ctx.compilationUnits }
        );

        if (scopeItem.result != "found") return [];
        if (scopeItem.identifier.type != "scope") return [];

        innerScope = scopeItem.identifier.scope;
      } else {
        innerScope = searchScope;
      }

      for (const [itemName, item] of innerScope.elements) {
        if (itemName.startsWith(lastSegment)) {
          const suggestion = itemName;

          let completionType: "variable" | "function" | "macro" | "scope" =
            "variable";
          switch (item.type) {
            case "function":
            case "builtin-function":
              completionType = "function";
            case "macro":
              completionType = "macro";
            case "scope":
              completionType = "scope";
          }

          suggestions.push({ completedText: suggestion, type: completionType });
        }
      }

      return suggestions;
    },

    async onHover(filename, position) {
      const ctx = await recompile(filename);
      if (!ctx.compilationUnits) return;
      const unit = ctx.compilationUnits.get(filename);
      if (!unit) return undefined;

      let hoverASTNode: Scoped<ASTNode> | undefined;

      forEachAST(unit.ast, undefined, (node) => {
        if (position >= node.start && position <= node.end) {
          if (node.type == "macrocall") {
            hoverASTNode = node as Scoped<ASTNode>;
          }
        }
      });

      if (!hoverASTNode) return;

      if (
        hoverASTNode.type == "macrocall" &&
        hoverASTNode.result &&
        !(hoverASTNode.result instanceof Promise)
      ) {
        return `Evaluates to:\n${formatAST(hoverASTNode.result)}`;
      }
    },
  };
}
