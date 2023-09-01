import type { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Stack.module.scss";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "column";
  align?: "start" | "center" | "end";
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
}

export function Stack({
  children,
  direction = "column",
  gap = 1,
  className,
  style,
  align,
  ...rest
}: StackProps) {
  return (
    <div
      className={clsx(
        styles.stack,
        styles[direction],
        styles[`gap${gap}`],
        className,
      )}
      style={{
        [directionToCssAlignProperty[direction]]: align,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

const directionToCssAlignProperty = {
  row: "alignItems",
  column: "justifyContent",
};
