import { style } from "@yas/style";
import projectImageUrl from "./image.jpg";

export const container = style({
  color: "success.main",
  typography: "body",
});

export const projectImage = style({
  width: 250,
  height: 250,
  backgroundColor: "info.main",
  backgroundImage: `url(${projectImageUrl})`,
});
