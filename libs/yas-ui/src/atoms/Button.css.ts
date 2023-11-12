import { recipe } from "@yas/css";

export const buttonRecipe = recipe({
  base: {
    border: "none",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    fontFamily: "inter",
    borderRadius: "#1",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: {
        fontSize: "#1",
        px: "#2",
        py: "#2",
      },
      medium: {
        fontSize: "#2",
        px: "#2",
        py: "#2",
      },
      large: {
        fontSize: "#3",
        px: "#3",
        py: "#2",
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
        borderColor: "primaryOutline",
      },
      secondary: {
        background: {
          default: "secondaryMain",
          hover: "secondaryAlt1",
          active: "secondaryAlt2",
        },
        color: "secondaryText",
        borderColor: "secondaryOutline",
      },
    },
    variant: {
      contained: {
        borderRadius: "#1",
      },
      outlined: {
        borderWidth: "#1",
        borderStyle: "solid",
      },
    },
    disabled: {
      true: {
        pointerEvents: "none",
        background: "disabledMain",
        color: "disabledText",
        borderColor: "disabledOutline",
      },
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
