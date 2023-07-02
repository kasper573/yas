import { Text } from "@yas/ui";
import { env } from "../env";
import { hello } from "../hello";
import { trpc } from "../trpc";

export function Home() {
  const { data: response } = trpc.example.hello.useQuery(hello());
  return (
    <>
      <Text variant="h1">Yet Another Stack</Text>
      <Text paragraph>Mode: {env.mode}</Text>
      <Text paragraph>{response}</Text>
    </>
  );
}
