import type { Context, ID, Query } from "../../types";

/** @gqlType */
export interface User {
  /** @gqlField */
  userId: ID;

  /** @gqlField */
  name: string;

  /** @gqlField */
  avatarUrl: string;
}

/** @gqlField */
export function user(
  _: Query,
  { userId }: { userId: ID },
  { repositories }: Context,
): Promise<User> {
  return repositories.user.load(userId);
}
