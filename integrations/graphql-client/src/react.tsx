import type { Client, DocumentInput } from "urql";
import {
  useQuery as useQueryImpl,
  useQueries as useQueriesImpl,
  useSuspenseQueries as useSuspenseQueriesImpl,
  useSuspenseQuery as useSuspenseQueryImpl,
  useMutation as useMutationImpl,
  QueryClientProvider,
} from "@tanstack/react-query";
import { type AnyVariables, useClient as useURQLClient } from "urql";
import { Provider as URQLProvider } from "urql";
import type { ReactNode } from "react";
import { useMemo } from "react";
import type { GraphQLClient } from "./client";

export function GraphQLClientProvider({
  client,
  children,
}: {
  client: GraphQLClient;
  children?: ReactNode;
}) {
  return (
    <QueryClientProvider client={client.queryClient}>
      <URQLProvider value={client.urqlClient}>{children}</URQLProvider>
    </QueryClientProvider>
  );
}

export function useQuery<
  Data,
  Variables extends AnyVariables,
  Transformed = Data,
>(
  queryInput: QueryInput<Data, Variables, Transformed, { enabled?: boolean }>,
): QueryResultLike<Transformed | undefined> {
  const client = useURQLClient();
  return useQueryImpl(tanstackQueryProps(client, queryInput));
}

export function useQueries<
  Data,
  Variables extends AnyVariables,
  Transformed = Data,
>({
  query,
  variables: variablesList,
  enabled,
  transform = unsafePassThrough,
}: {
  query: DocumentInput<Data, Variables>;
  variables: Variables[];
  enabled?: boolean;
  transform?: QueryResultTransformer<Data[], Transformed[]>;
}): QueryResultLike<Transformed[]> {
  const client = useURQLClient();
  const result = useQueriesImpl({
    combine,
    queries: variablesList.map((variables) =>
      tanstackQueryProps(client, { query, variables, enabled }),
    ),
  });

  const data = useUnsafeMemo(
    () => transform(result.data as Data[]),
    [result.data],
  );

  return { ...result, data };
}

export function useSuspenseQuery<
  Data,
  Variables extends AnyVariables,
  Transformed = Data,
>(
  queryInput: QueryInput<Data, Variables, Transformed, {}>,
): QueryResultLike<Transformed> {
  const client = useURQLClient();
  return useSuspenseQueryImpl(tanstackQueryProps(client, queryInput));
}

export function useSuspenseQueries<
  Data,
  Variables extends AnyVariables,
  Transformed = Data,
>({
  query,
  variables: variablesList,
  transform = unsafePassThrough,
}: {
  query: DocumentInput<Data, Variables>;
  variables: Variables[];
  transform?: QueryResultTransformer<Data[], Transformed[]>;
}): QueryResultLike<Transformed[]> {
  const client = useURQLClient();
  const result = useSuspenseQueriesImpl({
    combine,
    queries: variablesList.map((variables) =>
      tanstackQueryProps(client, { query, variables }),
    ),
  });

  const data = useUnsafeMemo(
    () => transform(result.data as Data[]),
    [result.data],
  );

  return { ...result, data };
}

export function useMutation<Data, Variables extends AnyVariables>(
  query: DocumentInput<Data, Variables>,
) {
  const client = useURQLClient();
  return useMutationImpl({
    async mutationFn(variables: Variables) {
      const { data, error } = await client
        .mutation(query, variables)
        .toPromise();

      if (error !== undefined) {
        throw error;
      }
      return data;
    },
  });
}

/**
 * A normalized query result type that is used by all hooks
 * (multi queries gets their results combined into a summarized result that still match this interface).
 * This is useful because query hooks become interchangeable and can be used in the same way.
 */
export interface QueryResultLike<Data> {
  data: Data;
  error: Error | null;
  isFetching: boolean;
  isLoading: boolean;
  isError: boolean;
  isPending: boolean;
  isStale: boolean;
  refetch: () => Promise<unknown>;
}

function combine<Data>(
  results: Array<QueryResultLike<Data | undefined>>,
): QueryResultLike<Data[]> {
  const combined: QueryResultLike<Data[]> = {
    error: null,
    data: [],
    isFetching: false,
    isLoading: false,
    isError: false,
    isPending: false,
    isStale: false,
    refetch: () => Promise.all(results.map((result) => result.refetch())),
  };

  for (const result of results) {
    if (result.error) {
      combined.error = combined.error
        ? mergeErrors(combined.error, result.error)
        : result.error;
    }
    if (result.data !== undefined) {
      combined.data.push(result.data);
    }
    combined.isFetching ||= result.isFetching;
    combined.isLoading ||= result.isLoading;
    combined.isError ||= result.isError;
    combined.isPending ||= result.isPending;
    combined.isStale ||= result.isStale;
  }

  return combined;
}

function mergeErrors(a: Error, b: Error): Error {
  return new Error(`${a.message}\n${b.message}`);
}

function tanstackQueryProps<
  Data,
  Variables extends AnyVariables,
  Transformed,
  Extra,
>(client: Client, input: QueryInput<Data, Variables, Transformed, Extra>) {
  const {
    query,
    variables,
    transform = unsafePassThrough,
    ...extra
  } = normalizeQueryInput(input);
  return {
    ...extra,
    queryKey: [query, variables],
    async queryFn() {
      const { data, error } = await client.query(query, variables).toPromise();
      if (error !== undefined) {
        throw error;
      }
      return data !== undefined ? transform(data) : undefined;
    },
  };
}

type QueryResultTransformer<Data, Transformed> = (data: Data) => Transformed;

type NormalizedQueryInput<Data, Variables, Transformed, Extra> = Extra & {
  query: DocumentInput<Data, Variables>;
  variables?: Variables;
  transform?: QueryResultTransformer<Data, Transformed>;
};

type QueryInput<Data, Variables, Transformed, Extra> =
  | NormalizedQueryInput<Data, Variables, Transformed, Extra>
  | DocumentInput<Data, void>;

function normalizeQueryInput<Data, Variables, Transformed, Extra>(
  input: QueryInput<Data, Variables, Transformed, Extra>,
): NormalizedQueryInput<Data, Variables, Transformed, Extra> {
  if (input !== null && typeof input === "object" && "query" in input) {
    return input;
  }

  return {
    query: input,
  } as NormalizedQueryInput<Data, Variables, Transformed, Extra>;
}

function unsafePassThrough<I, O>(value: I): O {
  return value as unknown as O;
}

const useUnsafeMemo = useMemo;
