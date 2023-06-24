import type { ImperativeComponentProps } from "react-imperative-hook";
import { createImperative } from "react-imperative-hook";

export const {
  use: useModal,
  Context: ModalContext,
  Outlet: ModalOutlet,
} = createImperative((components) => (
  <>
    {Object.entries(components).flatMap(
      ([componentId, { component: Component, instances, defaultProps }]) =>
        Object.entries(instances).map(
          ([instanceId, { state, props, resolve }]) => (
            <Component
              key={`${componentId}-${instanceId}`}
              {...defaultProps}
              {...props}
              open={state.type === "pending"}
              resolve={resolve}
            />
          )
        )
    )}
  </>
));

export type ModalProps<Output = void> = Omit<
  ImperativeComponentProps<Output>,
  "state"
> & {
  open: boolean;
};
