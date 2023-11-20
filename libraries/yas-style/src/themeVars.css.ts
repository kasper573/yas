import { createThemeContract } from "@vanilla-extract/css";

const color = {
  main: null,
  light: null,
  dark: null,
};

const colorWithFullContrast = {
  ...prefix("base", color),
  ...prefix("contrast", color),
};

const colorWithSimpleContrast = {
  ...color,
  contrast: null,
};

const transition = {
  beginAndEndOnScreen: null,
  enter: null,
  exit: null,
};

export const themeVars = createThemeContract({
  color: {
    // Groups
    ...prefix("surface", colorWithSimpleContrast),
    ...prefix("primary", colorWithFullContrast),
    ...prefix("secondary", colorWithFullContrast),
    ...prefix("success", colorWithSimpleContrast),
    ...prefix("info", colorWithSimpleContrast),
    ...prefix("warning", colorWithSimpleContrast),
    ...prefix("error", colorWithSimpleContrast),
    // One-off
    divider: null,
    dimmer: null,
    highlight: null,
  },
  transitions: {
    ...prefix("emphasized", transition),
    ...prefix("standard", transition),
  },
});

function prefix<Prefix extends string, Values extends object>(
  prefix: Prefix,
  values: Values,
): Flattened<Prefix, Values> {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      prefix + capitalize(key),
      value,
    ]),
  ) as Flattened<Prefix, Values>;
}

type Flattened<Prefix extends string, Values extends object> = {
  [K in keyof Values as `${Prefix}${Capitalize<K & string>}`]: Values[K];
};

function capitalize<T extends string>(str: T): Capitalize<T> {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as Capitalize<T>;
}
