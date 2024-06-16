import { atoms, globalStyle, recipe } from "@yas/style";

export const list = recipe({
  base: atoms({
    width: "100%",
    m: 0,
    p: 0,
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
  }),
  variants: {
    compact: {
      true: atoms({ gap: "xs" }),
      false: atoms({ gap: "m", py: "m" }),
    },
  },
  defaultVariants: {
    compact: false,
  },
});

export const item = recipe({
  base: atoms({
    display: "flex",
    flexDirection: "row",
    gap: "l",
    alignItems: "center",
    py: "m",
    px: "l",
    transition: "appearance.standard.enter",
    width: "100%",
    boxSizing: "border-box",
  }),
  variants: {
    button: {
      true: atoms({
        cursor: "pointer",
        backgroundColor: { hover: "info.hover", active: "info.active" },
        color: { hover: "info.face", active: "surface.face" },
      }),
    },
  },
});

const itemContentHeight = "xl" as const;

export const icon = atoms({
  height: itemContentHeight,
  width: itemContentHeight,
  minWidth: itemContentHeight,
  minHeight: itemContentHeight,
  boxSizing: "border-box",
});

globalStyle(`${icon} > *`, {
  height: "100%",
  width: "100%",
});

export const text = atoms({
  overflow: "hidden",
});

export const textEllipsis = atoms({
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  maxWidth: "100%",
});

export const secondaryContent = atoms({
  flex: 1,
  ml: "auto",
});
