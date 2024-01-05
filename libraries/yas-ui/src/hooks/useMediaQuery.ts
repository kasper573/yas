import { useEffect, useMemo, useRef, useState } from "react";

function useMediaQueryImpl<Resolution>(
  query: string,
  resolve: (query: string) => Resolution,
): Resolution {
  const [resolution, setResolution] = useState(() => resolve(query));
  const latestResolver = useRef(resolve);
  latestResolver.current = resolve;

  useEffect(() => {
    const match = matchMedia(query);
    const handleChange = () => {
      console.log("change");
      setResolution(latestResolver.current(query));
    };
    match.addEventListener("change", handleChange);
    return () => match.removeEventListener("change", handleChange);
  }, [query]);

  return resolution;
}

export function useMediaQuery(query: string): boolean {
  return useMediaQueryImpl(query, () => matchMedia(query).matches);
}

export function useMediaQueries<Name extends PropertyKey>(
  record: Record<Name, string>,
): NamedMatches<Name> {
  const query = useMemo(() => Object.values(record).join(", "), [record]);
  return useMediaQueryImpl(query, () => mediaQueries(record));
}

const matchMedia: MediaMatcher =
  typeof window !== "undefined"
    ? window.matchMedia
    : // Noop fallback for SSR
      () => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      });

export const mediaQuery = (query: string): boolean => matchMedia(query).matches;

export const mediaQueries = <Name extends PropertyKey>(
  queries: Record<Name, string>,
): NamedMatches<Name> =>
  Object.fromEntries(
    Object.entries(queries).map(([name, query]) => [
      name,
      matchMedia(query as string).matches,
    ]),
  ) as NamedMatches<Name>;

type MediaQueryLike = Pick<
  MediaQueryList,
  "matches" | "addEventListener" | "removeEventListener"
>;

type MediaMatcher = (query: string) => MediaQueryLike;

type NamedMatches<Name extends PropertyKey> = Partial<Record<Name, boolean>>;
