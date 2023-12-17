import { Container, DialogOutlet, Stack } from "@yas/ui";
import { Outlet as RouterOutlet } from "react-router-dom";
import { Menu } from "./Menu";

export function Layout() {
  return (
    <>
      <Container as={Stack} asProps={{ gap: "#3", sx: { flex: 1, p: "#5" } }}>
        <Menu />
        <Stack sx={{ flex: 1 }}>
          <RouterOutlet />
        </Stack>
      </Container>
      <DialogOutlet />
    </>
  );
}
