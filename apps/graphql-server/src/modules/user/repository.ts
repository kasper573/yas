import DataLoader from "dataloader";
import type { ID } from "../../types";
import type { User } from "./model";

export type UserRepository = DataLoader<ID, User>;

export function createUserRepository(): UserRepository {
  return new DataLoader<ID, User>(async (ids) => {
    return ids.map((userId) => {
      return {
        userId,
        name: "John Doe",
        avatarUrl: `https://picsum.photos/40/40?grayscale&random=${userId}`,
      };
    });
  });
}
