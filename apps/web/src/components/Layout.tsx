import { CircularProgress, Container, ModalOutlet, Dock, Stack } from "@yas/ui";
import { Outlet as RouterOutlet } from "@yas/router";
import { Suspense } from "react";
import { Menu } from "./Menu";
import { layout } from "./Layout.css";

export default function Layout() {
  return (
    <div className={layout}>
      <ContainerStack>
        <Menu />
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
