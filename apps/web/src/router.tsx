import {
  createRouter,
  createRoute,
  createRootRoute,
  Navigate,
} from "@yas/router";
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

const apiTesterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "api-tester",
  component: lazy(() => import("./examples/api-tester/Layout")),
});

const trpcRoute = createRoute({
  getParentRoute: () => apiTesterRoute,
  path: "trpc",
  component: lazy(() => import("./examples/api-tester/TRPC")),
});

const graphqlRoute = createRoute({
  getParentRoute: () => apiTesterRoute,
  path: "graphql",
  component: lazy(() => import("./examples/api-tester/GraphQL")),
});

const feedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "feed",
  component: lazy(() => import("./examples/feed/FeedPage")),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute.addChildren([
    overviewRoute,
    customersRoutes,
    productsRoutes,
    settingsRoutes,
  ]),
  apiTesterRoute.addChildren([
    createRoute({
      getParentRoute: () => apiTesterRoute,
      path: "/",
      component: () => <Navigate to="/api-tester/trpc" />,
    }),
    trpcRoute,
    graphqlRoute,
  ]),
  feedRoute,
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
