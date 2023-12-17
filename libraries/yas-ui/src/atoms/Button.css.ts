import { recipe } from "@yas/style";

export const buttonRecipe = recipe({
  base: {
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    fontFamily: "default",
    fontWeight: 500,
    fontSize: "#2",
    textTransform: "uppercase",
    transition: [
      [["background-color", "color", "border-color"], "standard.enter"],
    ],
    border: ["standard"],
    borderRadius: "#2",
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
    size: "small",
    variant: "contained",
    color: "primary",
    disabled: false,
  },
});
