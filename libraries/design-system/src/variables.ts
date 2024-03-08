import type { Properties as CSSProperties } from "csstype";

export type ColorSet = Record<keyof typeof colorSet, CSSLikeValue>;
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

export type TypographyVariant = keyof typeof themeTemplate.typography;
export type TypographyStyle = {
  [K in keyof typeof typographyStyle]: Extract<CSSProperties[K], CSSLikeValue>;
};

const typographyStyle = {
  fontFamily: null,
  fontSize: null,
  fontStyle: null,
  fontWeight: null,
  lineHeight: null,
  color: null,
} satisfies Partial<Record<keyof CSSProperties, null>>;

export const themeTemplate = {
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
} as const;

export type ThemeValues = ReplaceLeafs<typeof themeTemplate, CSSLikeValue>;

type CSSLikeValue = string;
type Colors = typeof themeTemplate.color;

export type ColorSetName = {
  [K in keyof Colors]: Colors[K] extends null ? never : K;
}[keyof Colors];

export const colorSetNames = Object.entries(themeTemplate.color)
  .filter(([, value]) => value !== null)
  .map(([key]) => key) as ColorSetName[];

type ReplaceLeafs<T, U> =
  T extends Record<string, unknown>
    ? { [K in keyof T]: ReplaceLeafs<T[K], U> }
    : U;
