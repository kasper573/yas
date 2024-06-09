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
        sx={{ flex: 1 }}
      >
        <Text intent="h5" inline>
          {title}
        </Text>
        {icon}
      </Stack>
      <Text intent="h1" inline>
        {amount}
      </Text>
      <Text intent="caption" inline>
        {description}
      </Text>
    </Card>
  );
}
