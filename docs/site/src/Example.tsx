import { DesmosGraph } from "./DesmosGraph";
import { compileDesmoscript } from "../../../desmoscript/src";
import { Show, createEffect, createSignal } from "solid-js";
import { GraphState } from "../../../desmoscript/src/codegen/graphstate";
import { DesmoscriptCodemirror } from "./DesmoscriptCodemirror";

export function DesmoscriptExample(props: {
  children: string;
  graphpaper?: boolean;
}) {
  const [graphstate, setGraphstate] = createSignal<GraphState | undefined>(
    undefined
  );

  const [code, setCode] = createSignal<string>(props.children);

  const [lastUpdateTime, setLastUpdateTime] = createSignal(Date.now());

  const [graphNeedsToBeUpdated, setGraphNeedsToBeUpdated] = createSignal(true);

  const interval = setInterval(async () => {
    if (Date.now() - lastUpdateTime() > 500 && graphNeedsToBeUpdated()) {
      setGraphNeedsToBeUpdated(false);
      const compilerOutput = await compileDesmoscript(code(), {
        unsavedFiles: new Map([["index.desmo", code()]]),
        watchFiles: new Set(),
        options: {
          annotateExpressionsWithEquivalentDesmoscript: false,
        },
        io: {
          readFile: () => Promise.resolve(new TextEncoder().encode(code())),
          resolvePath: (p) => p,
          dirname: (p) => p,
          relativePath: (p) => p,
          writeFile: (p) => Promise.resolve(),
          watchFile: (p) => undefined,
        },
      });

      if (compilerOutput.type === "success") {
        setGraphstate(compilerOutput.state);
      }
    }
  }, 100);

  return (
    <div class="desmoscript-example">
      <DesmoscriptCodemirror
        class="codemirror-container"
        code={code}
        setCode={(newCode) => {
          if (code() === newCode) return;
          setCode(newCode);
          setLastUpdateTime(Date.now());
          setGraphNeedsToBeUpdated(true);
        }}
      ></DesmoscriptCodemirror>
      <DesmosGraph
        state={() => graphstate()}
        class="desmos-container"
        graphpaper={props.graphpaper}
      ></DesmosGraph>
    </div>
  );
}

export const ExampleFromFile =
  (base: string) => (props: { children: string }) => {
    const [src, setSrc] = createSignal<string | undefined>(undefined);

    (async () => {
      setSrc(await (await fetch(base + props.children + ".desmo")).text());
    })();

    return (
      <Show when={src() !== undefined}>
        <DesmoscriptExample>{src()}</DesmoscriptExample>
      </Show>
    );
  };
