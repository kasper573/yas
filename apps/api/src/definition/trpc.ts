import { initTRPC } from "@trpc/server";
import type { ApiContext } from "./context";

export const t = initTRPC.context<ApiContext>().create();
