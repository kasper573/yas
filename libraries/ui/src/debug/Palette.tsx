import { tokens } from "@yas/design-system";
import { Stack } from "../layout/Stack";
import { Text } from "../components/Text";

interface PaletteProps {
  colorName?: keyof typeof tokens.palette;
}

export function Palette() {
  return (
    <Stack direction="row" align="center">
      {Object.keys(tokens.palette).map((colorName) => (
        <Color
          key={colorName}
          colorName={colorName as keyof typeof tokens.palette}
        />
      ))}
    </Stack>
  );
}

function Color({ colorName }: PaletteProps) {
  if (!colorName) {
    return null;
  }
  return (
    <Stack>
      <Text sx={{ textAlign: "center", p: "#2" }}>{colorName}</Text>
      {Object.entries(tokens.palette[colorName]).map(
        ([gradeName, gradeValue]) => (
          <Text
            key={gradeName}
            sx={{ py: "#2", px: "#5", textAlign: "center" }}
            style={{ background: gradeValue, color: contrastColor(gradeValue) }}
          >
            {gradeName}
          </Text>
        ),
      )}
    </Stack>
  );
}

function contrastColor(color: string) {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000" : "#fff";
}
