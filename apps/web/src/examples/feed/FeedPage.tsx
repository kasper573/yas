import {
  graphql,
  useGraphQLMutation,
  useGraphQLQuery,
} from "@yas/graphql-client";
import {
  LoadingButton,
  List,
  Stack,
  TextField,
  createControllerProxy,
  useForm,
} from "@yas/ui";
import { Post, postGQL } from "./Post";

export default function FeedPage() {
  const { data } = useGraphQLQuery({ query: feedGQL });
  const form = useForm<{ message: string }>();
  const createPost = useGraphQLMutation(createPostGQL);
  const onSubmit = form.handleSubmit(async (data) => {
    await createPost.mutateAsync(data);
    form.reset();
  });
  const control = createControllerProxy(form.control);

  return (
    <>
      <Stack asChild direction="row" gap="#2" align="center">
        <form onSubmit={onSubmit}>
          {control.message((props) => (
            <TextField
              {...props}
              disabled={createPost.isPending}
              inputProps={{ placeholder: "Post something" }}
            />
          ))}
          <LoadingButton type="submit" isLoading={createPost.isPending}>
            Post
          </LoadingButton>
        </form>
      </Stack>
      <List>
        {data?.feed.map((post) => <Post key={post.postId} post={post} />)}
      </List>
    </>
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

const createPostGQL = graphql(`
  mutation CreatePost($message: String!) {
    createPost(message: $message)
  }
`);
