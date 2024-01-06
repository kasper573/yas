import { IconButton, Stack, Text } from "@yas/ui";
import { Cross1Icon } from "@yas/icons";
import type { ReactNode } from "react";

export function Title({
  children,
  onClear,
}: {
  children?: ReactNode;
  onClear?: () => void;
}) {
  return (
    <Stack direction="row" gap="#2" align="center">
      <Text variant="h1" sx={{ lineHeight: 1 }}>
        {children}
      </Text>
      {onClear ? (
        <IconButton
          color="primary"
          variant="outlined"
          onClick={() => onClear?.()}
        >
          <Cross1Icon />
        </IconButton>
      ) : null}
    </Stack>
  );
}
