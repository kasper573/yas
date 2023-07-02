import type { OutletRenderer } from "./ComponentOutlet";

export const defaultOutletRenderer: OutletRenderer = (components) => (
  <>
    {Object.entries(components).flatMap(
      ([componentId, { component: Component, instances, defaultProps }]) =>
        Object.entries(instances).map(
          ([instanceId, { state, props, resolve }]) => (
            <Component
              key={`${componentId}-${instanceId}`}
              {...defaultProps}
              {...props}
              state={state}
              resolve={resolve}
            />
          )
        )
    )}
  </>
);
