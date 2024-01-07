import { recipe } from "@yas/style";

export const checkboxRecipe = recipe({
  base: {
    border: "standard",
    borderRadius: "#1",
    backgroundColor: "surface.base.main",
    width: "20px",
    height: "20px",
    outline: { focus: "none" },
    boxShadow: { focus: "#1" },
    borderColor: {
      default: "divider",
      focus: "primary.base.main",
    },
  },
});
