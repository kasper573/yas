import { recipe } from "@yas/style";

export const dockRecipe = recipe({
  base: {
    position: "absolute",
  },
  variants: {
    position: {
      top: {
        top: 0,
        left: 0,
        right: 0,
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
      },
      left: {
        top: 0,
        left: 0,
        bottom: 0,
      },
      right: {
        top: 0,
        right: 0,
        bottom: 0,
      },
      inset: {
        inset: 0,
      },
      center: {
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    },
  },
  defaultVariants: {
    position: "inset",
  },
});
