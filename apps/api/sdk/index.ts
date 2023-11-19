import { createContext, useContext } from "react";
import { err, unwrapUnsafeFor3rdPartyIntegration } from "@yas/result";
import type { ApiClient } from "./client";

/**
 * Convenience proxy for accessing the client interface
 * of the API without having to call useContext first.
 */
export const api = new Proxy({} as ApiClient["trpc"], {
  get: function useApi(_, key) {
    const trpc = useContext(ApiContext);
    return trpc[key as keyof ApiClient["trpc"]];
  },
});

export const ApiContext = createContext<ApiClient["trpc"]>(
  new Proxy({} as ApiClient["trpc"], {
    get() {
      // Using unsafe unwrap to panic early to clearly indicate that context is misconfigured
      unwrapUnsafeFor3rdPartyIntegration(
        err(
          new Error(
            "You must wrap components using the api with an ApiClientProvider",
          ),
        ),
      );
    },
  }),
);
