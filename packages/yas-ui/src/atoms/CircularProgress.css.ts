import { keyframes } from "@vanilla-extract/css";
import { recipe } from "../styling/css";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const circularProgressRecipe = recipe({
  base: {
    display: "inline-block",
    borderRadius: "50%",
    animation: `${spin} 1s linear infinite`,
  },
  variants: {
    size: {
      small: {
        width: 16,
        height: 16,
      },
      medium: {
        width: 24,
        height: 24,
      },
      large: {
        width: 32,
        height: 32,
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
