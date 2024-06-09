import { atoms, style } from "@yas/style";

export const link = style([
  atoms({
    typography: "body",
    textDecoration: "none",
    cursor: "pointer",
  }),
  {
    selectors: {
      "&:hover": {
        textDecoration: "underline",
      },
      "&:active, &:-webkit-any-link": {
        color: "inherit",
      },
    },
  },
]);

export const h2 = atoms({
  typography: "h2",
});
