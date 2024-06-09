import {
  cssForAnimation,
  createTransformVar,
  cssTransform,
  keyframes,
  style,
} from "@yas/style";

const hiddenTransform = createTransformVar();
const hiddenStyles = {
  opacity: 0,
  transform: cssTransform(hiddenTransform),
};

const enter = keyframes({ from: hiddenStyles });
const exit = keyframes({ to: hiddenStyles });

export const popoverAnimation = style({
  vars: { [hiddenTransform.scale]: "0.8" },
  selectors: {
    "&[data-state=open]": {
      animation: cssForAnimation([enter, "long1", "emphasized", { count: 1 }]),
    },
    "&[data-state=closed]": {
      animation: cssForAnimation([
        exit,
        "short4",
        "emphasizedAccelerate",
        { count: 1 },
      ]),
    },
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
});
