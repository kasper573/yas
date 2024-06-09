import { flattened } from "flattened";
import { tokens } from "@yas/design-tokens";
import type {
  PropertiesHyphen as CSSProperties,
  DataType,
  Property,
} from "csstype";

/**
 * Typesafe and design token compliant way of defining css transitions.
 *
 * Usage:
 *
 * import { createTransition, style } from "@yas/style";
 *
 * const myStyle = style({
 *   transition: createTransition(["opacity", "standard.enter"])
 * })
 */
export function createTransition<const Transitions extends Transition[]>(
  ...transitions: Transitions
) {
  return transitions
    .flatMap(([propertyNameOrNames, preset]) => {
      const propertyNames = Array.isArray(propertyNameOrNames)
        ? propertyNameOrNames
        : [propertyNameOrNames];
      return propertyNames.map(
        (property) => `${property} ${transitionPresetValues[preset]}`,
      );
    })
    .join(", ");
}

/**
 * Typesafe and design token compliant way of defining css animations.
 *
 * Usage:
 *
 * import { createAnimation, style } from "@yas/style";
 *
 * const myStyle = style({
 *   animation: createAnimation([enter, "long1", "emphasized", { count: 1 }]),
 * })
 */
export function createAnimation<Animations extends Animation[]>(
  ...animations: Animations
) {
  return animations
    .map(
      ([
        animationName,
        durationPreset,
        easingPreset,
        {
          count = "infinite" as const,
          fill = "forwards" as const,
          direction = "normal" as const,
        } = {},
      ]) => {
        return [
          animationName,
          tokens.durations[durationPreset],
          tokens.easings[easingPreset],
          count,
          fill,
          direction,
        ]
          .filter(Boolean)
          .join(" ");
      },
    )
    .join(", ");
}

export type Animation = [
  animationName: string,
  durationPreset: tokens.Duration,
  easingPreset: tokens.Easing,
  options?: AnimationOptions,
];

export interface AnimationOptions {
  count?: Property.AnimationIterationCount;
  direction?: DataType.SingleAnimationDirection;
  fill?: DataType.SingleAnimationFillMode;
}

export type Transition = [
  property: keyof CSSProperties | ReadonlyArray<keyof CSSProperties>,
  preset: keyof typeof transitionPresetValues,
];

export type TransitionPreset = keyof typeof transitionPresetValues;

const cssTransitions = Object.fromEntries(
  Object.entries(tokens.transitions).map(([name, { duration, easing }]) => [
    name,
    `${duration} ${easing}`,
  ]),
) as {
  [Name in keyof tokens.Transitions]: string;
};

const transitionPresetValues = flattened(cssTransitions);

export const transitionPresets = Object.keys(
  transitionPresetValues,
) as Array<TransitionPreset>;
