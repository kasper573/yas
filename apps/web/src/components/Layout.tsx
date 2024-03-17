import {
  CircularProgress,
  Container,
  Dock,
  Link,
  Stack,
  TabItem,
  Tabs,
} from "@yas/ui";
import { Outlet as RouterOutlet } from "@yas/router";
import { Suspense } from "react";
import { ModalOutlet } from "@yas/ui";
import { layout } from "./Layout.css";

export default function Layout() {
  return (
    <div className={layout}>
      <ContainerStack>
        <Tabs>
          <TabItem asChild>
            <Link to="/">Sandbox</Link>
          </TabItem>
          <TabItem asChild>
            <Link to="/dashboard">Dashboard</Link>
          </TabItem>
          <TabItem asChild>
            <Link to="/api-tester">Api Tester</Link>
          </TabItem>
          <TabItem asChild>
            <Link to="/feed">Feed</Link>
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
  gap: "#3",
  sx: { flex: 1, p: "#5" },
});
