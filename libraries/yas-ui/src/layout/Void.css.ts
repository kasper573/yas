import { recipe } from "@yas/style";

export const outer = recipe({
  variants: {
    axis: {
      vertical: {
        height: 0,
      },
    },
  },
});

export const inner = recipe({
  variants: {
    axis: {
      vertical: {
        transform: "translateY(-50%)",
      },
    },
  },
});
