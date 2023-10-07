import { recipe } from "@yas/css";

export const buttonRecipe = recipe({
  base: {
    border: "none",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    background: "transparent",
    fontFamily: "mono",
    borderRadius: "#1",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: {
        fontSize: "#1",
        px: "x1",
        py: "x2",
      },
      medium: {
        fontSize: "#2",
        px: "x2",
        py: "x3",
      },
      large: {
        fontSize: "#3",
        px: "x3",
        py: "x4",
      },
    },
    color: {
      primary: {
        background: "primary",
        color: "white",
        ":hover": { background: "primaryDark" },
        ":active": { background: "primaryDarkest" },
      },
      secondary: {
        background: "secondary",
        color: "white",
        ":hover": { background: "secondaryDark" },
        ":active": { background: "secondaryDarkest" },
      },
    },
    variant: {
      contained: {
        borderRadius: "#1",
      },
      outlined: {
        background: "transparent",
        color: "black",
        borderSize: "#1",
        borderStyle: "solid",
        borderColor: "black",
      },
    },
    disabled: {
      true: { pointerEvents: "none", opacity: "#1" },
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
