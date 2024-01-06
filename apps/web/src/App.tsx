import { useMemo, useState } from "react";
import { createApiClient, ApiClientProvider } from "@yas/api-client";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ThemeProvider, ThemeInjector } from "@yas/ui";
import { getPreferredTheme } from "@yas/ui";
import { env } from "./env";
import { AppRoutes } from "./Routes";
import { ErrorFallback } from "./components/ErrorFallback";

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
      <BrowserRouter>
        <ApiClientProvider value={apiClient}>
          <ThemeProvider theme={theme} setTheme={setTheme}>
            <ThemeInjector target={rootRef} />
            <AppRoutes />
          </ThemeProvider>
        </ApiClientProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
