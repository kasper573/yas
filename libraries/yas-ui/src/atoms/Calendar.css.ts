import { clsx, recipe, style } from "@yas/style";
import { buttonRecipe } from "./Button.css";
import { iconButtonRecipe } from "./IconButton.css";

const borderRadius = "#2" as const;

export const base = style({
  padding: "#3",
  display: "inline-block",
});

export const months = style({
  display: "flex",
  flexDirection: {
    default: "column",
    "small-display": "row",
  },
  rowGap: {
    default: "#4",
    "small-display": 0,
  },
  columnGap: {
    "small-display": "#4",
  },
});

export const month = style({
  rowGap: "#4",
});

export const caption = style({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  mb: "#2",
});

export const caption_label = style({
  typography: "body2",
});

export const nav = style({
  display: "flex",
  alignItems: "center",
  columnGap: "#1",
});

export const nav_button = clsx(
  buttonRecipe({ variant: "outlined" }),
  style({
    height: 28,
    width: 28,
    background: "transparent",
    padding: 0,
    opacity: {
      default: 0.5,
      hover: 1,
    },
  }),
);

export const nav_button_previous = clsx(
  iconButtonRecipe(),
  style({
    position: "absolute",
    left: 6,
  }),
);

export const nav_button_next = clsx(
  iconButtonRecipe(),
  style({
    position: "absolute",
    right: 6,
  }),
);

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
  rowGap: "#1",
});

export const head_row = style({
  display: "flex",
});

export const head_cell = style({
  typography: "body",
  borderRadius: borderRadius,
  flex: 1,
});

export const row = style({
  display: "flex",
  width: "100%",
  mt: "#1",
});

export const day = style({
  border: "none",
  borderRadius: borderRadius,
  typography: "body",
  cursor: "pointer",
  height: 32,
  width: 32,
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: [[["background-color", "color"], "standard.enter"]],
  padding: 0,
  selectors: {
    [`&:hover:not([aria-selected])`]: {
      background: "info.main",
      color: "info.contrast",
    },
  },
});

export const day_range_start = style({});

export const day_range_middle = style({});

export const day_range_end = style({});

export const day_selected = style({
  background: "primary.base.main",
  color: "primary.contrast.main",
  opacity: 1,
});

export const day_today = style({
  background: "secondary.base.main",
  color: "secondary.contrast.main",
});

export const day_outside = style({
  color: "surface.contrastMuted",
  opacity: 0.5,
  selectors: {
    [`&:${day_selected}`]: {
      color: "secondary.contrast.main",
      background: "secondary.base.dark",
      opacity: 0.3,
    },
  },
});

export const day_disabled = style({
  opacity: 0.5,
  color: "surface.contrastMuted",
});

export const day_hidden = style({
  visibility: "hidden",
});

export const cell = recipe({
  base: {
    flex: 1,
    position: "relative",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    typography: "caption",
    selectors: {
      [`&:has(${day_selected}${day_range_end})`]: {
        borderRightRadius: borderRadius,
      },
    },
  },
  variants: {
    range: {
      true: {
        selectors: {
          [`&:has(>${day_range_end})`]: {
            borderRightRadius: borderRadius,
          },
          [`&:has(>${day_range_start})`]: {
            borderLeftRadius: borderRadius,
          },
          [`&:first:has(${day_selected})`]: {
            borderLeftRadius: borderRadius,
          },
          [`&:last:has(${day_selected})`]: {
            borderRightRadius: borderRadius,
          },
        },
      },
      false: {
        selectors: {
          [`&:has(${day_selected})`]: {
            borderRadius: borderRadius,
          },
        },
      },
    },
  },
});
