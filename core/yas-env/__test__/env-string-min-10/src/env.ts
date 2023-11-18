import { z } from "@yas/zod";

const schema = z.object({ foo: z.string().min(10) });

export const env = schema.parse({
  foo: process.env.foo,
});
