import {
  compileDesmoscriptForLanguageSupport,
  getLinesAndCols,
} from "../../../desmoscript/dist/index";
import { IOInterface } from "../../../desmoscript/dist/io/io";
import {
  ColorInformation,
  CompletionItem,
  CompletionItemKind,
  Connection,
  Diagnostic,
  DiagnosticSeverity,
  DidChangeConfigurationNotification,
  InitializeParams,
  InitializeResult,
  LocationLink,
  Position,
  TextDocumentSyncKind,
  TextDocuments,
} from "vscode-languageserver";
import { TextDocument, TextEdit } from "vscode-languageserver-textdocument";
import { URI } from "vscode-uri";

function vscodePathToDesmoscriptPath(url: string) {
  return URI.parse(url).fsPath;
}

function desmoscriptPathToVscodePath(path: string) {
  return URI.file(path);
}

export function runDesmoscriptLanguageServer(
  connection: Connection,
  io: IOInterface,
  vscodePathToDesmoscriptPath: (str: string) => string,
  desmoscriptPathToVscodePath: (str: string) => string,
  documents2?: TextDocuments<TextDocument>
) {
  // Create a simple text document manager.
  const documents = documents2 ?? new TextDocuments(TextDocument);

  let hasConfigurationCapability = false;
  let hasWorkspaceFolderCapability = false;
  let hasDiagnosticRelatedInformationCapability = false;

  connection.onInitialize((params: InitializeParams) => {
    const capabilities = params.capabilities;

    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(
      capabilities.workspace && !!capabilities.workspace.configuration
    );
    hasWorkspaceFolderCapability = !!(
      capabilities.workspace && !!capabilities.workspace.workspaceFolders
    );
    hasDiagnosticRelatedInformationCapability = !!(
      capabilities.textDocument &&
      capabilities.textDocument.publishDiagnostics &&
      capabilities.textDocument.publishDiagnostics.relatedInformation
    );

    const result: InitializeResult = {
      capabilities: {
        textDocumentSync: TextDocumentSyncKind.Incremental,
        // Tell the client that this server supports code completion.
        completionProvider: {
          resolveProvider: true,
        },
        documentFormattingProvider: true,
        definitionProvider: true,
        colorProvider: true,
        hoverProvider: true,
      },
    };
    if (hasWorkspaceFolderCapability) {
      result.capabilities.workspace = {
        workspaceFolders: {
          supported: true,
        },
      };
    }

    return result;
  });

  connection.onInitialized(() => {
    if (hasConfigurationCapability) {
      // Register for all configuration changes.
      connection.client.register(
        DidChangeConfigurationNotification.type,
        undefined
      );
    }
    if (hasWorkspaceFolderCapability) {
      connection.workspace.onDidChangeWorkspaceFolders((_event) => {
        connection.console.log("Workspace folder change event received.");
      });
    }
  });

  // The example settings
  interface ExampleSettings {
    maxNumberOfProblems: number;
  }

  // The global settings, used when the `workspace/configuration` request is not supported by the client.
  // Please note that this is not the case when using this server with the client provided in this example
  // but could happen with other clients.
  const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
  let globalSettings: ExampleSettings = defaultSettings;

  // Cache the settings of all open documents
  const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

  connection.onDidChangeConfiguration((change) => {
    if (hasConfigurationCapability) {
      // Reset all cached document settings
      documentSettings.clear();
    } else {
      globalSettings = (change.settings.languageServerExample ||
        defaultSettings) as ExampleSettings;
    }

    // Revalidate all open text documents
    documents.all().forEach(validateTextDocument);
  });

  function getDocumentSettings(resource: string): Thenable<ExampleSettings> {
    if (!hasConfigurationCapability) {
      return Promise.resolve(globalSettings);
    }
    let result = documentSettings.get(resource);
    if (!result) {
      result = connection.workspace.getConfiguration({
        scopeUri: resource,
        section: "languageServerExample",
      });
      documentSettings.set(resource, result);
    }
    return result;
  }

  // Only keep settings for open documents
  documents.onDidClose((e) => {
    documentSettings.delete(e.document.uri);
  });

  // The content of a text document has changed. This event is emitted
  // when the text document first opened or when its content has changed.
  documents.onDidChangeContent((change) => {
    desmoscriptCompiler.updateFile(
      vscodePathToDesmoscriptPath(change.document.uri),
      change.document.getText()
    );
    validateTextDocument(change.document);
  });

  const desmoscriptCompiler = compileDesmoscriptForLanguageSupport(io);

  async function validateTextDocument(
    textDocument: TextDocument
  ): Promise<void> {
    // In this simple example we get the settings for every validate run.
    const settings = await getDocumentSettings(textDocument.uri);

    // The validator creates diagnostics for all uppercase words length 2 and more
    const text = textDocument.getText();
    const pattern = /\b[A-Z]{2,}\b/g;
    let m: RegExpExecArray | null;

    const diagnostics: Diagnostic[] = [];

    const filename = vscodePathToDesmoscriptPath(textDocument.uri);

    try {
      await desmoscriptCompiler.getErrors(filename, (start, end, reason) => {
        diagnostics.push({
          severity: DiagnosticSeverity.Error,
          range: {
            start: textDocument.positionAt(start),
            end: textDocument.positionAt(end),
          },
          message: reason,
          source: "desmoscript",
        });
      });
    } catch (err) {
      console.log("err getting errs", err);
    }

    // // Send the computed diagnostics to VSCode.
    connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
  }

  connection.onDidChangeWatchedFiles((_change) => {
    // Monitored files have change in VSCode
    connection.console.log("We received an file change event");
  });

  connection.onDocumentColor(
    async (params, token, workDoneProgress, resultProgress) => {
      const colorInfo: ColorInformation[] = [];

      const document = documents.get(params.textDocument.uri);
      if (!document) return [];

      await desmoscriptCompiler.getColors(
        vscodePathToDesmoscriptPath(params.textDocument.uri),
        (start, end, color) => {
          console.log("found color: ", color);

          colorInfo.push({
            range: {
              start: document.positionAt(start),
              end: document.positionAt(end),
            },

            color: {
              red: color[0] / 256,
              green: color[1] / 256,
              blue: color[2] / 256,
              alpha: 1,
            },
          });
        }
      );
      return colorInfo;
    }
  );

  connection.onColorPresentation(
    async (params, token, workDoneProgress, resultProgress) => {
      const document = documents.get(params.textDocument.uri);
      if (!document) return [];

      return [
        {
          label: document.getText(params.range),
          textEdit: {
            range: params.range,
            newText: `rgb(${Math.round(params.color.red * 256)}, ${Math.round(
              params.color.green * 256
            )}, ${Math.round(params.color.blue * 256)})`,
          },
        },
      ];
    }
  );

  connection.onDefinition(
    async (params, token, WorkDoneProgress, resultProgress) => {
      const links: LocationLink[] = [];
      const document = documents.get(params.textDocument.uri);
      if (!document) return [];
      const srcPosition = document.offsetAt(params.position);

      const def = await desmoscriptCompiler.goToDefinition(
        vscodePathToDesmoscriptPath(params.textDocument.uri),
        srcPosition
      );

      if (!def) return [];

      let dstDocURL = desmoscriptPathToVscodePath(def.unit).toString();
      const dstDocURLSplit = dstDocURL.split("://");
      dstDocURL = `${dstDocURLSplit[0]}://${dstDocURLSplit[1].replace(
        /:/g,
        "%3A"
      )}`;
      console.log(params.textDocument.uri, def.unit, dstDocURL);

      const dstDocument = documents.get(dstDocURL);
      if (!dstDocument) return [];

      return {
        uri: dstDocURL,
        range: {
          start: dstDocument.positionAt(def.start),
          end: dstDocument.positionAt(def.end),
        },
      };
    }
  );

  connection.onHover(async (params) => {
    try {
      const doc = params.textDocument;
      const filepath = vscodePathToDesmoscriptPath(doc.uri);
      const document = documents.get(doc.uri);
      if (!document) return;

      const hoverResult = await desmoscriptCompiler.onHover(
        filepath,
        document.offsetAt(params.position)
      );

      if (!hoverResult) return;
      return {
        contents: {
          language: "desmo",
          value: hoverResult,
        },
      };
    } catch (err) {
      return {
        contents: {
          language: "desmo",
          value: `${err?.toString()} ${(err as any)?.stack}`,
        },
      };
    }
  });

  connection.onDocumentFormatting(
    async (params, token, workDoneProgress, resultProgress) => {
      const doc = params.textDocument;
      const filepath = vscodePathToDesmoscriptPath(doc.uri);
      const document = documents.get(doc.uri);
      if (!document) return [];
      const text = document.getText();

      const linesAndCols = getLinesAndCols(text);

      const start: Position = { line: 0, character: 0 };
      const end: Position = document?.positionAt(text.length);

      const fmtted = await desmoscriptCompiler.formatFile(filepath);

      if (!fmtted) return [];

      return [
        {
          range: { start, end },
          newText: fmtted,
        },
      ] as TextEdit[];
    }
  );

  // This handler provides the initial list of the completion items.
  connection.onCompletion(async (params) => {
    // The pass parameter contains the position of the text document in
    // which code complete got requested. For the example we ignore this
    // info and always provide the same completion items.
    //

    const items: CompletionItem[] = [];

    const doc = params.textDocument;
    const filepath = vscodePathToDesmoscriptPath(doc.uri);
    const document = documents.get(doc.uri);
    if (!document) return [];

    try {
      await desmoscriptCompiler.getAutocomplete(
        filepath,
        document.offsetAt(params.position),
        (label, type) => {
          items.push({
            label,
            kind: {
              variable: CompletionItemKind.Variable,
              function: CompletionItemKind.Function,
              scope: CompletionItemKind.Module,
              macro: CompletionItemKind.Constructor,
            }[type],
          });
        }
      );
    } catch (err) {
      console.log("err during autocomplete", err);
    }

    return items;

    //return [
    //   {
    //     label: "TypeScript",
    //     kind: CompletionItemKind.Text,
    //     data: 1,
    //   },
    //   {
    //     label: "JavaScript",
    //     kind: CompletionItemKind.Text,
    //     data: 2,
    //   },
    // ];
  });

  // This handler resolves additional information for the item selected in
  // the completion list.
  connection.onCompletionResolve((item: CompletionItem): CompletionItem => {
    if (item.data === 1) {
      item.detail = "TypeScript details";
      item.documentation = "TypeScript documentation";
    } else if (item.data === 2) {
      item.detail = "JavaScript details";
      item.documentation = "JavaScript documentation";
    }
    return item;
  });

  // Make the text document manager listen on the connection
  // for open, change and close text document events
  documents.listen(connection);

  // Listen on the connection
  connection.listen();
}
