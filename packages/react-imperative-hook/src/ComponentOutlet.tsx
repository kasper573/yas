import type { Context, ComponentType } from "react";
import {
  createElement,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type {
  ComponentId,
  ComponentStore,
  ComponentStoreState,
  InstanceEntry,
  InstanceId,
  ComponentEntry,
} from "./ComponentStore";

export interface ComponentOutletProps {
  /**
   * The context that holds the ComponentStore that contains the components that should be output.
   */
  context: Context<ComponentStore>;
  /**
   * The OutletRenderer to use. Defaults to defaultOutletRenderer.
   */
  renderer: OutletRenderer;
}

export function ComponentOutlet({ context, renderer }: ComponentOutletProps) {
  const store = useContext(context);
  const state = useSyncExternalStore(store.subscribe, () => store.state);
  const entries = useMemo(() => collectEntries(state), [state]);
  return createElement(renderer, { entries });
}

function collectEntries(components: ComponentStoreState) {
  const entries: OutletEntry[] = [];
  for (const componentId in components) {
    const { component, instances, defaultProps } = components[componentId];
    for (const instanceId in instances) {
      entries.push({
        instanceId,
        componentId,
        component,
        defaultProps,
        ...instances[instanceId],
      });
    }
  }
  return entries;
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
