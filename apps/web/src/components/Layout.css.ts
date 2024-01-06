import { globalStyle, style } from "@yas/style";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

globalStyle("html", {
  background: "surface.main",
  color: "surface.contrast",
});

globalStyle("html, body, #root", {
  minHeight: "100vh",
  margin: 0,
});
