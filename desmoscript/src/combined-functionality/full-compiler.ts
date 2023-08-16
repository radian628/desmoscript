import {
  ASTNode,
  CompilationUnit,
  Scoped,
  forEachAST,
  forEachASTAsync,
  getErrors,
  writeASTDebug,
} from "../ast/ast.js";
import {
  CodegenContext,
  CodegenError,
  defaultGraphstate,
  generateCode,
} from "../codegen/codegen.js";
import { GraphState } from "../codegen/graphstate.js";
import {
  CompilerError,
  Result,
  compilerError,
  err,
  ok,
} from "../compiler-errors.js";
import { lex, streamify } from "../parse/lex.js";
import { Highlights, parse } from "../parse/parse.js";
import {
  ASTScopingContext,
  addScopesToAST,
  newScope,
} from "../scope-tree/create-scope-tree.js";
import { DesmoCallback, getLinesAndCols } from "../index.js";
import { typecheckScopeTree } from "../scope-tree/typecheck/typecheck.js";
import { TypeError } from "../scope-tree/typecheck/type-errors.js";
import { addStdlibToScope } from "../stdlib/stdlib.js";

import { resolveFileImports } from "../scope-tree/resolve-imports.js";

import { assertNotUndefined } from "../compiler-errors.js";
import {
  InstantiateMacroContext,
  instantiateMacros,
  resolveMacros,
} from "../macro/instantiate-macros.js";
import { IOInterface, uint8ArrayToString } from "../io/io.js";
import { ImportScriptsMap } from "./language-support-compiler.js";
import { formatAST } from "../ast/fmt.js";

export type CompilerOutput =
  | {
      type: "error";
      errors: (CompilerError | TypeError | CodegenError)[];
      sourceCode: Map<
        string,
        { src: string; linesAndCols: [number, number][] }
      >;
    }
  | {
      type: "success";
      errors: (CompilerError | TypeError | CodegenError)[];
      sourceCode: Map<
        string,
        { src: string; linesAndCols: [number, number][] }
      >;
      state: GraphState;
    };

export type CompileDesmoscriptSettings = {
  unsavedFiles: Map<string, string>;
  io: IOInterface;
  watchFiles: Set<string>;

  options: CodegenContext["options"];
};

export function lexAndParse(
  filename: string,
  src: string,
  errors: CompilerError[],
  highlights?: Highlights
): ASTNode {
  const tokens = lex(src, filename, errors);

  const ast = parse(tokens, filename, errors, highlights);

  return ast;
}

export function resolveScopes(
  filename: string,
  importer: string,
  alreadyVisitedFiles: Set<string>,
  errors: (CompilerError | TypeError | CodegenError)[],
  imports: Map<
    string,
    {
      name: string;
      src: string;
      ast: ASTNode;
    }
  >,
  compilationUnits: Map<string, CompilationUnit>,
  io: IOInterface,
  importScripts: ImportScriptsMap
) {
  const fullFilename = io.resolvePath(io.dirname(importer), filename);
  if (alreadyVisitedFiles.has(fullFilename)) return fullFilename;

  const fileinfo = imports.get(fullFilename);

  if (!fileinfo) {
    errors.push(compilerError("BAD IMPORT", 0, 0, filename));
    return "";
  }

  alreadyVisitedFiles.add(fullFilename);

  const getAbsolutePath = (cwdfile: string, path: string) =>
    io.resolvePath(io.dirname(cwdfile), path);

  const scopingContext: ASTScopingContext = {
    resolveImport: (filename, importer) =>
      resolveScopes(
        filename,
        importer,
        alreadyVisitedFiles,
        errors,
        imports,
        compilationUnits,
        io,
        importScripts
      ),
    unit: fullFilename,
    errors: errors,
    importScripts,
    getAbsolutePath,
  };

  const rootScope = newScope(
    undefined,
    "",
    scopingContext,
    0,
    fileinfo.src.length
  );
  addStdlibToScope(rootScope, scopingContext);

  const scopedAST = addScopesToAST(
    fileinfo.ast,
    {
      scope: rootScope,
      isValueBlock: false,
    },
    scopingContext
  );

  compilationUnits.set(fullFilename, {
    scopeTree: scopedAST.enclosingScope,
    name: fullFilename,
    src: fileinfo.src,
    linesAndCols: getLinesAndCols(fileinfo.src),
    ast: scopedAST,
  });

  return fullFilename;
}

