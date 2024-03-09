import { v4 } from "uuid";
import { lazy, useMemo, useState } from "react";
import { TrpcClientProvider, createTrpcClient } from "@yas/trpc-client";
import { GraphQLClientContext, createGraphQLClient } from "@yas/graphql-client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "@yas/router";
import { ModalContext, ModalStore } from "@yas/ui";
import { QueryClient, QueryClientProvider } from "@yas/query";
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
  const { queryClient, trpcClient, graphqlClient } = useMemo(createClients, []);

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <ModalContext.Provider value={modalStore}>
        <QueryClientProvider client={queryClient}>
          <TrpcClientProvider value={trpcClient}>
            <GraphQLClientContext.Provider value={graphqlClient}>
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
  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: env.mode === "production",
      },
      mutations: {
        onSettled(_, error) {
          if (!error) {
            queryClient.invalidateQueries();
          }
        },
      },
    },
  });
  const clientId = v4();
  const headers = () => ({ "client-id": clientId });
  const trpcClient = createTrpcClient(env.trpcServerUrl, headers);
  const graphqlClient = createGraphQLClient({
    url: env.graphqlServerUrl,
    headers,
  });
  return { queryClient, trpcClient, graphqlClient };
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
