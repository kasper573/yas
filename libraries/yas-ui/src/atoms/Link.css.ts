import { style } from "@yas/style";

export const link = style({
  typography: "body",
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

export const h2 = style({
  typography: "h2",
});
