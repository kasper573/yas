import { atoms } from "@yas/style";

export const checkbox = atoms({
  border: "thin",
  borderRadius: "s",
  backgroundColor: "surface.base",
  width: "s",
  height: "s",
  outline: { focus: "none" },
  boxShadow: { focus: "thin" },
  borderColor: {
    default: "tint",
    focus: "primary.base",
  },
});
