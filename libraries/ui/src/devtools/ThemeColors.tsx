import { theme } from "@yas/style";
import type { ComponentProps } from "react";
import { useRef, type ReactNode, useEffect, useState } from "react";
import { Text } from "../components/Text";
import { Divider } from "../layout/Divider";
import { Box } from "../layout/Box";
import { Stack } from "../layout/Stack";
import { contrastColor } from "./Palette";

export function ThemeColors() {
  return <NodeView gap="xl" node={theme.color} />;
}

function NodeView({
  name,
  node,
  ...columnProps
}: {
  name?: string;
  node: ColorSetNode;
} & Pick<ComponentProps<typeof Stack>, "gap">): ReactNode {
  if (typeof node === "string") {
    return (
      <Stack
        direction="row"
        align="center"
        gap="s"
        sx={{ border: "thin", borderColor: "surface.face" }}
        style={{ background: node }}
      >
        <Text sx={{ px: "l", py: "m", margin: "auto" }}>
          <ContrastColor>{name}</ContrastColor>
        </Text>
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        border: "thin",
        borderColor: "surface.face",
        my: "l",
      }}
    >
      {name ? (
        <>
          <Text intent="label" sx={{ px: "xl", py: "s", margin: "auto" }}>
            {name}
          </Text>
          <Divider style={{ marginTop: 0 }} />
        </>
      ) : null}
      <Stack {...columnProps} sx={{ p: "l" }}>
        {Object.entries(node).map(([key, value], index) => (
          <NodeView key={index} name={key} node={value} />
        ))}
      </Stack>
    </Box>
  );
}

function ContrastColor({ children }: { children: ReactNode }) {
  const [color, setColor] = useState<string>();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (ref.current) {
      setColor(contrastColor(getBackgroundColor(ref.current)));
    }
  }, []);
  return (
    <span ref={ref} style={{ color }}>
      {children}
    </span>
  );
}

type Color = string;
type ColorSet = { [name: string]: ColorSetNode };
type ColorSetNode = Color | ColorSet;

function getBackgroundColor(element: HTMLElement) {
  const computedStyle = getComputedStyle(element);
  const backgroundColor = computedStyle.backgroundColor;

  if (
    backgroundColor !== "transparent" &&
    backgroundColor !== "rgba(0, 0, 0, 0)"
  ) {
    return backgroundColor;
  }

  if (element.parentElement) {
    return getBackgroundColor(element.parentElement);
  }

  return "#fff";
}
