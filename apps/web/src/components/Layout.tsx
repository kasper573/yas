import {
  CircularProgress,
  Container,
  DialogOutlet,
  Dock,
  Stack,
} from "@yas/ui";
import { Outlet as RouterOutlet } from "react-router-dom";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";
import { clsx } from "@yas/style";
import { Suspense } from "react";
import { useTheme } from "../hooks/useTheme";
import { Menu } from "./Menu";
import { layout } from "./Layout.css";

const themeClassNames = {
  dark,
  light,
};

export default function Layout() {
  const [theme] = useTheme();
  return (
    <div className={clsx(themeClassNames[theme], layout)}>
      <ContainerStack>
        <Menu />
        <Stack sx={{ flex: 1 }}>
          <Suspense
            fallback={
              <Dock position="center">
                <CircularProgress size="hero" />
              </Dock>
            }
          >
            <RouterOutlet />
          </Suspense>
        </Stack>
      </ContainerStack>
      <DialogOutlet />
    </div>
  );
}

const ContainerStack = Container.as(Stack).attrs({
  gap: "#3",
  sx: { flex: 1, p: "#5" },
});
