import { Stack, Text } from "@yas/ui";
import type { ReactNode } from "react";
import { Card } from "./shared";

export function StatsCard({
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
