import { recipe } from "@yas/style";

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
  defaultVariants: {
    direction: "column",
  },
});
