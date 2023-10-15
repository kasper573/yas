import { styled } from "@yas/css";
import { circularProgressRecipe } from "./CircularProgress.css";

export const CircularProgress = styled("div", circularProgressRecipe).attrs({
  role: "progressbar",
});
