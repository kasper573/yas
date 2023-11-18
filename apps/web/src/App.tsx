import { useMemo, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Button, ModalOutlet, Text } from "@yas/ui";
import { clsx } from "@yas/style";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";
import { createQueryClient, createTRPCClient, trpc } from "./trpc";
import { Home } from "./pages/Home";
import * as styles from "./App.css";

type ThemeName = keyof typeof themeClassNames;
const themeClassNames = {
  dark,
  light,
};

export function App() {
  const queryClient = useMemo(createQueryClient, []);
  const trpcClient = useMemo(createTRPCClient, []);
  const [theme, setTheme] = useState<ThemeName>("dark");
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <div className={clsx(styles.app, themeClassNames[theme])}>
      <Text>Theme: {theme}</Text>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Home />
          <ModalOutlet />
          <Button onClick={toggleTheme}>Toggle theme</Button>
        </QueryClientProvider>
      </trpc.Provider>
    </div>
  );
}
