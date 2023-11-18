import { z, mode, truthy } from "@yas/validate";

const schema = z.object({
  CI: truthy.default(false),
  mode: mode.default("development"),
  apiUrl: z.string(),
});

export const env = schema.parse({
  CI: process.env.CI,
  mode: process.env.NODE_ENV,
  apiUrl: process.env.API_URL,
});
