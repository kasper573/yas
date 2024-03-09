import { Box, Skeleton, Text } from "@yas/ui";
import {
  RocketIcon,
  PersonIcon,
  CardStackIcon,
  BarChartIcon,
} from "@yas/icons";
import type { types } from "@yas/api-client";
import { api } from "@yas/api-client";
import { Card, formatNumber, formatCurrency } from "../shared";
import { RecentSaleList } from "./RecentSaleList";
import { StatsCard } from "./Stats";
import { gridAreas, gridContainer } from "./OverviewContent.css";
import { Chart } from "./Chart";

export function DashboardContent({
  filter,
}: {
  filter: types.example.DashboardFilter;
}) {
  const [data] = api.example.dashboard.useSuspenseQuery(filter);
  return (
    <div className={gridContainer}>
      <StatsCard
        title="Total Revenue"
        amount={formatCurrency(data.totalRevenue)}
        description={`${formatNumber(data.revenueDeltaSinceLastMonth, [
          "sign",
          "currency",
        ])}% from last month`}
        icon={<RocketIcon />}
        className={gridAreas.totalRevenue}
      />
      <StatsCard
        title="Subscriptions"
        amount={formatNumber(data.subscriptions, ["sign"])}
        description={`${formatNumber(data.subscriptionDeltaSinceLastMonth, [
          "sign",
        ])}% from last month`}
        icon={<PersonIcon />}
        className={gridAreas.subscriptions}
      />
      <StatsCard
        title="Sales"
        amount={formatNumber(data.sales, ["sign"])}
        description={`${formatNumber(data.salesDeltaSinceLastMonth, [
          "sign",
        ])}% from last month`}
        icon={<CardStackIcon />}
        className={gridAreas.sales}
      />
      <StatsCard
        title="Active Now"
        amount={formatNumber(data.activeNow, ["sign"])}
        description={`${formatNumber(data.activeSinceLastHour, [
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
          <Text>{data.yourSalesThisMonth.toFixed(0)} sales this month.</Text>
        </Box>
        <RecentSaleList data={data.recentSales} />
      </Card>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className={gridContainer}>
      {Object.values(gridAreas).map((className, index) => (
        <Skeleton key={index} className={className} />
      ))}
    </div>
  );
}
