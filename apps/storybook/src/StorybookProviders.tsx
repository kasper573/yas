import { AlertDialog, ModalContext, ModalStore, useModal } from "@yas/ui";
import {
  QueryClientProvider,
  createQueryClient,
  useQueryClient,
} from "@yas/query-client";
import { TrpcClientProvider, createTrpcClient } from "@yas/trpc-client";
import { GraphQLClientContext, createGraphQLClient } from "@yas/graphql-client";
import { lazy, useEffect, useMemo } from "react";
import { env } from "./env";

export function StorybookProviders({
  children,
}: {
  children?: React.ReactNode;
}) {
  const modalStore = useMemo(() => new ModalStore(), []);
  const clients = useMemo(createClients, []);
  return (
    <ModalContext.Provider value={modalStore}>
      <QueryClientProvider client={clients.query}>
        <TrpcClientProvider value={clients.trpc}>
          <GraphQLClientContext.Provider value={clients.graphql}>
            {children}
            <QueryDevtools />
            <UnhandledMutationErrorDialogsBehavior />
          </GraphQLClientContext.Provider>
        </TrpcClientProvider>
      </QueryClientProvider>
    </ModalContext.Provider>
  );
}

function UnhandledMutationErrorDialogsBehavior() {
  const alert = useModal(AlertDialog);
  const queryClient = useQueryClient();

  useEffect(
    () =>
      queryClient.subscribe("unhandled-mutation-error", (error) => {
        alert({
          title: "Unhandled mutation error",
          message: String(error),
        });
      }),
    [queryClient, alert],
  );

  return null;
}

function createClients() {
  const headers = () => ({ "client-id": "storybook" });
  const query = createQueryClient(env.mode);
  const trpc = createTrpcClient({ url: env.trpcServerUrl, headers });
  const graphql = createGraphQLClient({ url: env.graphqlServerUrl, headers });
  return { query, trpc, graphql };
}

// Avoid importing the devtools in production
const QueryDevtools =
  env.mode === "development"
    ? lazy(() =>
        import("@yas/query-client/devtools").then((mod) => ({
          default: mod.QueryDevtools,
        })),
      )
    : () => null;
