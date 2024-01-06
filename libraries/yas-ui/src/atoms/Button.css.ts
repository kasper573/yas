import { recipe } from "@yas/style";

export const buttonRecipe = recipe({
  base: {
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    transition: [
      [["background-color", "color", "border-color"], "standard.enter"],
    ],
    border: "standard",
    borderRadius: "#2",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: {
        typography: "caption",
        color: "inherit",
        px: "#2",
        py: "#1",
      },
      medium: {
        typography: "body",
        px: "#3",
        py: "#1",
      },
      large: {
        typography: "body2",
        px: "#3",
        py: "#2",
      },
    },
    color: {
      primary: {},
      secondary: {},
      surface: {},
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
      variants: { color: "surface", variant: "text" },
      style: { color: "surface.contrast" },
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
      variants: { color: "surface", variant: "contained" },
      style: {
        background: {
          default: "surface.light",
          hover: "surface.main",
          active: "surface.dark",
        },
        color: "surface.contrast",
        borderColor: "surface.contrast",
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
      variants: { color: "surface", variant: "outlined" },
      style: {
        background: {
          default: "surface.contrast",
          hover: "surface.contrast",
          active: "surface.contrast",
        },
        color: "surface.main",
        borderColor: "surface.main",
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
