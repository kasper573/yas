import type { OutletEntry } from "./ComponentOutlet";

export function DefaultOutletRenderer({ entries }: { entries: OutletEntry[] }) {
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
