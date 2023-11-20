import { recipe } from "@yas/style";

export const paperRecipe = recipe({
  base: {
    borderRadius: "#2",
  },
  variants: {
    elevation: {
      0: {
        background: "surfaceMain",
        boxShadow: "none",
      },
      1: {
        background: "surfaceLight",
        boxShadow: "#1",
      },
    },
  },
  defaultVariants: {
    elevation: "1",
  },
});
