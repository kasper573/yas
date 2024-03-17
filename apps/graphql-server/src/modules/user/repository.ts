import DataLoader from "dataloader";
import type { ID } from "../../types";
import type { User } from "./model";

export type UserRepository = DataLoader<ID, User>;

export function createUserRepository(clientId: ID): UserRepository {
  const fakeUserForClient: User = {
    userId: clientId,
    name: "John Doe",
    avatarUrl: `https://picsum.photos/40/40?grayscale&random=1`,
  };

  const userDB: User[] = [fakeUserForClient];

  return new DataLoader<ID, User>(async (ids) => {
    return ids.map((id) => {
      const user = userDB.find((user) => user.userId === id);
      if (!user) {
        throw new Error(`User not found: ${id}`);
      }
      return user;
    });
  });
}
