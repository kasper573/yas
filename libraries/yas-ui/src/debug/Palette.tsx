import { unsafe } from "@yas/style";
import { Stack } from "../layout/Stack";
import { Text } from "../atoms/Text";

interface PaletteProps {
  colorName?: keyof typeof unsafe.tokens.palette;
}

export function Palette({ colorName }: PaletteProps) {
  if (!colorName) {
    return null;
  }
  return (
    <Stack>
      <Text sx={{ textAlign: "center", p: "#2" }}>{colorName}</Text>
      {Object.entries(unsafe.tokens.palette[colorName]).map(
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
