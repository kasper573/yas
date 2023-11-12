import { createThemeContract } from "@vanilla-extract/css";

const colorWithText = {
  main: null,
  text: null,
};

const colorWithTextAndAlternatives = {
  ...colorWithText,
  alt1: null,
  alt2: null,
};

export const themeVars = createThemeContract({
  color: {
    ...flattenAs("surface", colorWithText),
    ...flattenAs("primary", colorWithTextAndAlternatives),
    ...flattenAs("secondary", colorWithTextAndAlternatives),
    success: null,
    info: null,
    warning: null,
    error: null,
    divider: null,
    dimmer: null,
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
