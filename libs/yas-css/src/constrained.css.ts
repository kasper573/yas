import { defineProperties } from "vanilla-extract-constrained";
import { createConstrained } from "vanilla-extract-constrained";
import * as tokens from "./tokens";
import { themeVars } from "./themeVars.css";

// Atomic properties

const overflows = ["visible", "hidden", "scroll"] as const;

const staticProperties = defineProperties({
  properties: {
    cursor: ["pointer", "default"],
    pointerEvents: ["none", "all"],
    opacity: tokens.opacities,
    display: [
      "none",
      "flex",
      "inline",
      "inline-flex",
      "grid",
      "inline-grid",
      "block",
    ],
    flex: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    flexDirection: ["row", "column"],
    border: ["none"],
    borderSize: tokens.borderSizes,
    borderStyle: ["solid", "dashed", "dotted"],
    borderRadius: tokens.radii,
    justifyContent: [
      "stretch",
      "flex-start",
      "center",
      "flex-end",
      "space-around",
      "space-between",
    ],
    alignItems: ["stretch", "flex-start", "center", "flex-end"],
    padding: tokens.spaces,
    paddingTop: tokens.spaces,
    paddingRight: tokens.spaces,
    paddingBottom: tokens.spaces,
    paddingLeft: tokens.spaces,
    marginTop: tokens.spaces,
    marginRight: tokens.spaces,
    marginBottom: tokens.spaces,
    marginLeft: tokens.spaces,
    margin: tokens.spaces,
    gap: tokens.spaces,
    width: tokens.surfaceSizes,
    height: tokens.surfaceSizes,
    minWidth: tokens.surfaceSizes,
    minHeight: tokens.surfaceSizes,
    maxWidth: tokens.surfaceSizes,
    maxHeight: tokens.surfaceSizes,
    overflowX: overflows,
    overflowY: overflows,
    textAlign: ["left", "center", "right", "inherit"],
    fontFamily: tokens.fonts,
    fontSize: tokens.fontSizes,
    fontWeight: ["normal", "bold"],
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
    overflow: ["overflowX", "overflowY"],
  },
});

const colors = {
  transparent: "transparent",
  ...themeVars.color,
};

const colorProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
  },
  defaultCondition: "default",
  properties: {
    color: colors,
    background: colors,
    borderColor: colors,
  },
});

export const constrainedStyle = createConstrained(
  staticProperties,
  colorProperties,
);