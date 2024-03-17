import DataLoader from "dataloader";
import type { ID } from "../types";

/** @gqlType */
export interface User {
  /** @gqlField */
  userId: ID;

  /** @gqlField */
  name: string;

  /** @gqlField */
  avatarUrl: string;
}

export type UserLoader = DataLoader<ID, User>;

export function createUserLoader(): UserLoader {
  return new DataLoader(async (ids) => {
    return [];
  });
}
