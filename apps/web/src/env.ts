import { z, mode, truthy } from "@yas/zod";

const schema = z.object({
  CI: truthy.default(false),
  mode: mode.default("development"),
  apiUrl: z.string(),
});

export const env = schema.parse({
  mode: import.meta.env.MODE,
  apiUrl: import.meta.env.PUBLIC_API_URL,
});
