import { atoms, recipe, style, theme } from "@yas/style";

export const linkRecipe = recipe({
  base: atoms({
    typography: "body",
    textDecoration: "none",
    cursor: "pointer",
  }),
  variants: {
    color: {
      inherit: anchorColorStyle("inherit"),
      primary: anchorColorStyle(theme.color.primary.base),
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

function anchorColorStyle(color: string) {
  return style({
    color,
    selectors: {
      "&:active": { color },
      "&:-webkit-any-link": { color },
    },
  });
}
