import { createVar, globalStyle, recipe, unsafe } from "@yas/style";

const { colorSetNames, vars: themeVars } = unsafe;
const nonSurfaceColorSetNames = colorSetNames.filter(
  (value) => value !== "surface",
) as Exclude<unsafe.ColorSetName, "surface">[];

export const iconSizes = {
  small: 24,
  medium: 28,
  large: 32,
};

const buttonVars = {
  iconSize: createVar("iconSize"),
  color: {
    base: {
      light: createVar("base.light"),
      main: createVar("base.main"),
      dark: createVar("base.dark"),
    },
    contrast: {
      light: createVar("contrast.light"),
      main: createVar("contrast.main"),
      dark: createVar("contrast.dark"),
    },
  },
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
    size: {
      small: {
        vars: { [buttonVars.iconSize]: `${iconSizes.small}px` },
        typography: "caption",
        px: "#2",
        py: "#1",
      },
      medium: {
        vars: { [buttonVars.iconSize]: `${iconSizes.medium}px` },
        typography: "body",
        px: "#3",
        py: "#1",
      },
      large: {
        vars: { [buttonVars.iconSize]: `${iconSizes.large}px` },
        typography: "body2",
        px: "#3",
        py: "#1",
      },
    },
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
        minWidth: buttonVars.iconSize,
        minHeight: buttonVars.iconSize,
        maxWidth: buttonVars.iconSize,
        maxHeight: buttonVars.iconSize,
      },
      false: {},
    },
    color: {
      "surface-contrast": {
        vars: assignColorVars(
          themeVars.color.surface.contrast,
          themeVars.color.surface.base,
        ),
      },
      ...(Object.fromEntries(
        nonSurfaceColorSetNames.map((name) => [
          name,
          {
            vars: assignColorVars(
              themeVars.color[name].base,
              themeVars.color[name].contrast,
            ),
          },
        ]),
      ) as Record<Exclude<unsafe.ColorSetName, "surface">, { vars: {} }>),
    },
    variant: {
      text: {
        color: buttonVars.color.base.main,
        background: {
          default: `transparent`,
          hover: buttonVars.color.contrast.light,
          active: buttonVars.color.contrast.main,
        },
        borderColor: "transparent",
      },
      contained: {
        background: {
          default: buttonVars.color.base.light,
          hover: buttonVars.color.base.main,
          active: buttonVars.color.base.dark,
        },
        color: buttonVars.color.contrast.light,
        borderColor: buttonVars.color.contrast.light,
      },
      outlined: {
        background: {
          default: buttonVars.color.contrast.light,
          hover: buttonVars.color.contrast.main,
          active: buttonVars.color.contrast.dark,
        },
        color: buttonVars.color.base.main,
        borderColor: buttonVars.color.base.main,
      },
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
      true: {
        pointerEvents: "none",
        background: "info.base.dark",
        color: "highlight",
        borderColor: "surface.base.dark",
      },
      false: {},
    },
  },
  defaultVariants: {
    size: "medium",
    variant: "contained",
    color: "primary",
    shape: "rounded",
    disabled: false,
    icon: false,
  },
});

function assignColorVars(base: unsafe.ColorSet, contrast: unsafe.ColorSet) {
  return {
    [buttonVars.color.base.light]: base.light,
    [buttonVars.color.base.main]: base.main,
    [buttonVars.color.base.dark]: base.dark,
    [buttonVars.color.contrast.light]: contrast.light,
    [buttonVars.color.contrast.main]: contrast.main,
    [buttonVars.color.contrast.dark]: contrast.dark,
  };
}

globalStyle(`${buttonRecipe.classNames.variants.icon.true} > *`, {
  width: "100%",
  height: "100%",
});
