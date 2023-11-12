import { recipe } from "@yas/css";

export const inputRecipe = recipe({
  base: {
    padding: "#3",
    borderStyle: "solid",
    borderWidth: "#1",
    borderRadius: "#2",
    borderColor: "divider",
    backgroundColor: "surfaceMain",
    color: "surfaceText",
    fontSize: "#3",
    fontFamily: "inter",

    selectors: {
      "&:focus": {
        outline: "none",
        borderColor: "primaryMain",
        boxShadow: "#1",
      },
    },
  },
});
