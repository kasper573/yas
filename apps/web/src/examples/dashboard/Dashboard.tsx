import { styled } from "@yas/style";
import { Divider, Link, TabItem, Tabs, Text } from "@yas/ui";
import {
  RocketIcon,
  PersonIcon,
  CardStackIcon,
  BarChartIcon,
} from "@yas/icons";
import { Outlined, columnGap, rowGap } from "./Shared";
import { Stats } from "./Stats";
import { CommonStack } from "./Shared";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export default function Dashboard() {
  return (
    <Outlined>
      <CommonStack
        direction="row"
        align="center"
        sx={{ my: rowGap, px: columnGap }}
      >
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
      </CommonStack>
      <Divider margin={false} />
      <CommonStack sx={{ flex: 1, p: "#5" }}>
        <Title />
        <Tabs variant="contained" sx={{ flex: 1 }}>
          {secondaryNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <CommonStack direction="row" align="stretch">
          <Stats
            title="Total Revenue"
            amount="$45,231.89"
            description="+20.1% from last month"
            icon={<RocketIcon />}
          />
          <Stats
            title="Subscriptions"
            amount="+2350"
            description="+180.1% from last month"
            icon={<PersonIcon />}
          />
          <Stats
            title="Sales"
            amount="+12,234"
            description="+19% from last month"
            icon={<CardStackIcon />}
          />
          <Stats
            title="Active Now"
            amount="+573"
            description="+201 since last hour"
            icon={<BarChartIcon />}
          />
        </CommonStack>
        <CommonStack direction="row">
          <Graph />
          <RecentSales />
        </CommonStack>
      </CommonStack>
    </Outlined>
  );
}

const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ variant: "h1", children: "Dashboard" });
const Graph = styled(Text).attrs({ children: "Graph" });
const RecentSales = styled(Text).attrs({ children: "RecentSales" });
const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
