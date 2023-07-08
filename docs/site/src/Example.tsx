import { DesmosGraph } from "./DesmosGraph";
import { compileDesmoscript } from "../../../desmoscript/src";
import { Show, createSignal } from "solid-js";
import { GraphState } from "../../../desmoscript/src/codegen/graphstate";
import { DesmoscriptCodemirror } from "./DesmoscriptCodemirror";

export function DesmoscriptExample(props: {
  children: string;
  graphpaper?: boolean;
}) {
  console.log("thing passed into desmoscriptexample", props.children);

  const [graphstate, setGraphstate] = createSignal<GraphState | undefined>(
    undefined
  );

  const [code, setCode] = createSignal<string>(props.children);

  (async () => {
    const compilerOutput = await compileDesmoscript(props.children, {
      unsavedFiles: new Map([["index.desmo", props.children]]),
      watchFiles: new Set(),
      options: {
        annotateExpressionsWithEquivalentDesmoscript: false,
      },
      io: {
        readFile: () =>
          Promise.resolve(new TextEncoder().encode(props.children)),
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
  })();

  return (
    <div class="desmoscript-example">
      <DesmoscriptCodemirror
        class="codemirror-container"
        code={code}
        setCode={setCode}
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
