import { globalStyle, recipe } from "@yas/style";

const size = (value: number) => ({
  width: value,
  height: value,
});

export const sizes = {
  small: 24,
  medium: 28,
  large: 32,
};

export const iconButtonRecipe = recipe({
  base: {
    display: "inline-flex",
    padding: "#1.5",
    margin: 0,
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
    boxSizing: "border-box",
    transition: [
      [["background-color", "color", "border-color"], "standard.enter"],
    ],
    border: "standard",
    fontSize: "100%",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: size(sizes.small),
      medium: size(sizes.medium),
      large: size(sizes.large),
    },
    color: {
      primary: {},
      secondary: {},
      inherit: {},
    },
    variant: {
      text: {
        borderColor: "transparent",
        background: {
          default: "transparent",
          hover: "info.base.dark",
          active: "info.base.main",
        },
      },
      contained: {},
      outlined: {},
    },
    shape: {
      circular: {
        borderRadius: "50%",
      },
      rounded: {
        borderRadius: "#2",
      },
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
      variants: { color: "inherit" },
      style: {
        color: "inherit",
        borderColor: "current",
      },
    },
    {
      variants: { disabled: true },
      style: {
        background: { default: "info.base.dark" },
        color: "highlight",
        borderColor: "surface.base.dark",
      },
    },
  ],
  defaultVariants: {
    size: "medium",
    variant: "contained",
    shape: "circular",
    color: "primary",
    disabled: false,
  },
});

globalStyle(`${iconButtonRecipe.classNames.base} > svg`, {
  width: "100%",
  height: "100%",
  color: "current",
});
