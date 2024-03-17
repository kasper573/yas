import DataLoader from "dataloader";

import type { ID } from "../../types";
import type { User } from "../user/model";
import type { Like, Post } from "./model";

export type FeedRepository = ReturnType<typeof createFeedRepository>;

const likesDB: Like[] = [];

export function createFeedRepository(clientId: ID) {
  const postsDB: Post[] = [
    { postId: "1", userId: clientId, message: "Hello, world!" },
  ];

  return {
    post: new DataLoader<ID, Post>(async (ids) =>
      postsDB.filter((post) => ids.includes(post.postId)),
    ),
    postsForUser: new DataLoader<User["userId"], Post[]>(async (userIds) => {
      return userIds.map(() => postsDB);
    }),
    totalLikes: new DataLoader<Post["postId"], number>(async (postIds) =>
      postIds.map(
        (postId) => likesDB.filter((like) => like.postId === postId).length,
      ),
    ),
    isLikedByUser: new DataLoader<{ postId: ID; userId: ID }, boolean>(
      async (queries) =>
        queries.map((query) =>
          likesDB.some(
            (like) =>
              like.postId === query.postId && like.userId === query.userId,
          ),
        ),
    ),
    setPostLiked({
      postId,
      userId,
      liked,
    }: {
      postId: ID;
      userId: ID;
      liked: boolean;
    }) {
      const existingLikeIndex = likesDB.findIndex(
        (like) => like.postId === postId && like.userId === userId,
      );

      if (liked) {
        if (existingLikeIndex !== -1) {
          throw new Error("Post already liked");
        }
        likesDB.push({ postId, userId });
      } else {
        if (existingLikeIndex === -1) {
          throw new Error("Post not liked");
        }
        likesDB.splice(existingLikeIndex, 1);
      }
    },
  };
}
