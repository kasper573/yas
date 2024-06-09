import { inter } from "./fonts/inter";
import type { FontFaceDefinition } from "./fonts/convention";

/**
 * This module implements tokens that do not exist in figma or that cannot be automatically generated.
 */

export const fontFaces = {
  inter,
} satisfies Record<string, FontFaceDefinition[]>;

export const size = {} satisfies Record<string, number>;

export type Breakpoint = keyof typeof breakpoints;
export const breakpoints = {
  // Keep ordered from smallest to largest
  xs: 0,
  s: 600,
  m: 900,
  l: 1200,
  xl: 1536,
} satisfies Record<string, number>;

export type Duration = keyof typeof durations;
export const durations = {
  short1: "50ms",
  short2: "100ms",
  short3: "150ms",
  short4: "200ms",
  medium1: "250ms",
  medium2: "300ms",
  medium3: "350ms",
  medium4: "400ms",
  long1: "450ms",
  long2: "500ms",
  long3: "550ms",
  long4: "600ms",
  extraLong1: "700ms",
  extraLong2: "800ms",
  extraLong3: "900ms",
  extraLong4: "1000ms",
  extraLong5: "1500ms",
} as const;

export type Easing = keyof typeof easings;
export const easings = {
  emphasized: "cubic-bezier(0.2, 0, 0, 1)",
  emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
  emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  standardAccelerate: "cubic-bezier(0.3, 0, 1, 1)",
  standardDecelerate: "cubic-bezier(0, 0, 0, 1)",
  legacy: "cubic-bezier(0.4, 0, 0.2, 1)",
  legacyAccelerate: "cubic-bezier(0.4, 0, 1, 1)",
  legacyDecelerate: "cubic-bezier(0, 0, 0.2, 1)",
  linear: "cubic-bezier(0, 0, 1, 1)",
} as const;

export type Transition = {
  duration: (typeof durations)[Duration];
  easing: (typeof easings)[Easing];
};

export type Transitions = typeof transitions;
export const transitions = {
  "emphasized.beginAndEndOnScreen": {
    duration: durations.long2,
    easing: easings.emphasized,
  },
  "emphasized.enter": {
    duration: durations.medium4,
    easing: easings.emphasizedDecelerate,
  },
  "emphasized.exit": {
    duration: durations.short4,
    easing: easings.emphasizedAccelerate,
  },

  "standard.beginAndEndOnScreen": {
    duration: durations.medium2,
    easing: easings.standard,
  },
  "standard.enter": {
    duration: durations.medium1,
    easing: easings.standardDecelerate,
  },
  "standard.exit": {
    duration: durations.short4,
    easing: easings.standardAccelerate,
  },
} satisfies Record<string, Transition>;

export const borders = {
  thin: { width: 1, type: "solid" },
  normal: { width: 2, type: "solid" },
  thick: { width: 3, type: "solid" },
} as const;
