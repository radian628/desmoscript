import { ast } from "./ast/ast.mjs";
import {
  CompilationState,
  CompilationUnit,
  scopeTree,
} from "./compiler-state.mjs";
import { errFull, ierr } from "./error-handling.mjs";
import * as path from "node:path";

export function getCompilationUnit<T extends ast.URIS>(
  state: CompilationState<T>,
  unitName: string
) {
  const unitObj = state.units.get(unitName);

  if (!unitObj) {
    errFull(
      -1,
      -1,
      unitName,
      `INTERNAL ERROR: Could not find file '${unitName}'.`
    );
  }

  return unitObj;
}

function lookupScopeTreeItemNoBacktracking<T extends ast.URIS>(
  state: CompilationState<T>,
  unit: CompilationUnit<T>,
  startingScope: scopeTree.ScopeContent | undefined,
  path: string[]
):
  | {
      scope: scopeTree.ScopeContent;
      unit: CompilationUnit<T>;
    }
  | undefined {
  if (!startingScope) return undefined;

  if (path.length == 0) {
    return { scope: startingScope, unit };
  }

  const scopeTreeItem = startingScope;
  if (scopeTreeItem) {
    switch (scopeTreeItem.type) {
      case "scope":
        return lookupScopeTreeItemNoBacktracking(
          state,
          unit,
          scopeTreeItem.contents.get(path[0]),
          path.slice(1)
        );
      case "import":
        const newUnit = getCompilationUnit(state, scopeTreeItem.path);
        return lookupScopeTreeItemNoBacktracking(
          state,
          newUnit,
          newUnit.scopeTree,
          path.slice(1)
        );
      default:
        return undefined;
    }
  } else {
    return undefined;
  }
}

export function lookupScopeTreeItem<T extends ast.URIS>(
  state: CompilationState<T>,
  unit: CompilationUnit<T>,
  startingScope: scopeTree.Scope,
  path: string[]
) {
  let searchScope: scopeTree.Scope | undefined = startingScope;
  while (searchScope) {
    const candidate = lookupScopeTreeItemNoBacktracking(
      state,
      unit,
      searchScope,
      path
    );
    if (candidate) return candidate;
    searchScope = searchScope.parent;
  }
  return undefined;
}

export function scopeTreeNameRelativeToRoot<T extends ast.URIS>(
  state: CompilationState<T>,
  unit: CompilationUnit<T>,
  content?: scopeTree.ScopeContent
): string[] {
  if (!content) return [unit.path];
  return [
    ...scopeTreeNameRelativeToRoot(state, unit, content.parent),
    content.name,
  ];
}

export function mapGetErr<K, V>(map: Map<K, V>, key: K, node: ast.Node) {
  if (!map.has(key)) ierr(node, "Map lookup failed.");
  const v = map.get(key) as V;
  return v;
}

function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

function toDesmosVar(str: string) {
  return `${str[0]}_{${str.slice(1)}}`;
}

export function getCanonicalIdentifierName<T extends ast.URIS>(
  scope: scopeTree.Scope,
  state: CompilationState<T>,
  unit: CompilationUnit<T>,
  associatedNode: ast.Node,
  additionalNames: string[]
) {
  // find out what item in the scope tree this thing is referring to
  const lookup = lookupScopeTreeItem(state, unit, scope, additionalNames);

  // exit early if nothing found
  if (!lookup) return undefined;

  // these cases don't make sense to lookup
  if (
    lookup.scope.type == "macro" ||
    lookup.scope.type == "namedjson" ||
    lookup.scope.type == "import" ||
    lookup.scope.type == "scope"
  )
    return undefined;

  // different rules for builtin variables
  if (lookup.scope.data.type == "builtin") {
    return `\\operatorname{${lookup.scope.name}}`;
  }

  // list of names that could be used to make up the identifier name
  const nameKeyArray = [
    mapGetErr(state.unitNameMap, lookup.unit.path, associatedNode),
    ...scopeTreeNameRelativeToRoot(state, lookup.unit, lookup.scope),
  ];

  // try more and more names until they are all exhausted
  let currentName = capitalize(nameKeyArray[nameKeyArray.length - 1]);
  for (const name of [...nameKeyArray.slice(0, -1)].reverse()) {
    const existingNameExists = state.names.has(currentName);
    if (!existingNameExists) {
      state.names.add(currentName);
      return toDesmosVar(currentName);
    }
    currentName = capitalize(name) + currentName;
  }

  // edge case for final name
  const existingNameExists = state.names.has(currentName);
  if (!existingNameExists) {
    state.names.add(currentName);
    return toDesmosVar(currentName);
  }

  // append numerical suffix onto variable name until a working one is found
  let suffixNumber = 2;
  let nameAlreadyExists = true;
  while (true) {
    let nameWithSuffix = currentName + suffixNumber;
    nameAlreadyExists = state.names.has(nameWithSuffix);
    if (!nameAlreadyExists) {
      state.names.add(nameWithSuffix);
      return toDesmosVar(currentName);
    }
  }
}

export function createCanonicalIdentifierName<T extends ast.URIS>(
  content: scopeTree.Variable | scopeTree.Function,
  state: CompilationState<T>,
  unit: CompilationUnit<T>,
  associatedNode: ast.Node
) {
  const lookup = { scope: content, unit };

  // list of names that could be used to make up the identifier name
  const nameKeyArray = [
    mapGetErr(state.unitNameMap, lookup.unit.path, associatedNode),
    ...scopeTreeNameRelativeToRoot(state, lookup.unit, lookup.scope),
  ];

  // try more and more names until they are all exhausted
  let currentName = capitalize(nameKeyArray[nameKeyArray.length - 1]);
  for (const name of [...nameKeyArray.slice(0, -1)].reverse()) {
    const existingNameExists = state.names.has(currentName);
    if (!existingNameExists) {
      state.names.add(currentName);
      return toDesmosVar(currentName);
    }
    currentName = capitalize(name) + currentName;
  }

  // edge case for final name
  const existingNameExists = state.names.has(currentName);
  if (!existingNameExists) {
    state.names.add(currentName);
    return toDesmosVar(currentName);
  }

  // append numerical suffix onto variable name until a working one is found
  let suffixNumber = 2;
  let nameAlreadyExists = true;
  while (true) {
    let nameWithSuffix = currentName + suffixNumber;
    nameAlreadyExists = state.names.has(nameWithSuffix);
    if (!nameAlreadyExists) {
      state.names.add(nameWithSuffix);
      return toDesmosVar(currentName);
    }
  }
}
