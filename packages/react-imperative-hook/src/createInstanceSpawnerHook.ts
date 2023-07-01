import type { Context, ComponentProps } from "react";
import { useContext, useEffect, useMemo, useRef } from "react";
import type {
  ComponentStore,
  ImperativeComponentProps,
  ResolvingComponentProps,
} from "./ComponentStore";
import type { AnyComponent } from "./utilityTypes";
import type { ComponentId, InstanceProps } from "./ComponentStore";
import type { GeneralHookOptions } from "./constants";
import { removeOnUnmountDefault } from "./constants";

export function createInstanceSpawnerHook(context: Context<ComponentStore>) {
  return function useInstanceSpawner<
    Component extends AnyComponent,
    DefaultProps extends Partial<ComponentProps<Component>>
  >(
    component: Component,
    defaultProps?: DefaultProps,
    {
      fixedId,
      removeOnUnmount = removeOnUnmountDefault,
    }: { fixedId?: ComponentId } & GeneralHookOptions = {}
  ): InstanceSpawnerFor<Component, DefaultProps> {
    const store = useContext(context);
    const id = useMemo(() => fixedId ?? store.nextId(), [store, fixedId]);
    const current = { id, store, removeOnUnmount, component, defaultProps };
    const latest = useRef(current);
    latest.current = current;

    useEffect(
      () => store.upsertComponent(id, { component, defaultProps }),
      [store, id, component, defaultProps]
    );

    useEffect(
      () => () => {
        const { id, store, removeOnUnmount } = latest.current;
        if (removeOnUnmount) {
          store.removeComponents([id]);
        } else {
          store.markComponentsForRemoval([id]);
        }
      },
      []
    );

    return useMemo(
      () => (props) => {
        // Revive the component temporarily if attempting to spawn an instance for a removed component.
        // This is useful when the spawning happens asynchronously after a component has been removed,
        // which is common in async sequencing of components while react triggers a fast refresh.
        if (!store.state[id]) {
          const { component, defaultProps } = latest.current;
          store.upsertComponent(id, { component, defaultProps });
          store.markComponentsForRemoval([id]);
        }
        return store.spawnInstance(id, store.nextId(), props);
      },
      [store, id]
    );
  };
}

export type InstanceSpawner<
  ResolutionValue,
  AdditionalComponentProps,
  DefaultProps extends Partial<AdditionalComponentProps>
> = (
  props: InstanceProps<ResolutionValue, AdditionalComponentProps, DefaultProps>
) => Promise<ResolutionValue>;

export type InstanceSpawnerFor<
  Component extends AnyComponent,
  DefaultProps extends Partial<ComponentProps<Component>> = Partial<
    ComponentProps<Component>
  >
> = InstanceSpawner<
  ComponentProps<Component> extends ResolvingComponentProps<infer R>
    ? R
    : never,
  Omit<ComponentProps<Component>, keyof ImperativeComponentProps>,
  DefaultProps
>;
