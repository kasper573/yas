import { atoms, globalStyle, recipe } from "@yas/style";

export const trigger = atoms({
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "s",
  py: 0,
  px: "l",
  typography: "caption",
  height: "l",
  gap: "s",
  backgroundColor: "surface.hover",
  color: "surface.face",
  boxShadow: "thin",
});

export const triggerHover = atoms({
  backgroundColor: "surface.base",
});

export const triggerFocus = atoms({
  borderColor: {
    default: "tint",
    focus: "primary.base",
  },
});

export const triggerPlaceholder = atoms({
  color: "primary.active",
});

export const triggerIcon = atoms({
  color: "primary.hover",
});

export const label = atoms({
  pb: "s",
  px: "l",
  typography: "h4",
  color: "surface.face",
});

export const labelRealCSSS = atoms({
  pb: "s",
  px: "l",
  typography: "h4",
  color: "surface.face",
});

export const content = atoms({
  typography: "body",
  overflow: "hidden",
  backgroundColor: "surface.base",
  borderRadius: "m",
  boxShadow: "thin",
});

export const viewport = atoms({
  padding: "s",
});

export const item = atoms({
  all: "unset",
  typography: "body",
  color: {
    default: "surface.face",
    hover: "primary.face",
    focus: "primary.face",
  },
  backgroundColor: {
    hover: "primary.hover",
    focus: "primary.hover",
  },
  borderRadius: "s",
  display: "flex",
  alignItems: "center",
  height: "m",
  py: 0,
  px: "xl",
  position: "relative",
  userSelect: "none",
});

export const itemDisabled = atoms({
  opacity: 0.5,
  color: "info.base",
  pointerEvents: "none",
});

export const itemHighlighted = atoms({
  outline: "none",
  backgroundColor: "primary.hover",
  color: "primary.face",
});

export const itemSelectedIndicator = recipe({
  base: atoms({
    position: "absolute",
    left: 0,
    width: "m",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
  }),
  variants: {
    selected: {
      true: atoms({ opacity: 1 }),
    },
  },
});

// Hook into radix-ui's internal state for selected items
globalStyle(
  `${item}[data-state="checked"] ${itemSelectedIndicator.classNames.base}`,
  { opacity: 1 },
);

export const scrollButton = atoms({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "m",
  backgroundColor: "surface.hover",
  color: "surface.face",
  cursor: "default",
});
