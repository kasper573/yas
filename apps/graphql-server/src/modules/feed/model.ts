import type { Context, ID, Int, Mutation, Query, GqlDate } from "../../types";
import type { User } from "../user/model";

/** @gqlType */
export interface Post {
  /** @gqlField */
  postId: ID;

  /** @gqlField */
  userId: ID;

  /** @gqlField */
  message: string;

  /** @gqlField */
  date: GqlDate;
}

export interface Like {
  postId: ID;
  userId: ID;
}

/** @gqlField */
export function user(
  post: Post,
  args: unknown,
  { repositories }: Context,
): Promise<User> {
  return repositories.user.load(post.userId);
}

/** @gqlField */
export function isLikedByUser(
  { postId }: Post,
  args: unknown,
  { clientId, repositories }: Context,
): Promise<boolean> {
  return repositories.feed.isLikedByUser.load({
    postId,
    userId: clientId,
  });
}

/** @gqlField */
export function likes(
  post: Post,
  args: unknown,
  { repositories }: Context,
): Promise<Int> {
  return repositories.feed.totalLikes.load(post.postId);
}

/** @gqlField */
export function feed(
  _: Query,
  args: unknown,
  { clientId, repositories }: Context,
): Promise<Post[]> {
  return repositories.feed.postsForUser.load(clientId);
}

/** @gqlField */
export function post(
  _: Query,
  { postId }: { postId: ID },
  { clientId, repositories }: Context,
): Promise<Post> {
  return repositories.feed.post.load(clientId);
}

/** @gqlField */
export function setPostLiked(
  _: Mutation,
  { postId, liked }: { postId: ID; liked: boolean },
  { clientId, repositories }: Context,
): Int {
  repositories.feed.setPostLiked({
    postId,
    userId: clientId,
    liked,
  });
  return 0;
}

/** @gqlField */
export async function createPost(
  _: Mutation,
  { message }: { message: string },
  { clientId, repositories }: Context,
): Promise<ID> {
  return repositories.feed.createPost({
    userId: clientId,
    message,
  });
}
