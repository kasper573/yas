import { globalStyle, style } from "@yas/style";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

globalStyle("html", {
  background: "surface.base.main",
  color: "surface.contrast.main",
});

globalStyle("html, body, #root", {
  minHeight: "100vh",
  margin: 0,
});
