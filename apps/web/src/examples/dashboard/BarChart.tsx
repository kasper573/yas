import type { HTMLAttributes } from "react";
import { Box, Stack, Text } from "@yas/ui";
import { styled } from "@yas/style";

export const BarChart = styled(BarChartImpl);

function BarChartImpl(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <Stack direction="row" align="stretch" gap="#2" {...props}>
      <div>
        {yOrdered.map((value, index) => (
          <Text key={index} style={{ bottom: percentage(value) }}>
            ${value}
          </Text>
        ))}
      </div>
      {x.map(({ name, value }, index) => (
        <Stack direction="column" align="center" key={index}>
          <div style={{ flex: 1 }} />
          <Box
            sx={{
              background: "primary.base.main",
              width: "100%",
              borderRadius: "#1",
              height: percentage(value),
            }}
          />
          <Text>{name}</Text>
        </Stack>
      ))}
    </Stack>
  );
}

function percentage(value: number) {
  return `${(value / yMax) * 100}%`;
}

const x = [
  { name: "Jan", value: 3000 },
  { name: "Feb", value: 4500 },
  { name: "Mar", value: 2900 },
  { name: "Apr", value: 4000 },
  { name: "May", value: 5000 },
  { name: "Jun", value: 5200 },
  { name: "Jul", value: 1400 },
  { name: "Aug", value: 1300 },
  { name: "Sep", value: 4100 },
  { name: "Oct", value: 1350 },
  { name: "Nov", value: 5600 },
  { name: "Dec", value: 1337 },
];

const y = [0, 1500, 3000, 4500, 6000];
const yMax = y.reduce((a, b) => Math.max(a, b), 0);
const yOrdered = y.toSorted().toReversed();
