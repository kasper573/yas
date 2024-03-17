import { recipe } from "@yas/style";

export const dialogRecipe = recipe({
  base: {
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
    transform: "translate(-50%, -50%)",
    width: "90vw",
    maxWidth: "550px",
    maxHeight: "85vh",
    pointerEvents: "all",
  },
  variants: {
    open: {
      true: {
        opacity: 1,
        transition: [["opacity", "standard.enter"]],
      },
      false: {
        opacity: 0,
        transition: [["opacity", "standard.exit"]],
      },
    },
  },
});

const commonPadding = "#4" as const;

export const dialogTitleRecipe = recipe({
  base: {
    m: commonPadding,
  },
});

export const dialogContentRecipe = recipe({
  base: {
    px: commonPadding,
  },
});

export const dialogActionsRecipe = recipe({
  base: {
    padding: commonPadding,
    gap: commonPadding,
    display: "grid",
    gridAutoFlow: "column",
    justifyContent: "end",
  },
});
