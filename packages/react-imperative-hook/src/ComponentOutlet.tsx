import type { Context, ComponentType } from "react";
import { createElement, useContext, useEffect, useState } from "react";
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
  const [state, setState] = useState(store.state);
  useEffect(() => store.subscribe(setState), [store]);
  return createElement(renderer, state);
}

export type OutletRenderer = ComponentType<ComponentStoreState>;
