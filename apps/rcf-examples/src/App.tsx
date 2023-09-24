import { Suspense, useState } from "react";
import { Box, Button, Stack, CircularProgress } from "@yas/ui";
import { examples } from "./examples";

export function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const CurrentTab = examples[tabIndex].component;

  return (
    <>
      <Stack direction="row">
        {examples.map(({ name }, index) => (
          <Button key={index} onClick={() => setTabIndex(index)}>
            {name}
          </Button>
        ))}
      </Stack>
      <Box sx={{ p: 3 }} style={{ flex: 1 }}>
        <Suspense fallback={<CircularProgress />}>
          <CurrentTab />
        </Suspense>
      </Box>
    </>
  );
}
