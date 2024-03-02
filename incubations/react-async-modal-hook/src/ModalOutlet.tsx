import type { ComponentType } from "react";
import {
  createElement,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import type {
  ComponentId,
  ModalStoreState,
  InstanceEntry,
  InstanceId,
  ComponentEntry,
} from "./ModalStore";
import { ModalContext } from "./ModalContext";
import { DefaultOutletRenderer } from "./DefaultOutletRenderer";

export interface ModalOutletProps {
  /**
   * The OutletRenderer to use. Defaults to defaultOutletRenderer.
   */
  renderer?: ModalOutletRenderer;
}

export function ModalOutlet({
  renderer = DefaultOutletRenderer,
}: ModalOutletProps) {
  const store = useContext(ModalContext);
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.state,
    () => store.state,
  );
  const entries = useMemo(() => collectEntries(state), [state]);
  return createElement(renderer, { entries });
}

function collectEntries(components: ModalStoreState) {
  const entries: ModalOutletEntry[] = [];
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
export interface ModalOutletEntry
  extends InstanceEntry,
    Pick<ComponentEntry, "component" | "defaultProps"> {
  instanceId: InstanceId;
  componentId: ComponentId;
}

/**
 * A React component that renders the currently registered components and instances in the ComponentStore.
 */
export type ModalOutletRenderer = ComponentType<{
  entries: ModalOutletEntry[];
}>;
