import {
  AlertDialog,
  BaseDialog,
  CircularProgress,
  linkRecipe,
  ModalContext,
  ModalOutlet,
  ModalStore,
  Stack,
  useModal,
} from "@yas/ui";
import {
  QueryClientProvider,
  createQueryClient,
  useQueryClient,
} from "@yas/query-client";
import { TrpcClientProvider, createTrpcClient } from "@yas/trpc-client";
import { NavLinkContext } from "@yas/router";
import { GraphQLClientContext, createGraphQLClient } from "@yas/graphql-client";
import { lazy, Suspense, useEffect, useMemo } from "react";

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
            <NavLinkContext.Provider value={{ className: linkRecipe() }}>
              <Suspense fallback={<ContentSuspenseFallback />}>
                {children}
              </Suspense>
              <Suspense fallback={<ModalSuspenseFallback />}>
                <ModalOutlet />
              </Suspense>
            </NavLinkContext.Provider>
            <QueryDevtools />
            <UnhandledMutationErrorDialogsBehavior />
          </GraphQLClientContext.Provider>
        </TrpcClientProvider>
      </QueryClientProvider>
    </ModalContext.Provider>
  );
}

function ContentSuspenseFallback() {
  return (
    <Stack direction="row" gap="m">
      <CircularProgress />
      Story is suspending without a fallback UI...
    </Stack>
  );
}

function ModalSuspenseFallback() {
  return (
    <BaseDialog>
      <Stack direction="row" gap="m">
        <CircularProgress />
        Modal in story is suspending without a fallback UI...
      </Stack>
    </BaseDialog>
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

const urls = {
  trpc: import.meta.env.STORYBOOK_TRPC_URL ?? "//trpc-url-missing",
  graphql: import.meta.env.STORYBOOK_GRAPHQL_URL ?? "//graphql-url-missing",
};

function createClients() {
  const headers = () => ({ "client-id": "storybook" });
  const query = createQueryClient("development");
  const trpc = createTrpcClient({ url: urls.trpc, headers });
  const graphql = createGraphQLClient({ url: urls.graphql, headers });
  return { query, trpc, graphql };
}

const QueryDevtools = lazy(() =>
  import("@yas/query-client/devtools").then((mod) => ({
    default: mod.QueryDevtools,
  })),
);
