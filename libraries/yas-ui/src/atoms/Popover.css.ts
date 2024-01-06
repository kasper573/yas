import {
  clsx,
  createTransformVar,
  cssTransform,
  keyframes,
  style,
  unsafe,
} from "@yas/style";
import { paperRecipe } from "./Paper.css";

const hiddenTransform = createTransformVar();
const hiddenStyles = {
  opacity: 0,
  transform: cssTransform(hiddenTransform),
};

const enter = keyframes({ from: hiddenStyles });
const exit = keyframes({ to: hiddenStyles });

const popoverAnimation = clsx(
  style({
    selectors: {
      "&[data-state=open]": {
        animation: [[enter, "long1", "emphasized", { count: 1 }]],
      },
      "&[data-state=closed]": {
        animation: [[exit, "short4", "emphasizedAccelerate", { count: 1 }]],
      },
    },
  }),
  unsafe.style({
    vars: { [hiddenTransform.scale]: "0.8" },
    selectors: {
      "&[data-side=bottom]": {
        vars: { [hiddenTransform.translate.y]: "0.5rem" },
      },
      "&[data-side=left]": {
        vars: { [hiddenTransform.translate.x]: "-0.5rem" },
      },
      "&[data-side=right]": {
        vars: { [hiddenTransform.translate.x]: "0.5rem" },
      },
      "&[data-side=top]": {
        vars: { [hiddenTransform.translate.y]: "-0.5rem" },
      },
    },
  }),
);

const popoverPaper = paperRecipe({ elevation: "1" });

export const popoverContent = clsx(popoverPaper, popoverAnimation);
