import { recipe, style } from "@yas/style";

const fullWidth = {
  true: {
    width: "100%",
  },
};

export const container = recipe({
  variants: {
    fullWidth,
  },
});

export const label = style({
  ml: "#1",
});

export const inputRecipe = recipe({
  base: {
    padding: "#3",
    border: "standard",
    borderRadius: "#2",
    backgroundColor: "surface.light",
    color: "surface.contrast",
    typography: "body",
    outline: { focus: "none" },
    boxShadow: { focus: "#1" },
    borderColor: {
      focus: "primary.base.main",
    },
  },
  variants: {
    fullWidth,
    error: {
      true: {
        borderColor: "error.main",
      },
    },
  },
});
