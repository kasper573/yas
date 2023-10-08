import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import * as tokens from "./tokens";
import { fontFamilies } from "./tokens";
import { themeVars } from "./themeVars.css";

// Atomic properties

const overflows = ["visible", "hidden", "scroll"] as const;

const staticProperties = defineProperties({
  properties: {
    cursor: ["pointer", "default"],
    pointerEvents: ["none", "all"],
    opacity: tokens.opacities,
    display: ["none", "flex", "inline-flex", "grid", "inline-grid", "block"],
    flex: [1, 2, 3, 4],
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
    width: ["auto"],
    height: ["auto"],
    overflowX: overflows,
    overflowY: overflows,
    textAlign: ["left", "center", "right", "inherit"],
    fontFamily: fontFamilies,
    fontSize: tokens.fontSizes,
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

export const atoms = createSprinkles(staticProperties, colorProperties);

export type Atoms = Parameters<typeof atoms>[0];
