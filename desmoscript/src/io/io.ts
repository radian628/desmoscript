export type IOInterface = {
  readFile(str: string): Promise<Uint8Array>;
  resolvePath(...paths: string[]): string;
  dirname(path: string): string;
  relativePath(to: string, from: string): string;
};

export function uint8ArrayToString(arr: Uint8Array): string {
  return new TextDecoder().decode(arr);
}
