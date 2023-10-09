import { recipe } from "@yas/css";

export const buttonRecipe = recipe({
  base: {
    border: "none",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    fontFamily: "mono",
    borderRadius: "#1",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: {
        fontSize: "#1",
        px: "#1",
        py: "#2",
      },
      medium: {
        fontSize: "#2",
        px: "#2",
        py: "#3",
      },
      large: {
        fontSize: "#3",
        px: "#3",
        py: "#4",
      },
    },
    color: {
      primary: {
        background: {
          default: "primaryMain",
          hover: "primaryAlt1",
          active: "primaryAlt2",
        },
        color: "primaryText",
      },
      secondary: {
        background: {
          default: "secondaryMain",
          hover: "secondaryAlt1",
          active: "secondaryAlt2",
        },
        color: "secondaryText",
      },
    },
    variant: {
      contained: {
        borderRadius: "#1",
      },
      outlined: {
        background: "transparent",
        borderSize: "#1",
        borderStyle: "solid",
        borderColor: "border",
      },
    },
    disabled: {
      true: { pointerEvents: "none", opacity: 1 },
      false: {},
    },
  },
  defaultVariants: {
    size: "small",
    variant: "contained",
    color: "primary",
    disabled: false,
  },
});
