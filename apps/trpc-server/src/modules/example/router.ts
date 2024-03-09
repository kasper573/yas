import { z } from "@yas/validate";
import { err } from "@yas/result";
import { t, trpcUnwrap } from "../../definition/trpc";
import { createDashboardProcedure } from "./dashboard";
import { createUsersRouter } from "./users";

export function createExampleRouter() {
  let count = 0;
  return t.router({
    users: createUsersRouter(),
    dashboard: createDashboardProcedure(),
    error: t.procedure.query(() => {
      trpcUnwrap(err("Manually triggered server side error"));
    }),
    hello: t.procedure
      .input(z.string())
      .output(z.object({ message: z.string(), date: z.date() }))
      .query(({ input }) => {
        const message = `${input} world`;
        const date = new Date();
        return { message, date };
      }),
    count: t.procedure.output(z.number()).query(() => count),
    increaseCount: t.procedure
      .input(z.object({ amount: z.number() }))
      .output(z.number())
      .mutation(() => {
        count++;
        return count;
      }),
  });
}
