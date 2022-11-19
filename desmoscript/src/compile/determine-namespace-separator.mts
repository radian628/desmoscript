import * as path from "node:path";
import { DesmoscriptCompileContext, Scope, ScopeContent } from "../semantic-analysis/analysis-types.mjs";

// determines what string to use for separating namespaces while completely
// avoiding namespace collisions
export function determineNamespaceSeparator(ctx: DesmoscriptCompileContext) {
  // get names from all scope trees
  function getScopeTreeNames(scope: Scope) {
    for (const [contentName, content] of scope.contents) {
      ctx.existingNames.add(contentName);
      if (content.type == ScopeContent.Type.SCOPE) {
        getScopeTreeNames(content.data);
      }
    }
  }

  for (const [unitName, unit] of ctx.compilationUnits) {
    getScopeTreeNames(unit.rootScope);
  }

  const fileNames = new Set<string>();

  for (const [unitFilePath, unit] of ctx.compilationUnits) {
    let initProposedName = path.parse(unitFilePath).name.replace(/[^a-zA-Z]/g, "");
    let proposedName = initProposedName;
    let disambiguator = 1;
    while (ctx.existingNames.has(proposedName)) {
      proposedName = initProposedName + disambiguator;
      disambiguator += 1;
    }

    ctx.existingNames.add(proposedName);
    ctx.compilationUnitPrefixes.set(unitFilePath, proposedName);
  }

  let nssep = "X";
  let nssep2 = nssep;
  let nssepDisambiguator = 0;
  while (ctx.existingNames.has(nssep2)) {
    nssep2 = nssep + nssepDisambiguator;
    nssepDisambiguator += 1;
  }
  ctx.namespaceSeparator = nssep2;
}
