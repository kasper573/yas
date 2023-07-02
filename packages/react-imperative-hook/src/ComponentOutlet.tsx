import type { Context, ComponentType } from "react";
import { createElement, useContext, useEffect, useReducer } from "react";
import type {
  ComponentId,
  ComponentStore,
  ComponentStoreState,
  InstanceEntry,
  InstanceId,
  ComponentEntry,
} from "./ComponentStore";
import { DefaultOutletRenderer } from "./DefaultOutletRenderer";

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
  renderer = DefaultOutletRenderer,
}: ComponentOutletProps) {
  const store = useContext(context);
  const [, rerender] = useReducer((x) => x + 1, 0);
  useEffect(() => store.subscribe(rerender), [store]);
  return createElement(renderer, {
    entries: Array.from(collectEntries(store.state)),
  });
}

function* collectEntries(
  components: ComponentStoreState
): Generator<OutletEntry> {
  for (const componentId in components) {
    const { component, instances, defaultProps } = components[componentId];
    for (const instanceId in instances) {
      yield {
        instanceId,
        componentId,
        component,
        defaultProps,
        ...instances[instanceId],
      };
    }
  }
}

/**
 * Component and instance data aggregated for convenience to simplify OutletRenderer logic.
 */
export interface OutletEntry
  extends InstanceEntry,
    Pick<ComponentEntry, "component" | "defaultProps"> {
  instanceId: InstanceId;
  componentId: ComponentId;
}

/**
 * A React component that renders the currently registered components and instances in the ComponentStore.
 */
export type OutletRenderer = ComponentType<{ entries: OutletEntry[] }>;
