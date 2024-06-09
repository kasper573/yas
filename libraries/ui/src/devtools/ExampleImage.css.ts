import { style, theme } from "@yas/style";
import imageUrl from "./image.jpg";

export const image = style({
  width: 250,
  height: 250,
  backgroundColor: theme.color.info.base,
  backgroundImage: `url(${imageUrl})`,
});
