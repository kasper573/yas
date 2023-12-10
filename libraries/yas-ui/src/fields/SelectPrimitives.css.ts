import { globalStyle, recipe, style } from "@yas/style";

export const trigger = style({
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "#1",
  py: 0,
  px: "#4",
  fontSize: "#1",
  lineHeight: "1",
  height: "35px",
  gap: "#1",
  fontFamily: "default",
  backgroundColor: "surface.light",
  color: "surface.contrast",
  boxShadow: "#1",
});

export const triggerHover = style({
  backgroundColor: "surface.main",
});

export const triggerFocus = style({
  borderColor: {
    default: "divider",
    focus: "primary.base.main",
  },
});

export const triggerPlaceholder = style({
  color: "primary.base.dark",
});

export const triggerIcon = style({
  color: "primary.base.light",
});

export const label = style({
  py: 0,
  px: "#5",
  fontSize: "#1",
  lineHeight: "2em",
  color: "surface.contrast",
});

export const content = style({
  fontFamily: "default",
  overflow: "hidden",
  backgroundColor: "surface.light",
  borderRadius: "#2",
  boxShadow: "#1",
});

export const viewport = style({
  padding: "#1",
});

export const item = style({
  all: "unset",
  fontSize: "#2",
  lineHeight: "1",
  color: {
    default: "surface.contrast",
    hoverOrFocus: "primary.contrast.main",
  },
  background: {
    hoverOrFocus: "primary.base.light",
  },
  borderRadius: "#1",
  display: "flex",
  alignItems: "center",
  height: "25px",
  py: 0,
  pl: "#5",
  pr: "#6",
  position: "relative",
  userSelect: "none",
});

export const itemDisabled = style({
  color: "info.dark",
  pointerEvents: "none",
});

export const itemHighlighted = style({
  outline: "none",
  backgroundColor: "primary.base.light",
  color: "primary.contrast.main",
});

export const itemSelectedIndicator = recipe({
  base: {
    position: "absolute",
    left: "0",
    width: "25px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  },
  variants: {
    selected: {
      true: {
        opacity: 1,
      },
    },
  },
});

// Hook into radix-ui's internal state for selected items
globalStyle(
  `${item}[data-state="checked"] ${itemSelectedIndicator.classNames.base}`,
  { opacity: 1 },
);

export const scrollButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "25px",
  backgroundColor: "surface.light",
  color: "surface.contrast",
  cursor: "default",
});
