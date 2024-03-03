import type { ComponentProps } from "react";
import { useContext, useEffect, useRef } from "react";
import type { ModalProps, ResolvingComponentProps } from "./ModalStore";
import type { AnyComponent, OptionalArgIfPartial } from "./utilityTypes";
import type { ComponentId, InstanceProps } from "./ModalStore";
import type { GeneralHookOptions } from "./constants";
import { removeOnUnmountDefault } from "./constants";
import { ModalContext } from "./ModalContext";

export function useModals({
  removeOnUnmount = removeOnUnmountDefault,
}: GeneralHookOptions = {}) {
  const store = useContext(ModalContext);
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
    [],
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
      keyof ModalProps
    >,
  >(
    component: Component,
    ...[props]: OptionalArgIfPartial<
      InstanceProps<ResolutionValue, AdditionalComponentProps>
    >
  ): Promise<ResolutionValue> {
    const componentId = store.nextId();
    const instanceId = store.nextId();
    componentIds.current.push(componentId);
    store.upsertComponent(componentId, { component });
    return store.spawnInstance(componentId, instanceId, props ?? {});
  };
}
