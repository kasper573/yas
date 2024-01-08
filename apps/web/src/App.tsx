import { useMemo, useState } from "react";
import { createApiClient, ApiClientProvider } from "@yas/api-client";
import { ErrorBoundary } from "react-error-boundary";
import { RouterProvider } from "@yas/router";
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
  const [theme, setTheme] = useState(getPreferredTheme);
  const apiClient = useMemo(
    () =>
      createApiClient(env.apiUrl, {
        queries: {
          retry: env.mode === "production",
        },
      }),
    [],
  );

  return (
    <ErrorBoundary fallbackRender={ErrorFallback}>
      <ApiClientProvider value={apiClient}>
        <ThemeProvider theme={theme} setTheme={setTheme}>
          <ThemeInjector target={rootRef} />
          <RouterProvider
            router={router}
            defaultErrorComponent={ErrorFallback}
          />
        </ThemeProvider>
      </ApiClientProvider>
    </ErrorBoundary>
  );
}
