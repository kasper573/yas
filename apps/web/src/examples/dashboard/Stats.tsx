import { Stack, Text } from "@yas/ui";
import type { ComponentProps, ReactNode } from "react";
import { Card } from "../shared";

export function StatsCard({
  title,
  amount,
  description,
  icon,
  ...cardProps
}: {
  title: ReactNode;
  amount: ReactNode;
  description: ReactNode;
  icon: ReactNode;
} & Pick<ComponentProps<typeof Card>, "className" | "style" | "sx">) {
  return (
    <Card {...cardProps}>
      <Stack
        direction="row"
        align="center"
        justify="spaceBetween"
        sx={{ mb: "xl" }}
      >
        <Text intent="h5" inline>
          {title}
        </Text>
        {icon}
      </Stack>
      <Text intent="h2" inline sx={{ flex: 1 }}>
        {amount}
      </Text>
      <Text intent="caption" inline>
        {description}
      </Text>
    </Card>
  );
}
