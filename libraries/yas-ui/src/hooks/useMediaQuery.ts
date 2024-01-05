import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => matchMedia(query).matches,
  );

  useEffect(() => {
    const match = matchMedia(query);
    const handleChange = (e: { matches: boolean }) => setMatches(e.matches);
    match.addEventListener("change", handleChange);
    return () => match.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

type MediaQueryListLike = Pick<
  MediaQueryList,
  "matches" | "addEventListener" | "removeEventListener"
>;

type MediaMatcher = (query: string) => MediaQueryListLike;

const matchMedia: MediaMatcher =
  typeof window !== "undefined"
    ? window.matchMedia
    : // Noop fallback for SSR
      () => ({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      });

export const queryMedia = (query: string) => matchMedia(query).matches;
