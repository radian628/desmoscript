import { errFull, ierr } from "./error-handling.mjs";
export function getCompilationUnit(state, unitName) {
    const unitObj = state.units.get(unitName);
    if (!unitObj) {
        errFull(-1, -1, unitName, `INTERNAL ERROR: Could not find file '${unitName}'.`);
    }
    return unitObj;
}
function lookupScopeTreeItemNoBacktracking(state, unit, startingScope, path) {
    if (!startingScope)
        return undefined;
    if (path.length == 0) {
        return { scope: startingScope, unit };
    }
    const scopeTreeItem = startingScope;
    if (scopeTreeItem) {
        switch (scopeTreeItem.type) {
            case "scope":
                return lookupScopeTreeItemNoBacktracking(state, unit, scopeTreeItem.contents.get(path[0]), path.slice(1));
            case "import":
                const newUnit = getCompilationUnit(state, scopeTreeItem.path);
                return lookupScopeTreeItemNoBacktracking(state, newUnit, newUnit.scopeTree, path.slice(1));
            default:
                return undefined;
        }
    }
    else {
        return undefined;
    }
}
export function lookupScopeTreeItem(state, unit, startingScope, path) {
    let searchScope = startingScope;
    while (searchScope) {
        const candidate = lookupScopeTreeItemNoBacktracking(state, unit, searchScope, path);
        if (candidate)
            return candidate;
        searchScope = searchScope.parent;
    }
    return undefined;
}
export function scopeTreeNameRelativeToRoot(state, unit, content) {
    if (!content)
        return [unit.path];
    return [
        ...scopeTreeNameRelativeToRoot(state, unit, content.parent),
        content.name,
    ];
}
export function mapGetErr(map, key, node) {
    if (!map.has(key))
        ierr(node, "Map lookup failed.");
    const v = map.get(key);
    return v;
}
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}
function toDesmosVar(str) {
    return `${str[0]}_{${str.slice(1)}}`;
}
export function getCanonicalIdentifierName(scope, state, unit, associatedNode, additionalNames) {
    // find out what item in the scope tree this thing is referring to
    const lookup = lookupScopeTreeItem(state, unit, scope, additionalNames);
    // exit early if nothing found
    if (!lookup)
        return undefined;
    // these cases don't make sense to lookup
    if (lookup.scope.type == "macro" ||
        lookup.scope.type == "namedjson" ||
        lookup.scope.type == "import" ||
        lookup.scope.type == "scope")
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
export function createCanonicalIdentifierName(content, state, unit, associatedNode) {
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
