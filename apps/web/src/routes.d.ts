import type { router } from "./router";

declare module "@yas/router" {
  interface Register {
    router: typeof router;
  }
}
