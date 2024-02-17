import type { createTheme } from "@vanilla-extract/css";
import { createThemeContract } from "@vanilla-extract/css";
import type { Properties as CSSProperties } from "csstype";

export type ColorSet = Record<keyof typeof colorSet, string>;
const colorSet = {
  main: null,
  light: null,
  dark: null,
};

const colorSetWithContrast = {
  base: colorSet,
  contrast: colorSet,
};

const transition = {
  beginAndEndOnScreen: null,
  enter: null,
  exit: null,
};

export type TypographyVariant = keyof typeof vars.typography;
export type TypographyStyle = {
  [K in keyof typeof typographyStyle]: Extract<CSSProperties[K], string>;
};

const typographyStyle = {
  fontFamily: null,
  fontSize: null,
  fontStyle: null,
  fontWeight: null,
  letterSpacing: null,
  lineHeight: null,
  color: null,
} satisfies Partial<Record<keyof CSSProperties, null>>;

export const vars = createThemeContract({
  color: {
    // Contrast color sets
    surface: colorSetWithContrast,
    primary: colorSetWithContrast,
    secondary: colorSetWithContrast,
    success: colorSetWithContrast,
    info: colorSetWithContrast,
    warning: colorSetWithContrast,
    error: colorSetWithContrast,
    // Single colors
    divider: null,
    dimmer: null,
    highlight: null,
  },
  transitions: {
    emphasized: transition,
    standard: transition,
  },
  typography: {
    body: typographyStyle,
    body2: typographyStyle,
    caption: typographyStyle,
    hero: typographyStyle,
    h1: typographyStyle,
    h2: typographyStyle,
    h3: typographyStyle,
    h4: typographyStyle,
    h5: typographyStyle,
    h6: typographyStyle,
  },
});

export type ThemeValues = Parameters<typeof createTheme<typeof vars>>[1];

type Colors = typeof vars.color;

export type ColorSetName = {
  [K in keyof Colors]: Colors[K] extends string ? never : K;
}[keyof Colors];

export const colorSetNames = Object.entries(vars.color)
  .filter(([, value]) => typeof value !== "string")
  .map(([key]) => key) as ColorSetName[];
