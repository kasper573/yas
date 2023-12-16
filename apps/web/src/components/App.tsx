import { useMemo, useState } from "react";
import { DialogOutlet } from "@yas/ui";
import { createApiClient, ApiClientProvider } from "@yas/api-client";
import { clsx } from "@yas/style";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";
import { BrowserRouter } from "react-router-dom";
import { env } from "../env";
import { ThemeProvider, type ThemeName } from "../hooks/useTheme";
import * as styles from "./App.css";
import { AppRoutes } from "./Routes";

const themeClassNames = {
  dark,
  light,
};

export function App() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const apiClient = useMemo(() => createApiClient(env.apiUrl), []);

  return (
    <div className={clsx(styles.app, themeClassNames[theme])}>
      <BrowserRouter>
        <ApiClientProvider value={apiClient}>
          <ThemeProvider theme={theme} setTheme={setTheme}>
            <AppRoutes />
          </ThemeProvider>
        </ApiClientProvider>
      </BrowserRouter>
      <DialogOutlet />
    </div>
  );
}
