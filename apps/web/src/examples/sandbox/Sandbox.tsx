import type { DialogProps } from "@yas/ui";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ExampleImage,
  Stack,
  Text,
  useModal,
} from "@yas/ui";
import { api } from "@yas/api-client";
import { env } from "../../env";
import { hello } from "../../hello";
import { useTheme } from "../../theme";
import * as styles from "./sandbox.css";

export default function Sandbox() {
  const [theme, toggleTheme] = useTheme();
  const [response] = api.example.hello.useSuspenseQuery(hello());
  const showDialog = useModal(TestDialog);
  return (
    <>
      <Text variant="h1">Yet Another Stack</Text>
      <Text paragraph>Mode: {env.mode}</Text>
      <Text paragraph>Server response: {response.message}</Text>
      <Text paragraph>Server time: {response.date.toLocaleString()}</Text>
      <Text>Theme: {theme}</Text>

      <Stack direction="row" gap="#2" sx={{ mt: "#2" }}>
        <Button onClick={toggleTheme}>Toggle theme</Button>
        <Button onClick={() => showDialog()}>Show dialog</Button>
      </Stack>

      <div className={styles.container}>Testing vanilla-extract css</div>

      <Stack direction="row" gap="#2">
        <Box
          sx={{
            p: "#7",
            background: "secondary.base.main",
            color: "secondary.contrast.main",
            typography: "body",
          }}
        >
          Testing sx prop
        </Box>

        <Box className={styles.projectImage} sx={{ p: "#2" }}>
          <Alert severity="info">Image from apps/web</Alert>
        </Box>

        <ExampleImage sx={{ p: "#2" }}>
          <Alert severity="info">Image from @yas/ui</Alert>
        </ExampleImage>
      </Stack>
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
