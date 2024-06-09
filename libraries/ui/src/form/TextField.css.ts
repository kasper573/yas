import { atoms, recipe } from "@yas/style";

const fullWidth = {
  true: atoms({
    width: "100%",
  }),
};

export const control = recipe({
  variants: { fullWidth },
});

export const label = atoms({
  ml: "m",
});

const inputHeight = "m" as const;

export const input = recipe({
  base: atoms({ height: inputHeight }),
  variants: { fullWidth },
});

export const loadingSpinner = atoms({
  width: inputHeight,
  height: inputHeight,
});

export const clearButton = recipe({
  base: atoms({
    minWidth: inputHeight,
    maxWidth: inputHeight,
    minHeight: inputHeight,
    maxHeight: inputHeight,
  }),
  variants: {
    visible: {
      true: atoms({
        visibility: "visible",
      }),
      false: atoms({
        visibility: "hidden",
        pointerEvents: "none",
      }),
    },
  },
  defaultVariants: {
    visible: false,
  },
});
