import { compileDesmoscript, formatError } from "../../desmoscript";
import * as fs from "node:fs/promises";
import { runWatchServer } from "./watch-server";

type CompilerArgs = {
  port: number;
  host: string;
  entryPoint: string;
  errorContext: number;
  allInOneFolderID?: string;
  annotateExpressionsWithEquivalentDesmoscript: boolean;
};

async function parseArgv(argv: string[]): Promise<CompilerArgs> {
  try {
    const stats = await fs.stat(argv[2]);
  } catch {
    console.log(`Error: Specified input file '${argv[2]}' does not exist.`);
    process.exit(-1);
  }

  let argvKey: keyof CompilerArgs | undefined;

  const args: CompilerArgs = {
    port: 8080,
    host: "127.0.0.1",
    entryPoint: argv[2],
    errorContext: 2,
    annotateExpressionsWithEquivalentDesmoscript: false,
  };

  console.log("argv", argv);

  for (let i = 3; i < argv.length; i++) {
    if (!argvKey) {
      if (
        argv[i] == "-port" ||
        argv[i] == "-host" ||
        argv[i] == "-errorContext" ||
        argv[i] == "-allInOneFolderID"
      ) {
        argvKey = argv[i].slice(1) as "port" | "host" | "errorContext";
      } else if (argv[i] == "-annotateExpressionsWithEquivalentDesmoscript") {
        args.annotateExpressionsWithEquivalentDesmoscript = true;
      } else {
        console.log(`Error: Invalid command line argument '${argv[i]}'.`);
        process.exit(-1);
      }
    } else {
      switch (argvKey) {
        case "port":
          args.port = parseInt(argv[i]);
          if (args.port > 65535 || args.port < 0 || isNaN(args.port)) {
            console.log(
              `Error: Port must be an integer in the range [0, 65535]`
            );
            process.exit(-1);
          }
          break;
        case "host":
          args.host = argv[i];
          break;
        case "errorContext":
          args.errorContext = parseInt(argv[i]);
          if (isNaN(args.errorContext) || args.errorContext < 0) {
            console.log("Error: Error context must be nonnegative.");
            process.exit(-1);
          }
          break;
        case "allInOneFolderID":
          args.allInOneFolderID = argv[i];
      }
      argvKey = undefined;
    }
  }

  return args;
}

(async () => {
  const params = await parseArgv(process.argv);

  runWatchServer({
    ...params,
    options: {
      annotateExpressionsWithEquivalentDesmoscript:
        params.annotateExpressionsWithEquivalentDesmoscript,
      allInOneFolderID: params.allInOneFolderID,
    },
    onLoad() {},
    onCompile(output, io) {
      const errors = output.errors
        .map((e) => {
          return formatError(
            {
              io,
              sourceCodeErrorContext: params.errorContext,
              entry: "./",
              sourceCode: output.sourceCode,
              maxWidth: process.stdout.columns,
              format: (str, opts) => {
                if (opts.type == "error") {
                  return str
                    .split("\n")
                    .map((substr) => `\x1b[1;31m${substr}\x1b[0m`)
                    .join("\n");
                }
                if (opts.type == "gutter") {
                  return `\x1b[38;5;236m${str}\x1b[0m`;
                }
                if (opts.type == "deemphasize") {
                  return `\x1b[38;5;236m${str}\x1b[0m`;
                }
                if (opts.type == "message") {
                  return `\x1b[38;5;220m${str}\x1b[0m`;
                }
                return str;
              },
            },
            e
          );
        })
        .join(
          `\n\x1b[38;5;195m${"".padStart(
            process.stdout.columns,
            "_"
          )}\x1b[0m\n\n`
        );

      process.stdout.write("\x1bc");
      console.log(errors);

      if (output.errors.length == 0 && output.type == "success") {
        console.log(
          `Compilation succeeded. View graph state at http://${params.host}:${params.port}`
        );
      }
    },
  });
})();
