import type { Breakpoint } from "./tokens";
import { breakpoints } from "./tokens";

const breakpointList = Object.entries(breakpoints);
export const breakpointMediaQueries = Object.fromEntries(
  breakpointList
    .sort(([, a], [, b]) => a - b)
    .map(([name, width], index) => {
      if (index === 0) {
        return [name, `(max-width: ${width}px)`];
      }
      if (index === breakpointList.length - 1) {
        return [name, `(min-width: ${width}px)`];
      }
      const [, next] = breakpointList[index + 1];
      return [name, `(min-width: ${width}px) and (max-width: ${next - 1}px)`];
    }),
) as Record<Breakpoint, string>;
