import { createThemeContract } from "@vanilla-extract/css";

const colorGroup = {
  main: null,
  light: null,
  dark: null,
  contrast: null,
};

export const themeVars = createThemeContract({
  color: {
    // Groups
    ...flattenAs("surface", colorGroup),
    ...flattenAs("primary", colorGroup),
    ...flattenAs("secondary", colorGroup),
    ...flattenAs("success", colorGroup),
    ...flattenAs("info", colorGroup),
    ...flattenAs("warning", colorGroup),
    ...flattenAs("error", colorGroup),
    // One-off
    divider: null,
    dimmer: null,
    highlight: null,
  },
});

function flattenAs<Prefix extends string, Values extends object>(
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
