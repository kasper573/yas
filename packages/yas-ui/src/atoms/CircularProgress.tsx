import { styled } from "../styling/css";
import { circularProgressRecipe } from "./CircularProgress.css";

export const CircularProgress = styled("div", circularProgressRecipe, {
  role: "progressbar",
});
