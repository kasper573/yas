import { recipe, style } from "@yas/style";
import { buttonRecipe } from "../components/Button.css";

const borderRadius = "#2" as const;

export const base = style({
  padding: "#3",
  display: "inline-block",
});

export const months = style({
  display: "flex",
  flexDirection: {
    default: "row",
    "small-display": "column",
  },
  gap: "#3",
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

export const nav_button = buttonRecipe({
  icon: true,
  color: "surface-contrast",
  variant: "text",
  shape: "rounded",
  size: "medium",
});

export const nav_button_previous = style({
  position: "absolute",
  left: 6,
});

export const nav_button_next = style({
  position: "absolute",
  right: 6,
});

export const table = style({
  width: "100%",
  borderCollapse: "collapse",
});

export const head_row = style({
  display: "flex",
});

export const head_cell = style({
  typography: "body",
  flex: 1,
});

export const row = style({
  display: "flex",
  width: "100%",
  mt: "#1",
});

export const day = style({
  border: "none",
  typography: "body",
  cursor: "pointer",
  height: 32,
  width: 32,
  background: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: [[["background-color", "color", "opacity"], "standard.enter"]],
  padding: 0,
  borderRadius,
  selectors: {
    [`&:hover:not([aria-selected])`]: {
      background: "info.base.light",
      color: "info.contrast.main",
    },
  },
});

const selectedDayColors = {
  background: "primary.base.main",
  color: "primary.contrast.main",
} as const;

export const day_range_start = style(selectedDayColors);

export const day_range_middle = style({});

export const day_range_end = style(selectedDayColors);

export const day_selected = style({
  opacity: 1,
});

export const day_today = style({
  fontWeight: "bold",
  selectors: {
    [`&:not([aria-selected]), &${day_range_middle}`]: {
      color: "primary.base.main",
    },
  },
});

export const day_outside = style({});

export const day_disabled = style({});

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
    borderRadius,
    overflow: "hidden",
    transition: [[["background-color", "color"], "standard.enter"]],
    selectors: {
      [`&:has(>${day_outside}), &:has(>${day_disabled})`]: {
        opacity: 0.5,
      },
    },
  },
  variants: {
    range: {
      true: {
        selectors: {
          [`&:has(>${day_selected})`]: {
            background: "info.base.light",
            color: "info.contrast.main",
            borderRadius: 0,
          },
          [`&:has(>${day_range_start}), &:first-child`]: {
            borderLeftRadius: borderRadius,
          },
          [`&:has(>${day_range_end}), &:last-child`]: {
            borderRightRadius: borderRadius,
          },
        },
      },
      false: {
        borderRadius,
        selectors: {
          [`&:has(>${day_selected})`]: selectedDayColors,
        },
      },
    },
  },
});
