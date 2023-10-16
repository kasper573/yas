import { unsafe } from "@yas/css";
import imageUrl from "./image.jpg";

export const image = unsafe.recipe({
  base: {
    width: 250,
    height: 250,
    backgroundColor: "skyblue",
    backgroundImage: `url(${imageUrl})`,
  },
});
