import { recipe } from "@yas/style";

export const inputRecipe = recipe({
  base: {
    padding: "#3",
    borderStyle: "solid",
    borderWidth: "#1",
    borderRadius: "#2",
    borderColor: "divider",
    backgroundColor: "surface.main",
    color: "surface.contrast",
    fontSize: "#3",
    fontFamily: "default",

    selectors: {
      "&:focus": {
        outline: "none",
        borderColor: "primary.base.main",
        boxShadow: "#1",
      },
    },
  },
});
