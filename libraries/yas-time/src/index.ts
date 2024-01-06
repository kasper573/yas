import { createConstrainedFormatter } from "./constrainedFormatter";

export * from "date-fns";

const formatPresets = {
  "long-date": "PPP",
  "short-date": "PP",
};

export type FormatPreset = keyof typeof formatPresets;

// Override the default format function with a stricter one.
const format = createConstrainedFormatter(formatPresets);

export { format };
