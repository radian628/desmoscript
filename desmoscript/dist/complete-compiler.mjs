import { desmoscriptFileToAST } from "./ast/parse.mjs";
import { createScopeTree } from "./create-scope-tree.mjs";
import { resolveMacroSubstitutions } from "./resolve-macro-substitutions.mjs";
import { liftMacroPromises } from "./ast/traversal.mjs";
import { compileDesmoscriptState } from "./compile/compile.mjs";
import * as path from "node:path";
export async function promiseAllMap(map) {
    return new Map(await Promise.all(Array.from(map.entries()).map(async ([k, v]) => {
        return [k, await v];
    })));
}
export async function compileDesmoscript(options) {
    // list of files being compiled
    const awaitingCompilationUnits = new Map();
    const filesThatExist = new Set();
    const compilationUnitVarNames = new Map();
    function addCompUnitVarName(filepath) {
        if (compilationUnitVarNames.has(filepath))
            return;
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
    async function importFile(filepath) {
        if (filesThatExist.has(filepath))
            return;
        addCompUnitVarName(filepath);
        filesThatExist.add(filepath);
        const astPromise = desmoscriptFileToAST(options.entryPoint);
        awaitingCompilationUnits.set(filepath, astPromise.then((ast1) => {
            const scopeTreeCreationResults = createScopeTree(ast1, filepath, importFile, options.makeDefaultScopeTree);
            return {
                path: filepath,
                ast: scopeTreeCreationResults.ast,
                scopeTree: scopeTreeCreationResults.scope,
            };
        }));
    }
    // import entry point
    importFile(path.resolve(options.entryPoint));
    // wait for all compilation units to finish processing
    const compilationUnits = await promiseAllMap(awaitingCompilationUnits);
    const compilerState = {
        units: compilationUnits,
        names: new Set(),
        unitNameMap: compilationUnitVarNames,
        entryPointURL: path.resolve(options.entryPoint),
    };
    let compilationUnitsWithMacros = compilationUnits;
    // resolve macros
    for (let i = 0; i < 10; i++) {
        // generate macro substitutions
        const compilationUnitsWithAwaitingMacros = new Map();
        for (const [k, v] of compilationUnits) {
            compilationUnitsWithAwaitingMacros.set(k, {
                ...v,
                ast: resolveMacroSubstitutions(compilerState, v, v.ast, importFile, options.makeDefaultScopeTree),
            });
        }
        let compilationUnitsKVPairs = Array.from(compilationUnitsWithAwaitingMacros.entries()).map(async ([k, v]) => {
            const unit = {
                ...v,
                ast: await liftMacroPromises(v.ast),
            };
            return [k, unit];
        });
        // wait for all macro substitutions to complete before attempting to resolve further
        compilationUnitsWithMacros = new Map(await Promise.all(compilationUnitsKVPairs));
    }
    return {
        graphState: compileDesmoscriptState({
            ...compilerState,
            units: compilationUnitsWithMacros,
        }),
        usedFiles: filesThatExist,
    };
}
