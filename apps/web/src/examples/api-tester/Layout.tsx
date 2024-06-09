import { styled } from "@yas/style";
import {
  CircularProgress,
  Divider,
  Stack as StackImpl,
  TabItem,
  Tabs,
} from "@yas/ui";
import { Suspense } from "react";
import { NavLink, Outlet } from "@yas/router";
import { Card } from "../shared";

const links = [
  { to: "/api-tester/trpc", label: "TRPC" },
  { to: "/api-tester/graphql", label: "GraphQL" },
] as const;

export default function Layout() {
  return (
    <Card style={{ padding: 0 }}>
      <Stack direction="row" align="center" sx={{ my: "l", px: "xl" }}>
        <Tabs intent="item-contained" sx={{ flex: 1 }}>
          {links.map(({ to, label }, index) => (
            <TabItem key={index} asChild>
              <NavLink to={to} activeOptions={{ exact: true }}>
                {label}
              </NavLink>
            </TabItem>
          ))}
        </Tabs>
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1, p: "xl" }}>
        <Suspense
          fallback={<CircularProgress size="large" sx={{ margin: "auto" }} />}
        >
          <Outlet />
        </Suspense>
      </Stack>
    </Card>
  );
}

const Stack = styled(StackImpl).attrs({ gap: "xl" });
