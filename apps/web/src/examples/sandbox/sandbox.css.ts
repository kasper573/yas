import { style } from "@yas/style";
import projectImageUrl from "./image.jpg";

export const container = style({
  transition: [["background", "standard.enter"]],
  background: {
    default: "info.main",
    hover: "success.main",
  },
  color: {
    default: "info.contrast",
    hover: "success.contrast",
  },
  padding: "#4",
  typography: "body",
});

export const projectImage = style({
  width: 250,
  height: 250,
  backgroundColor: "info.main",
  backgroundImage: `url(${projectImageUrl})`,
});
