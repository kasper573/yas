import { keyframes, recipe } from "@yas/style";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const circularProgressRecipe = recipe({
  base: {
    display: "inline-block",
    animation: [[spin, "extraLong4", "linear"]],
    fill: "primary.base.main",
  },
  variants: {
    size: {
      tiny: {
        width: 16,
        height: 16,
      },
      small: {
        width: 24,
        height: 24,
      },
      medium: {
        width: 32,
        height: 32,
      },
      large: {
        width: 48,
        height: 48,
      },
    },
  },
  defaultVariants: {
    size: "small",
  },
});
