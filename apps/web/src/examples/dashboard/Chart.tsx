import type { BarProps } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { Bounds } from "@yas/ui";
import { cssForTypography, theme } from "@yas/style";
import { tokens } from "@yas/design-tokens";
import { formatCurrency } from "../shared";

export interface ChartProps {
  data: { name: string; value: number }[];
}

export function Chart({ data }: ChartProps) {
  return (
    <Bounds>
      {({ width, height }) => (
        <BarChart width={width} height={height} data={data}>
          <XAxis
            dataKey="name"
            style={textStyle("caption")}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            width={48}
            style={textStyle("caption")}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
          />
          <Bar dataKey="value" fill={color.primary.base} radius={barRadius} />
        </BarChart>
      )}
    </Bounds>
  );
}

const { radius, typography } = tokens;
const { color } = theme;
const barRadius = [radius["s"], radius["s"], 0, 0] satisfies BarProps["radius"];

const textStyle = (name: keyof typeof typography) => ({
  ...cssForTypography(name),
  fill: "currentColor",
});
