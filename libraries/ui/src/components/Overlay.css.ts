import { atoms, recipe } from "@yas/style";

export const overlayRecipe = recipe({
  base: atoms({
    backgroundColor: "tint",
    position: "absolute",
    inset: 0,
    opacity: 0,
  }),
  variants: {
    open: {
      true: atoms({
        opacity: 1,
        pointerEvents: "auto",
        transition: "appearance.standard.enter",
      }),
      false: atoms({
        opacity: 0,
        pointerEvents: "none",
        transition: "appearance.standard.enter",
      }),
    },
  },
});
