import { z } from "@yas/validate";
import { err } from "@yas/result";
import { t, trpcUnwrap } from "../definition/trpc";

export function createApiTesterRouter() {
  const countsPerClient = new Map<string, number>();
  return t.router({
    error: t.procedure.query(() => {
      trpcUnwrap(err("Manually triggered server side error"));
    }),
    greeting: t.procedure
      .input(z.string())
      .output(z.string())
      .query(({ input: name }) => (name.trim() ? `Hello, ${name}!` : "")),
    count: t.procedure
      .output(z.number())
      .query(({ ctx }) => countsPerClient.get(ctx.clientId) ?? 0),
    increaseCount: t.procedure
      .input(z.object({ amount: z.number() }))
      .output(z.number())
      .mutation(({ input: { amount }, ctx }) => {
        let myCount = countsPerClient.get(ctx.clientId) ?? 0;
        myCount += amount;
        countsPerClient.set(ctx.clientId, myCount);
        return myCount;
      }),
  });
}
