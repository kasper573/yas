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

/**
 * Like useState, but for search params of a specific route.
 */
export function useSearchState<
  Api extends RouteApi<RouteIds<RegisteredRouter['routeTree']>>
>(
  route: Api,
): [SearchParams<RouteFrom<Api>>, SetSearchParams<RouteFrom<Api>>] {
  const navigate = useNavigate();
  const search: SearchParams<RouteFrom<Api>> = route.useSearch();
  const setSearch: SetSearchParams<RouteFrom<Api>> = useCallback(
    (changes, options) =>
      navigate({
        to: route.id as any,
        search: { ...search, ...changes },
        ...options,
      }),
    [navigate, route.id, search],
  );

  return [search, setSearch]; 
}

type RouteFrom<T> = T extends RouteApi<infer _1, infer _2, infer Route> ? Route : never;