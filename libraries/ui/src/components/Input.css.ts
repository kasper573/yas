import { atoms, recipe } from "@yas/style";

export const root = recipe({
  base: atoms({
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    border: "thin",
    borderRadius: "m",
    backgroundColor: "surface.base",
    outline: { focus: "none" },
    boxShadow: { focus: "thin" },
    borderColor: {
      focus: "primary.base",
    },
  }),
  variants: {
    error: {
      true: atoms({ borderColor: "error.base" }),
    },
    size: {
      small: atoms({ p: "s" }),
      medium: atoms({ p: "m" }),
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const input = atoms({
  all: "unset",
  typography: "body",
  color: "surface.face",
  flex: 1,
  px: "s",
});

export const slot = atoms({
  display: "flex",
});
