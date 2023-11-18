import { recipe } from "@yas/css";
import imageUrl from "./image.jpg";

export const image = recipe({
  base: {
    width: 250,
    height: 250,
    backgroundColor: "infoMain",
    backgroundImage: `url(${imageUrl})`,
  },
});
