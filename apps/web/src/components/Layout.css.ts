import { globalStyle, style } from "@yas/style";

export const layout = style({
  background: "surface.main",
  color: "surface.contrast",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

globalStyle("html, body, #root", {
  minHeight: "100vh",
  margin: 0,
});
