import { atoms, cssForAnimation, keyframes, recipe, theme } from "@yas/style";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const circularProgressRecipe = recipe({
  base: [
    atoms({ display: "inline-block" }),
    {
      animation: cssForAnimation([spin, "extraLong4", "linear"]),
      fill: theme.color.primary.base,
    },
  ],
  variants: {
    size: {
      tiny: atoms({
        width: "s",
        height: "s",
      }),
      small: atoms({
        width: "m",
        height: "m",
      }),
      medium: atoms({
        width: "l",
        height: "l",
      }),
      large: atoms({
        width: "xl",
        height: "xl",
      }),
    },
  },
  defaultVariants: {
    size: "small",
  },
});
