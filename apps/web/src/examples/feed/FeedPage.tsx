import { graphql, useGraphQLQuery } from "@yas/graphql-client";
import { List } from "@yas/ui";
import { Post, postGQL } from "./Post";

export default function FeedPage() {
  const { data } = useGraphQLQuery({ query: feedGQL });
  return (
    <List>
      {data?.feed.map((post) => <Post key={post.postId} post={post} />)}
    </List>
  );
}

const feedGQL = graphql(
  `
    query Feed {
      feed {
        postId
        ...PostData
      }
    }
  `,
  [postGQL],
);
