import { unsafe } from "@yas/style";
import type { ReactNode } from "react";
import { Stack } from "../layout/Stack";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";

interface ColorSetsProps {
  colorSetName?: unsafe.ColorSetName;
}

export function ColorSets() {
  return (
    <Stack direction="row">
      {unsafe.colorSetNames.map((colorSetName) => (
        <ColorSet key={colorSetName} colorSetName={colorSetName} />
      ))}
    </Stack>
  );
}

function ColorSet({ colorSetName }: ColorSetsProps) {
  if (!colorSetName) {
    return null;
  }
  const colorSet = unsafe.vars.color[colorSetName];
  return (
    <Stack align="center">
      <Text sx={{ textAlign: "center", p: "#2" }}>{String(colorSetName)}</Text>
      <Color background={colorSet.base.dark} color={colorSet.contrast.dark}>
        dark
      </Color>
      <Color background={colorSet.base.main} color={colorSet.contrast.main}>
        main
      </Color>
      <Color background={colorSet.base.light} color={colorSet.contrast.light}>
        light
      </Color>
      {colorSetName !== "surface" && (
        <Button color={colorSetName} sx={{ mt: "#2" }}>
          Click me
        </Button>
      )}
    </Stack>
  );
}

function Color({
  background,
  color,
  children,
}: {
  background: string;
  color: string;
  children?: ReactNode;
}) {
  return (
    <Text
      sx={{ py: "#2", px: "#5", textAlign: "center" }}
      style={{ background, color }}
    >
      {children}
    </Text>
  );
}
