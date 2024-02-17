import { breakpoints } from "../tokens";

const practicallyInfinite = 1e4; // Can't use Infinity because it's not a valid CSS value

/**
 * Convert breakpoints to media queries.
 */
export const breakpointQuery = createBreakpointQueryUtils(breakpoints);

function createBreakpointQueryUtils<Name extends PropertyKey>(
  breakpoints: Record<Name, number>,
) {
  const entries = Object.entries(breakpoints).sort(
    ([, a], [, b]) => Number(a) - Number(b),
  ) as Array<[Name, number]>;

  const names = entries.map(([name]) => name);

  const ranges = entries.map(([name, min], index) => {
    const max = entries[index + 1]?.[1];
    return [name, [min, max]] as const;
  }) as Array<[Name, [number, number | undefined]]>;

  const rangeFor = Object.fromEntries(ranges) as Record<Name, [number, number]>;

  const all: Record<Name, string> = Object.fromEntries(
    names.map((name) => [name, only(name)]),
  ) as Record<Name, string>;

  function down(name: Name) {
    const [, max = practicallyInfinite] = rangeFor[name];
    return `(max-width: ${max}px)`;
  }

  function up(name: Name) {
    const [min] = rangeFor[name];
    return `(min-width: ${min}px)`;
  }

  function between(minName: Name, maxName: Name) {
    return `${up(minName)} and ${down(maxName)}`;
  }

  function only(name: Name) {
    return between(name, name);
  }

  return { down, up, between, only, all, entries, ranges, rangeFor, names };
}
