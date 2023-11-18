import { recipe } from "@yas/css";

export const inputRecipe = recipe({
  base: {
    padding: "#3",
    borderStyle: "solid",
    borderWidth: "#1",
    borderRadius: "#2",
    borderColor: "divider",
    backgroundColor: "surfaceMain",
    color: "surfaceContrast",
    fontSize: "#3",
    fontFamily: "default",

    selectors: {
      "&:focus": {
        outline: "none",
        borderColor: "primaryBaseMain",
        boxShadow: "#1",
      },
    },
  },
});