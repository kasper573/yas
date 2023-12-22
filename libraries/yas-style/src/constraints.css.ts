import type { PropertiesHyphen as CSSProperties } from "csstype";
import type {
  ConstrainedStyle as ConstrainedStyleImpl,
  StyleResolver,
} from "vanilla-extract-constrained";
import { all, createStyleResolver, multi } from "vanilla-extract-constrained";
import * as tokens from "./tokens";
import { vars } from "./vars.css";
import { flattened } from "./flattened";

const overflows = ["visible", "hidden", "scroll"] as const;

type Color = keyof typeof colors;
const colors = {
  transparent: "transparent",
  inherit: "inherit",
  current: "currentColor",
  // We flatten vars to make them compatible with vanilla-extract-constrained
  ...flattened(vars.color),
};

export type ConstrainedStyle = Parameters<typeof resolveStyle>[0];

export type ConstrainedStyleWithoutConditions = ConstrainedStyleImpl<
  {},
  typeof resolveStyle extends StyleResolver<infer _, infer Properties, infer _>
    ? Properties
    : never,
  typeof resolveStyle extends StyleResolver<infer _, infer _, infer Shorthands>
    ? Shorthands
    : never
>;

export const resolveStyle = createStyleResolver({
  conditions: {
    default: {},
    hoverOrFocus: { selectors: "&:hover, &:focus" },
    hover: { selectors: "&:hover" },
    focus: { selectors: "&:focus" },
    active: { selectors: "&:active" },
  },
  defaultCondition: "default",
  properties: {
    all: ["unset"] as const,
    cursor: all(),
    textTransform: all(),
    textDecoration: all(),
    pointerEvents: all(),
    opacity: all(),
    display: all(),
    gridAutoFlow: all(),
    flex: all(),
    flexDirection: all(),
    border,
    borderRadius: tokens.radii,
    inset: all(),
    outline: all(),
    position: all(),
    userSelect: all(),
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
    rowGap: tokens.spaces,
    columnGap: tokens.spaces,
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
    typography: multi(vars.typography),
    fontSize: ["inherit", "100%"] as const,
    color: colors,
    background: colors,
    backgroundColor: colors,
    backgroundImage: all(),
    borderColor: colors,
    boxSizing: all(),

    // SVG
    cx: all(),
    cy: all(),
    fill: all(),
    stroke: colors,
    strokeWidth: all(),
    r: all(),
    strokeDasharray: all(),

    // Composites
    transition,
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

const flattenedTransitions = flattened(vars.transitions);

/**
 * Define a transition css string by selecting among theme variable transition presets
 */
function transition<Transitions extends Transition[]>(
  ...transitions: Transitions
) {
  return transitions
    .flatMap(([propertyNameOrNames, preset]) => {
      const propertyNames = Array.isArray(propertyNameOrNames)
        ? propertyNameOrNames
        : [propertyNameOrNames];
      return propertyNames.map(
        (property) => `${property} ${flattenedTransitions[preset]}`,
      );
    })
    .join(", ");
}

type Transition = [
  property: keyof CSSProperties | Array<keyof CSSProperties>,
  preset: keyof typeof flattenedTransitions,
];

function border(...[preset, colorName = "divider"]: Border) {
  return tokens.borders[preset](colors[colorName]);
}

type Border = [preset: tokens.Border, color?: Color];
