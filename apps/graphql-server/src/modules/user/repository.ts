import DataLoader from "dataloader";
import { uniqueNamesGenerator } from "unique-names-generator";
import type { ID } from "grats";
import type { User } from "./model";

export type UserRepository = DataLoader<ID, User>;

export function createUserRepository(): UserRepository {
  return new DataLoader<ID, User>(async (ids) => {
    return ids.map((userId) => {
      const name = uniqueNamesGenerator({ dictionaries, seed: userId });
      return {
        userId,
        name,
        avatarUrl: `https://api.dicebear.com/8.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      };
    });
  });
}

const dictionaries: string[][] = [
  ["big", "small", "tiny", "huge", "gigantic", "enormous", "little", "large"],
  ["happy", "sad", "angry", "excited", "calm", "relaxed", "sleepy"],
  ["red", "green", "blue", "yellow", "black", "white", "orange", "purple"],
  ["dog", "cat", "mouse", "rat", "cow", "elephant", "tiger", "lion", "cheetah"],
];
