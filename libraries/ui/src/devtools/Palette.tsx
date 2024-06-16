import { keysOf, tokens } from "@yas/design-tokens";
import { Text } from "../components/Text";
import { Stack } from "../layout/Stack";

interface PaletteProps {
  name?: keyof tokens.Color;
}

export function Palette() {
  return (
    <Stack direction="row" align="center">
      {keysOf(tokens.color).map((name) => (
        <Color key={name} name={name} />
      ))}
    </Stack>
  );
}

function Color({ name }: PaletteProps) {
  if (!name) {
    return null;
  }
  return (
    <div>
      <Text sx={{ p: "m" }} style={{ textAlign: "center" }}>
        {name}
      </Text>
      {Object.entries(tokens.color[name]).map(([gradeName, gradeValue]) => (
        <Text
          key={gradeName}
          sx={{ py: "m", px: "xl" }}
          style={{
            textAlign: "center",
            backgroundColor: gradeValue,
            color: contrastColor(gradeValue),
          }}
        >
          {gradeName}
        </Text>
      ))}
    </div>
  );
}

export function contrastColor(color: string) {
  let r: number, g: number, b: number;

  if (color.startsWith("#")) {
    const hex = color.slice(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match && match.length >= 3) {
      r = parseInt(match[0]);
      g = parseInt(match[1]);
      b = parseInt(match[2]);
    } else {
      throw new Error("Invalid RGB color format");
    }
  } else {
    throw new Error("Unsupported color format");
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.4 ? "#000" : "#fff";
}
