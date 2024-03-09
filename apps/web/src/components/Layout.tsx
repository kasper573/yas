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

const mainLinks = [
  { to: "/", label: "Sandbox" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/api-tester", label: "Api Tester" },
] as const;

export default function Layout() {
  return (
    <div className={layout}>
      <ContainerStack>
        <Tabs>
          {mainLinks.map(({ to, label }, index) => (
            <TabItem key={index} asChild>
              <Link to={to}>{label}</Link>
            </TabItem>
          ))}
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
