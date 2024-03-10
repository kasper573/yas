import type { Query } from "~/types";

/** @gqlType */
export default class User {
  constructor(
    public _id: string,
    public _name: string,
    public _interests: string[] = [],
  ) {}

  /** @gqlField */
  id(): string {
    return this._id;
  }

  /** @gqlField */
  async name(_: unknown): Promise<string> {
    return this._name;
  }

  /** @gqlField */
  async interests(_: unknown): Promise<string[]> {
    return this._interests;
  }
}

/** @gqlField */
export async function allUsers(_: Query, _args: unknown): Promise<User[]> {
  return [new User("1", "Max"), new User("2", "Moritz")];
}
