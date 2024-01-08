import { Router, Route, RootRoute, NotFoundRoute } from "@yas/router";
import { z } from "@yas/validate";
import { lazy } from "react";
import { env } from "./env";
import { ErrorFallback } from "./components/ErrorFallback";

const Layout = lazy(() => import("./components/Layout"));

const rootRoute = new RootRoute({
  // The router dev tools is injected here since it has to be a child of the RouterProvider.
  // (Docs say it should be possible to place it ouside the provider, but there's a bug that prevents that)
  component: () => (
    <>
      <Layout />
      <RouterDevTools />
    </>
  ),
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazy(() => import("./examples/sandbox/Sandbox")),
});

export const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: lazy(() => import("./examples/dashboard/Dashboard")),
  validateSearch: z.object({
    userId: z.number().brand("userId").optional(),
    date: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
  }),
});

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: lazy(() => import("./components/NotFound")),
});

const routeTree = rootRoute.addChildren([indexRoute, dashboardRoute]);

export const router = new Router({
  routeTree,
  defaultErrorComponent: ErrorFallback,
  notFoundRoute,
});

declare module "@yas/router" {
  interface Register {
    router: typeof router;
  }
}

const RouterDevTools =
  env.mode === "production"
    ? () => null
    : lazy(() =>
        import("@yas/router/devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );
