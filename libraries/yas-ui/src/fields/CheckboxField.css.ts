import { recipe } from "@yas/style";

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
        borderColor: "primaryBaseMain",
        boxShadow: "#1",
      },
    },
  },
});
