import { atoms, recipe } from "@yas/style";

export const dividerRecipe = recipe({
  base: atoms({
    height: 1,
    backgroundColor: "tint",
    width: "100%",
    boxSizing: "border-box",
    border: "none",
  }),
  variants: {
    margin: {
      true: atoms({
        marginTop: "l",
        marginBottom: "l",
      }),
      false: atoms({
        margin: 0,
      }),
    },
  },
  defaultVariants: {
    margin: true,
  },
});
