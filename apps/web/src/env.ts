import { z } from "zod";
import { mode } from "@yas/zod";

const schema = z.object({
  mode: mode.default("development"),
  apiUrl: z.string(),
});

export const env = schema.parse({
  mode: import.meta.env.MODE,
  apiUrl: import.meta.env.PUBLIC_API_URL,
});
