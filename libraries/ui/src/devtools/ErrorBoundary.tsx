import type { ComponentProps, ReactNode } from "react";
import { ErrorBoundary as ErrorBoundaryImpl } from "react-error-boundary";

export type ErrorBoundaryProps = Pick<
  ComponentProps<typeof ErrorBoundaryImpl>,
  "FallbackComponent" | "onError" | "onReset" | "resetKeys"
> & {
  /**
   * Sometimes you want to disable the error boundary, i.e. in tests running in CI.
   */
  enabled?: boolean;
  children?: ReactNode;
};

export function ErrorBoundary({
  enabled = true,
  ...props
}: ErrorBoundaryProps) {
  if (!enabled) {
    return props.children;
  }

  return (
    <ErrorBoundaryImpl
      {...(props as ComponentProps<typeof ErrorBoundaryImpl>)}
    />
  );
}
