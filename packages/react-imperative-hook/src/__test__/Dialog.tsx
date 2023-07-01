import type { ReactNode } from "react";
import type { ImperativeComponentProps } from "../ComponentStore";

export function Dialog({
  state,
  message = "Built-in message",
  name,
  resolve,
  resolution,
  removeDelay,
}: ModalProps<unknown> & {
  message?: ReactNode;
  name?: string;
  resolution?: unknown;
  removeDelay?: Promise<unknown>;
}) {
  return (
    <div role="dialog" aria-label={name} className={state.type}>
      <p>{message}</p>
      <button onClick={() => resolve(resolution, removeDelay)}>OK</button>
    </div>
  );
}

type ModalProps<Output = void> = ImperativeComponentProps<Output>;
