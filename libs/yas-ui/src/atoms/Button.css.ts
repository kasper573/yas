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
