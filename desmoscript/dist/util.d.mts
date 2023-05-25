export declare const tuple: <T extends any[]>(...args: T) => T;
export declare function literalSubtract<A extends string, B extends string>(a: readonly A[], b: readonly B[]): Exclude<A, B>[];
export declare function lastof<T>(t: T[]): T;
