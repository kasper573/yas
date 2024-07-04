import { v4 } from "uuid";
import { lazy, useEffect, useMemo, useState } from "react";
import { TrpcClientProvider, createTrpcClient } from "@yas/trpc-client";
import { GraphQLClientContext, createGraphQLClient } from "@yas/graphql-client";
import { ErrorBoundary, linkRecipe } from "@yas/ui";
import { RouterProvider, NavLinkContext } from "@yas/router";
import { AlertDialog, ModalContext, ModalStore, useModal } from "@yas/ui";
import {
  QueryClientProvider,
  createQueryClient,
  useQueryClient,
} from "@yas/query-client";
import { env } from "./env";
import {
  ErrorDetails,
  ErrorFallback,
  ErrorTitle,
} from "./components/ErrorFallback";
import {
  getPreferredTheme,
  ThemeProvider,
  ThemeInjector,
} from "./ThemeProvider";
import { router } from "./router";
import "@yas/style/fonts.css";

const rootRef = { current: document.documentElement };

export default function App() {
  const modalStore = useMemo(() => new ModalStore(), []);
  const [theme, setTheme] = useState(getPreferredTheme);
  const clients = useMemo(createClients, []);

  return (
    <ErrorBoundary
      enabled={env.useErrorBoundary}
      FallbackComponent={ErrorFallback}
    >
      <ModalContext.Provider value={modalStore}>
        <QueryClientProvider client={clients.query}>
          <TrpcClientProvider value={clients.trpc}>
            <GraphQLClientContext.Provider value={clients.graphql}>
              <ThemeProvider theme={theme} setTheme={setTheme}>
                <ThemeInjector target={rootRef} />
                <NavLinkContext.Provider value={{ className: linkRecipe() }}>
                  <RouterProvider
                    router={router}
                    defaultErrorComponent={ErrorFallback}
                  />
                </NavLinkContext.Provider>
                <QueryDevtools />
                <UnhandledMutationErrorDialogsBehavior />
              </ThemeProvider>
            </GraphQLClientContext.Provider>
          </TrpcClientProvider>
        </QueryClientProvider>
      </ModalContext.Provider>
    </ErrorBoundary>
  );
}

function UnhandledMutationErrorDialogsBehavior() {
  const alert = useModal(AlertDialog);
  const queryClient = useQueryClient();

  useEffect(
    () =>
      queryClient.subscribe("unhandled-mutation-error", (error) => {
        alert({
          title: <ErrorTitle />,
          message: <ErrorDetails error={error} />,
        });
      }),
    [queryClient, alert],
  );

  return null;
}

function createClients() {
  const clientId = pullFromSessionStorage("client-id", v4);
  const headers = () => ({ "client-id": clientId });
  const query = createQueryClient(env.mode);
  const trpc = createTrpcClient({ url: env.trpcServerUrl, headers });
  const graphql = createGraphQLClient({ url: env.graphqlServerUrl, headers });
  return { query, trpc, graphql };
}

function pullFromSessionStorage(
  key: string,
  createDefautValue: () => string,
): string {
  let value = sessionStorage.getItem(key);
  if (value === null) {
    value = createDefautValue();
    sessionStorage.setItem(key, value);
  }

  return value;
}

// Avoid importing the devtools in production
const QueryDevtools =
  env.mode === "development"
    ? lazy(() =>
        import("@yas/query-client/devtools").then((mod) => ({
          default: mod.QueryDevtools,
        })),
      )
    : () => null;
