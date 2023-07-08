import { Component, For, Show, createEffect, createSignal } from "solid-js";

export function getNavLevel(element: HTMLElement) {
  const level = Number(element.tagName[1]);
  return isNaN(level) ? 7 : level;
}

export function AutoHierarchicalNavItem(props: {
  position: () => number;
  headers: () => HTMLElement[];
  onscreen: () => Set<number>;
}) {
  const myElem = () => props.headers()[props.position()];
  const myLevel = () => getNavLevel(myElem());

  const getChildren = () => {
    const childPositions: number[] = [];

    let pos = props.position() + 1;
    const headers = props.headers();

    while (pos < headers.length) {
      const lvl = getNavLevel(headers[pos]);
      if (lvl === myLevel() + 1) {
        childPositions.push(pos);
      } else if (lvl <= myLevel()) {
        break;
      }
      pos++;
    }

    return childPositions;
  };

  const amIOnscreen = () => props.onscreen().has(props.position());

  return (
    <Show when={myElem() !== undefined}>
      <li>
        <a class={amIOnscreen() ? "onscreen" : ""} href={"#" + myElem().id}>
          {myElem().innerHTML}
        </a>
        <Show when={getChildren().length > 0}>
          <ol>
            <For each={getChildren()}>
              {(c) => (
                <AutoHierarchicalNavItem
                  position={() => c}
                  headers={props.headers}
                  onscreen={props.onscreen}
                ></AutoHierarchicalNavItem>
              )}
            </For>
          </ol>
        </Show>
      </li>
    </Show>
  );
}

export function AutoHierarchicalNav(props: { scope: HTMLElement }) {
  const [headers, setHeaders] = createSignal<HTMLElement[]>([]);

  const [intObserver, setIntObserver] = createSignal<
    IntersectionObserver | undefined
  >();

  const [onscreenElements, setOnscreenElements] = createSignal(
    new Set<number>()
  );

  const updateHeaders = () => {
    const newHeaders = Array.from(
      props.scope.querySelectorAll("h1, h2, h3, h4, h5, h6")
    ).filter((e) => e instanceof HTMLElement) as HTMLElement[];
    setHeaders(newHeaders);

    const positionMap = new Map(newHeaders.map((h, i) => [h, i]));

    intObserver()?.disconnect();

    const observer = new IntersectionObserver(
      (record) => {
        const onscreenElementsCopy = new Set(onscreenElements());
        for (const item of record) {
          if (!(item.target instanceof HTMLElement)) continue;
          if (item.isIntersecting) {
            onscreenElementsCopy.add(positionMap.get(item.target) ?? -1);
          } else {
            onscreenElementsCopy.delete(positionMap.get(item.target) ?? -1);
          }
        }
        setOnscreenElements(onscreenElementsCopy);
      },
      { threshold: 1, rootMargin: "0px" }
    );
    for (const h of newHeaders) observer.observe(h);
    setIntObserver(observer);
  };

  updateHeaders();

  const observer = new MutationObserver(() => {
    updateHeaders();
  });

  observer.observe(props.scope, { subtree: true, childList: true });

  return (
    <ol>
      <AutoHierarchicalNavItem
        position={() => 0}
        headers={headers}
        onscreen={onscreenElements}
      ></AutoHierarchicalNavItem>
    </ol>
  );
}
