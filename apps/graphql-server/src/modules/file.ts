import type { ID, Query } from "../types";

/** @gqlUnion */
export type File = TextFile | Folder;

/** @gqlType */
export interface TextFile {
  __typename: "TextFile";

  /** @gqlField */
  id: ID;

  /** @gqlField */
  parentId: ID;

  /** @gqlField */
  name: string;

  /** @gqlField */
  content: string;
}

/** @gqlType */
export interface Folder {
  __typename: "Folder";

  /** @gqlField */
  id: ID;

  /** @gqlField */
  parentId: ID;

  /** @gqlField */
  name: string;

  files: File[];
}

const fakeDB: File[] = [];

/** @gqlField */
export function dir(_: Query, { id }: { id: ID }): File[] {
  return fakeDB.filter((f) => f.parentId === id);
}

/** @gqlField */
export function files(parent: Folder): File[] {
  return dir({} as Query, { id: parent.id });
}
