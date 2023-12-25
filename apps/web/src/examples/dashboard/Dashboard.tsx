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
import { SalesList } from "./Sales";
import { Card, formatCurrency } from "./shared";
import { StatsCard } from "./Stats";
import { gridAreas, gridContainer } from "./Dashboard.css";
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
        <Title>Dashboard</Title>
        <Tabs variant="contained" sx={{ flex: 1 }}>
          {secondaryNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <div className={gridContainer}>
          <StatsCard
            title="Total Revenue"
            amount={formatCurrency(45231.89)}
            description="+20.1% from last month"
            icon={<RocketIcon />}
            className={gridAreas.totalRevenue}
          />
          <StatsCard
            title="Subscriptions"
            amount="+2350"
            description="+180.1% from last month"
            icon={<PersonIcon />}
            className={gridAreas.subscriptions}
          />
          <StatsCard
            title="Sales"
            amount="+12,234"
            description="+19% from last month"
            icon={<CardStackIcon />}
            className={gridAreas.sales}
          />
          <StatsCard
            title="Active Now"
            amount="+573"
            description="+201 since last hour"
            icon={<BarChartIcon />}
            className={gridAreas.activeNow}
          />
          <Card sx={{ gap: "#4" }} className={gridAreas.chart}>
            <div>
              <Text variant="h5">Overview</Text>
              <Text>&nbsp;</Text>
            </div>
            <Chart />
          </Card>
          <Card sx={{ gap: "#4", px: 0 }} className={gridAreas.recentSales}>
            <Box sx={{ px: "#5" }}>
              <Text variant="h5">Recent Sales</Text>
              <Text>You made 265 sales this month.</Text>
            </Box>
            <SalesList />
          </Card>
        </div>
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
