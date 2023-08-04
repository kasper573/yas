import type { ComponentType } from "react";
import type { MakeOptional } from "../types/utilityTypes";

export function withDefaultProps<
  Props extends object,
  DefaultProps extends Partial<Props>,
>(WrappedComponent: ComponentType<Props>, defaultProps: DefaultProps) {
  return function WithDefaultProps(
    props: MakeOptional<Props, keyof DefaultProps>,
  ) {
    return <WrappedComponent {...defaultProps} {...(props as Props)} />;
  };
}
