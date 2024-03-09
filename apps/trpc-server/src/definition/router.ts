import { createApiTesterRouter } from "../modules/apiTester";
import { createDashboardRouter } from "../modules/dashboard/router";
import { t } from "./trpc";

export type TrpcRouter = ReturnType<typeof createTrpcRouter>;

export function createTrpcRouter() {
  return t.router({
    dashboard: createDashboardRouter(),
    apiTester: createApiTesterRouter(),
  });
}
