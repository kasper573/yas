import type { Context, ComponentType } from "react";
import { createElement, useContext, useEffect, useReducer } from "react";
import type { ComponentStore, ComponentStoreState } from "./ComponentStore";
import { defaultOutletRenderer } from "./defaultOutletRenderer";

export interface ComponentOutletProps {
  /**
   * The context that holds the ComponentStore that contains the components that should be output.
   */
  context: Context<ComponentStore>;
  /**
   * The OutletRenderer to use. Defaults to defaultOutletRenderer.
   */
  renderer?: OutletRenderer;
}

export function ComponentOutlet({
  context,
  renderer = defaultOutletRenderer,
}: ComponentOutletProps) {
  const store = useContext(context);
  const [, rerender] = useReducer((x) => x + 1, 0);
  useEffect(() => store.subscribe(rerender), [store]);
  return createElement(renderer, store.state);
}

/**
 * A React component that renders the currently registered components and instances in the ComponentStore.
 */
export type OutletRenderer = ComponentType<ComponentStoreState>;
