import { Button, Stack, Text } from "@yas/ui";
import { Cross1Icon } from "@yas/icons";
import type { ReactNode } from "react";

export function Title({
  children,
  showClearButton,
  onClear,
}: {
  children?: ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
}) {
  return (
    <Stack direction="row" gap="l" align="center">
      <Text intent="h3" compact>
        {children}
      </Text>
      {showClearButton ? (
        <Button round intent="outline" onClick={onClear}>
          <Cross1Icon />
        </Button>
      ) : null}
    </Stack>
  );
}
