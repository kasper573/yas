import { t } from "../../definition/trpc";
import { createOverviewProcedure } from "./overview";
import { createUsersRouter } from "./users";

export function createDashboardRouter() {
  return t.router({
    users: createUsersRouter(),
    dashboard: createOverviewProcedure(),
  });
}
