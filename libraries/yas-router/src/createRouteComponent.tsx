import { Route } from "@tanstack/react-router";
import type { AnyRoute, RouteOptions } from "@tanstack/react-router";
import type { ComponentType } from "react";
import type { SearchParams } from "./useRouteState";
import { useSearchState, type SetSearchParams } from "./useRouteState";

export type RouteComponentProps<Search> = {
  search: Search;
  setSearch: SetSearchParams<Search>;
};

export function createRouteComponent<R extends AnyRoute>(
  route: R,
  Component: ComponentType<RouteComponentProps<SearchParams<R>>>,
) {
  return function RouteComponent() {
    const [search, setSearch] = useSearchState(route);
    return <Component search={search} setSearch={setSearch} />;
  };
}

/**
 * Creates a subclass of Route that automatically wraps the component in a
 * component that provides a search and setSearch property.
 * (Is a factory to easily be able to retain the original Route class typedefs)
 */
export function createEnhancedRouteClass(): typeof Route {
  class EnhancedRoute extends Route {
    constructor(options: RouteOptions<AnyRoute, string, "/">) {
      super(options);
      if (this.options.component) {
        this.options.component = createRouteComponent(
          this,
          this.options.component,
        );
      }
    }
  }
  return EnhancedRoute as typeof Route;
}
