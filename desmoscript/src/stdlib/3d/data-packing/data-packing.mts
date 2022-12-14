import { ASTExpr } from "../../../ast/ast.mjs";
import { MacroAPI } from "../../../semantic-analysis/analysis-types.mjs";

type DesmosCompoundSingle = {
  type: "single",
};

type DesmosCompoundPacked = {
  type: "packed",
  bits: number
};

type DesmosCompoundArray<T> = {
  type: "array",
  bitsPerNumber: number,
  lengthVarName: T, // which part represents the length?
  unpackerVarName: string,
  unpackerExprs: string
};

export type DesmosCompoundDataTypeSegment<T> = 
  DesmosCompoundSingle | DesmosCompoundPacked | DesmosCompoundArray<T>;

export type DesmosCompoundDataType<T extends string> = Map<T, DesmosCompoundDataTypeSegment<T>>;

export function fillOutDesmosCompoundDataType<T extends string>(template: DesmosCompoundDataType<T>, data: Record<T, number | number[]>) {
  const arr: number[] = [];
  let currentBits = 64;
  let hasEncounteredArray = false;
  for (const [varName, templateEntry] of template.entries()) {
    const dataEntry = data[varName];

    if (dataEntry === undefined) {
      throw `Data entry '${varName}' is missing.`
    }

    let forceNumber = (n: number | number[]): number => {
      if (Array.isArray(n)) throw `Expected '${varName}' to be a number, not an array.`;
      return n as number;
    }
    let forceArray = (n: number | number[]): number[] => {
      if (!Array.isArray(n)) throw `Expected '${varName}' to be a number, not an array.`;
      return n as number[];
    }

    if (templateEntry.type == "single") {
      if (hasEncounteredArray) {
        throw "All arrays must be at the end."
      }
      arr.push(forceNumber(dataEntry));
      currentBits = 64;
    } else if (templateEntry.type == "packed") {
      if (hasEncounteredArray) {
        throw "All arrays must be at the end."
      }
      if (currentBits + templateEntry.bits > 52) {
        currentBits = 0;
        arr.push(0);
      }
      arr[arr.length - 1] += (2 ** currentBits) * forceNumber(dataEntry);
      currentBits += templateEntry.bits
    } else {
      hasEncounteredArray = true;
      currentBits = 64;
      for (const elem of forceArray(dataEntry)) {
        if (currentBits + templateEntry.bitsPerNumber > 52) {
          currentBits = 0;
          arr.push(0);
        }
        arr[arr.length - 1] += (elem) * (2 ** currentBits);
        currentBits += templateEntry.bitsPerNumber;
      }
    }
  }
  return arr;
}

export function createDesmosCompoundDataTypeGetters<T extends string>(namespaceName: string, template: DesmosCompoundDataType<T>, a: MacroAPI) {
  const exprs: ASTExpr[] = [];
  
  let accumOffset = 0;
  let accumBits = 0;

  let noArraysYet = true;
  let constantOffset = 0;

  let pastArrays: T[] = [];

  function getArrayLengthExpr(arr: DesmosCompoundArray<T>) {
    const arrayLength = template.get(arr.lengthVarName);
    if (!arrayLength) {
      a.error(`Length variable '${arr.lengthVarName}' does not exist!`);
    }
    
    const numbersPerNumber = Math.floor(52 / arr.bitsPerNumber);
    return `floor(${arr.lengthVarName}(data) / ${numbersPerNumber})`;
  }

  //first pass; create simple getters
  for (const [varName, templateEntry] of template.entries()) {
    if (templateEntry.type == "single") {
      exprs.push(a.fromstr(`
        fn ${varName}(data) {
          data[${accumOffset + 1}]
        }
      `));
      accumOffset++;
      accumBits = 0;
    } else if (templateEntry.type == "packed") {
      if (accumOffset + accumBits > 52) {
        accumOffset++;
        accumBits = 0;
      }
      exprs.push(a.fromstr(`
      fn ${varName}(data) {
        mod(floor(data[${accumOffset + 1}] / ${2 ** accumBits}), ${2 ** templateEntry.bits})
      }`));
      accumOffset += templateEntry.bits;
    } else {
      if (noArraysYet) {
        noArraysYet = false;
        constantOffset = accumBits;
      }
      exprs.push(a.fromstr(`
        fn ${varName}(data) {
          ${templateEntry.unpackerVarName} = bin.binaryUnpack(
            data[(1 .. ${getArrayLengthExpr(templateEntry)}) + ${constantOffset}
              ${pastArrays.map(pastArrName => {
                const pastArr = template.get(pastArrName) as DesmosCompoundArray<T>;
                return `+ ${getArrayLengthExpr(pastArr)}`;
              })}
            ],
            ${templateEntry.bitsPerNumber},
            ${Math.floor(52 / templateEntry.bitsPerNumber)}
          );
          ${templateEntry.unpackerExprs}
        }
      `))
      pastArrays.push(varName)
    }
  }

  return a.ns(namespaceName, exprs);
}

