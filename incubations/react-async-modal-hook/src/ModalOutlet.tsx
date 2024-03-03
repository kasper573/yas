import type { ReactElement } from "react";
import {
  Fragment,
  createElement,
  useContext,
  useSyncExternalStore,
} from "react";
import { ModalContext } from "./ModalContext";
import type { ModalProps } from "./ModalStore";

export function ModalOutlet<ExtraProps>({
  map = (elements) => elements,
}: ModalOutletProps<ExtraProps>): JSX.Element {
  const store = useContext(ModalContext);
  const components = useSyncExternalStore(
    store.subscribe,
    () => store.state,
    () => store.state,
  );

  const modals: ModalElement<ExtraProps>[] = [];
  for (const componentId in components) {
    const component = components[componentId];
    for (const instanceId in component.instances) {
      const instance = component.instances[instanceId];
      const { component: Component, defaultProps } = component;
      const { props, ...rest } = instance;
      modals.push(
        <Component
          key={`${componentId}-${instanceId}`}
          instanceId={instanceId}
          {...defaultProps}
          {...instance.props}
          {...rest}
        />,
      );
    }
  }

  return createElement(Fragment, null, map(modals));
}

export type ModalElement<ExtraProps = {}> = ReactElement<
  ModalProps<unknown> & ExtraProps
>;

export interface ModalOutletProps<ExtraProps = {}> {
  map?: (elements: ModalElement<ExtraProps>[]) => ModalElement<ExtraProps>[];
}

export type ModalOutletMapper<ExtraProps = {}> = (
  elements: ModalElement<ExtraProps>[],
) => ModalElement<ExtraProps>[];
