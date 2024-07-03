import type { DialogProps } from "@yas/ui";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Text,
} from "@yas/ui";
import { useMediaQueries } from "@yas/hooks";
import { useModal } from "@yas/ui";
import { breakpointQuery } from "@yas/style";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@yas/icons";
import { env } from "../../env";
import { useTheme } from "../../ThemeProvider";
import * as styles from "./sandbox.css";

export default function Sandbox() {
  const [shouldHaveRenderError, setShouldHaveRenderError] = useState(false);

  const preferenceMediaQueryResults = useMediaQueries(
    preferenceMediaQueries,
    "preserve-keys",
  );
  const breakpointName = Object.keys(useMediaQueries(breakpointQuery.all))[0];
  const [theme, toggleTheme] = useTheme();
  const showDialog = useModal(TestDialog);

  if (shouldHaveRenderError) {
    throw new Error("React render error");
  }

  function triggerReactRenderError() {
    setShouldHaveRenderError(true);
  }

  function triggerReactEventError() {
    throw new Error("React event error");
  }

  function triggerPromiseError() {
    new Promise((_, reject) => reject(new Error("Promise error")));
  }

  return (
    <>
      <Text intent="h1">Yet Another Stack</Text>
      <Text margin>Mode: {env.mode}</Text>
      <Text>Theme: {theme}</Text>

      <Text sx={{ whiteSpace: "pre-wrap" }}>
        useMediaQueries: {JSON.stringify(preferenceMediaQueryResults, null, 2)}
        {"\n"}
        breakpoint: {breakpointName}
      </Text>

      <Stack gap="l">
        <Stack direction="row" gap="l" sx={{ mt: "l" }}>
          <Button onClick={toggleTheme}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            Toggle theme
          </Button>
          <Button onClick={() => showDialog()}>Show dialog</Button>
          <Button onClick={triggerReactRenderError}>
            Trigger react render error
          </Button>
          <Button onClick={triggerReactEventError}>
            Trigger react event error
          </Button>
          <Button onClick={triggerPromiseError}>Trigger promise error</Button>
        </Stack>

        <div className={styles.container}>Testing vanilla-extract css</div>

        <Stack direction="row" gap="l">
          <Box
            sx={{
              p: "l",
              backgroundColor: "secondary.base",
              color: "secondary.face",
              typography: "body",
            }}
          >
            Testing sx prop
          </Box>

          <Box className={styles.projectImage} sx={{ p: "l" }}>
            <Alert severity="info">
              <Text>Image from apps/dashboard</Text>
            </Alert>
          </Box>
        </Stack>
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

const preferenceMediaQueries = Object.fromEntries(
  [
    "(prefers-color-scheme: dark)",
    "(prefers-color-scheme: light)",
    "(prefers-reduced-motion: reduce)",
    "(prefers-reduced-transparency: reduce)",
    "(prefers-contrast: more)",
  ].map((query) => [query, query]),
);
