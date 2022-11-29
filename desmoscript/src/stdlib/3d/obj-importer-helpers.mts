import { ParsedOBJ } from "./obj-importer.mjs";

export const parsedOBJKeys: (keyof ParsedOBJ)[] = [
  "vertices",
  "normals",
  "texcoords",
  "vertexIndices",
  "normalIndices",
  "texcoordIndices",
  "materials",
  "faceMaterials",
];

export function rest2num(l: string[]) {
  return l.slice(1).map((n) => Number(n));
}

export function is3long<T>(l: T[]): [T, T, T] {
  if (l.length != 3) throw new Error("Malformed input: Expected 3 numbers.");
  //@ts-ignore
  return l;
}
export function is2long<T>(l: T[]): [T, T] {
  if (l.length != 2) throw new Error("Malformed input: Expected 2 numbers.");
  //@ts-ignore
  return l;
}

export function is1long<T>(l: T[]): T {
  if (l.length != 1) throw new Error("Malformed input: Expected 1 number.");
  //@ts-ignore
  return l;
}
