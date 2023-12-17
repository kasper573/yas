import { globalStyle, style } from "@yas/style";

globalStyle("html, body, #root", {
  minHeight: "100vh",
  margin: 0,
});

export const app = style({
  background: "surface.main",
  color: "surface.contrast",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});
