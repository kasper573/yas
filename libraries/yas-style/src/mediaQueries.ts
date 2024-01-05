import type { Breakpoint } from "./tokens";
import { breakpoints } from "./tokens";

const breakpointList = Object.entries(breakpoints);
export const breakpointMediaQueries = Object.fromEntries(
  breakpointList
    .map(([name, min], index) => {
      const max = breakpointList[index + 1]?.[1] as number | undefined;
      return [name, [min, max]] as const;
    })
    .map(([name, [min, max]]) => {
      return [
        name,
        max !== undefined
          ? `(min-width: ${min}px) and (max-width: ${max}px)`
          : `(min-width: ${min}px)`,
      ];
    }),
) as Record<Breakpoint, string>;
