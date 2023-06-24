import type { Context, ComponentProps } from "react";
import { useContext, useEffect, useId, useMemo, useRef } from "react";
import type {
  ComponentStore,
  ImperativeComponentProps,
  ImperativeInterfaceFor,
  InstanceId,
  ResolvingComponentProps,
} from "./ComponentStore";
import type { AnyComponent } from "./utilityTypes";
import type { ComponentId } from "./ComponentStore";

export function createHook(context: Context<ComponentStore>) {
  return function useImperativeComponent<
    Component extends AnyComponent,
    DefaultProps extends Partial<ComponentProps<Component>>
  >(
    component: Component,
    defaultProps?: DefaultProps,
    fixedId?: ComponentId
  ): ImperativeInterfaceFor<
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
