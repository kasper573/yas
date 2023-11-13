import { recipe } from "@yas/css";

export const buttonRecipe = recipe({
  base: {
    border: "none",
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    fontFamily: "default",
    fontWeight: 500,
    fontSize: "#2",
    textTransform: "uppercase",
    transition: "background-color 250ms, color 250ms, border-color 250ms",
    borderRadius: "#1",
    borderWidth: "#1",
    borderStyle: "solid",
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
      primary: {},
      secondary: {},
    },
    variant: {
      contained: {},
      outlined: {},
    },
    disabled: {
      true: { pointerEvents: "none" },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { color: "primary", variant: "contained" },
      style: {
        background: {
          default: "primaryLight",
          hover: "primaryMain",
          active: "primaryDark",
        },
        color: "primaryContrast",
        borderColor: "primaryContrast",
      },
    },
    {
      variants: { color: "secondary", variant: "contained" },
      style: {
        background: {
          default: "secondaryMain",
          hover: "secondaryLight",
          active: "secondaryDark",
        },
        color: "secondaryContrast",
        borderColor: "secondaryContrast",
      },
    },
    {
      variants: { color: "primary", variant: "outlined" },
      style: {
        background: {
          default: "primaryContrast",
          hover: "primaryContrast",
          active: "primaryContrast",
        },
        color: "primaryMain",
        borderColor: "primaryMain",
      },
    },
    {
      variants: { color: "secondary", variant: "outlined" },
      style: {
        background: {
          default: "secondaryContrast",
          hover: "secondaryContrast",
          active: "secondaryContrast",
        },
        color: "secondaryMain",
        borderColor: "secondaryMain",
      },
    },
    {
      variants: { disabled: true },
      style: {
        background: { default: "infoDark" },
        color: "highlight",
        borderColor: "surfaceDark",
      },
    },
  ],
  defaultVariants: {
    size: "small",
    variant: "contained",
    color: "primary",
    disabled: false,
  },
});
