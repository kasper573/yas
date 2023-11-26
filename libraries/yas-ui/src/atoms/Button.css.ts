import { recipe } from "@yas/style";

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
    transition: [
      [["background-color", "color", "border-color"], "standardEnter"],
    ],
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
      text: {
        borderColor: "transparent",
        background: {
          default: "transparent",
          hover: "infoDark",
          active: "infoMain",
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
      style: { color: "primaryBaseMain" },
    },
    {
      variants: { color: "secondary", variant: "text" },
      style: { color: "secondaryBaseMain" },
    },
    {
      variants: { color: "primary", variant: "contained" },
      style: {
        background: {
          default: "primaryBaseLight",
          hover: "primaryBaseMain",
          active: "primaryBaseDark",
        },
        color: "primaryContrastMain",
        borderColor: "primaryContrastMain",
      },
    },
    {
      variants: { color: "secondary", variant: "contained" },
      style: {
        background: {
          default: "secondaryBaseLight",
          hover: "secondaryBaseMain",
          active: "secondaryBaseDark",
        },
        color: "secondaryContrastMain",
        borderColor: "secondaryContrastMain",
      },
    },
    {
      variants: { color: "primary", variant: "outlined" },
      style: {
        background: {
          default: "primaryContrastLight",
          hover: "primaryContrastMain",
          active: "primaryContrastDark",
        },
        color: "primaryBaseMain",
        borderColor: "primaryBaseMain",
      },
    },
    {
      variants: { color: "secondary", variant: "outlined" },
      style: {
        background: {
          default: "secondaryContrastLight",
          hover: "secondaryContrastMain",
          active: "secondaryContrastDark",
        },
        color: "secondaryBaseMain",
        borderColor: "secondaryBaseMain",
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
