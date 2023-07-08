import { JSX, Show, createEffect, createSignal, untrack } from "solid-js";
import { EditorView, keymap } from "@codemirror/view";
import { defaultKeymap } from "@codemirror/commands";
import {
  defaultHighlightStyle,
  syntaxHighlighting,
  Language,
  defineLanguageFacet,
} from "@codemirror/language";
import { compileDesmoscriptForLanguageSupport } from "../../../desmoscript/src";
import { linter } from "@codemirror/lint";
import { Diagnostic } from "@codemirror/lint";
import { oneDark } from "@codemirror/theme-one-dark";
import { Merge } from "type-fest";
import { fireOnceOnScreen } from "./onscreen";

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

          const compiler = compileDesmoscriptForLanguageSupport({
            readFile: () =>
              Promise.resolve(new TextEncoder().encode(props.code())),
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
              syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
              keymap.of(defaultKeymap),
              EditorView.updateListener.of((view) => {
                onchange();
                props.setCode(view.state.doc.toString());
              }),
              linter(async () => {
                console.log(props.code());
                const diagnostics: Diagnostic[] = [];
                await compiler.getErrors("", (start, end, reason) => {
                  diagnostics.push({
                    from: start,
                    to: end,
                    severity: "error",
                    message: reason,
                  });
                });
                console.log("diag", diagnostics);
                return diagnostics;
              }),
              oneDark,
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
