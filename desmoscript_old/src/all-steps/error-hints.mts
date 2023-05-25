function tail(str: string) {
  return str.slice(1);
}

export function levenshtein(a: string, b: string) {
  // lookup table for efficiency
  const lut = new Map<string, Map<string, number>>();

  // helper function for levenshtein distance
  function levenshteinHelper(a: string, b: string): number {
    if (a.length == 0) return b.length;
    if (b.length == 0) return a.length;
    if (a[0] == b[0]) {
      return l(tail(a), tail(b));
    }
    return 1 + Math.min(l(tail(a), b), l(a, tail(b)), l(tail(a), tail(b)));
  }

  // memoized helper function
  function l(a: string, b: string) {
    const lut2 = lut.get(a);
    const dist = lut2?.get(b);
    if (dist !== undefined) return dist;
    const calculatedDist = levenshteinHelper(a, b);
    if (lut2) {
      lut2.set(b, calculatedDist);
    } else {
      const newLut2 = new Map();
      lut.set(a, newLut2);
      newLut2.set(b, calculatedDist);
    }
    return calculatedDist;
  }

  // calculate distance
  return l(a, b);
}
