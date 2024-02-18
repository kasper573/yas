import { recipe } from "@yas/style";
import { tokens } from "@yas/design-system";

type Space = keyof typeof tokens.spaces;
const spaces = Object.keys(tokens.spaces) as Space[];

export const stackRecipe = recipe({
  base: {
    boxSizing: "border-box",
  },
  variants: {
    inline: {
      true: {
        display: "inline-flex",
      },
      false: {
        display: "flex",
      },
    },
    fullWidth: {
      true: {
        width: "100%",
      },
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
      start: { alignItems: "start" },
      center: { alignItems: "center" },
      end: { alignItems: "end" },
      stretch: { alignItems: "stretch" },
    },
    justify: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
      spaceBetween: { justifyContent: "space-between" },
    },
    gap: Object.fromEntries(
      spaces.map((space) => [space, { gap: space }]),
    ) as Record<Space, { gap: Space }>,
    columnGap: Object.fromEntries(
      spaces.map((space) => [space, { columnGap: space }]),
    ) as Record<Space, { columnGap: Space }>,
    rowGap: Object.fromEntries(
      spaces.map((space) => [space, { rowGap: space }]),
    ) as Record<Space, { rowGap: Space }>,
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
