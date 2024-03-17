import type { FragmentOf } from "@yas/graphql-client";
import { graphql, readFragment, useGraphQLMutation } from "@yas/graphql-client";
import { HeartFilledIcon, HeartIcon } from "@yas/icons";
import { FormatDistance } from "@yas/time";
import {
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  ListItemSecondaryContent,
  LoadingButton,
} from "@yas/ui";

export function Post({ post }: { post: FragmentOf<typeof postGQL> }) {
  const { postId, message, likes, isLikedByUser, user, date } = readFragment(
    postGQL,
    post,
  );

  const setLiked = useGraphQLMutation(setPostLikedGQL);

  return (
    <ListItem>
      <ListItemIcon>
        <Avatar src={user.avatarUrl} />
      </ListItemIcon>
      <ListItemText
        primary={`${user.name}: ${message}`}
        secondary={
          <>
            Posted <FormatDistance date={date} />, {likes} likes
          </>
        }
      />
      <ListItemSecondaryContent>
        <LoadingButton
          icon
          isLoading={setLiked.isPending}
          onClick={() => setLiked.mutate({ postId, liked: !isLikedByUser })}
        >
          {isLikedByUser ? <HeartFilledIcon /> : <HeartIcon />}
        </LoadingButton>
      </ListItemSecondaryContent>
    </ListItem>
  );
}

export const postGQL = graphql(`
  fragment PostData on Post {
    date
    postId
    message
    likes
    isLikedByUser
    user {
      userId
      name
      avatarUrl
    }
  }
`);

export const setPostLikedGQL = graphql(`
  mutation SetPostLiked($postId: ID!, $liked: Boolean!) {
    setPostLiked(postId: $postId, liked: $liked)
  }
`);
