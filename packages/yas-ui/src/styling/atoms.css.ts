import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";

// Design tokens

const space = {
  none: 0,
  small: "4px",
  medium: "8px",
  large: "16px",
};

const colors = {
  "blue-50": "#eff6ff",
  "blue-100": "#dbeafe",
  "blue-200": "#bfdbfe",
  "gray-700": "#374151",
  "gray-800": "#1f2937",
  "gray-900": "#111827",
};

const fontSizes = {
  1: "12px",
  2: "13px",
  3: "15px",
};

const fontFamilies = {
  mono: "Söhne Mono, menlo, monospace",
};

const fonts = {
  caption: "",
};

const radii = {
  small: "5px",
  medium: "10px",
  large: "15px",
};

const shadows = {};

const transitions = {};

// Atomic properties

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { "@media": "screen and (min-width: 768px)" },
    desktop: { "@media": "screen and (min-width: 1024px)" },
  },
  defaultCondition: "mobile",
  properties: {
    display: ["none", "flex", "block", "inline"],
    flexDirection: ["row", "column"],
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    paddingTop: space,
    paddingRight: space,
    paddingBottom: space,
    paddingLeft: space,
    marginTop: space,
    marginRight: space,
    marginBottom: space,
    marginLeft: space,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: colors,
    backgroundColor: colors,
  },
});

// Public interface

export const atoms = createSprinkles(responsiveProperties, colorProperties);

export type Atoms = Parameters<typeof atoms>[0];
