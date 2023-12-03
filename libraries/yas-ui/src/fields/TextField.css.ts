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
    borderStyle: "solid",
    borderWidth: "#1",
    borderRadius: "#2",
    backgroundColor: "surface.main",
    color: "surface.contrast",
    fontSize: "#3",
    fontFamily: "default",
    outline: { focus: "none" },
    boxShadow: { focus: "#1" },
    borderColor: {
      default: "divider",
      focus: "primary.base.main",
    },
  },
  variants: {
    fullWidth,
  },
});
