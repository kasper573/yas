import { createExampleRouter } from "./modules/example/router";
import { t } from "./trpc";

export type ApiRouter = ReturnType<typeof createApiRouter>;

export function createApiRouter() {
  return t.router({
    example: createExampleRouter(),
  });
}
