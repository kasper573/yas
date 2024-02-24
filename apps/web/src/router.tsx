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

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: lazy(() => import("./examples/dashboard/Layout")),
});

const overviewRoute = new Route({
  getParentRoute: () => dashboardRoute,
  path: "/",
  component: lazy(() => import("./examples/dashboard/Overview")),
  validateSearch: z.object({
    userId: z.number().brand("userId").optional(),
    date: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
  }),
});

const customersRoutes = new Route({
  getParentRoute: () => dashboardRoute,
  path: "customers",
  component: lazy(() => import("./examples/dashboard/Customers")),
});

const productsRoutes = new Route({
  getParentRoute: () => dashboardRoute,
  path: "products",
  component: lazy(() => import("./examples/dashboard/Products")),
});

const settingsRoutes = new Route({
  getParentRoute: () => dashboardRoute,
  path: "settings",
  component: lazy(() => import("./examples/dashboard/Settings")),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    overviewRoute,
    customersRoutes,
    productsRoutes,
    settingsRoutes,
  ]),
]);

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: lazy(() => import("./components/NotFound")),
});

export const router = new Router({
  routeTree,
  defaultErrorComponent: ErrorFallback,
  notFoundRoute,
});

const RouterDevTools =
  env.mode === "production"
    ? () => null
    : lazy(() =>
        import("@yas/router/devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );
