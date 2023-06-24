import * as React from "react";
import { useMemo } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient, createTRPCClient, trpc } from "./trpc";
import { Home } from "./pages/Home";
import { ModalOutlet } from "./hooks/useModal";

export function App() {
  const queryClient = useMemo(createQueryClient, []);
  const trpcClient = useMemo(createTRPCClient, []);
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Home />
        <ModalOutlet />
      </QueryClientProvider>
    </trpc.Provider>
  );
}
