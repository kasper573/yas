import { v4 } from "uuid";
import { lazy, useMemo, useState } from "react";
import { TrpcClientProvider, createTrpcClient } from "@yas/trpc-client";
import { GraphQLClientContext, createGraphQLClient } from "@yas/graphql-client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "@yas/router";
import { ModalContext, ModalStore } from "@yas/ui";
import { QueryClientProvider, createQueryClient } from "@yas/query";
import { env } from "./env";
import { ErrorFallback } from "./components/ErrorFallback";
import {
  getPreferredTheme,
  ThemeProvider,
  ThemeInjector,
} from "./ThemeProvider";
import { router } from "./router";

const rootRef = { current: document.documentElement };

export default function App() {
  const modalStore = useMemo(() => new ModalStore(), []);
  const [theme, setTheme] = useState(getPreferredTheme);
  const clients = useMemo(createClients, []);

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <ModalContext.Provider value={modalStore}>
        <QueryClientProvider client={clients.query}>
          <TrpcClientProvider value={clients.trpc}>
            <GraphQLClientContext.Provider value={clients.graphql}>
              <ThemeProvider theme={theme} setTheme={setTheme}>
                <ThemeInjector target={rootRef} />
                <RouterProvider
                  router={router}
                  defaultErrorComponent={ErrorFallback}
                />
                <QueryDevtools />
              </ThemeProvider>
            </GraphQLClientContext.Provider>
          </TrpcClientProvider>
        </QueryClientProvider>
      </ModalContext.Provider>
    </ErrorBoundary>
  );
}

function createClients() {
  const clientId = v4();
  const headers = () => ({ "client-id": clientId });
  const query = createQueryClient(env.mode);
  const trpc = createTrpcClient({ url: env.trpcServerUrl, headers });
  const graphql = createGraphQLClient({ url: env.graphqlServerUrl, headers });
  return { query, trpc, graphql };
}

// Avoid importing the devtools in production
const QueryDevtools =
  env.mode === "development"
    ? lazy(() =>
        import("@yas/query/devtools").then((mod) => ({
          default: mod.QueryDevtools,
        })),
      )
    : () => null;
