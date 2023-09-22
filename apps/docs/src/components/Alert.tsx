import type { HTMLAttributes } from "react";
import { css } from "@yas/ui";

export type AlertVariant =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

export function Alert({
  children,
  variant = "primary",
  className,
  ...rest
}: AlertProps) {
  return (
    <div
      className={css.clsx(`alert alert--${variant}`, className)}
      role="alert"
      {...rest}
    >
      {children}
    </div>
  );
}
