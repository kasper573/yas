import type { ModalOutletEntry } from "./ModalOutlet";

export function DefaultOutletRenderer({
  entries,
}: {
  entries: ModalOutletEntry[];
}) {
  return (
    <>
      {entries.map(
        ({
          component: Component,
          props,
          componentId,
          defaultProps,
          ...rest
        }) => (
          <Component
            key={`${componentId}-${rest.instanceId}`}
            {...defaultProps}
            {...props}
            {...rest}
          />
        ),
      )}
    </>
  );
}
