import { recipe } from "@yas/css";

export const textRecipe = recipe({
  base: {
    fontFamily: "inter",
    fontWeight: "normal",
    color: "surfaceText",
    margin: 0,
    padding: 0,
    display: "block",
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
        marginBottom: "#2",
      },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: "caption",
        paragraph: false,
      },
      style: {
        display: "inline",
      },
    },
  ],
  defaultVariants: {
    variant: "body",
  },
});
