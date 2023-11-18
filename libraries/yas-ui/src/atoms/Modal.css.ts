import { recipe } from "@yas/style";

export const overlayRecipe = recipe({
  base: {
    backgroundColor: "dimmer",
    position: "fixed",
    inset: 0,
    transition: "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1)",
  },
  variants: {
    open: {
      true: { opacity: 1, pointerEvents: "auto" },
      false: { opacity: 0, pointerEvents: "none" },
    },
  },
});

export const dialogRecipe = recipe({
  base: {
    backgroundColor: "surfaceMain",
    borderRadius: "#3",
    boxShadow: "#1",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "450px",
    maxHeight: "85vh",
    padding: "#5",
    transition: "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    selectors: {
      "&:focus": { outline: "none" },
    },
  },
  variants: {
    open: {
      true: { opacity: 1 },
      false: { opacity: 0 },
    },
  },
  defaultVariants: {
    open: false,
  },
});
