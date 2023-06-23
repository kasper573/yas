import { z } from "zod";

export const numeric = z.number().or(z.string().transform((v) => Number(v)));
