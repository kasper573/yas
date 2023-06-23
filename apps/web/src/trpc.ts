import { createTRPCReact, httpBatchLink } from "@trpc/react-query";
import type { ApiRouter } from "@yas/api";
import { QueryClient } from "@tanstack/react-query";
import { env } from "./env";

export const trpc = createTRPCReact<ApiRouter>();

export function createQueryClient() {
  return new QueryClient();
}

export function createTRPCClient(url = env.apiUrl) {
  return trpc.createClient({
    links: [httpBatchLink({ url })],
  });
}
