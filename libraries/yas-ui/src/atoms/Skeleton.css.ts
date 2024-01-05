import { keyframes, style } from "@yas/style";

const pulse = keyframes({
  "0%": { opacity: 0.8 },
  "50%": { opacity: 0.4 },
  "100%": { opacity: 0.8 },
});

export const skeleton = style({
  animation: [pulse, "1.5s", "standard", "infinite"],
  borderRadius: "#2",
  background: "surface.light",
});
