import { recipe, style } from "@yas/style";

const fullWidth = {
  true: {
    width: "100%",
  },
};

export const control = recipe({
  variants: { fullWidth },
});

export const label = style({
  ml: "#1",
});

export const input = recipe({
  variants: { fullWidth },
});

export const clearButton = recipe({
  base: {
    mr: "#2",
  },
  variants: {
    visible: {
      true: {
        visibility: "visible",
      },
      false: {
        visibility: "hidden",
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: {
    visible: false,
  },
});
