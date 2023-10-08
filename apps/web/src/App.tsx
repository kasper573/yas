import { useMemo, useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Button, ModalOutlet } from "@yas/ui";
import type { ThemeName } from "@yas/css";
import { themeClassNames } from "@yas/css";
import { createQueryClient, createTRPCClient, trpc } from "./trpc";
import { Home } from "./pages/Home";

export function App() {
  const queryClient = useMemo(createQueryClient, []);
  const trpcClient = useMemo(createTRPCClient, []);
  const [theme, setTheme] = useState<ThemeName>("dark");
  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  return (
    <div className={themeClassNames[theme]}>
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
