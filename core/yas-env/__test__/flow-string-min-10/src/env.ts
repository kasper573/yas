import { z } from "@yas/validate";

const schema = z.object({ foo: z.string().min(10) });

export const env = schema.parse({
  foo: process.env.foo,
});
