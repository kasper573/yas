import { styled } from "@yas/style";
import {
  CircularProgress,
  Divider,
  Link,
  Stack as StackImpl,
  TabItem,
  Tabs,
} from "@yas/ui";
import { Suspense } from "react";
import { Outlet } from "@yas/router";
import { Card } from "../shared";

const links = [
  { to: "/api-tester/trpc", label: "TRPC" },
  { to: "/api-tester/graphql", label: "GraphQL" },
] as const;

export default function Layout() {
  return (
    <Card sx={{ p: 0 }}>
      <Stack direction="row" align="center" sx={{ my: "#3", px: "#5" }}>
        <Tabs variant="item-contained" sx={{ flex: 1 }}>
          {links.map(({ to, label }, index) => (
            <TabItem key={index} asChild>
              <Link to={to} activeOptions={{ exact: true }}>
                {label}
              </Link>
            </TabItem>
          ))}
        </Tabs>
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1, p: "#5" }}>
        <Suspense
          fallback={<CircularProgress size="large" sx={{ margin: "auto" }} />}
        >
          <Outlet />
        </Suspense>
      </Stack>
    </Card>
  );
}

const Stack = styled(StackImpl).attrs({ gap: "#4" });
