import type { Context, ComponentType } from "react";
import { createElement, useContext, useEffect, useReducer } from "react";
import type { ComponentStore, ComponentStoreState } from "./ComponentStore";
import { defaultOutletRenderer } from "./defaultOutletRenderer";

export function ComponentOutlet({
  context,
  renderer = defaultOutletRenderer,
}: {
  context: Context<ComponentStore>;
  renderer?: OutletRenderer;
}) {
  const store = useContext(context);
  const [, rerender] = useReducer((x) => x + 1, 0);
  useEffect(() => store.subscribe(rerender), [store]);
  return createElement(renderer, store.state);
}

export type OutletRenderer = ComponentType<ComponentStoreState>;
