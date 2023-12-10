import { globalStyle, recipe } from "@yas/style";

const size = (value: number) => ({
  minWidth: value,
  minHeight: value,
  maxHeight: value,
  maxWidth: value,
});

export const iconButtonRecipe = recipe({
  base: {
    display: "inline-flex",
    padding: "#1.5",
    margin: 0,
    textAlign: "inherit",
    fontFamily: "default",
    fontWeight: 500,
    textTransform: "uppercase",
    boxSizing: "border-box",
    transition: [
      [["background-color", "color", "border-color"], "standard.enter"],
    ],
    borderRadius: "50%",
    borderWidth: "#1",
    borderStyle: "solid",
    overflow: "hidden",
    fontSize: "100%",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: size(24),
      medium: size(32),
      large: size(48),
    },
    color: {
      primary: {},
      secondary: {},
    },
    variant: {
      text: {
        borderColor: "transparent",
        background: {
          default: "transparent",
          hover: "info.dark",
          active: "info.main",
        },
      },
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
      variants: { color: "primary", variant: "text" },
      style: { color: "primary.base.main" },
    },
    {
      variants: { color: "secondary", variant: "text" },
      style: { color: "secondary.base.main" },
    },
    {
      variants: { color: "primary", variant: "contained" },
      style: {
        background: {
          default: "primary.base.light",
          hover: "primary.base.main",
          active: "primary.base.dark",
        },
        color: "primary.contrast.main",
        borderColor: "primary.contrast.main",
      },
    },
    {
      variants: { color: "secondary", variant: "contained" },
      style: {
        background: {
          default: "secondary.base.light",
          hover: "secondary.base.main",
          active: "secondary.base.dark",
        },
        color: "secondary.contrast.main",
        borderColor: "secondary.contrast.main",
      },
    },
    {
      variants: { color: "primary", variant: "outlined" },
      style: {
        background: {
          default: "primary.contrast.light",
          hover: "primary.contrast.main",
          active: "primary.contrast.dark",
        },
        color: "primary.base.main",
        borderColor: "primary.base.main",
      },
    },
    {
      variants: { color: "secondary", variant: "outlined" },
      style: {
        background: {
          default: "secondary.contrast.light",
          hover: "secondary.contrast.main",
          active: "secondary.contrast.dark",
        },
        color: "secondary.base.main",
        borderColor: "secondary.base.main",
      },
    },
    {
      variants: { disabled: true },
      style: {
        background: { default: "info.dark" },
        color: "highlight",
        borderColor: "surface.dark",
      },
    },
  ],
  defaultVariants: {
    size: "medium",
    variant: "contained",
    color: "primary",
    disabled: false,
  },
});

globalStyle(`${iconButtonRecipe.classNames.base} > svg`, {
  width: "100%",
  height: "100%",
  color: "current",
});