import { recipe, style } from "@yas/css";
import projectImageUrl from "./image.jpg";

export const container = recipe({
  base: {
    color: "success",
    fontFamily: "caveat",
    fontSize: "#7",
  },
});

export const projectImage = style({
  width: 250,
  height: 250,
  backgroundColor: "info",
  backgroundImage: `url(${projectImageUrl})`,
});
