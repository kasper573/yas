import { styled } from "@yas/style";
import {
  Divider,
  Link,
  Stack as StackImpl,
  TabItem,
  Tabs,
  Text,
} from "@yas/ui";
import type { ReactNode } from "react";
import { RocketIcon } from "@yas/icons";
import { outline } from "./Dashboard.css";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export default function Dashboard() {
  return (
    <Outlined>
      <Stack direction="row" align="center" sx={{ my: rowGap, px: columnGap }}>
        <OrganizationSelect />
        <Tabs variant="text-highlight" sx={{ flex: 1 }}>
          {mainNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <Search />
        <UserMenu />
      </Stack>
      <Divider margin={false} />
      <Stack sx={{ flex: 1, p: "#5" }}>
        <Title />
        <Tabs variant="contained" sx={{ flex: 1 }}>
          {secondaryNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <Stack direction="row" align="stretch">
          <Stats
            title="Total Revenue"
            amount="$45,231.89"
            description="+20.1% from last month"
          />
          <Stats
            title="Subscriptions"
            amount="+2350"
            description="+180.1% from last month"
          />
          <Stats
            title="Sales"
            amount="+12,234"
            description="+19% from last month"
          />
          <Stats
            title="Active Now"
            amount="+573"
            description="+201 since last hour"
          />
        </Stack>
        <Stack direction="row">
          <Graph />
          <RecentSales />
        </Stack>
      </Stack>
    </Outlined>
  );
}

const rowGap = "#3" as const;
const columnGap = "#5" as const;
export const Stack = styled(StackImpl).attrs({ columnGap, rowGap });
export const Outlined = styled("div").attrs({ className: outline });
const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ variant: "h1", children: "Dashboard" });

const Graph = styled(Text).attrs({ children: "Graph" });
const RecentSales = styled(Text).attrs({ children: "RecentSales" });
const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});

export function Stats({
  title,
  amount,
  description,
}: {
  title: ReactNode;
  amount: ReactNode;
  description: ReactNode;
}) {
  return (
    <Outlined sx={{ p: "#5" }}>
      <Stack
        direction="row"
        align="center"
        justify="spaceBetween"
        sx={{ flex: 1 }}
      >
        <Text variant="h5">{title}</Text>
        <RocketIcon />
      </Stack>
      <Text variant="h1">{amount}</Text>
      <Text variant="caption">{description}</Text>
    </Outlined>
  );
}
