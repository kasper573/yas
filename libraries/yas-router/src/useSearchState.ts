import type {
  AnyRoute,
  FullSearchSchema,
  NavigateOptions,
  RegisteredRouter,
  RouteApi,
  RouteIds,
} from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

type SearchParams<R extends AnyRoute> = FullSearchSchema<R>;

type SetSearchParams<R extends AnyRoute> = (
  changes: Partial<SearchParams<R>>,
  options?: Omit<NavigateOptions, "to" | "search">,
) => Promise<void>;

export function useSearchState<
  TId extends RouteIds<RegisteredRouter["routeTree"]>,
  TRoute extends AnyRoute,
>(
  route: RouteApi<TId, TRoute>,
): [SearchParams<TRoute>, SetSearchParams<TRoute>] {
  const navigate = useNavigate();
  const search: SearchParams<TRoute> = route.useSearch();
  const setSearch: SetSearchParams<TRoute> = useCallback(
    (changes, options) =>
      navigate({
        to: route.id as string,
        search: { ...search, ...changes },
        ...options,
      }),
    [navigate, route.id, search],
  );
  return [search, setSearch];
}
