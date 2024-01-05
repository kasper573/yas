import type { PropertiesHyphen as CSSProperties } from "csstype";
import type {
  ConstrainedStyle as ConstrainedStyleImpl,
  StyleResolver,
} from "vanilla-extract-constrained";
import { all, createStyleResolver, multi } from "vanilla-extract-constrained";
import * as tokens from "./tokens";
import { vars } from "./vars.css";
import { flattened } from "./flattened";

const overflows = ["visible", "hidden", "scroll", "auto"] as const;

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
    "large-display": { "@media": "(min-width: 1024px)" },
    "medium-display": { "@media": "(min-width: 600px)" },
    "small-display": { "@media": "(max-width: 599px)" },
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
    visibility: all(),
    gridAutoFlow: all(),
    gridAutoColumns: all(),
    gridAutoRows: all(),
    gridArea: all(),
    gridTemplateAreas: all(),
    gridTemplateColumns: all(),
    gridTemplateRows: all(),
    flex: all(),
    flexShrink: all(),
    flexDirection: all(),
    listStyle: all(),
    border: tokens.borders(colors.divider),
    borderColor: colors,
    borderRadius: tokens.radii,
    borderTopRightRadius: tokens.radii,
    borderBottomRightRadius: tokens.radii,
    borderTopLeftRadius: tokens.radii,
    borderBottomLeftRadius: tokens.radii,
    borderCollapse: all(),
    inset: all(),
    outline: all(),
    position: all(),
    userSelect: all(),
    justifyContent: all(),
    alignItems: all(),
    alignSelf: all(),
    justifySelf: all(),
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
    lineHeight: [1, "inherit", "100%"] as const,
    fontWeight: all(),
    textOverflow: all(),
    whiteSpace: all(),
    color: colors,
    background: colors,
    backgroundColor: colors,
    backgroundImage: all(),
    boxSizing: all(),

    // SVG
    cx: all(),
    cy: all(),
    fill: colors,
    stroke: colors,
    strokeWidth: all(),
    r: all(),
    strokeDasharray: all(),

    // Composites
    transition,
    animation,
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
    borderRightRadius: ["borderTopRightRadius", "borderBottomRightRadius"],
    borderLeftRadius: ["borderTopLeftRadius", "borderBottomLeftRadius"],
    borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"],
    borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"],
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

/**
 * Define a transition css string by selecting among theme variable transition presets
 */
function animation([
  animationName,
  duration,
  easingPreset,
  iterationCount,
]: Animation) {
  return [animationName, duration, tokens.easings[easingPreset], iterationCount]
    .filter(Boolean)
    .join(" ");
}

type Animation = [
  animationName: string,
  duration: Duration,
  easingPreset: keyof typeof tokens.easings,
  iterationCount?: number | "infinite",
];

type TimeUnit = "ms" | "s" | "min" | "h" | "d";
type Numeric = `${number}` | `${number}.${number}`;
type Duration = `${Numeric}${TimeUnit}`;

type Transition = [
  property: keyof CSSProperties | Array<keyof CSSProperties>,
  preset: keyof typeof flattenedTransitions,
];
