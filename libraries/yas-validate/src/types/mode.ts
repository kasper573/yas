import { z } from "zod";

export const mode = z.enum(["development", "production"]);
