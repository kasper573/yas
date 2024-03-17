import type { ID } from "@yas/graphql-client";
import { graphql, useGraphQLQuery } from "@yas/graphql-client";
import { HeartFilledIcon, HeartIcon } from "@yas/icons";
import {
  ListItem,
  ListItemIcon,
  Avatar,
  List,
  ListItemText,
  ListItemSecondaryContent,
  LoadingButton,
} from "@yas/ui";

export default function FeedPage() {
  const { data } = useGraphQLQuery({ query: feedGQL });
  return (
    <List>
      {data?.feed.map(({ postId }) => <Post key={postId} postId={postId} />)}
    </List>
  );
}

function Post({ postId }: { postId: ID }) {
  const { data } = useGraphQLQuery({
    query: postGQL,
    variables: { postId },
  });

  if (!data) {
    return null;
  }

  const { message, likes, isLikedByUser, user } = data.post;

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

const feedGQL = graphql(`
  query Feed {
    feed {
      postId
    }
  }
`);

const postGQL = graphql(`
  query Post($postId: ID!) {
    post(postId: $postId) {
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
  }
`);
