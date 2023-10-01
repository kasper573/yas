import { recipe } from "@yas/css";

export const checkboxRecipe = recipe({
  base: {
    padding: 10,
    border: "1px solid var(--ifm-color-primary-lightest)",
    borderRadius: 4,
    backgroundColor: "var(--ifm-background-color)",
    fontSize: 14,

    selectors: {
      "&:focus": {
        outline: "none",
        borderColor: "var(--ifm-color-primary)",
        boxShadow: "0 0 0 2px rgba(41, 106, 163, 0.2)",
      },
    },
  },
});
