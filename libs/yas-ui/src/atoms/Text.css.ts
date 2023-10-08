import { themeVars, unsafe } from "@yas/css";

export const textRecipe = unsafe.recipe({
  base: {
    fontFamily: "$mono",
    color: themeVars.color.text,
  },
  variants: {
    variant: {
      body: {
        fontSize: "$1",
      },
      h1: {
        display: "block",
        fontSize: "$3",
      },
      h2: {
        display: "block",
        fontSize: "$2",
      },
      h3: {
        display: "block",
        fontSize: "$1",
      },
      h4: {
        display: "block",
        fontSize: "$1",
      },
    },
    paragraph: {
      true: {
        display: "block",
        marginBottom: "$2",
      },
    },
  },
  defaultVariants: {
    variant: "body",
  },
});
