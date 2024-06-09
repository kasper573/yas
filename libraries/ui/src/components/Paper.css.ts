import { atoms, recipe } from "@yas/style";

export const paperRecipe = recipe({
  base: atoms({
    borderRadius: "m",
  }),
  variants: {
    elevation: {
      0: atoms({
        backgroundColor: "surface.base",
        border: "thin",
      }),
      1: atoms({
        backgroundColor: "surface.base",
        boxShadow: "thin",
      }),
    },
  },
  defaultVariants: {
    elevation: 1,
  },
});
