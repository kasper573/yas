import type { Context, ComponentProps } from "react";
import { useContext, useEffect, useRef } from "react";
import type {
  ComponentStore,
  ImperativeComponentProps,
  ResolvingComponentProps,
} from "./ComponentStore";
import type { AnyComponent } from "./utilityTypes";
import type { ComponentId, InstanceProps } from "./ComponentStore";
import type { GeneralHookOptions } from "./constants";
import { removeOnUnmountDefault } from "./constants";

export function createInlineSpawnerHook(context: Context<ComponentStore>) {
  return function useComponentSpawner({
    removeOnUnmount = removeOnUnmountDefault,
  }: GeneralHookOptions = {}) {
    const store = useContext(context);
    const componentIds = useRef<ComponentId[]>([]);
    const current = { store, removeOnUnmount };
    const latest = useRef(current);
    latest.current = current;

    useEffect(
      () => () => {
        const { store, removeOnUnmount } = latest.current;
        if (removeOnUnmount) {
          store.removeComponents(componentIds.current);
        } else {
          store.markComponentsForRemoval(componentIds.current);
        }
      },
      []
    );

    return function spawnComponentAndInstance<
      Component extends AnyComponent,
      ResolutionValue = ComponentProps<Component> extends ResolvingComponentProps<
        infer R
      >
        ? R
        : never,
      AdditionalComponentProps = Omit<
        ComponentProps<Component>,
        keyof ImperativeComponentProps
      >
    >(
      component: Component,
      props?: InstanceProps<ResolutionValue, AdditionalComponentProps>,
      componentId = store.nextId()
    ): Promise<ResolutionValue> {
      const instanceId = store.nextId();
      componentIds.current.push(componentId);
      store.upsertComponent(componentId, { component });
      return store.spawnInstance(componentId, instanceId, props);
    };
  };
}
