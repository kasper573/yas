import {
  CircularProgress,
  Container,
  Dock,
  Stack,
  TabItem,
  Tabs,
} from "@yas/ui";
import { Outlet as RouterOutlet } from "@yas/router";
import { Suspense } from "react";
import { ModalOutlet } from "@yas/ui";
import { layout } from "./Layout.css";
import { NavLink } from "./NavLink";

const mainLinks = [
  { to: "/", label: "Sandbox" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export default function Layout() {
  return (
    <div className={layout}>
      <ContainerStack>
        <Tabs>
          {mainLinks.map(({ to, label }, index) => (
            <TabItem key={index} asChild>
              <NavLink to={to}>{label}</NavLink>
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
