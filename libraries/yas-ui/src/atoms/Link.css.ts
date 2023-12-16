import { style } from "@yas/style";

export const link = style({
  fontFamily: "default",
  textDecoration: "none",
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
    "&:active, &:-webkit-any-link": {
      color: "inherit",
    },
  },
});
