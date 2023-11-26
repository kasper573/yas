import { recipe } from "@yas/style";

export const checkboxRecipe = recipe({
  base: {
    padding: "#3",
    borderColor: "divider",
    borderStyle: "solid",
    borderRadius: "#2",
    backgroundColor: "surface.main",
    fontSize: "#2",
    selectors: {
      "&:focus": {
        outline: "none",
        borderColor: "primary.base.main",
        boxShadow: "#1",
      },
    },
  },
});
