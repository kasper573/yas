import { recipe } from "@yas/style";

export const checkboxRecipe = recipe({
  base: {
    border: ["standard"],
    borderRadius: "#1",
    backgroundColor: "surface.main",
    fontSize: "#2",
    outline: { focus: "none" },
    boxShadow: { focus: "#1" },
    borderColor: {
      default: "divider",
      focus: "primary.base.main",
    },
  },
});
