// typescript mutable tuple constructor
export const tuple = <T extends any[]>(...args: T): T => args;

export function literalSubtract<A extends string, B extends string>(
  a: readonly A[],
  b: readonly B[]
): Exclude<A, B>[] {
  //@ts-ignore
  return a.filter((e) => e.indexOf(b) == -1);
}

export function lastof<T>(t: T[]) {
  return t[t.length - 1];
}
