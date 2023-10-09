import { recipe } from "@yas/css";

export const textRecipe = recipe({
  base: {
    fontFamily: "mono",
    fontWeight: "normal",
    color: "surfaceText",
  },
  variants: {
    variant: {
      body: {
        fontSize: "#2",
      },
      h1: {
        fontSize: "#5",
      },
      h2: {
        fontSize: "#4",
      },
      h3: {
        fontSize: "#3",
      },
      caption: {
        fontSize: "#1",
      },
    },
    paragraph: {
      true: {
        display: "block",
        marginBottom: "#2",
      },
    },
  },
  defaultVariants: {
    variant: "body",
  },
});
