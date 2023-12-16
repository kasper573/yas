import { useMemo, useState } from "react";
import { DialogOutlet } from "@yas/ui";
import { createApiClient, ApiClientProvider } from "@yas/api-client";
import { clsx } from "@yas/style";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";
import { Sandbox } from "./examples/sandbox/Sandbox";
import * as styles from "./App.css";
import { env } from "./env";
import { ThemeProvider, type ThemeName } from "./hooks/useTheme";

const themeClassNames = {
  dark,
  light,
};

export function App() {
  const [theme, setTheme] = useState<ThemeName>("dark");
  const apiClient = useMemo(() => createApiClient(env.apiUrl), []);

  return (
    <div className={clsx(styles.app, themeClassNames[theme])}>
      <ApiClientProvider value={apiClient}>
        <ThemeProvider theme={theme} setTheme={setTheme}>
          <Sandbox />
        </ThemeProvider>
      </ApiClientProvider>
      <DialogOutlet />
    </div>
  );
}
