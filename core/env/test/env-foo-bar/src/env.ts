import { z } from "@yas/validate";

const schema = z.object({ foo: z.string(), bar: z.string() });

export const env = schema.parse({
  foo: process.env.foo,
  bar: process.env.bar,
});
