import { all, createStyleResolver } from "vanilla-extract-constrained";
import * as tokens from "./tokens";
import { themeVars } from "./themeVars.css";

const overflows = ["visible", "hidden", "scroll"] as const;

const colors = {
  transparent: "transparent",
  inherit: "inherit",
  ...themeVars.color,
};

const spaces = {
  ...tokens.spaces,
  inherit: "inherit",
};

export type Atoms = Parameters<typeof resolveAtoms>[0];
export const resolveAtoms = createStyleResolver({
  conditions: {
    default: {},
    hover: { selectors: "&:hover" },
    active: { selectors: "&:active" },
  },
  defaultCondition: "default",
  properties: {
    cursor: all(),
    textTransform: all(),
    textDecoration: all(),
    pointerEvents: all(),
    opacity: all(),
    display: all(),
    gridAutoFlow: all(),
    flex: all(),
    flexDirection: all(),
    border: ["none", "inherit"],
    inset: all(),
    outline: all(),
    position: all(),
    borderWidth: tokens.borderSizes,
    borderStyle: all(),
    borderRadius: tokens.radii,
    justifyContent: all(),
    alignItems: all(),
    padding: spaces,
    paddingTop: spaces,
    paddingRight: spaces,
    paddingBottom: spaces,
    paddingLeft: spaces,
    marginTop: spaces,
    marginRight: spaces,
    marginBottom: spaces,
    marginLeft: spaces,
    margin: spaces,
    gap: spaces,
    objectFit: all(),
    width: all(),
    height: all(),
    minWidth: all(),
    minHeight: all(),
    maxWidth: all(),
    maxHeight: all(),
    top: all(),
    right: all(),
    bottom: all(),
    left: all(),
    overflowX: overflows,
    overflowY: overflows,
    textAlign: all(),
    fontFamily: tokens.fonts,
    fontSize: tokens.fontSizes,
    fontWeight: all(),
    color: colors,
    background: colors,
    backgroundColor: colors,
    backgroundImage: all(),
    borderColor: colors,

    // SVG
    cx: all(),
    cy: all(),
    fill: all(),
    stroke: colors,
    strokeWidth: all(),
    r: all(),
    strokeDasharray: all(),

    // Composites
    transition: all(),
    animation: all(),
    transform: all(),
    boxShadow: tokens.shadows,
    textShadow: tokens.shadows,
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
