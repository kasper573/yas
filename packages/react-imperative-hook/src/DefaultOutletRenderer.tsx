import type { OutletRenderer } from "./ComponentOutlet";

export const DefaultOutletRenderer: OutletRenderer = ({ entries }) => (
  <>
    {entries.map(
      ({ component: Component, props, componentId, defaultProps, ...rest }) => (
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
