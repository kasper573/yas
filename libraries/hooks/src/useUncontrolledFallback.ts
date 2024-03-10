import { useState } from "react";

export function useUncontrolledFallback<
  Props extends object,
  StateKey extends keyof Props,
  EventKey extends keyof Props,
>(
  props: Props,
  stateKey: StateKey,
  eventKey: EventKey,
  defaultValue: Props[StateKey],
): Props {
  const [uncontrolledState, setUncontrolledState] = useState(defaultValue);

  if (stateKey in props) {
    return props;
  }

  return {
    ...props,
    [stateKey]: uncontrolledState,
    [eventKey]: setUncontrolledState,
  };
}
