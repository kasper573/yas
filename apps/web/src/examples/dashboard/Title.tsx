import { IconButton, Stack, Text } from "@yas/ui";
import { Cross1Icon } from "@yas/icons";
import type { ReactNode } from "react";

export function Title({
  children,
  onClearSearch,
}: {
  children?: ReactNode;
  onClearSearch?: () => void;
}) {
  return (
    <Stack direction="row" gap="#2" align="center">
      <Text variant="h1" sx={{ lineHeight: 1 }}>
        {children}
      </Text>
      {onClearSearch ? (
        <IconButton
          color="primary"
          variant="outlined"
          onClick={() => onClearSearch?.()}
        >
          <Cross1Icon />
        </IconButton>
      ) : null}
    </Stack>
  );
}
