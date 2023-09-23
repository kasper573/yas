import { recipe } from "../styling/css";

export const buttonRecipe = recipe({
  base: {
    appearance: "none",
    border: "none",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    background: "transparent",
    fontFamily: "$mono",
  },
  variants: {
    size: {
      small: {
        fontSize: "0.75rem",
        padding: "0.25rem 0.5rem",
      },
      medium: {
        fontSize: "1rem",
        padding: "0.5rem 1rem",
      },
      large: {
        fontSize: "1.25rem",
        padding: "0.75rem 1.5rem",
      },
    },
    variant: {
      contained: {
        backgroundColor: "$blue",
        color: "$white",
        borderRadius: "$1",
      },
      outlined: {
        backgroundColor: "$blue",
        color: "$white",
        borderRadius: "$1",

        "&:hover": {
          backgroundColor: "$blueDark",
          cursor: "pointer",
        },

        "&:active": {
          backgroundColor: "$blueDarker",
        },
      },
    },
    disabled: {
      true: {},
      false: {},
    },
  },
  defaultVariants: {
    size: "small",
    variant: "outlined",
    disabled: false,
  },
});
