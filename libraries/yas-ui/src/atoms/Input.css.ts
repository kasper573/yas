import { recipe, style } from "@yas/style";

export const root = recipe({
  base: {
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    border: "standard",
    borderRadius: "#2",
    backgroundColor: "surface.light",
    outline: { focus: "none" },
    boxShadow: { focus: "#1" },
    borderColor: {
      focus: "primary.base.main",
    },
  },
  variants: {
    error: {
      true: {
        borderColor: "error.main",
      },
    },
    size: {
      small: {},
      medium: {},
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const input = style({
  all: "unset",
  typography: "body",
  color: "surface.contrast",
  flex: 1,
  px: "#3",
  selectors: {
    [`${root.classNames.variants.size.small} > &`]: {
      py: "#1.5",
    },
    [`${root.classNames.variants.size.medium} > &`]: {
      py: "#2",
    },
  },
});
