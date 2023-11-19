import { createTransition, recipe } from "@yas/style";

export const overlayRecipe = recipe({
  base: {
    backgroundColor: "dimmer",
    position: "fixed",
  },
  variants: {
    open: {
      true: {
        opacity: 1,
        pointerEvents: "auto",
        transition: createTransition([["opacity", "standardEnter"]]),
      },
      false: {
        opacity: 0,
        pointerEvents: "none",
        transition: createTransition([["opacity", "standardExit"]]),
      },
    },
  },
});

export const dialogRecipe = recipe({
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "450px",
    maxHeight: "85vh",
    padding: "#5",
  },
  variants: {
    open: {
      true: {
        opacity: 1,
        transition: createTransition([["opacity", "standardEnter"]]),
      },
      false: {
        opacity: 0,
        transition: createTransition([["opacity", "standardExit"]]),
      },
    },
  },
  defaultVariants: {
    open: false,
  },
});
