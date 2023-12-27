import { styled } from "@yas/style";
import {
  Box,
  CircularProgress,
  DatePicker,
  Divider,
  Dock,
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
import { Suspense, useState } from "react";
import { api } from "@yas/api-client";
import { RecentSaleList } from "./RecentSaleList";
import { Card, formatCurrency } from "./shared";
import { StatsCard } from "./Stats";
import { gridAreas, gridContainer } from "./Dashboard.css";
import { Chart } from "./Chart";
import { todaysDate } from "./shared";
import { formatOffset } from "./shared";

const mainNav = ["Overview", "Customers", "Products", "Settings"];
const secondaryNav = ["Overview", "Analytics", "Reports", "Notifications"];

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState(todaysDate);

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
        <Stack direction="row" justify="spaceBetween">
          <Title>Dashboard</Title>
          <DatePicker value={dateFilter} onChange={setDateFilter} />
        </Stack>
        <Suspense fallback={<DashboardSkeleton />}>
          <Separate dateFilter={dateFilter} />
        </Suspense>
      </Stack>
    </Card>
  );
}

function DashboardSkeleton() {
  return (
    <Box sx={{ minHeight: "60vh" }}>
      <Dock position="center">
        <CircularProgress size="large" />
      </Dock>
    </Box>
  );
}

function Separate({ dateFilter }: { dateFilter: Date }) {
  const [data] = api.example.dashboard.useSuspenseQuery(dateFilter);
  return (
    <>
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
          amount={formatCurrency(data.totalRevenue)}
          description={`${formatOffset(
            data.revenueDeltaSinceLastMonth,
          )}% from last month`}
          icon={<RocketIcon />}
          className={gridAreas.totalRevenue}
        />
        <StatsCard
          title="Subscriptions"
          amount={formatOffset(data.subscriptions)}
          description={`${formatOffset(
            data.subscriptionDeltaSinceLastMonth,
          )}% from last month`}
          icon={<PersonIcon />}
          className={gridAreas.subscriptions}
        />
        <StatsCard
          title="Sales"
          amount={formatOffset(data.sales)}
          description={`${formatOffset(
            data.salesDeltaSinceLastMonth,
          )}% from last month`}
          icon={<CardStackIcon />}
          className={gridAreas.sales}
        />
        <StatsCard
          title="Active Now"
          amount={formatOffset(data.activeNow)}
          description={`${formatOffset(
            data.activeSinceLastHour,
          )} since last hour`}
          icon={<BarChartIcon />}
          className={gridAreas.activeNow}
        />
        <Card sx={{ gap: "#4" }} className={gridAreas.chart}>
          <div>
            <Text variant="h5">Overview</Text>
            <Text>&nbsp;</Text>
          </div>
          <Chart data={data.revenueOverTime} />
        </Card>
        <Card sx={{ gap: "#4", px: 0 }} className={gridAreas.recentSales}>
          <Box sx={{ px: "#5" }}>
            <Text variant="h5">Recent Sales</Text>
            <Text>You made {data.yourSalesThisMonth} sales this month.</Text>
          </Box>
          <RecentSaleList data={data.recentSales} />
        </Card>
      </div>
    </>
  );
}

const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ variant: "h1", sx: { lineHeight: 1 } });
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
