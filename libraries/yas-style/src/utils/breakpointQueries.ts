/**
 * Converts breakpoints to media queries.
 */
export function breakpointQueries<Name extends PropertyKey>(
  breakpoints: Record<string, number>,
) {
  const breakpointList = Object.entries(breakpoints).sort(
    ([, a], [, b]) => a - b,
  );
  return Object.fromEntries(
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
  ) as Record<Name, string>;
}
