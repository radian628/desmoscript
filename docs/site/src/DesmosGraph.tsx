import { JSX } from "solid-js/jsx-runtime";
import { GraphState } from "../../../desmoscript/src/codegen/graphstate";
import { Merge } from "type-fest";
import { Show, createEffect, createSignal } from "solid-js";
import { fireOnceOnScreen } from "./onscreen";

type Calc = {
  setState: (state: GraphState) => void;
};

type Desmos = {
  GraphingCalculator: (
    el: HTMLElement,
    options: { graphpaper?: boolean }
  ) => Calc;
};

declare const Desmos: Desmos;

export function DesmosGraph(
  props: Merge<
    JSX.HTMLAttributes<HTMLDivElement>,
    { state?: () => GraphState | undefined; graphpaper?: boolean }
  >
) {
  return (
    <div
      {...props}
      ref={(el) => {
        fireOnceOnScreen(el, () => {
          const Calc = Desmos.GraphingCalculator(el, {
            graphpaper: props.graphpaper ?? true,
          });

          createEffect(() => {
            if (props.state()) {
              Calc.setState(props.state());
              console.log("set state!");
            }
          });
        });
      }}
    ></div>
  );
}
