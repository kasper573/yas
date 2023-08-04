import { useMemo, useState } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  Box,
  Tab,
  Container,
  Tabs,
} from "@mui/material";
import { examples } from "./examples";

export function App() {
  const theme = useMemo(() => createTheme({ palette: { mode: "dark" } }), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExampleTabs />
    </ThemeProvider>
  );
}

function ExampleTabs() {
  const [tabIndex, setTabIndex] = useState(0);
  const CurrentTab = examples[tabIndex].component;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          centered
          value={tabIndex}
          onChange={(e, newTab) => setTabIndex(newTab)}
        >
          {examples.map(({ name }, index) => (
            <Tab key={index} label={name} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <CurrentTab />
      </Box>
    </Container>
  );
}
