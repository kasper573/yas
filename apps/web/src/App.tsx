import { useMemo, useState } from "react";
import { createApiClient, ApiClientProvider } from "@yas/api-client";
import {
  GraphQLClientProvider,
  createGraphQLClient,
} from "@yas/graphql-client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "@yas/router";
import { ModalContext, ModalStore } from "@yas/ui";
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

  const apiClient = useMemo(
    () => createApiClient(env.trpcServerUrl, queryClientOptions),
    [],
  );

  const graphqlClient = useMemo(
    () =>
      createGraphQLClient({ url: env.graphqlServerUrl, queryClientOptions }),
    [],
  );

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <ModalContext.Provider value={modalStore}>
        <ApiClientProvider value={apiClient}>
          <GraphQLClientProvider client={graphqlClient}>
            <ThemeProvider theme={theme} setTheme={setTheme}>
              <ThemeInjector target={rootRef} />
              <RouterProvider
                router={router}
                defaultErrorComponent={ErrorFallback}
              />
            </ThemeProvider>
          </GraphQLClientProvider>
        </ApiClientProvider>
      </ModalContext.Provider>
    </ErrorBoundary>
  );
}

const queryClientOptions = {
  queries: {
    retry: env.mode === "production",
  },
};
