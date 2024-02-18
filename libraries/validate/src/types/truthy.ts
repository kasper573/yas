import { z } from "zod";

const truthyString = z
  .string()
  .transform((v) => ["true", "1"].includes(v.toLowerCase()));

export const truthy = z.boolean().or(truthyString);
