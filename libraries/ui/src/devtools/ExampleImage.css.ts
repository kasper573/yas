import { style, theme } from "@yas/style";
// TODO restore this before merging PR
//import imageUrl from "./image.jpg";
const imageUrl = "";

export const image = style({
  width: 250,
  height: 250,
  backgroundColor: theme.color.info.base,
  backgroundImage: `url(${imageUrl})`,
});
