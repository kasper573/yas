import { z } from "@yas/zod";
import { t } from "../../trpc";

export function createExampleRouter() {
  return t.router({
    hello: t.procedure
      .input(z.string())
      .output(z.string())
      .query(({ input }) => `${input} world (2)`),
  });
}
