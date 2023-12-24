import { recipe } from "@yas/style";

export const paperRecipe = recipe({
  base: {
    borderRadius: "#2",
  },
  variants: {
    elevation: {
      0: {
        background: "surface.main",
        boxShadow: "none",
        border: "standard",
      },
      1: {
        background: "surface.light",
        boxShadow: "#1",
      },
    },
  },
  defaultVariants: {
    elevation: "1",
  },
});
