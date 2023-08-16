import { URI, Utils as uriUtils } from "vscode-uri";
import { IOPathInterface } from "../../../desmoscript/dist/io/io";

export const ioPathVSCode: IOPathInterface = {
  resolvePath: (uri, ...args) => {
    if (args[0]) {
      // if the supplied path is absolute, just ignore the prev path
      try {
        const parsedArg0 = URI.parse(args[0], true);
        return ioPathVSCode.resolvePath(
          parsedArg0.toString(),
          ...args.slice(1)
        );
      } catch {
        // no-op
      }
    }

    const resolvedPath = uriUtils
      .resolvePath(URI.parse(uri), ...args)
      .toString();

    return resolvedPath;
  },
  dirname: (str) => {
    const directoryName = uriUtils.dirname(URI.parse(str)).toString();
    return directoryName;
  },
  relativePath: (from, to) => to,
};
