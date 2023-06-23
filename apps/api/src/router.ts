import { t } from "./trpc";
import { createExampleRouter } from "./modules/example/router";

export type ApiRouter = ReturnType<typeof createApiRouter>;

export function createApiRouter() {
  return t.router({
    example: createExampleRouter(),
  });
}
