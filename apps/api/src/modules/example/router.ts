import { z } from "@yas/validate";
import { t } from "../../trpc";

export function createExampleRouter() {
  return t.router({
    hello: t.procedure
      .input(z.string())
      .output(z.string())
      .query(({ input }) => `${input} world`),
  });
}
