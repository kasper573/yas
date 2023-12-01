import type { DialogProps } from "@yas/ui";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ExampleImage,
  Text,
  useDialog,
} from "@yas/ui";
import { api } from "@yas/api-client";
import { env } from "../env";
import { hello } from "../hello";
import * as foo from "./foo.css";

export function Home() {
  const { data: response } = api.example.hello.useQuery(hello());
  const showDialog = useDialog(TestDialog);
  return (
    <>
      <Text variant="h1">Yet Another Stack</Text>
      <Text paragraph>Mode: {env.mode}</Text>
      <Text paragraph>Server response: {response?.message}</Text>
      <Text paragraph>Server time: {response?.date.toLocaleString()}</Text>
      <div className={foo.container()}>Testing vanilla-extract css</div>

      <Button onClick={() => showDialog()}>Show dialog</Button>

      <Box
        sx={{
          p: "#10",
          fontFamily: "default",
          background: "secondary.base.main",
          color: "secondary.contrast.main",
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

function TestDialog<T>(props: DialogProps<T>) {
  const { resolve } = props;
  return (
    <Dialog {...props}>
      <DialogTitle>Test Dialog</DialogTitle>
      <DialogContent>
        <Text>Hello World</Text>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => resolve(undefined)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
