import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import * as tokens from "./tokens";

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
    padding: tokens.space,
    paddingTop: tokens.space,
    paddingRight: tokens.space,
    paddingBottom: tokens.space,
    paddingLeft: tokens.space,
    marginTop: tokens.space,
    marginRight: tokens.space,
    marginBottom: tokens.space,
    marginLeft: tokens.space,
    margin: tokens.space,
    gap: tokens.space,
  },
  shorthands: {
    p: ["padding"],
    m: ["margin"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pr: ["paddingRight"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mr: ["marginRight"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
  },
});

const colorProperties = defineProperties({
  conditions: {
    lightMode: {},
    darkMode: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: "lightMode",
  properties: {
    color: tokens.colors,
    backgroundColor: tokens.colors,
  },
});

// Public interface

export const atoms = createSprinkles(responsiveProperties, colorProperties);
export type Atoms = Parameters<typeof atoms>[0];
