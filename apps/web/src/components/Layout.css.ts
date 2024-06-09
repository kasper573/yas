import { globalStyle, style, theme } from "@yas/style";

export const layout = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
});

globalStyle(":root", {
  background: theme.color.surface.base,
  color: theme.color.surface.face,
});

globalStyle(":root, body, #root", {
  minHeight: "100vh",
  margin: 0,
});
