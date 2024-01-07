import { globalStyle, recipe, style } from "@yas/style";

export const trigger = style({
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "#1",
  py: 0,
  px: "#4",
  typography: "caption",
  height: "35px",
  gap: "#1",
  backgroundColor: "surface.base.light",
  color: "surface.contrast.main",
  boxShadow: "#1",
});

export const triggerHover = style({
  backgroundColor: "surface.base.main",
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
  pb: "#1",
  px: "#4",
  typography: "h4",
  color: "surface.contrast.main",
});

export const labelRealCSSS = style({
  pb: "#1",
  px: "#4",
  typography: "h4",
  color: "surface.contrast.main",
});

export const content = style({
  typography: "body",
  overflow: "hidden",
  backgroundColor: "surface.base.light",
  borderRadius: "#2",
  boxShadow: "#1",
});

export const viewport = style({
  padding: "#1",
});

export const item = style({
  all: "unset",
  typography: "body",
  color: {
    default: "surface.contrast.main",
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
  color: "info.base.dark",
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
  backgroundColor: "surface.base.light",
  color: "surface.contrast.main",
  cursor: "default",
});
