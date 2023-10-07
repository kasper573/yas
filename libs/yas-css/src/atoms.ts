import { createAtomFactory } from "vanilla-extract-atoms";
import * as tokens from "./tokens";
import { fontFamilies } from "./tokens";

// Atomic properties

const overflows = ["visible", "hidden", "scroll"] as const;

export const atoms = createAtomFactory({
  properties: {
    cursor: ["pointer", "default"],
    pointerEvents: ["none", "all"],
    opacity: tokens.opacities,
    display: ["none", "flex", "inline-flex", "grid", "inline-grid"],
    border: ["none"],
    borderSize: tokens.borderSizes,
    borderStyle: ["solid", "dashed", "dotted"],
    borderRadius: tokens.radii,
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
    width: ["auto"],
    height: ["auto"],
    overflowX: overflows,
    overflowY: overflows,
    textAlign: ["left", "center", "right", "inherit"],
    fontFamily: fontFamilies,
    fontSize: tokens.fontSizes,
    color: tokens.colors,
    background: tokens.colors,
    borderColor: tokens.colors,
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

export type Atoms = Parameters<typeof atoms>[0];
