import { Box, ExampleImage, Text } from "@yas/ui";
import { env } from "../env";
import { hello } from "../hello";
import { trpc } from "../trpc";
import * as foo from "./foo.css";

export function Home() {
  const { data: response } = trpc.example.hello.useQuery(hello());
  return (
    <>
      <Text variant="h1">Yet Another Stack</Text>
      <Text paragraph>Mode: {env.mode}</Text>
      <Text paragraph>{response}</Text>
      <div className={foo.container()}>Testing vanilla-extract css</div>

      <Box
        sx={{
          p: "#10",
          fontFamily: "default",
          background: "secondaryBaseMain",
          color: "secondaryContrastMain",
        }}
      >
        Testing sx prop
      </Box>

      <Text variant="h1">Image from apps/web</Text>
      <div className={foo.projectImage} />

      <Text variant="h1">Image from @yas/ui</Text>
      <ExampleImage />
    </>
  );
}
