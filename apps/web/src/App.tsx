import { useMemo, useState } from "react";
import { Button, DialogOutlet, Text } from "@yas/ui";
import { createApiClient, ApiClientProvider } from "@yas/api/sdk/client";
import { clsx } from "@yas/style";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";
import { Home } from "./pages/Home";
import * as styles from "./App.css";
import { env } from "./env";

type ThemeName = keyof typeof themeClassNames;
const themeClassNames = {
  dark,
  light,
};

export function App() {
  const apiClient = useMemo(() => createApiClient(env.apiUrl), []);
  const [theme, setTheme] = useState<ThemeName>("dark");
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <div className={clsx(styles.app, themeClassNames[theme])}>
      <Text>Theme: {theme}</Text>
      <ApiClientProvider value={apiClient}>
        <Home />
        <Button onClick={toggleTheme}>Toggle theme</Button>
      </ApiClientProvider>
      <DialogOutlet />
    </div>
  );
}
