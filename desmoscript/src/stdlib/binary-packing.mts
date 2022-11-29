import { ASTFunctionDef } from "../ast/ast.mjs";
import { MacroAPI } from "../semantic-analysis/analysis-types.mjs"

type BitFieldSpecElement = {
  type: "float"
} | { type: "fixed", bits: number }

type BitFieldSpec<T extends string> = Map<T, BitFieldSpecElement>;

// TODO: Create generic bit field mapper function
// Also create desmos macros for bit fields

function iterateOverBitField<T extends string>(spec: BitFieldSpec<T>, callback: (name: T, about: BitFieldSpecElement, currentBit: number, currentNumber: number) => void) {
  let currentBit = 54;
  let currentNumber = -1;
  for (const [k, specElem] of spec) {
    if (specElem.type == "float") {
      currentBit = 0;
      currentNumber++;
      callback(k, specElem, currentBit, currentNumber);
    } else {
      const nextBit = currentBit + specElem.bits;
      if (nextBit >= 53) {
        currentBit = 0;
        currentNumber++;
      }
      callback(k, specElem, currentBit, currentNumber);
      currentBit += specElem.bits;
    }
  }
}

// create a function that generates a bit field from an object
function createBitFieldGenerator<T extends string>(spec: BitFieldSpec<T>) {
  return (values: Record<T, number> ) => {
    const bits = [] as number[];
    iterateOverBitField(spec, (name, about, bit, num) => {
      if (!bits[num]) bits[num] = 0;
      if (about.type == "float") {
        bits[num] = values[name];
      } else {
        bits[num] += values[name] << bit;
      }
    });
    return bits;
  }
}

// create a bunch of in-desmos getter functions for a bit field
function createBitFieldGetters<T extends string>(namespaceName: string, spec: BitFieldSpec<T>, a: MacroAPI, nolist: boolean) {
  const getters = new Map<string, ASTFunctionDef<{}>>();

  iterateOverBitField(spec, (name, about, bit, num) => {

    // optionally do not require a list for bit field getters
    const getDataElement = nolist ? a.ident("data") : a.binop(a.ident("data"), "[", a.number(num));

    // get fixed-point value
    if (about.type == "fixed") {
      getters.set(name,
        a.fndef(name, ["data"], 
          [a.fn(a.ident("mod"),
          a.fn(a.ident("floor"), a.binop(getDataElement, "/", a.number(2 ** bit))),
          a.number(2 ** about.bits))]
        )
      );

    // get 64-bit double directly
    } else {
      getters.set(name, a.fndef(name, ["data"], [getDataElement]));
    }
  });

  // return a namespace containing all the getters
  return a.ns(namespaceName,
    Array.from(getters.entries()).map(([k, v]) => a.binop(a.ident(k), "=", v)));
}