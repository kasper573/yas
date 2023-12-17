import { recipe } from "@yas/style";

export const dividerRecipe = recipe({
  base: {
    height: "1px",
    backgroundColor: "divider",
    width: "100%",
    boxSizing: "border-box",
    border: "none",
  },
  variants: {
    margin: {
      true: {
        marginTop: "#3",
        marginBottom: "#3",
      },
      false: {
        margin: 0,
      },
    },
  },
  defaultVariants: {
    margin: true,
  },
});
