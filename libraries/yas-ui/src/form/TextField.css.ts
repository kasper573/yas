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

const inputHeight = 21;

export const input = recipe({
  base: { height: inputHeight },
  variants: { fullWidth },
});

export const loadingSpinner = style({
  width: inputHeight,
  height: inputHeight,
});

export const clearButton = recipe({
  base: {
    width: inputHeight,
    height: inputHeight,
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
