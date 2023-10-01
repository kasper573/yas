import { recipe, tokens } from "@yas/css";

export const stackRecipe = recipe({
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    align: {
      start: {},
      center: {},
      end: {},
    },
    gap: {
      0: { gap: tokens.space[0] },
      1: { gap: tokens.space[1] },
      2: { gap: tokens.space[2] },
      3: { gap: tokens.space[3] },
    },
  },
  compoundVariants: [
    {
      variants: { direction: "row", align: "start" },
      style: { alignItems: "start" },
    },
    {
      variants: { direction: "row", align: "center" },
      style: { alignItems: "center" },
    },
    {
      variants: { direction: "row", align: "end" },
      style: { alignItems: "end" },
    },
    {
      variants: { direction: "column", align: "start" },
      style: { justifyContent: "start" },
    },
    {
      variants: { direction: "column", align: "center" },
      style: { justifyContent: "center" },
    },
    {
      variants: { direction: "column", align: "end" },
      style: { justifyContent: "end" },
    },
  ],
  defaultVariants: {
    direction: "column",
  },
});
