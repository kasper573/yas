import { recipe, style } from "@yas/style";
import projectImageUrl from "./image.jpg";

export const container = recipe({
  base: {
    color: "successMain",
    fontFamily: "default",
    fontSize: "#7",
  },
});

export const projectImage = style({
  width: 250,
  height: 250,
  backgroundColor: "infoMain",
  backgroundImage: `url(${projectImageUrl})`,
});
