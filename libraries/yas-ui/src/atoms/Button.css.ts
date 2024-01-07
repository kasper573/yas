import { recipe, unsafe } from "@yas/style";

const nonSurfaceColorSetNames = without(unsafe.colorSetNames, "surface");

export const iconSizes = {
  small: 24,
  medium: 28,
  large: 32,
};

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
    icon: {
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
      false: {},
    },
    size: {
      small: {},
      medium: {},
      large: {},
    },
    color: {
      "surface-contrast": {},
      ...(Object.fromEntries(
        nonSurfaceColorSetNames.map((name) => [name, {}]),
      ) as Record<Exclude<unsafe.ColorSetName, "surface">, {}>),
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
    ...Object.entries(iconSizes).map(([size, value]) => ({
      variants: { icon: true, size },
      style: {
        minWidth: value,
        minHeight: value,
        maxWidth: value,
        maxHeight: value,
      },
    })),
    {
      variants: { icon: false, size: "small" },
      style: {
        typography: "caption",
        px: "#2",
        py: "#1",
      },
    },
    {
      variants: { icon: false, size: "medium" },
      style: {
        typography: "body",
        px: "#3",
        py: "#1",
      },
    },
    {
      variants: { icon: false, size: "large" },
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
    ...nonSurfaceColorSetNames.flatMap((color) =>
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
    icon: false,
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

function without<T>(array: T[], ...values: T[]): T[] {
  return array.filter((value) => !values.includes(value));
}
