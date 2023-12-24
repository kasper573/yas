import { styled } from "@yas/style";
import {
  Divider,
  Link,
  Stack as StackImpl,
  TabItem,
  Tabs,
  Text,
} from "@yas/ui";
import {
  RocketIcon,
  PersonIcon,
  CardStackIcon,
  BarChartIcon,
} from "@yas/icons";
import { Card } from "./Card";
import { Stats } from "./Stats";
import { Chart } from "./Chart";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export default function Dashboard() {
  return (
    <Card sx={{ p: 0 }}>
      <Stack direction="row" align="center" sx={{ my: "#2", px: "#5" }}>
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
        </Stack>
        <Stack direction="row" align="stretch" sx={{ height: 400 }}>
          <Card sx={{ flex: 3, gap: "#2" }}>
            <Text variant="h5">Overview</Text>
            <Chart />
          </Card>
          <Card sx={{ flex: 2, gap: "#2" }}>
            <Text variant="h5">Overview</Text>
            <Chart />
          </Card>
        </Stack>
      </Stack>
    </Card>
  );
}

const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({
  variant: "h1",
  children: "Dashboard",
  sx: { lineHeight: 1 },
});
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
