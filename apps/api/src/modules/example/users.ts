import { z } from "@yas/validate";
import { t } from "../../definition/trpc";
import { createRandomUsers, createSeededRandom } from "./fixtures";
import { userSchema } from "./types";

export function createUsersProcedure() {
  return t.procedure
    .input(z.string().optional())
    .output(userSchema.array())
    .query(({ input }) => createRandomUsers(createSeededRandom(input)));
}
