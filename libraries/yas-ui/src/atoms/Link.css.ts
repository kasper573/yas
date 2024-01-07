import { style } from "@yas/style";

export const link = style({
  textDecoration: "none",
  cursor: "pointer",
  selectors: {
    "&:hover": {
      textDecoration: "underline",
    },
    "&:active, &:-webkit-any-link": {
      color: "inherit",
    },
  },
});
