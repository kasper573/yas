import type { UseMutationOptions, UseMutationResult } from "@yas/query-client";
import {
  useQuery,
  useQueries,
  useSuspenseQueries,
  useSuspenseQuery,
  useMutation,
} from "@yas/query-client";

import { createContext, useContext, useMemo } from "react";
import { createRequest } from "urql";
import type { GraphQLClient, GraphQLDocumentNode } from "./client";

export function useGraphQLQuery<Data, Variables, Transformed = Data>(
  queryInput: QueryInput<Data, Variables, Transformed, { enabled?: boolean }>,
): QueryResultLike<Transformed | undefined> {
  const client = useContext(GraphQLClientContext);
  return useQuery(tanstackQueryProps(client, queryInput));
}

export function useGraphQLQueries<Data, Variables, Transformed = Data>({
  query,
  variables: variablesList,
  enabled,
  transform = unsafePassThrough,
}: {
  query: GraphQLDocumentNode<Data, Variables>;
  variables: Variables[];
  enabled?: boolean;
  transform?: QueryResultTransformer<Data[], Transformed[]>;
}): QueryResultLike<Transformed[]> {
  const client = useContext(GraphQLClientContext);
  const result = useQueries({
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

export function useGraphQLSuspenseQuery<Data, Variables, Transformed = Data>(
  queryInput: QueryInput<Data, Variables, Transformed, {}>,
): QueryResultLike<Transformed> {
  const client = useContext(GraphQLClientContext);
  return useSuspenseQuery(tanstackQueryProps(client, queryInput));
}

export function useGraphQLSuspenseQueries<Data, Variables, Transformed = Data>({
  query,
  variables: variablesList,
  transform = unsafePassThrough,
}: {
  query: GraphQLDocumentNode<Data, Variables>;
  variables: Variables[];
  transform?: QueryResultTransformer<Data[], Transformed[]>;
}): QueryResultLike<Transformed[]> {
  const client = useContext(GraphQLClientContext);
  const result = useSuspenseQueries({
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

export function useGraphQLMutation<Data, Variables, TError, TContext>(
  query: GraphQLDocumentNode<Data, Variables>,
  {
    meta,
    ...options
  }: Omit<
    UseMutationOptions<Data, TError, Variables, TContext>,
    "mutationFn"
  > = {},
): UseMutationResult<Data, TError, Variables, TContext> {
  const client = useContext(GraphQLClientContext);
  return useMutation({
    meta: { query, ...meta },
    async mutationFn(variables: Variables) {
      const { data, error } = await client
        .mutation(query, variables ?? {})
        .toPromise();
      if (error) {
        throw error;
      }
      return data as Data;
    },
    ...options,
  });
}

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

function tanstackQueryProps<Data, Variables, Transformed, Extra>(
  client: GraphQLClient,
  input: QueryInput<Data, Variables, Transformed, Extra>,
) {
  const {
    query,
    variables,
    transform = unsafePassThrough,
    throwOnError,
    ...extra
  } = normalizeQueryInput(input);
  return {
    ...extra,
    queryKey: createQueryKey(query, variables),
    throwOnError,
    async queryFn() {
      const { data, error } = await client
        .query(query, variables ?? {})
        .toPromise();
      if (error) {
        throw error;
      }
      return data !== undefined ? transform(data) : undefined;
    },
  };
}

function createQueryKey<Data, Variables>(
  query: GraphQLDocumentNode<Data, Variables>,
  variables?: Variables,
): unknown[] {
  // The first parts of the query key is just for debugging purposes
  const parts: unknown[] = ["graphql-client"];

  for (const definition of query.definitions) {
    if (definition.kind === "OperationDefinition" && definition.name?.value) {
      parts.push(definition.name.value);
    }
  }

  if (variables) {
    parts.push(variables);
  }

  // The urql request key is the important bit that ensures we have a unique identifier
  // of the request according to urql, instead of having to make that assertion manually.
  const request = createRequest(query, variables ?? {});
  parts.push(`urql-request-key-${request.key}`);

  return parts;
}

type QueryResultTransformer<Data, Transformed> = (data: Data) => Transformed;

type NormalizedQueryInput<Data, Variables, Transformed, Extra> = Extra & {
  query: GraphQLDocumentNode<Data, Variables>;
  variables?: Variables;
  transform?: QueryResultTransformer<Data, Transformed>;
  throwOnError?: boolean;
};

type QueryInput<Data, Variables, Transformed, Extra> =
  | NormalizedQueryInput<Data, Variables, Transformed, Extra>
  | GraphQLDocumentNode<Data, void>;

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

export const GraphQLClientContext = createContext<GraphQLClient>(
  new Proxy({} as GraphQLClient, {
    get() {
      throw new Error(
        "No GraphQLClient available. Did you forget to wrap your component in a GraphQLClientContext.Provider?",
      );
    },
  }),
);
