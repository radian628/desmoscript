import { ASTNode } from "./ast.js";

export type ASTDifference = {
  nodeA: ASTNode;
  nodeB?: ASTNode; // if
};

export function compareAST(a: ASTNode, b: ASTNode): ASTDifference[] {
  // returns ASTDifferences if inputs are ASTNodes
  // returns boolean if inputs are primitives (true=same, false=diff)
  function c(a: any, b: any): ASTDifference[] | boolean {
    if (a === undefined) return a === b;
    if (typeof a != typeof b) return false;
    if (typeof a == "number" || typeof a == "string" || typeof a == "boolean")
      return a == b;

    if (Array.isArray(a)) {
      if (!Array.isArray(b)) return false;
      if (a.length != b.length) return false;

      let diffs: ASTDifference[] = [];

      for (let i = 0; i < a.length; i++) {
        const result = c(a[i], b[i]);
        if (result === false) return false;
        if (Array.isArray(result)) diffs.push(...result);
      }

      return diffs;
    }

    if (typeof a == "object" && typeof a.id == "number") {
      let diffs: ASTDifference[] = [];

      const anode = a as ASTNode;
      if (typeof b != "object" || typeof b.id != "number")
        return [{ nodeA: anode }];
      const bnode = b as ASTNode;

      for (const k of Object.keys(a)) {
        if (k == "id") continue;
        if (k == "start") continue;
        if (k == "end") continue;
        if (k == "enclosingScope") continue;
        if (k == "innerScope") continue;
        if (k == "result" && anode.type == "macrocall") continue;

        const result = c(a[k], b[k]);

        if (result === false) return [{ nodeA: anode, nodeB: bnode }];

        if (Array.isArray(result)) diffs.push(...result);
      }

      return diffs;
    }

    return false;
  }

  return c(a, b) as ASTDifference[];
}
