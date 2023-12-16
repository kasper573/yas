import { recipe, unsafe } from "@yas/style";

type Space = keyof typeof unsafe.tokens.spaces;
const spaces = Object.keys(unsafe.tokens.spaces) as Space[];

export const stackRecipe = recipe({
  base: {
    display: "flex",
  },
  variants: {
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
    },
    justify: {
      start: { justifyContent: "start" },
      center: { justifyContent: "center" },
      end: { justifyContent: "end" },
    },
    gap: Object.fromEntries(
      spaces.map((space) => [space, { gap: space }]),
    ) as Record<Space, { gap: Space }>,
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
    reverse: false,
  },
});
