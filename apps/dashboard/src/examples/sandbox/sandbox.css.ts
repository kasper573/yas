import { atoms, style } from "@yas/style";
import projectImageUrl from "./image.jpg";

export const container = atoms({
  transition: "appearance.standard.enter",
  backgroundColor: {
    default: "info.base",
    hover: "success.base",
  },
  color: {
    default: "info.face",
    hover: "success.face",
  },
  padding: "l",
  typography: "body",
});

export const projectImage = style({
  width: 250,
  height: 250,
  backgroundColor: "info.base.main",
  backgroundImage: `url(${projectImageUrl})`,
});
