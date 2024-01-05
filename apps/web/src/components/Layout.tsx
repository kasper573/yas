import { CircularProgress, Container, ModalOutlet, Dock, Stack } from "@yas/ui";
import { Outlet as RouterOutlet } from "react-router-dom";
import { clsx } from "@yas/style";
import { Suspense } from "react";
import { useThemeClassName } from "../theme";
import { Menu } from "./Menu";
import { layout } from "./Layout.css";

export default function Layout() {
  const theme = useThemeClassName();
  return (
    <div className={clsx(theme, layout)}>
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
