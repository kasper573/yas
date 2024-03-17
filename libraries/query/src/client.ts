import type { QueryClientConfig } from "@tanstack/react-query";
import {
  QueryClient,
  useQueryClient as useQueryClientImpl,
} from "@tanstack/react-query";

export function createQueryClient(
  mode: "production" | "development",
): QueryClient {
  const events = new EventTarget();

  const client: QueryClientWithEvents = new QueryClientWithEvents(events, {
    defaultOptions: {
      queries: {
        throwOnError: true,
        retry: mode === "production",
      },
      mutations: {
        // Invalidate all queries on successful mutations for simple cache invalidation
        // with great DX at the expense of (an acceptable amount of) redundant requests.
        onSettled(_, error) {
          if (!error) {
            client.invalidateQueries();
          }
        },
        // Can be overridden by individual mutations
        onError(error) {
          events.dispatchEvent(
            createQueryClientEvent("unhandled-mutation-error", error),
          );
        },
      },
    },
  });

  return client;
}

export function useQueryClient(): QueryClientWithEvents {
  return useQueryClientImpl() as QueryClientWithEvents;
}

class QueryClientWithEvents extends QueryClient {
  constructor(
    private events: EventTarget,
    config?: QueryClientConfig,
  ) {
    super(config);
  }

  subscribe<EventType extends keyof QueryClientEvents>(
    eventType: EventType,
    callback: (...args: QueryClientEvents[EventType]) => void,
  ) {
    const handler = (event: Event) =>
      callback(...(event as CustomEvent<QueryClientEvents[EventType]>).detail);
    this.events.addEventListener(eventType, handler);
    return () => {
      this.events.removeEventListener(eventType, handler);
    };
  }
}

interface QueryClientEvents {
  "unhandled-mutation-error": [Error];
}

function createQueryClientEvent<Type extends keyof QueryClientEvents>(
  type: Type,
  ...args: QueryClientEvents[Type]
): CustomEvent<QueryClientEvents[Type]> {
  return new CustomEvent(type, { detail: args });
}
