import { recipe } from "@yas/style";

export const overlayRecipe = recipe({
  base: {
    backgroundColor: "dimmer",
    position: "absolute",
    inset: 0,
    opacity: 0,
  },
  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "auto",
        transition: [["opacity", "standard.enter"]],
      },
      false: {
        opacity: 0,
        pointerEvents: "none",
        transition: [["opacity", "standard.exit"]],
      },
    },
  },
});
