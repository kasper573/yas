import { useEffect, useMemo, useState } from "react";

function useMediaQueryList(queryStrings: string[]): boolean[] {
  const [matches, setMatches] = useState<boolean[]>(() =>
    queryStrings.map(matchMedia).map(({ matches }) => matches),
  );

  useEffect(() => {
    const updateIndex = (index: number, updated: boolean) =>
      setMatches((values) =>
        values.map((current, i) => (i === index ? updated : current)),
      );

    const queries = queryStrings.map(matchMedia);
    const unsubs = queries.map((query, index) => {
      const handle = (e: { matches: boolean }) => updateIndex(index, e.matches);
      query.addEventListener("change", handle);
      return () => query.removeEventListener("change", handle);
    });

    return () => unsubs.forEach((unsub) => unsub());
  }, [queryStrings]);

  return matches;
}

export function useMediaQuery(query: string): boolean {
  const queryList = useMemo(() => [query], [query]);
  return useMediaQueryList(queryList)[0];
}

export function useMediaQueries<Name extends PropertyKey>(
  record: Record<Name, string>,
): NamedMatches<Name> {
  const queries = useMemo<string[]>(() => Object.values(record), [record]);
  const matches = useMediaQueryList(queries);
  return useMemo(
    () =>
      Object.fromEntries(
        Object.entries(record)
          .map(([name], index) => [name, matches[index]])
          .filter(([, match]) => match),
      ) as NamedMatches<Name>,
    [record, matches],
  );
}

// Non-hook versions

export const mediaQuery = (query: string): boolean => matchMedia(query).matches;

export const mediaQueries = <Name extends PropertyKey>(
  queries: Record<Name, string>,
): NamedMatches<Name> =>
  Object.fromEntries(
    Object.entries(queries)
      .map(([name, query]) => [name, matchMedia(query as string).matches])
      .filter(([, match]) => match),
  ) as NamedMatches<Name>;

// Isomorphic version of window.matchMedia

const matchMedia: MediaMatcher =
  typeof window !== "undefined"
    ? window.matchMedia
    : // Noop fallback for SSR
      () => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      });

// We're only using part of the media query API

type MediaQueryLike = Pick<
  MediaQueryList,
  "matches" | "addEventListener" | "removeEventListener"
>;

type MediaMatcher = (query: string) => MediaQueryLike;

type NamedMatches<Name extends PropertyKey> = Partial<Record<Name, boolean>>;
