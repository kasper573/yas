import { atoms, globalStyle, recipe } from "@yas/style";

export const avatar = recipe({
  base: atoms({
    backgroundColor: "surface.active",
    borderRadius: "circle",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  variants: {
    size: {
      small: atoms({ width: "s", height: "s" }),
      medium: atoms({ width: "m", height: "m" }),
      large: atoms({ width: "l", height: "l" }),
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

globalStyle(`${avatar.classNames.base} > *`, {
  height: "100%",
  width: "100%",
});
