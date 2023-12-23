import { style, keyframes, recipe } from "@yas/style";

const spin = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const viewBoxSize = 100;

export const circle = style({
  cx: viewBoxSize / 2,
  cy: viewBoxSize / 2,
  fill: "none",
  stroke: "primary.base.main",
  strokeWidth: viewBoxSize / 10,
  r: viewBoxSize / 3,
  strokeDasharray: `${0.45 * 360} ${0.15 * 360}`,
});

export const circularProgressRecipe = recipe({
  base: {
    display: "inline-block",
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
      hero: {
        width: 94,
        height: 94,
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});
