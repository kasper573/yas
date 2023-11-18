import { styled } from "@yas/style";
import { circularProgressRecipe } from "./CircularProgress.css";

export const CircularProgress = styled("div", circularProgressRecipe).attrs({
  role: "progressbar",
});
