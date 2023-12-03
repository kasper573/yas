import { style } from "@yas/style";

export const selectTrigger = style({
  all: "unset",
  display: "inline-flex",
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

export const selectTriggerHover = style({
  backgroundColor: "surface.main",
});

export const selectTriggerFocus = style({
  borderColor: {
    default: "divider",
    focus: "primary.base.main",
  },
});

export const selectTriggerPlaceholder = style({
  color: "primary.base.dark",
});

export const selectIcon = style({
  color: "primary.base.light",
});

export const selectContent = style({
  fontFamily: "default",
  overflow: "hidden",
  backgroundColor: "surface.light",
  borderRadius: "#2",
  boxShadow: "#1",
});

export const selectViewport = style({
  padding: "#1",
});

export const selectItem = style({
  all: "unset",
  fontSize: "#2",
  lineHeight: "1",
  color: {
    default: "surface.contrast",
    hover: "primary.contrast.main",
  },
  background: {
    hover: "primary.base.light",
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

export const selectItemDisabled = style({
  color: "info.dark",
  pointerEvents: "none",
});

export const selectItemHighlighted = style({
  outline: "none",
  backgroundColor: "primary.base.light",
  color: "primary.contrast.main",
});

export const selectLabel = style({
  py: 0,
  px: "#5",
  fontSize: "#1",
  lineHeight: "2em",
  color: "surface.contrast",
});

export const selectItemIndicator = style({
  position: "absolute",
  left: "0",
  width: "25px",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

export const selectScrollButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "25px",
  backgroundColor: "surface.light",
  color: "surface.contrast",
  cursor: "default",
});
