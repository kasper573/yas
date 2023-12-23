import { styled } from "@yas/style";
import {
  Divider,
  Link,
  Stack as StackImpl,
  TabItem,
  Tabs,
  Text,
} from "@yas/ui";
import { outline } from "./Dashboard.css";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export function Dashboard() {
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
        <Stack direction="row">
          <Stats />
          <Stats />
          <Stats />
          <Stats />
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
const Stack = styled(StackImpl).attrs({ columnGap, rowGap });
const Outlined = styled("div").attrs({ className: outline });
const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ variant: "h1", children: "Dashboard" });

const Stats = styled(Text).attrs({ children: "Stats" });
const Graph = styled(Text).attrs({ children: "Graph" });
const RecentSales = styled(Text).attrs({ children: "RecentSales" });
const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
