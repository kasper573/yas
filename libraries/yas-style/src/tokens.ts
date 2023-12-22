import { roboto } from "./fonts/roboto/roboto.css";

export const fonts = {
  default: roboto,
};

export const spaces = {
  0: 0,
  "#1": 4,
  "#1.5": 6,
  "#2": 8,
  "#3": 12,
  "#4": 16,
  "#5": 24,
  "#6": 32,
  "#7": 48,
  "#8": 64,
  "#9": 96,
  "#10": 128,
  inherit: "inherit",
  auto: "auto",
};

export const palette = {
  white: {
    "100%": "#ffffff",
    "87%": "rgba(255, 255, 255, 0.87)",
    "50%": "rgba(255, 255, 255, 0.5)",
  },
  black: {
    "100%": "#0f0f2a",
    "87%": "rgba(0, 0, 0, 0.87)",
    "50%": "rgba(0, 0, 0, 0.5)",
  },
  gray: {
    50: "#EFF2F6",
    100: "#DFE6EC",
    200: "#BFCDD9",
    300: "#9FB4C6",
    400: "#7F9BB3",
    500: "#5F82A0",
    600: "#4C6880",
    700: "#394E60",
    800: "#263440",
    900: "#131A20",
    950: "#090D10",
  },
  red: {
    50: "#FBECE9",
    100: "#F8DCD8",
    200: "#F0B6AD",
    300: "#E99486",
    400: "#E27160",
    500: "#DA4B36",
    600: "#B93622",
    700: "#8A2819",
    800: "#5A1A11",
    900: "#2F0E09",
    950: "#160604",
  },
  green: {
    50: "#E9F6EF",
    100: "#D7EFE2",
    200: "#AFDFC5",
    300: "#84CDA6",
    400: "#5CBD89",
    500: "#41A06E",
    600: "#347F57",
    700: "#265E40",
    800: "#1B412D",
    900: "#0D2116",
    950: "#060F0A",
  },
  blue: {
    50: "#F5FAFE",
    100: "#E7F3FE",
    200: "#D3EAFD",
    300: "#BBDFFB",
    400: "#A8D5FA",
    500: "#90CAF9",
    600: "#47A7F5",
    700: "#0C80DF",
    800: "#085696",
    900: "#042A49",
    950: "#021627",
  },
  orange: {
    50: "#FDF7ED",
    100: "#FAEDD6",
    200: "#F5DDB2",
    300: "#F0CA8A",
    400: "#EAB861",
    500: "#E5A73A",
    600: "#CB8A1B",
    700: "#996814",
    800: "#68470E",
    900: "#322207",
    950: "#1B1204",
  },
  teal: {
    50: "#E8F8F7",
    100: "#D1F0EF",
    200: "#A2E2DF",
    300: "#70D2CE",
    400: "#41C3BE",
    500: "#309794",
    600: "#267875",
    700: "#1C5957",
    800: "#143E3D",
    900: "#0A1F1E",
    950: "#050F0F",
  },
};

export const fontSizes = {
  "#1": 13,
  "#2": 14,
  "#3": 15,
  "#4": 18,
  "#5": 24,
  "#6": 32,
  "#7": 48,
  "#8": 64,
  "#9": 94,
  "#10": 128,
};

export type Radii = keyof typeof radii;
export const radii = {
  0: 0,
  "#1": 4,
  "#2": 8,
  "#3": 12,
  "50%": "50%",
};

export const shadows = {
  none: "none",
  "#1": `0px 4px 8px -3px ${palette.black["87%"]}`,
};

export type Border = keyof typeof borders;
export const borders = {
  none: () => "none",
  inherit: () => "inherit",
  standard: (color) => `1px solid ${color}`,
} satisfies Record<string, (color: string) => string>;

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
};

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
};
