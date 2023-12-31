import { recipe } from "@yas/style";
import imageUrl from "./image.jpg";

export const image = recipe({
  base: {
    width: 250,
    height: 250,
    backgroundColor: "info.base.main",
    backgroundImage: `url(${imageUrl})`,
  },
});
