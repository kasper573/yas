import { atoms, recipe } from "@yas/style";
import { mapValues, tokens } from "@yas/design-tokens";

export const stackRecipe = recipe({
  base: atoms({
    boxSizing: "border-box",
  }),
  variants: {
    inline: {
      true: atoms({ display: "inline-flex" }),
      false: atoms({ display: "flex" }),
    },
    fullWidth: {
      true: atoms({ width: "100%" }),
    },
    direction: {
      row: {},
      column: {},
    },
    reverse: {
      true: {},
      false: {},
    },
    align: {
      start: atoms({ alignItems: "start" }),
      center: atoms({ alignItems: "center" }),
      end: atoms({ alignItems: "end" }),
      stretch: atoms({ alignItems: "stretch" }),
    },
    justify: {
      start: atoms({ justifyContent: "start" }),
      center: atoms({ justifyContent: "center" }),
      end: atoms({ justifyContent: "end" }),
      spaceBetween: atoms({ justifyContent: "space-between" }),
    },
    gap: mapValues(tokens.space, (gap) => ({ gap })),
    columnGap: mapValues(tokens.space, (columnGap) => ({ columnGap })),
    rowGap: mapValues(tokens.space, (rowGap) => ({ rowGap })),
  },
  compoundVariants: [
    {
      variants: { direction: "row", reverse: true },
      style: { flexDirection: "row-reverse" },
    },
    {
      variants: { direction: "column", reverse: true },
      style: { flexDirection: "column-reverse" },
    },
    {
      variants: { direction: "row", reverse: false },
      style: { flexDirection: "row" },
    },
    {
      variants: { direction: "column", reverse: false },
      style: { flexDirection: "column" },
    },
  ],
  defaultVariants: {
    align: "start",
    justify: "start",
    direction: "column",
    inline: false,
    fullWidth: true,
    reverse: false,
  },
});