export async function handleMacros(
  compilationUnits: Map<string, CompilationUnit>,
  alreadyVisitedFiles: Set<string>,
  errors: (CompilerError | TypeError | CodegenError)[],
  imports: Map<
    string,
    {
      name: string;
      src: string;
      ast: ASTNode;
    }
  >,
  sourceCode: Map<string, { src: string; linesAndCols: [number, number][] }>,
  io: IOInterface,
  watchFiles: Set<string>,
  importScripts: ImportScriptsMap,
  getAbsolutePath: (cwdfile: string, path: string) => string
) {
  // resolve all macros
  for (let i = 0; i < 100; i++) {
    let keepOnInstantiating = false;
    const macroResolvers: Promise<void>[] = [];
    for (const unit of compilationUnits.values()) {
      const mctx: InstantiateMacroContext = {
        unit: unit.name,
        units: compilationUnits,
        resolveImport: (str, importer) =>
          resolveScopes(
            str,
            importer,
            alreadyVisitedFiles,
            errors,
            imports,
            compilationUnits,
            io,
            importScripts
          ),
        sourceCode,
        errors,
        io,
        watchFiles: watchFiles,
        importScripts,
        getAbsolutePath,
      };
      keepOnInstantiating ||= instantiateMacros(unit.ast, mctx);
      macroResolvers.push(resolveMacros(unit.ast, mctx));
    }
    await Promise.all(macroResolvers);
    if (!keepOnInstantiating) break;
    if (i == 100) {
      // TODO: better error feedback
      errors.push(
        compilerError("maximum macro instantiation depth exceeded", 0, 0, "")
      );
    }
  }
}

export function createASTLookupTable(
  ast: Scoped<ASTNode>,
  astNodes: Map<number, Scoped<ASTNode>>
) {
  forEachAST<undefined>(ast, undefined, (node, ctx) => {
    astNodes.set(node.id, node as Scoped<ASTNode>);
    return undefined;
  });
}

export function createASTLookupTableSingleCompilationUnit(
  unit: CompilationUnit,
  astNodes: Map<number, Scoped<ASTNode>>
) {
  createASTLookupTable(unit.ast, astNodes);
}

export function createASTLookupTableMultipleCompilationUnits(
  compilationUnits: Map<string, CompilationUnit>
): Map<number, Scoped<ASTNode>> {
  // get a LUT containing every AST node (will be useful later)
  const astNodes = new Map<number, Scoped<ASTNode>>();
  for (const unit of compilationUnits.values()) {
    createASTLookupTableSingleCompilationUnit(unit, astNodes);
  }
  return astNodes;
}

export async function compileDesmoscript(
  entryPoint: string,
  settings: CompileDesmoscriptSettings
): Promise<CompilerOutput> {
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

  const errors: (CompilerError | CodegenError)[] = [];

  const compilationUnits = new Map<string, CompilationUnit>();

  const alreadyVisitedFiles = new Set<string>();

  // lex/parse entry point and import all files
  await resolveFileImports(entryPoint, entryPoint, undefined, {
    imports,
    sourceCode,
    lexAndParse,
    errors,
    getFile: async (filepath) => {
      if (settings.unsavedFiles.has(filepath)) {
        const unsavedFile = settings.unsavedFiles.get(filepath) as string;
        return unsavedFile;
      }
      const unsavedFile = uint8ArrayToString(
        await settings.io.readFile(filepath)
      );
      return unsavedFile;
    },
    io: settings.io,
    watchFiles: settings.watchFiles,
    importScripts,
  });
  if (errors.length > 0)
    return {
      type: "error",
      errors,
      sourceCode,
    };

  // create scope trees for everything
  resolveScopes(
    entryPoint,
    entryPoint,
    alreadyVisitedFiles,
    errors,
    imports,
    compilationUnits,
    settings.io,
    importScripts
  );
  if (errors.length > 0) return { type: "error", errors, sourceCode };

  const getAbsolutePath = (cwdfile: string, path: string) =>
    settings.io.resolvePath(settings.io.dirname(cwdfile), path);

  await handleMacros(
    compilationUnits,
    alreadyVisitedFiles,
    errors,
    imports,
    sourceCode,
    settings.io,
    settings.watchFiles,
    importScripts,
    getAbsolutePath
  );

  const astNodes =
    createASTLookupTableMultipleCompilationUnits(compilationUnits);

  // typecheck everything
  const entryPointFullPath = settings.io.resolvePath(
    settings.io.dirname(entryPoint),
    entryPoint
  );
  const entryCompilationUnit = assertNotUndefined(
    compilationUnits.get(entryPointFullPath),
    `${entryPointFullPath} not found in compileDesmoscript`
  );
  const typeErrors1 = typecheckScopeTree(entryCompilationUnit.scopeTree, {
    units: compilationUnits,
    unitName: entryPointFullPath,
    astNodes,
    dependencyChain: new Map(),
    knownTypes: new Map(),
    knownCircularDependencies: new Set(),
  }) ?? { why: [] };
  errors.push(...typeErrors1.why);

  // generate code
  const codegenErrors: CodegenError[] = [];
  const state = defaultGraphstate();
  const generatedCode = generateCode({
    units: compilationUnits,
    currentUnit: settings.io.resolvePath(entryPoint),
    identifierNames: new Map(),
    existingNames: new Set(),
    astNodes,
    state,
    alreadyCompiledUnits: new Set(),
    alreadyGeneratedBlockFinalExpressionIDs: new Set(),
    errors: codegenErrors,
    options: settings.options,
  });

  return {
    type: "success",
    errors: [...errors, ...codegenErrors],
    state,
    sourceCode,
  };
}
