import { recipe, unsafe } from "@yas/style";

const { surface, ...nonSurfaceColors } = unsafe.vars.color;

type Colors = typeof nonSurfaceColors;
type ColorSetName = {
  [K in keyof Colors]: Colors[K] extends string ? never : K;
}[keyof Colors];

const colorSetNames = Object.entries(nonSurfaceColors)
  .filter(([, value]) => typeof value !== "string")
  .map(([key]) => key) as ColorSetName[];

export const buttonRecipe = recipe({
  base: {
    margin: 0,
    padding: 0,
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    transition: [
      [["background-color", "color", "border-color"], "standard.enter"],
    ],
    border: "standard",
    borderRadius: "#2",
    cursor: "pointer",
  },
  variants: {
    size: {
      small: {
        typography: "caption",
        color: "inherit",
        px: "#2",
        py: "#1",
      },
      medium: {
        typography: "body",
        px: "#3",
        py: "#1",
      },
      large: {
        typography: "body2",
        px: "#3",
        py: "#2",
      },
    },
    color: {
      "surface-contrast": {},
      ...(Object.fromEntries(colorSetNames.map((name) => [name, {}])) as Record<
        ColorSetName,
        {}
      >),
    },
    variant: {
      text: {
        borderColor: "transparent",
        background: {
          default: "transparent",
          hover: "info.base.dark",
          active: "info.base.main",
        },
      },
      contained: {},
      outlined: {},
    },
    disabled: {
      true: { pointerEvents: "none" },
      false: {},
    },
  },
  compoundVariants: [
    ...variantsForColorSet(
      "surface-contrast",
      "surface.contrast",
      "surface.base",
    ),
    ...without(colorSetNames, "surface").flatMap((color) =>
      variantsForColorSet(color, `${color}.base`, `${color}.contrast`),
    ),
    {
      variants: { disabled: true },
      style: {
        background: { default: "info.base.dark" },
        color: "highlight",
        borderColor: "surface.base.dark",
      },
    },
  ],
  defaultVariants: {
    size: "medium",
    variant: "contained",
    color: "primary",
    disabled: false,
  },
});

function variantsForColorSet<ColorVariant extends string>(
  colorVariant: ColorVariant,
  basePrefix: string,
  contrastPrefix: string,
) {
  return [
    {
      variants: { color: colorVariant, variant: "text" },
      style: { color: `${basePrefix}.main` },
    },
    {
      variants: { color: colorVariant, variant: "contained" },
      style: {
        background: {
          default: `${basePrefix}.light`,
          hover: `${basePrefix}.main`,
          active: `${basePrefix}.dark`,
        },
        color: `${contrastPrefix}.main`,
        borderColor: `${contrastPrefix}.main`,
      },
    },
    {
      variants: { color: colorVariant, variant: `outlined` },
      style: {
        background: {
          default: `${contrastPrefix}.light`,
          hover: `${contrastPrefix}.main`,
          active: `${contrastPrefix}.dark`,
        },
        color: `${basePrefix}.main`,
        borderColor: `${basePrefix}.main`,
      },
    },
  ] as { variants: {}; style: {} }[];
}

function without<T>(array: T[], ...values: T[]): T[] {
  return array.filter((value) => !values.includes(value));
}
