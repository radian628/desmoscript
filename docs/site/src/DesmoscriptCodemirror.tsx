import { JSX, Show, createEffect, createSignal, untrack } from "solid-js";
import {
  EditorView,
  keymap,
  ViewPlugin,
  ViewUpdate,
  Decoration,
  DecorationSet,
  MatchDecorator,
} from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import { Range, RangeSet } from "@codemirror/state";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  Language,
  defineLanguageFacet,
} from "@codemirror/language";
import { compileDesmoscriptForLanguageSupport } from "../../../desmoscript/src";
import { linter } from "@codemirror/lint";
import { Diagnostic } from "@codemirror/lint";
import { oneDark, oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
import { Merge } from "type-fest";
import {
  Tag,
  tags,
  tagHighlighter,
  Highlighter,
  highlightTree,
} from "@lezer/highlight";
import { fireOnceOnScreen } from "./onscreen";
import { classHighlighter } from "@lezer/highlight";

// console.log("taghighligher", classHighlighter);

async function getDesmoscriptSyntaxHighlighting(
  compiler: ReturnType<typeof compileDesmoscriptForLanguageSupport>
) {
  const decorations: Range<Decoration>[] = [];
  await compiler.highlightSyntax("", (token, start, end, type) => {
    // builder.add(
    //   start,
    //   end,
    //   Decoration.mark({
    //     class: token,
    //   })
    // );
    const taglist = [
      {
        function: tags.function(tags.variableName),
        variable: tags.variableName,
        macro: tags.macroName,
        bracket: tags.bracket,
        operator: tags.operator,
        number: tags.number,
        string: tags.string,
        namespace: tags.namespace,
        keyword: tags.keyword,
        type: tags.typeName,
        enumMember: tags.constant(tags.variableName),
      }[type],
    ];
    const cls = oneDarkHighlightStyle.style(taglist);
    decorations.push(
      Decoration.mark({
        class: cls,
      }).range(start, end)
    );
  });
  return RangeSet.of(decorations.sort((a, b) => a.from - b.from));
}

export const DesmoscriptLanguage = (
  compiler: ReturnType<typeof compileDesmoscriptForLanguageSupport>,
  setCode: (code: string) => void
) =>
  ViewPlugin.fromClass(
    class {
      decorations: DecorationSet;

      constructor(view: EditorView) {
        this.decorations = RangeSet.of([]);
      }

      async update(update: ViewUpdate) {
        await new Promise((resolve) => setTimeout(resolve, 1));
        setCode(update.view.state.doc.toString());
        this.decorations = await getDesmoscriptSyntaxHighlighting(compiler);
        update.view.update([]);
      }
    },
    {
      decorations: (v) => {
        return v.decorations;
      },
    }
  );

export function DesmoscriptCodemirror(
  props: Merge<
    JSX.HTMLAttributes<HTMLDivElement>,
    {
      code: () => string;
      setCode: (str: string) => void;
    }
  >
) {
  return (
    <div
      ref={(el) => {
        fireOnceOnScreen(el, () => {
          const watcherCallbacks = new Set<() => void>();

          const onchange = () => {
            for (const cb of watcherCallbacks) {
              cb();
            }
          };

          const [localCode, setLocalCode] = createSignal(props.code());

          const compiler = compileDesmoscriptForLanguageSupport({
            readFile: () =>
              Promise.resolve(
                new TextEncoder().encode(view.state.doc.toString())
              ),
            resolvePath: (e) => e,
            dirname: (e) => e,
            relativePath: (e) => e,
            watchFile: (path, cb) => {
              watcherCallbacks.add(cb);
              return () => watcherCallbacks.delete(cb);
            },
            writeFile: (e) => Promise.resolve(),
          });

          const view = new EditorView({
            doc: props.code(),
            parent: el,
            extensions: [
              DesmoscriptLanguage(compiler, setLocalCode),
              syntaxHighlighting(oneDarkHighlightStyle, { fallback: true }),
              keymap.of(defaultKeymap),
              EditorView.updateListener.of((view) => {
                onchange();
                props.setCode(view.state.doc.toString());
              }),
              linter(async () => {
                const diagnostics: Diagnostic[] = [];
                await compiler.getErrors("", (start, end, reason) => {
                  diagnostics.push({
                    from: start,
                    to: end,
                    severity: "error",
                    message: reason,
                  });
                });
                return diagnostics;
              }),
              oneDark,
              // EditorView.updateListener.of(async (update) => {
              //   const highlighting = getDesmoscriptSyntaxHighlighting(compiler);
              //   view.dec
              // }),
              // EditorView.decorations.of(async (view) => {
              //   return await getDesmoscriptSyntaxHighlighting(compiler);
              // }),
            ],
          });

          createEffect(() => {
            if (props.code() === view.state.doc.toString()) return;
            view.dispatch({
              changes: {
                from: 0,
                to: view.state.doc.length,
                insert: props.code(),
              },
            });
          });
        });
      }}
    ></div>
  );
}
