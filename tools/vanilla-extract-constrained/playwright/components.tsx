import type { HTMLAttributes } from "react";
import * as styles from "./styles/constrained.css";

export function VanillaExtract({
  className,
  unsafeClassName,
  children = className,
  ...rest
}: {
  className: keyof typeof styles;
  unsafeClassName?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, "className">) {
  return (
    <div
      className={[styles[className], unsafeClassName].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
