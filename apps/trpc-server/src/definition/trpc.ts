import { initTRPC } from "@trpc/server";
import transformer from "superjson";
import type { ApiContext } from "./context";

export const t = initTRPC.context<ApiContext>().create({ transformer });
