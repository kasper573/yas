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
      small: {
        p: "#1.5",
      },
      medium: {
        p: "#2",
      },
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
  px: "#1",
});

export const slot = style({
  display: "flex",
});
