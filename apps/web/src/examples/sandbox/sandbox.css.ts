import { style } from "@yas/style";
import projectImageUrl from "./image.jpg";

export const container = style({
  transition: [["background", "standard.enter"]],
  background: {
    default: "info.base.main",
    hover: "success.base.main",
  },
  color: {
    default: "info.contrast.main",
    hover: "success.contrast.main",
  },
  padding: "#4",
  typography: "body",
});

export const projectImage = style({
  width: 250,
  height: 250,
  backgroundColor: "info.base.main",
  backgroundImage: `url(${projectImageUrl})`,
});
