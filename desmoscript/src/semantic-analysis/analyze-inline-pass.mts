import {
  DesmoscriptCompilationUnit,
  DesmoscriptCompileContext,
  Scope,
  ScopeContent
} from "./analysis-types.mjs";
import { ASTVisitorLUT, mapAST, noOpLUT, visitAST } from "../ast/ast-visitor.mjs";

import { findIdentifier, FindIdentifierSuccess, findIdentifierWithErrorFeedback, getHumanReadablePath, getScopeOfExpr } from "./analyze-utils.mjs";
import { err } from "./analyze-scope-pass.mjs";
import { ASTIdentifier } from "../ast/ast.mjs";
import { getIdentifierSubstitution, getMacroSubstitution, lastof } from "../compile/compile.mjs";


function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function createNameForIdentifier(
  compileContext: DesmoscriptCompileContext,
  identInfo: FindIdentifierSuccess,
  identName: string
) {
  if (compileContext.identifierInfo.has(identInfo.result.id)) return;

  const scopePath = getHumanReadablePath(identInfo.enclosingScope).reverse().map(s => capitalize(s));
  let proposedName = capitalize(identName);
  let nameWithoutNumber = identName;
  let counter = 0;
  function changeName() {
    if (scopePath.length > 0) {
      proposedName = scopePath.pop() + proposedName;
      if (proposedName[0] >= "0" && proposedName[0] <= "9") 
        proposedName = "v" + proposedName;
      if (scopePath.length == 0) {
        nameWithoutNumber = proposedName;
      }
    } else {
      proposedName = nameWithoutNumber + (counter++);
    }
  }

  while (compileContext.existingNames.has(proposedName)) {
    changeName();
  }

  let isInlineable = true;
  if (identInfo.result.type == ScopeContent.Type.FUNCTION) isInlineable = !identInfo.result.isBuiltin;
  if (identInfo.result.type == ScopeContent.Type.VARIABLE) isInlineable = !identInfo.result.isBuiltin;

  compileContext.existingNames.add(proposedName);
  compileContext.identifierInfo.set(
    identInfo.result.id,
    {
      name: proposedName,
      uses: 0,
      isInlineable
    }
  )
}

export async function reserveBuiltins(
  compileContext: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit
) {

  function s(scope: Scope) {
    for (const [contentName, content] of scope.contents) {
      if (content.type == ScopeContent.Type.FUNCTION || content.type == ScopeContent.Type.VARIABLE) {
        if (content.isPartOfDesmos) {
          compileContext.identifierInfo.set(content.id, {
            name: contentName,
            uses: 0,
            isInlineable: false
          });
          compileContext.existingNames.add(contentName);
        }
      } else if (content.type == ScopeContent.Type.SCOPE) {
        s(content.data);
      }
    }
  }
  s(unit.rootScope);
}

export async function getVariableNamesAndSubstitutions(
  compileContext: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit,
) {
 
  function s(scope: Scope) {
    for (const [contentName, content] of scope.contents) {
      if (content.type == ScopeContent.Type.FUNCTION || content.type == ScopeContent.Type.VARIABLE) {
        createNameForIdentifier(compileContext, {
          success: true,
          enclosingScope: scope,
          result: content,
          unit: unit.filePath
        }, contentName);
      } else if (content.type == ScopeContent.Type.SCOPE) {
        s(content.data);
      }
    }
  }

  s(unit.rootScope);
}


export async function enumerateUses(
  compileContext: DesmoscriptCompileContext,
  unit: DesmoscriptCompilationUnit
) {
  await visitAST(unit.ast, {
    ...noOpLUT(Promise.resolve()),
    async fncall(e, ctx, v) {
      if (e.isMacro) {
        await v(getMacroSubstitution(unit, e), ctx);
      } else {
        await v(e.name, ctx);
        for (let arg of e.args) await v(arg, ctx);
      }
    },

    async identifier(e, ctx, v) {      
      const myScope = getScopeOfExpr(e, unit);

      const foundIdentifier = findIdentifierWithErrorFeedback(
        myScope,
        compileContext,
        unit.filePath,
        e.segments,
        e
      );

      const identInfo = compileContext.identifierInfo.get(foundIdentifier.result.id);

      if (!identInfo) err(e, `INTERNAL ERROR: Failed to get identifier info during use enumeration pass.`);

      identInfo.uses += 1;
    }
  }, undefined);
}