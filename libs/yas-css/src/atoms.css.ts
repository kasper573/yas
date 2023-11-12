import { all, createStyleResolver } from "vanilla-extract-constrained";
import * as tokens from "./tokens";
import { themeVars } from "./themeVars.css";

const overflows = ["visible", "hidden", "scroll"] as const;

const colors = {
  transparent: "transparent",
  ...themeVars.color,
};

export type Atoms = Parameters<typeof resolveAtoms>[0];
export const resolveAtoms = createStyleResolver({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
  },
  defaultCondition: "default",
  properties: {
    cursor: all(),
    pointerEvents: all(),
    opacity: tokens.opacities,
    display: all(),
    flex: all(),
    flexDirection: all(),
    border: ["none"],
    borderWidth: tokens.borderSizes,
    borderStyle: all(),
    borderRadius: tokens.radii,
    justifyContent: all(),
    alignItems: all(),
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
    textAlign: all(),
    fontFamily: tokens.fonts,
    fontSize: tokens.fontSizes,
    fontWeight: all(),
    color: colors,
    background: colors,
    borderColor: colors,
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
