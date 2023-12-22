import { recipe, unsafe } from "@yas/style";

const typographyVariants = Object.keys(
  unsafe.vars.typography,
) as unsafe.TypographyVariant[];

export const textRecipe = recipe({
  base: {
    color: "inherit",
    display: "block",
  },
  variants: {
    variant: Object.fromEntries(
      typographyVariants.map((typography) => [typography, { typography }]),
    ) as Record<
      unsafe.TypographyVariant,
      { typography: unsafe.TypographyVariant }
    >,
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
