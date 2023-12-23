import { Text } from "@yas/ui";
import type { ReactNode } from "react";
import { Outlined } from "./Shared";
import { Stack } from "./Dashboard";

export function Stats({
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
    <Outlined sx={{ p: "#5" }}>
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
    </Outlined>
  );
}
