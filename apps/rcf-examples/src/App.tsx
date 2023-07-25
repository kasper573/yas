import { useMemo } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { ExampleList } from "./ExampleList";

export function App() {
  const theme = useMemo(() => createTheme({ palette: { mode: "dark" } }), []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ExampleList />
    </ThemeProvider>
  );
}
