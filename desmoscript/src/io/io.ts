export type IOPathInterface = {
  resolvePath(...paths: string[]): string;
  dirname(path: string): string;
  relativePath(to: string, from: string): string;
};

export type IOInterface = {
  readFile(str: string): Promise<Uint8Array>;
  writeFile(path: string, data: Uint8Array): Promise<void>;
} & IOPathInterface;

export function uint8ArrayToString(arr: Uint8Array): string {
  return new TextDecoder().decode(arr);
}
