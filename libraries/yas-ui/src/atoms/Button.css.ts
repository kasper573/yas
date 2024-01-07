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
    width: "auto",
    overflow: "visible",
    textAlign: "inherit",
    transition: [
      [["background-color", "color", "border-color"], "standard.enter"],
    ],
    border: "standard",
    cursor: "pointer",
  },
  variants: {
    button: {
      true: {
        display: "inline-flex",
        padding: "#1",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "uppercase",
        boxSizing: "border-box",
        fontSize: "100%",
        overflow: "hidden",
      },
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
    color: {
      "surface-contrast": {},
      ...(Object.fromEntries(colorSetNames.map((name) => [name, {}])) as Record<
        ColorSetName,
        {}
      >),
    },
    variant: {
      text: {},
      contained: {},
      outlined: {},
    },
    shape: {
      circular: {
        borderRadius: "50%",
      },
      rounded: {
        borderRadius: "#2",
      },
    },
    disabled: {
      true: { pointerEvents: "none" },
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { button: true, size: "small" },
      style: iconSize(24),
    },
    {
      variants: { button: true, size: "medium" },
      style: iconSize(28),
    },
    {
      variants: { button: true, size: "large" },
      style: iconSize(32),
    },
    {
      variants: { button: false, size: "small" },
      style: {
        typography: "caption",
        px: "#2",
        py: "#1",
      },
    },
    {
      variants: { button: false, size: "medium" },
      style: {
        typography: "body",
        px: "#3",
        py: "#1",
      },
    },
    {
      variants: { button: false, size: "large" },
      style: {
        typography: "body2",
        px: "#3",
        py: "#1",
      },
    },
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
    shape: "rounded",
    disabled: false,
    button: false,
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
      style: {
        color: `${basePrefix}.main`,
        background: {
          default: `transparent`,
          hover: `${contrastPrefix}.light`,
          active: `${contrastPrefix}.main`,
        },
        borderColor: "transparent",
      },
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

function iconSize(value: number) {
  return {
    minWidth: value,
    minHeight: value,
    maxWidth: value,
    maxHeight: value,
  };
}

function without<T>(array: T[], ...values: T[]): T[] {
  return array.filter((value) => !values.includes(value));
}
