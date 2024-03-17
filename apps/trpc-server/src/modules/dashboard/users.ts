import { z } from "@yas/validate";
import { t } from "../../definition/trpc";
import { userIdType, userType } from "./types";

export function createUsersRouter() {
  return t.router({
    list: t.procedure
      .input(z.string())
      .output(userType.array())
      .query(({ input, ctx }) => ctx.userRepository.search(input, 5)),
    get: t.procedure
      .input(userIdType)
      .output(userType)
      .query(({ input, ctx }) => ctx.userRepository.get(input)),
  });
}
