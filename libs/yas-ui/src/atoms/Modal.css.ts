import { recipe } from "@yas/css";

export const overlayRecipe = recipe({
  base: {
    backgroundColor: "hsl(0 0% 0% / 0.5)",
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
    backgroundColor: "white",
    borderRadius: 6,
    boxShadow:
      "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "450px",
    maxHeight: "85vh",
    padding: 25,
    transition: "opacity 150ms cubic-bezier(0.16, 1, 0.3, 1)",
    ":focus": { outline: "none" },
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
