import { atoms, breakpointQuery, recipe, style, theme } from "@yas/style";
import { tokens } from "@yas/design-tokens";
import { buttonRecipe } from "./Button.css";

const borderRadius = "m" as const;

export const base = atoms({
  padding: "l",
  display: "inline-block",
});

export const months = style([
  atoms({
    display: "flex",
    flexDirection: "row",
    gap: "l",
  }),
  {
    "@media": {
      [breakpointQuery.down("s")]: {
        flexDirection: "column",
      },
    },
  },
]);

export const caption = atoms({
  display: "flex",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  height: "xl",
  mb: "m",
});

export const caption_label = atoms({
  typography: "body2",
});

export const nav = atoms({
  display: "flex",
  alignItems: "center",
  columnGap: "s",
});

export const nav_button = buttonRecipe({
  round: true,
  intent: "surface",
});

export const nav_button_previous = style([
  atoms({ position: "absolute" }),
  { left: 6 },
]);

export const nav_button_next = style([
  atoms({ position: "absolute" }),
  { right: 6 },
]);

export const table = atoms({
  width: "100%",
  borderCollapse: "collapse",
});

export const head_row = atoms({
  display: "flex",
});

export const head_cell = atoms({
  typography: "body",
  flex: 1,
});

export const row = atoms({
  display: "flex",
  width: "100%",
  mt: "s",
});

export const day = style([
  atoms({
    border: "none",
    typography: "body",
    cursor: "pointer",
    height: "l",
    width: "l",
    backgroundColor: "transparent",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "appearance.standard.enter",
    padding: 0,
    borderRadius,
  }),
  {
    selectors: {
      [`&:hover:not([aria-selected])`]: {
        background: theme.color.info.base,
        color: theme.color.info.face,
      },
    },
  },
]);

const selectedDayColors = {
  background: theme.color.primary.base,
  color: theme.color.primary.face,
} as const;

export const day_range_start = style(selectedDayColors);

export const day_range_middle = style({});

export const day_range_end = style(selectedDayColors);

export const day_selected = style({ opacity: 1 });

export const day_today = style({
  fontWeight: "bold",
  selectors: {
    [`&:not([aria-selected]), &${day_range_middle}`]: {
      color: theme.color.primary.base,
    },
  },
});

export const day_outside = style({});

export const day_disabled = style({});

export const day_hidden = style([
  {},
  atoms({
    visibility: "hidden",
  }),
]);

export const cell = recipe({
  base: [
    atoms({
      flex: 1,
      position: "relative",
      padding: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      typography: "caption",
      borderRadius,
      overflow: "hidden",
      transition: "appearance.standard.enter",
    }),
    {
      selectors: {
        [`&:has(>${day_outside}), &:has(>${day_disabled})`]: {
          opacity: 0.5,
        },
      },
    },
  ],
  variants: {
    range: {
      true: {
        selectors: {
          [`&:has(>${day_selected})`]: {
            background: theme.color.info.base,
            color: theme.color.info.face,
            borderRadius: 0,
          },
          [`&:has(>${day_range_start}), &:first-child`]: {
            borderLeftRadius: tokens.radius[borderRadius],
          },
          [`&:has(>${day_range_end}), &:last-child`]: {
            borderRightRadius: tokens.radius[borderRadius],
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
