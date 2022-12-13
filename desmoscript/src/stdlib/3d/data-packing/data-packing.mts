import { ASTExpr } from "../../../ast/ast.mjs";
import { MacroAPI } from "../../../semantic-analysis/analysis-types.mjs";

export type DesmosCompoundDataTypeSegment = {
  type: "single",
} | {
  type: "packed",
  bits: number
} | {
  type: "array",
  bitsPerNumber: number,
  lengthVarName: string, // which part represents the length?
  packerFn: (number) => number,
  unpackerVarName: string,
  unpackerDependencies: [],
  unpackerExpr: string
}

export type DesmosCompoundDataType<T extends string> = Map<T, DesmosCompoundDataTypeSegment>;

function fillOutDesmosCompoundDataType<T extends string>(template: DesmosCompoundDataType<T>, data: Record<T, number | number[]>) {
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
      for (const elem of forceArray(dataEntry)) {
        if (currentBits + templateEntry.bitsPerNumber > 52) {
          currentBits = 0;
          arr.push(0);
        }
        arr[arr.length - 1] += templateEntry.packerFn(elem) * (2 ** currentBits);
        currentBits += templateEntry.bitsPerNumber;
      }
    }
  }
}

function createDesmosCompoundDataTypeGetters<T extends string>(namespaceName: string, template: DesmosCompoundDataType<T>, a: MacroAPI) {
  const exprs: ASTExpr[] = [];
  
  let accumOffset = 0;
  let accumBits = 0;

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
      exprs.push(a.fromstr(`
      fn ${varName}(data) {

      }`));
    } else {

    }
  }
}