import { useSyncExternalStore } from "react";

export function useSyncIsomorphicStore<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getIsomorphicSnapshot: () => Snapshot,
): Snapshot {
  return useSyncExternalStore(
    subscribe,
    getIsomorphicSnapshot,
    getIsomorphicSnapshot,
  );
}
