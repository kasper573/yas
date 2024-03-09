import { initTRPC } from "@trpc/server";
import transformer from "superjson";
import { unwrapUnsafe_useWithCaution } from "@yas/result";
import type { ApiContext } from "./context";

export const t = initTRPC.context<ApiContext>().create({ transformer });

export const trpcUnwrap = unwrapUnsafe_useWithCaution;
