import { z } from "zod";
import { mode } from "@yas/zod";

const schema = z.object({
  mode: mode.default("development"),
  apiUrl: z.string(),
});

export const env = schema.parse({
  mode: process.env.MODE,
  apiUrl: process.env.API_URL,
});
