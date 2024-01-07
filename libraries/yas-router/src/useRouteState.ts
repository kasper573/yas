import type {
  AnyRoute,
  FullSearchSchema,
  NavigateOptions,
} from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useCallback } from "react";

export function useSearchState<R extends AnyRoute>(route: R) {
  const navigate = useNavigate();
  const search: FullSearchSchema<R> = route.useSearch();
  const setSearch = useCallback(
    (
      changes: Partial<FullSearchSchema<R>>,
      options?: Omit<NavigateOptions<R>, "to" | "search">,
    ) =>
      navigate({
        to: route.fullPath,
        search: { ...search, ...changes },
        ...(options as NavigateOptions),
      }),
    [navigate, route.fullPath, search],
  );
  return [search, setSearch] as const;
}
