import { Stack, Text } from "@yas/ui";
import type { ReactNode } from "react";
import {
  RocketIcon,
  PersonIcon,
  CardStackIcon,
  BarChartIcon,
} from "@yas/icons";
import { Card, formatCurrency } from "./shared";

export function StatsRow() {
  return (
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
  );
}

function StatsCard({
  title,
  amount,
  description,
  icon,
}: {
  title: ReactNode;
  amount: ReactNode;
  description: ReactNode;
  icon: ReactNode;
}) {
  return (
    <Card>
      <Stack
        direction="row"
        align="center"
        justify="spaceBetween"
        sx={{ flex: 1 }}
      >
        <Text variant="h5">{title}</Text>
        {icon}
      </Stack>
      <Text variant="h1">{amount}</Text>
      <Text variant="caption">{description}</Text>
    </Card>
  );
}
