import { z } from "zod";

export const morganFormat = z.enum(["tiny", "short", "dev", "combined"]);
