import { IOInterface } from "../../../desmoscript/dist";

export type AsyncIOInterface = Pick<IOInterface, "readFile" | "writeFile">;
