import { useMemo, useState } from "react";
import { createApiClient, ApiClientProvider } from "@yas/api-client";
import { BrowserRouter } from "react-router-dom";
import { env } from "./env";
import { ThemeProvider, type ThemeName } from "./hooks/useTheme";
import { AppRoutes } from "./components/Routes";

export default function App() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const apiClient = useMemo(() => createApiClient(env.apiUrl), []);

  return (
    <BrowserRouter>
      <ApiClientProvider value={apiClient}>
        <ThemeProvider theme={theme} setTheme={setTheme}>
          <AppRoutes />
        </ThemeProvider>
      </ApiClientProvider>
    </BrowserRouter>
  );
}
