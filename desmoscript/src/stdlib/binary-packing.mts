
type BitFieldSpecElement = {
  type: "float"
} | { type: "fixed", bits: number }

type BitFieldSpec<T extends string> = Map<T, BitFieldSpecElement>;

// TODO: Create generic bit field mapper function
// Also create desmos macros for bit fields

function createBitFieldGenerator<T extends string>(spec: BitFieldSpec<T>) {
  return (values: Record<T, number> ) => {
    let currentBit = 54;
    const bits: number[] = [];
    for (const [k, specElem] of spec) {
      const value = values[k]
      if (!value) continue;
      if (specElem.type == "float") {
        currentBit = 0;
        bits.push(0);
        bits[bits.length - 1] = value;
      } else {
        const nextBit = currentBit + specElem.bits;
        if (nextBit >= 53) {
          bits.push(0);
          currentBit = 0;
        }
        bits[bits.length - 1] += value << currentBit;
        currentBit += specElem.bits;
      }
    }
    return bits;
  }
}