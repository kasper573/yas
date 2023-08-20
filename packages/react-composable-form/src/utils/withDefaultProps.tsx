import type { ComponentType } from "react";
import { createElement } from "react";
import type { MakeOptional } from "../types/utilityTypes";

export function withDefaultProps<
  Props extends object,
  DefaultProps extends Partial<Props>,
>(WrappedComponent: ComponentType<Props>, defaultProps: DefaultProps) {
  return function WithDefaultProps(
    props: MakeOptional<Props, keyof DefaultProps>,
  ) {
    return createElement(
      WrappedComponent,
      mergeProps(defaultProps, props) as Props,
    );
  };
}

function mergeProps(a: Record<string, unknown>, b: Record<string, unknown>) {
  const merged: Record<string, unknown> = {};
  for (const key in a) {
    merged[key] = a[key];
  }
  for (const key in b) {
    const bValue = b[key];
    const aValue = a[key];

    if (typeof aValue === "function" && typeof bValue === "function") {
      merged[key] = (...args: unknown[]) => {
        aValue(...args);
        return bValue(...args);
      };
    } else {
      merged[key] = b[key] ?? a[key];
    }
  }
  return merged;
}
