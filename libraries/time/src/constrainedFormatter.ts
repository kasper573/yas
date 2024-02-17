import type { Result } from "@yas/result";
import { err, ok, unwrapUnsafe_useWithCaution } from "@yas/result";
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
    const result = tryFormat(now, formatPresets[formatName]);
    if (result.isErr()) {
      // We want to throw here to early out asap if there's been a misconfuguration.
      // This is a lesser evil than allowing direct use of date-fns's format function, which throws on invalid format strings.
      // Preferably we'd want a compile time error, possibly with stricted type definitions, but I don't know how to do that.
      unwrapUnsafe_useWithCaution(result);
    }
  }
}

function tryFormat(date: Date, formatString: string): Result<string, Error> {
  try {
    const str = format(date, formatString);
    return ok(str);
  } catch (e) {
    return err(e instanceof Error ? e : new Error(String(e)));
  }
}
