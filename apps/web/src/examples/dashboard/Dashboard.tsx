import { styled } from "@yas/style";
import {
  Box,
  DatePicker,
  Divider,
  Link,
  Skeleton,
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
import { Card, format, formatCurrency } from "./shared";
import { StatsCard } from "./Stats";
import { gridAreas, gridContainer } from "./Dashboard.css";
import { Chart } from "./Chart";
import { todaysDate } from "./shared";

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
        <Tabs variant="contained" sx={{ flex: 1 }}>
          {secondaryNav.map((label, index) => (
            <TabItem asChild key={index} active={index === 0}>
              <Link>{label}</Link>
            </TabItem>
          ))}
        </Tabs>
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent dateFilter={dateFilter} />
        </Suspense>
      </Stack>
    </Card>
  );
}

function DashboardContent({ dateFilter }: { dateFilter: Date }) {
  const [data] = api.example.dashboard.useSuspenseQuery(dateFilter);
  return (
    <div className={gridContainer}>
      <StatsCard
        title="Total Revenue"
        amount={formatCurrency(data.totalRevenue)}
        description={`${format(data.revenueDeltaSinceLastMonth, [
          "sign",
          "currency",
        ])}% from last month`}
        icon={<RocketIcon />}
        className={gridAreas.totalRevenue}
      />
      <StatsCard
        title="Subscriptions"
        amount={format(data.subscriptions, ["sign"])}
        description={`${format(data.subscriptionDeltaSinceLastMonth, [
          "sign",
        ])}% from last month`}
        icon={<PersonIcon />}
        className={gridAreas.subscriptions}
      />
      <StatsCard
        title="Sales"
        amount={format(data.sales, ["sign"])}
        description={`${format(data.salesDeltaSinceLastMonth, [
          "sign",
        ])}% from last month`}
        icon={<CardStackIcon />}
        className={gridAreas.sales}
      />
      <StatsCard
        title="Active Now"
        amount={format(data.activeNow, ["sign"])}
        description={`${format(data.activeSinceLastHour, [
          "sign",
        ])} since last hour`}
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
          <Text>
            You made {data.yourSalesThisMonth.toFixed(0)} sales this month.
          </Text>
        </Box>
        <RecentSaleList data={data.recentSales} />
      </Card>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className={gridContainer}>
      {Object.values(gridAreas).map((className, index) => (
        <Skeleton key={index} className={className} />
      ))}
    </div>
  );
}

const Search = styled(Text).attrs({ children: "Search" });
const UserMenu = styled(Text).attrs({ children: "UserMenu" });
const Title = styled(Text).attrs({ variant: "h1", sx: { lineHeight: 1 } });
const Stack = styled(StackImpl).attrs({ gap: "#4" });

const OrganizationSelect = styled(Text).attrs({
  children: "OrganizationSelect",
});
