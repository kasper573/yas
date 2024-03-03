import {
  Fragment,
  createElement,
  useContext,
  useSyncExternalStore,
} from "react";
import { ModalContext } from "./ModalContext";

export function ModalOutlet(): JSX.Element {
  const store = useContext(ModalContext);
  const components = useSyncExternalStore(
    store.subscribe,
    () => store.state,
    () => store.state,
  );
  const modals: JSX.Element[] = [];
  for (const componentId in components) {
    const {
      component: Component,
      instances,
      defaultProps,
    } = components[componentId];
    for (const instanceId in instances) {
      const { props, ...rest } = instances[instanceId];
      modals.push(
        <Component
          key={`${componentId}-${instanceId}`}
          instanceId={instanceId}
          {...defaultProps}
          {...props}
          {...rest}
        />,
      );
    }
  }
  return createElement(Fragment, null, modals);
}
