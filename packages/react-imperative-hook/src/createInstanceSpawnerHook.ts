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

export function createInstanceSpawnerHook(context: Context<ComponentStore>) {
  return function useInstanceSpawner<
    Component extends AnyComponent,
    DefaultProps extends Partial<ComponentProps<Component>>
  >(
    component: Component,
    defaultProps?: DefaultProps,
    fixedId?: ComponentId
  ): InstanceSpawner<
    ComponentProps<Component> extends ResolvingComponentProps<infer R>
      ? R
      : never,
    Omit<ComponentProps<Component>, keyof ImperativeComponentProps>,
    DefaultProps
  > {
    const autoId = useId();
    const id = fixedId ?? autoId;
    const store = useContext(context);
    const current = { id, store };
    const latest = useRef(current);
    latest.current = current;

    useEffect(
      () => store.upsertComponent(id, { component, defaultProps }),
      [store, id, component, defaultProps]
    );

    useEffect(
      () => () => {
        const { id, store } = latest.current;
        store.markComponentForRemoval(id);
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

type InstanceSpawner<
  ResolutionValue,
  AdditionalComponentProps,
  DefaultProps extends Partial<AdditionalComponentProps>
> = (
  props: InstanceProps<ResolutionValue, AdditionalComponentProps, DefaultProps>
) => Promise<ResolutionValue>;
