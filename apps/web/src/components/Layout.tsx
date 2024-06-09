import {
  CircularProgress,
  Container,
  Dock,
  Stack,
  TabItem,
  Tabs,
} from "@yas/ui";
import { NavLink, Outlet as RouterOutlet } from "@yas/router";
import { Suspense } from "react";
import { ModalOutlet } from "@yas/ui";
import { layout } from "./Layout.css";

export default function Layout() {
  return (
    <div className={layout}>
      <ContainerStack>
        <Tabs>
          <TabItem asChild>
            <NavLink to="/">Sandbox</NavLink>
          </TabItem>
          <TabItem asChild>
            <NavLink to="/dashboard">Dashboard</NavLink>
          </TabItem>
          <TabItem asChild>
            <NavLink to="/api-tester">Api Tester</NavLink>
          </TabItem>
          <TabItem asChild>
            <NavLink to="/feed">Feed</NavLink>
          </TabItem>
        </Tabs>
        <Stack sx={{ flex: 1 }}>
          <Suspense
            fallback={
              <Dock position="center">
                <CircularProgress size="large" />
              </Dock>
            }
          >
            <RouterOutlet />
          </Suspense>
        </Stack>
      </ContainerStack>
      <ModalOutlet />
    </div>
  );
}

const ContainerStack = Container.as(Stack).attrs({
  gap: "l",
  sx: { flex: 1, p: "xl" },
});
