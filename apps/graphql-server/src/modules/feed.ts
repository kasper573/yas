import type { ID, Int, Query } from "../types";
import type { User } from "./user";

/** @gqlType */
export interface Post {
  /** @gqlField */
  postId: ID;

  /** @gqlField */
  userId: ID;

  /** @gqlField */
  message: string;
}

/** @gqlField */
export function user(post: Post): User {
  return {
    userId: post.userId,
    name: "John Doe",
    avatarUrl: `https://picsum.photos/40/40?grayscale&random=${post.userId}`,
  };
}

/** @gqlField */
export function isLikedByUser(post: Post): boolean {
  return false;
}

/** @gqlField */
export function likes(post: Post): Int {
  return 0;
}

/** @gqlField */
export function feed(_: Query): Post[] {
  return [{ postId: "1", userId: "1", message: "Hello, world!" }];
}

/** @gqlField */
export function post(_: Query, { postId }: { postId: ID }): Post {
  return { postId, userId: "1", message: "Hello, world!" };
}
