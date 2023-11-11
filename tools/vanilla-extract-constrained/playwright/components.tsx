import type { HTMLAttributes } from "react";
import * as styles from "./styles/constrained.css";

export function VanillaExtract({
  className,
  ...rest
}: {
  className: keyof typeof styles;
} & Omit<HTMLAttributes<HTMLDivElement>, "className">) {
  return (
    <div className={styles[className]} {...rest}>
      {className}
    </div>
  );
}
