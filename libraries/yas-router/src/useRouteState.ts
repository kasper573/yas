import type {
  AnyRoute,
  FullSearchSchema,
  NavigateOptions,
} from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export type SearchParams<R extends AnyRoute> = FullSearchSchema<R>;

export type SetSearchParams<Params> = (
  changes: Partial<Params>,
  options?: Omit<NavigateOptions, "to" | "search">,
) => Promise<unknown>;

export function useSearchState<R extends AnyRoute>(
  route: R,
): [SearchParams<R>, SetSearchParams<SearchParams<R>>] {
  const navigate = useNavigate();
  const search: SearchParams<R> = route.useSearch();
  const setSearch: SetSearchParams<SearchParams<R>> = useCallback(
    (changes, options) =>
      navigate({
        to: route.fullPath,
        search: { ...search, ...changes },
        ...(options as NavigateOptions),
      }),
    [navigate, route.fullPath, search],
  );
  return [search, setSearch];
}
