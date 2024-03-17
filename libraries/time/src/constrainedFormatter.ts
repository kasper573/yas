import { format } from "date-fns";

export function createConstrainedFormatter<PresetName extends string>(
  formatPresets: Record<PresetName, string>,
) {
  validateFormats(formatPresets);
  return function conventionalFormat(date: Date, presetName: PresetName) {
    return format(date, formatPresets[presetName]);
  };
}

function validateFormats(formatPresets: Record<string, string>) {
  const now = new Date();
  for (const formatName in formatPresets) {
    format(now, formatPresets[formatName]); // Will throw if invalid
  }
}
