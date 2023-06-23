import { styled } from "../stitches";

export const Text = styled("span", {
  fontFamily: "$mono",
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
