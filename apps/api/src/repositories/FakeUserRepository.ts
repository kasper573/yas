import type { Result } from "@yas/result";
import { err, ok } from "@yas/result";
import type { User, UserId } from "../modules/example/types";
import { randomAvatarUrl } from "../modules/example/random";

export class FakeUserRepository {
  private users = new Map<UserId, User>(
    fixtures.map((user) => [user.userId, user]),
  );

  async get(id: UserId): Promise<Result<User, string>> {
    const user = this.users.get(id);
    if (user) {
      return ok(user);
    }
    return err(`User by id ${id} not found`);
  }

  async search(filter: string): Promise<User[]> {
    return Array.from(this.users.values()).filter(filterUser(filter));
  }

  async all() {
    return Array.from(this.users.values());
  }
}

function filterUser(filter: string) {
  return (user: User): boolean => {
    return (
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
    );
  };
}

const fixtures = [
  {
    userId: 1 as UserId,
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    avatarUrl: randomAvatarUrl(0),
  },
  {
    userId: 2 as UserId,
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    avatarUrl: randomAvatarUrl(1),
  },
  {
    userId: 3 as UserId,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    avatarUrl: randomAvatarUrl(2),
  },
  {
    userId: 4 as UserId,
    name: "William Kim",
    email: "will@email.com",
    avatarUrl: randomAvatarUrl(3),
  },
  {
    userId: 5 as UserId,
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    avatarUrl: randomAvatarUrl(4),
  },
] satisfies Array<User>;
