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

  async search(filter: string, limit: number): Promise<User[]> {
    return Array.from(this.users.values())
      .filter(filterUser(filter))
      .slice(0, limit);
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

const mockedFirstNames: string[] = [
  "Olivia",
  "Jackson",
  "Isabella",
  "William",
  "Sofia",
  "Aiden",
  "Mia",
  "Grayson",
  "Charlotte",
  "Lucas",
  "Amelia",
  "Liam",
  "Harper",
  "Noah",
  "Evelyn",
  "Elijah",
  "Liam",
  "James",
  "Benjamin",
  "Lucas",
  "Mason",
  "Ethan",
  "Alexander",
  "Henry",
  "Jacob",
  "Michael",
  "Daniel",
  "Logan",
  "Jackson",
  "Sebastian",
  "Jack",
  "Aiden",
  "Owen",
  "Samuel",
  "Matthew",
  "Joseph",
  "Levi",
  "Mateo",
  "David",
  "John",
  "Wyatt",
  "Carter",
  "Julian",
  "Luke",
  "Grayson",
  "Isaac",
  "Jayden",
  "Theodore",
  "Gabriel",
  "Anthony",
  "Dylan",
  "Leo",
  "Lincoln",
  "Jaxon",
  "Asher",
  "Christopher",
  "Josiah",
  "Andrew",
  "Thomas",
  "Joshua",
  "Ezra",
  "Hudson",
  "Charles",
  "Caleb",
  "Isaiah",
  "Ryan",
  "Nathan",
  "Adrian",
  "Christian",
  "Maverick",
];

const mockedLastNames: string[] = [
  "Martin",
  "Lee",
  "Nguyen",
  "Kim",
  "Davis",
  "Rodriguez",
  "Wilson",
  "Martinez",
  "Anderson",
  "Taylor",
  "Thomas",
  "Hernandez",
  "Moore",
  "Martin",
  "Jackson",
  "Thompson",
  "White",
  "Lopez",
  "Lee",
  "Gonzalez",
  "Harris",
  "Clark",
  "Lewis",
  "Robinson",
  "Walker",
  "Perez",
  "Hall",
  "Young",
  "Allen",
  "Sanchez",
  "Wright",
  "King",
  "Scott",
  "Green",
  "Baker",
  "Adams",
  "Nelson",
  "Hill",
  "Ramirez",
  "Campbell",
  "Mitchell",
  "Roberts",
  "Carter",
  "Phillips",
  "Evans",
  "Turner",
  "Torres",
  "Parker",
  "Collins",
  "Edwards",
  "Stewart",
  "Flores",
  "Morris",
  "Nguyen",
  "Murphy",
  "Rivera",
  "Cook",
  "Rogers",
  "Morgan",
  "Peterson",
  "Cooper",
  "Reed",
  "Bailey",
  "Bell",
  "Gomez",
  "Kelly",
  "Howard",
  "Ward",
  "Cox",
  "Diaz",
  "Richardson",
  "Wood",
  "Watson",
  "Brooks",
  "Bennett",
  "Gray",
];

const fixtures: Array<User> = mockedFirstNames.flatMap((firstName, i) =>
  mockedLastNames.map((lastName, n) => {
    const userId = (i * mockedFirstNames.length + n) as UserId;
    return {
      userId,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      avatarUrl: randomAvatarUrl(userId),
    };
  }),
);
