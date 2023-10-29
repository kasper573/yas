import { recipe, unsafe } from "@yas/css";
import projectImageUrl from "./image.jpg";

export const container = recipe({
  base: {
    color: "success",
    fontFamily: "caveat",
    fontSize: "#10",
  },
});

export const projectImage = unsafe.style({
  width: 250,
  height: 250,
  backgroundColor: "skyblue",
  backgroundImage: `url(${projectImageUrl})`,
});
