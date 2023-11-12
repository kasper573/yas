import { recipe } from "@yas/css";

export const checkboxRecipe = recipe({
  base: {
    padding: "#3",
    borderColor: "divider",
    borderStyle: "solid",
    borderRadius: "#2",
    backgroundColor: "surfaceMain",
    fontSize: "#2",
    selectors: {
      "&:focus": {
        outline: "none",
        borderColor: "primaryMain",
        boxShadow: "#1",
      },
    },
  },
});
