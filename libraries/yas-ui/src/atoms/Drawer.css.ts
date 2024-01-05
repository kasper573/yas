import { recipe, style } from "@yas/style";

export const clipperRecipe = style({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
});

const offset = "calc(100% + 5px)";

export const drawerRecipe = recipe({
  base: {
    // Reset
    border: "inherit",
    color: "inherit",
    padding: "inherit",
    margin: 0,
    display: "block",

    // Custom
    position: "absolute",
    background: "surface.light",
    pointerEvents: "all",
  },
  variants: {
    position: {
      left: {
        inset: 0,
        right: "auto",
        transform: `translate(calc(-1 * ${offset}), 0)`,
      },
      right: {
        inset: 0,
        left: "auto",
        transform: `translate(${offset}, 0)`,
      },
      top: {
        inset: 0,
        bottom: "auto",
        transform: `translate(0, calc(-1 * ${offset}))`,
      },
      bottom: {
        inset: 0,
        top: "auto",
        transform: `translate(0, ${offset})`,
      },
    },
    open: {
      true: {
        transition: [[["transform", "box-shadow"], "standard.enter"]],
        transform: "translate(0, 0)",
        boxShadow: "#1",
      },
      false: {
        transition: [[["transform", "box-shadow"], "standard.exit"]],
        boxShadow: "none",
      },
    },
  },
  defaultVariants: {
    position: "left",
  },
});
