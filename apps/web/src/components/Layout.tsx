import { Container, Stack } from "@yas/ui";
import { Outlet } from "react-router-dom";
import { Menu } from "./Menu";

export function Layout() {
  return (
    <Container>
      <Stack gap="3" sx={{ p: "#5" }}>
        <Menu />
        <div>
          <Outlet />
        </div>
      </Stack>
    </Container>
  );
}
