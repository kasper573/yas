import { createVar, unsafe } from "@yas/style";

export const innerWidth = createVar();
export const innerHeight = createVar();

const defaultVariants = {
  axis: "vertical",
} as const;

export const outer = unsafe.recipe({
  base: {
    display: "inline-block",
    position: "relative",
  },
  variants: {
    axis: {
      vertical: {
        width: innerWidth,
        height: 0,
      },
    },
  },
  defaultVariants,
});

export const inner = unsafe.recipe({
  base: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  variants: {
    axis: {
      vertical: {
        transform: `translateY(calc(${innerHeight} * -1 / 2))`,
      },
    },
  },
  defaultVariants,
});
