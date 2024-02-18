import type { TypographyVariant } from "@yas/design-system";
import { recipe, variables } from "@yas/style";

const typographyVariants = Object.keys(
  variables.typography,
) as TypographyVariant[];

export const textRecipe = recipe({
  base: {
    color: "inherit",
    display: "block",
  },
  variants: {
    variant: Object.fromEntries(
      typographyVariants.map((typography) => [typography, { typography }]),
    ) as Record<TypographyVariant, { typography: TypographyVariant }>,
    paragraph: {
      true: {
        marginBottom: "#2",
      },
      false: {},
    },
    noWrap: {
      true: {
        whiteSpace: "nowrap",
      },
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
