import type { CSSProperties } from "react";
import type { SXMerger } from "./sxAdapter";

export function createPropsMerger<SX>(sxMerger: SXMerger<SX>) {
  return function mergeElementProps<
    Left extends ElementPropsLike<SX>,
    Right extends ElementPropsLike<SX>,
  >(a?: Left, b?: Right): Left & Right {
    if (!a || !b) {
      return (a ?? b) as Left & Right;
    }

    return {
      ...a,
      ...b,
      className: clsx(a.className, b.className),
      style: { ...a.style, ...b.style },
      sx: sxMerger(a.sx, b.sx),
    };
  };
}

type ElementPropsLike<SX> = {
  className?: string;
  style?: CSSProperties;
  sx?: SX;
};

function clsx(...classNames: Array<string | undefined>) {
  const defined = classNames.filter(Boolean);
  return defined.length ? defined.join(" ") : undefined;
}
