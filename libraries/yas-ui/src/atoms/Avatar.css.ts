import { globalStyle, recipe } from "@yas/style";

export const avatar = recipe({
  base: {
    backgroundColor: "surface.dark",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  variants: {
    size: {
      small: {
        width: 16,
        height: 16,
      },
      medium: {
        width: 24,
        height: 24,
      },
      large: {
        width: 32,
        height: 32,
      },
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
