import { createRouter, createRoute, createRootRoute } from "@yas/router";
import { z } from "@yas/validate";
import { lazy } from "react";
import { env } from "./env";
import { ErrorFallback } from "./components/ErrorFallback";

const Layout = lazy(() => import("./components/Layout"));

const rootRoute = createRootRoute({
  // The router dev tools is injected here since it has to be a child of the RouterProvider.
  // (Docs say it should be possible to place it ouside the provider, but there's a bug that prevents that)
  component: () => (
    <>
      <Layout />
      <RouterDevTools />
    </>
  ),
  notFoundComponent: lazy(() => import("./components/NotFound")),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: lazy(() => import("./examples/sandbox/Sandbox")),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: lazy(() => import("./examples/dashboard/Layout")),
});

const overviewRoute = createRoute({
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

const customersRoutes = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "customers",
  component: lazy(() => import("./examples/dashboard/Customers")),
});

const productsRoutes = createRoute({
  getParentRoute: () => dashboardRoute,
  path: "products",
  component: lazy(() => import("./examples/dashboard/Products")),
});

const settingsRoutes = createRoute({
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

export const router = createRouter({
  routeTree,
  defaultErrorComponent: ErrorFallback,
});

const RouterDevTools =
  env.mode === "production"
    ? () => null
    : lazy(() =>
        import("@yas/router/devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );
