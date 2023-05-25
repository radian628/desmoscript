import {
  CompilationState,
  CompilationUnit,
  scopeTree,
} from "./compiler-state.mjs";
import { desmoscriptFileToAST } from "./ast/parse.mjs";
import { createScopeTree } from "./create-scope-tree.mjs";
import { resolveMacroSubstitutions } from "./resolve-macro-substitutions.mjs";
import { liftMacroPromises } from "./ast/traversal.mjs";
import { compileDesmoscriptState } from "./compile/compile.mjs";

import * as path from "node:path";

export async function promiseAllMap<T, U>(map: Map<T, Promise<U>>) {
  return new Map(
    await Promise.all(
      Array.from(map.entries()).map(async ([k, v]) => {
        return [k, await v] as const;
      })
    )
  );
}

export async function compileDesmoscript(options: {
  entryPoint: string;
  makeDefaultScopeTree: () => Map<string, scopeTree.ScopeContent>;
}) {
  // list of files being compiled
  const awaitingCompilationUnits = new Map<
    string,
    Promise<CompilationUnit<"withscope">>
  >();
  const filesThatExist = new Set<string>();
  const compilationUnitVarNames = new Map<string, string>();

  function addCompUnitVarName(filepath: string) {
    if (compilationUnitVarNames.has(filepath)) return;
    const basename = path.basename(filepath).replace(/[^a-zA-z0-9]/g, "");

    let numAppend = 1;
    let varname = basename;

    while (compilationUnitVarNames.has(varname)) {
      varname = basename + numAppend;
      numAppend++;
    }

    compilationUnitVarNames.set(filepath, varname);
  }

  // recursively import files, skipping already-imported ones
  async function importFile(filepath: string) {
    if (filesThatExist.has(filepath)) return;
    addCompUnitVarName(filepath);
    filesThatExist.add(filepath);
    const astPromise = desmoscriptFileToAST(options.entryPoint);
    awaitingCompilationUnits.set(
      filepath,
      astPromise.then((ast1) => {
        const scopeTreeCreationResults = createScopeTree<"root">(
          ast1,
          filepath,
          importFile,
          options.makeDefaultScopeTree
        );
        return {
          path: filepath,
          ast: scopeTreeCreationResults.ast,
          scopeTree: scopeTreeCreationResults.scope,
        };
      })
    );
  }

  // import entry point
  importFile(path.resolve(options.entryPoint));

  // wait for all compilation units to finish processing
  const compilationUnits = await promiseAllMap(awaitingCompilationUnits);

  const compilerState: CompilationState<"withscope"> = {
    units: compilationUnits,
    names: new Set(),
    unitNameMap: compilationUnitVarNames,
    entryPointURL: path.resolve(options.entryPoint),
  };

  let compilationUnitsWithMacros: Map<
    string,
    CompilationUnit<"withscope" | "macrosubsync">
  > = compilationUnits;

  // resolve macros
  for (let i = 0; i < 10; i++) {
    // generate macro substitutions
    const compilationUnitsWithAwaitingMacros = new Map<
      string,
      CompilationUnit<"macrosub">
    >();
    for (const [k, v] of compilationUnits) {
      compilationUnitsWithAwaitingMacros.set(k, {
        ...v,
        ast: resolveMacroSubstitutions<"root">(
          compilerState,
          v,
          v.ast,
          importFile,
          options.makeDefaultScopeTree
        ),
      });
    }

    let compilationUnitsKVPairs = Array.from(
      compilationUnitsWithAwaitingMacros.entries()
    ).map(async ([k, v]) => {
      const unit: CompilationUnit<"macrosubsync"> = {
        ...v,
        ast: await liftMacroPromises<"root">(v.ast),
      };
      return [k, unit] as const;
    });

    // wait for all macro substitutions to complete before attempting to resolve further
    compilationUnitsWithMacros = new Map(
      await Promise.all(compilationUnitsKVPairs)
    );
  }

  return {
    graphState: compileDesmoscriptState({
      ...compilerState,
      units: compilationUnitsWithMacros as Map<
        string,
        CompilationUnit<"macrosubsync">
      >,
    }),
    usedFiles: filesThatExist,
  };
}
