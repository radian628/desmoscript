export type IOInterface = {
  readFile(str: string): Promise<Uint8Array>;
  resolvePath(...paths: string[]): string;
  dirname(path: string): string;
  relativePath(to: string, from: string): string;
  watchFile(path: string, onchange: () => void): () => void;
  writeFile(path: string, data: Uint8Array): Promise<void>;
};

export function uint8ArrayToString(arr: Uint8Array): string {
  return new TextDecoder().decode(arr);
}
