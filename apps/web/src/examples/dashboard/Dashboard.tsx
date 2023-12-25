import { styled } from "@yas/style";
import {
  Box,
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
import { Chart } from "./Chart";
import { SalesList } from "./Sales";
import { Card, formatCurrency } from "./shared";
import { StatsCard } from "./Stats";

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
        <Title>Dashboard</Title>
        <Tabs variant="contained" sx={{ flex: 1 }}>
          {secondaryNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <Stack direction="row" gap="#4" align="stretch">
          <StatsCard
            title="Total Revenue"
            amount={formatCurrency(45231.89)}
            description="+20.1% from last month"
            icon={<RocketIcon />}
          />
          <StatsCard
            title="Subscriptions"
            amount="+2350"
            description="+180.1% from last month"
            icon={<PersonIcon />}
          />
          <StatsCard
            title="Sales"
            amount="+12,234"
            description="+19% from last month"
            icon={<CardStackIcon />}
          />
          <StatsCard
            title="Active Now"
            amount="+573"
            description="+201 since last hour"
            icon={<BarChartIcon />}
          />
        </Stack>
        <Stack direction="row" align="stretch">
          <Card sx={{ flex: 3, gap: "#4" }}>
            <div>
              <Text variant="h5">Overview</Text>
              <Text>&nbsp;</Text>
            </div>
            <Chart />
          </Card>
          <Card sx={{ flex: 2, gap: "#4", px: 0 }}>
            <Box sx={{ px: "#5" }}>
              <Text variant="h5">Recent Sales</Text>
              <Text>You made 265 sales this month.</Text>
            </Box>
            <SalesList />
          </Card>
        </Stack>
      </Stack>
    </Card>
  );
}

const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ variant: "h1", sx: { lineHeight: 1 } });
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
