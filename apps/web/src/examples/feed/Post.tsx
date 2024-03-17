import type { FragmentOf } from "@yas/graphql-client";
import { graphql, readFragment } from "@yas/graphql-client";
import { HeartFilledIcon, HeartIcon } from "@yas/icons";
import {
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  ListItemSecondaryContent,
  LoadingButton,
} from "@yas/ui";

export function Post({ post }: { post: FragmentOf<typeof postGQL> }) {
  const { message, likes, isLikedByUser, user } = readFragment(postGQL, post);

  return (
    <ListItem>
      <ListItemIcon>
        <Avatar src={user.avatarUrl} />
      </ListItemIcon>
      <ListItemText
        primary={`${user.name}: ${message}`}
        secondary={`${likes} likes`}
      />
      <ListItemSecondaryContent>
        <LoadingButton icon>
          {isLikedByUser ? <HeartFilledIcon /> : <HeartIcon />}
        </LoadingButton>
      </ListItemSecondaryContent>
    </ListItem>
  );
}

export const postGQL = graphql(`
  fragment PostData on Post {
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
