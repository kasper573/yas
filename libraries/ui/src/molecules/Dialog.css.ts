import { atoms, recipe, style } from "@yas/style";

export const dialogRecipe = recipe({
  base: style([
    atoms({
      // Reset
      border: "inherit",
      color: "inherit",
      padding: "inherit",
      margin: 0,
      display: "block",

      // Custom
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "center",
      pointerEvents: "all",
    }),
    {
      width: "90vw",
      maxWidth: "550px",
      maxHeight: "85vh",
    },
  ]),
  variants: {
    open: {
      true: atoms({
        opacity: 1,
        transition: "appearance.standard.enter",
      }),
      false: atoms({
        opacity: 0,
        transition: "appearance.standard.exit",
      }),
    },
  },
});

const commonPadding = "l" as const;

export const dialogTitle = atoms({
  m: commonPadding,
});

export const dialogContent = atoms({
  px: commonPadding,
});

export const dialogActions = atoms({
  padding: commonPadding,
  gap: commonPadding,
  display: "grid",
  gridAutoFlow: "column",
  justifyContent: "end",
});
