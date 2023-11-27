import { recipe } from "@yas/style";

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
});
