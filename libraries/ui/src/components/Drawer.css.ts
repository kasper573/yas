import { atoms, recipe } from "@yas/style";

export const clipperRecipe = atoms({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  overflow: "hidden",
});

const offset = "calc(100% + 5px)";

export const drawerRecipe = recipe({
  base: atoms({
    // Reset
    border: "inherit",
    color: "inherit",
    padding: "inherit",
    margin: 0,
    display: "block",

    // Custom
    position: "absolute",
    backgroundColor: "surface.base",
    pointerEvents: "all",
  }),
  variants: {
    position: {
      left: [
        atoms({
          inset: 0,
          right: "auto",
        }),
        { transform: `translate(calc(-1 * ${offset}), 0)` },
      ],
      right: [
        atoms({
          inset: 0,
          left: "auto",
        }),
        { transform: `translate(${offset}, 0)` },
      ],
      top: [
        atoms({
          inset: 0,
          bottom: "auto",
        }),
        { transform: `translate(0, calc(-1 * ${offset}))` },
      ],
      bottom: [
        atoms({
          inset: 0,
          top: "auto",
        }),
        { transform: `translate(0, ${offset})` },
      ],
    },
    open: {
      true: [
        atoms({
          transition: "transform.standard.enter",
          boxShadow: "thin",
        }),
        { transform: "translate(0, 0)" },
      ],
      false: atoms({
        transition: "transform.standard.exit",
        boxShadow: "none",
      }),
    },
  },
  defaultVariants: {
    position: "left",
  },
});
