import type { ElementPropsLike, SXLike, SXMerger } from "./types";
import { merge } from "./merge";

export function createPropsMerger<SX extends SXLike>(mergeSX: SXMerger<SX>) {
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
      style: merge(a.style, b.style),
      sx: mergeSX(a.sx, b.sx),
    };
  };
}

export function clsx(...classNames: Array<string | undefined>) {
  const defined = classNames.filter(Boolean);
  return defined.length ? defined.join(" ") : undefined;
}
