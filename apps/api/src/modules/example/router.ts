import { z } from "@yas/validate";
import { t } from "../../definition/trpc";

export function createExampleRouter() {
  return t.router({
    hello: t.procedure
      .input(z.string())
      .output(z.object({ message: z.string(), date: z.date() }))
      .query(({ input }) => {
        const message = `${input} world`;
        const date = new Date();
        return { message, date };
      }),
  });
}
