import type { FormatDistanceOptions } from "date-fns";
import { formatDistance } from "date-fns";
import { useNow } from "@yas/hooks";

export function FormatDistance({
  date,
  options,
}: {
  date: Date;
  options?: FormatDistanceOptions;
}) {
  const now = useNow();
  return formatDistance(date, now, options);
}
