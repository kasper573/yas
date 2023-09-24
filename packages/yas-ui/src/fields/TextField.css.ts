import { recipe } from "../styling/css";

export const inputRecipe = recipe({
  base: {
    padding: 10,
    border: "1px solid black",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black",
    fontSize: 14,

    selectors: {
      "&:focus": {
        outline: "none",
        borderColor: "skyblue",
        boxShadow: "0 0 0 2px rgba(41, 106, 163, 0.2)",
      },
    },
  },
});
