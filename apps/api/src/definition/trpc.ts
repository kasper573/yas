import { initTRPC } from "@trpc/server";
import type { ApiContext } from "./context";
import { transformer } from "./transformer";

export const t = initTRPC.context<ApiContext>().create({ transformer });
