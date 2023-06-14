import { compileDesmoscript, formatError } from "desmoscript";
import * as fs from "node:fs/promises";
import * as http from "node:http";
import * as chokidar from "chokidar";
import * as path from "node:path";
import { IOInterface } from "desmoscript/dist/io/io";

type CompilerArgs = {
  port: number;
  host: string;
  entryPoint: string;
  errorContext: number;
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
  };

  for (let i = 3; i < argv.length; i++) {
    if (!argvKey) {
      if (
        argv[i] == "-port" ||
        argv[i] == "-host" ||
        argv[i] == "-errorContext"
      ) {
        argvKey = argv[i].slice(1) as "port" | "host" | "errorContext";
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
      }
    }
  }

  return args;
}

(async () => {
  const params = await parseArgv(process.argv);

  const io: IOInterface = {
    readFile: async (str) => {
      const fileBuffer = await fs.readFile(str);
      const arr = new Uint8Array(fileBuffer.buffer.slice(0, fileBuffer.length));
      console.log("READ FILE: ", arr);
      return arr;
    },
    resolvePath: path.resolve,
    dirname: path.dirname,
    relativePath: path.relative,
  };

  const watchFiles = new Set<string>();

  const doCompile = async (watchFiles: Set<string>) => {
    const output = await compileDesmoscript(params.entryPoint, {
      unsavedFiles: new Map(),
      io,
      watchFiles,
    });

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
        `\n\x1b[38;5;195m${"".padStart(process.stdout.columns, "_")}\x1b[0m\n\n`
      );

    process.stdout.write("\x1bc");
    console.log(errors);

    if (output.errors.length == 0 && output.type == "success") {
      console.log(
        `Compilation succeeded. View graph state at http://${params.host}:${params.port}`
      );
    }

    const watcher = chokidar.watch(Array.from(watchFiles.values()), {
      awaitWriteFinish: {
        pollInterval: 50,
        stabilityThreshold: 1000,
      },
    });
    const recompile = (evtType: string) => (evt: any) => {
      watcher.close();
      compilerOutput = doCompile(watchFiles);
    };

    watcher.on("change", recompile("change"));
    watcher.on("unlink", recompile("unlink"));

    return { output, errors, watchFiles };
  };

  let compilerOutput = doCompile(watchFiles);

  const server = http.createServer(async (req, res) => {
    const { output, errors } = await compilerOutput;

    if (errors.length == 0 && output.type == "success") {
      res
        .setHeader("Access-Control-Allow-Origin", "*")
        .end(JSON.stringify(output.state));
    } else {
      res.statusCode = 500;
      res.setHeader("Access-Control-Allow-Origin", "*").end(errors);
    }
  });

  server.listen(params.port, params.host, undefined, () => {
    console.log(`Running HTTP server on http://${params.host}:${params.port}`);
  });
})();
