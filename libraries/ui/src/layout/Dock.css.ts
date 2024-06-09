import { atoms, recipe } from "@yas/style";

export const dockRecipe = recipe({
  base: atoms({
    position: "absolute",
  }),
  variants: {
    position: {
      top: atoms({
        top: 0,
        left: 0,
        right: 0,
      }),
      bottom: atoms({
        bottom: 0,
        left: 0,
        right: 0,
      }),
      left: atoms({
        top: 0,
        left: 0,
        bottom: 0,
      }),
      right: atoms({
        top: 0,
        right: 0,
        bottom: 0,
      }),
      inset: atoms({
        inset: 0,
      }),
      center: atoms({
        top: "50%",
        left: "50%",
        transform: "center",
      }),
    },
  },
  defaultVariants: {
    position: "inset",
  },
});
