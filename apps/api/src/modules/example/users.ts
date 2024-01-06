import { z } from "@yas/validate";
import { TRPCError } from "@trpc/server";
import { t, trpcUnwrap } from "../../definition/trpc";
import { userIdType, userType } from "./types";

export function createUsersRouter() {
  return t.router({
    list: t.procedure
      .input(z.string().optional())
      .output(userType.array())
      .query(({ input, ctx }) => ctx.userRepository.search(input)),
    get: t.procedure
      .input(userIdType)
      .output(userType)
      .query(async ({ input, ctx }) => {
        const result = await ctx.userRepository.get(input);
        return trpcUnwrap(
          result.mapErr(
            (message) => new TRPCError({ code: "BAD_REQUEST", message }),
          ),
        );
      }),
  });
}
