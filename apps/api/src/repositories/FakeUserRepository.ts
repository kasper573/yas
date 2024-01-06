import type { Result } from "@yas/result";
import { err, ok } from "@yas/result";
import type { User, UserId } from "../modules/example/types";
import { createSeededRandom, randomAvatarUrl } from "../modules/example/random";

export class FakeUserRepository {
  private users = new Map<UserId, User>(
    fixtures.map((user) => [user.id, user]),
  );

  async get(id: UserId): Promise<Result<User, string>> {
    const user = this.users.get(id);
    if (user) {
      return ok(user);
    }
    return err(`User by id ${id} not found`);
  }

  async search(filter?: string): Promise<User[]> {
    const rand = createSeededRandom(filter);
    return Array.from(this.users.values());
  }
}

const fixtures = [
  {
    id: 1 as UserId,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatarUrl: randomAvatarUrl(0),
  },
  {
    id: 2 as UserId,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatarUrl: randomAvatarUrl(1),
  },
  {
    id: 3 as UserId,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatarUrl: randomAvatarUrl(2),
  },
  {
    id: 4 as UserId,
    name: "William Kim",
    email: "will@email.com",
    avatarUrl: randomAvatarUrl(3),
  },
  {
    id: 5 as UserId,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatarUrl: randomAvatarUrl(4),
  },
];
