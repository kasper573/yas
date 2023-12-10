import { recipe } from "@yas/style";

export const stackRecipe = recipe({
  base: {
    display: "flex",
  },
  variants: {
    direction: {
      row: {},
      column: {},
    },
    reverse: {
      true: {},
      false: {},
    },
    align: {
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
    },
    justify: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
    },
    gap: {
      0: { gap: 0 },
      1: { gap: "#1" },
      2: { gap: "#2" },
      3: { gap: "#3" },
    },
  },
  compoundVariants: [
    {
      variants: { direction: "row", reverse: true },
      style: { flexDirection: "row-reverse" },
    },
    {
      variants: { direction: "column", reverse: true },
      style: { flexDirection: "column-reverse" },
    },
    {
      variants: { direction: "row", reverse: false },
      style: { flexDirection: "row" },
    },
    {
      variants: { direction: "column", reverse: false },
      style: { flexDirection: "column" },
    },
  ],
  defaultVariants: {
    align: "start",
    justify: "start",
    direction: "column",
    reverse: false,
  },
});
