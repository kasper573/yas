import type { Context, ComponentProps } from "react";
import { useContext, useEffect, useId, useMemo, useRef } from "react";
import type {
  ComponentStore,
  ImperativeComponentProps,
  InstanceId,
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
    const autoId = useId();
    const id = fixedId ?? autoId;
    const store = useContext(context);
    const current = { id, store, removeOnUnmount };
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
      () => (props) => store.spawnInstance(id, nextInstanceId(), props),
      [store, id]
    );
  };
}

let instanceIdCounter = 0;
const nextInstanceId = (): InstanceId => (++instanceIdCounter).toString();

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
