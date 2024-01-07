import { unsafe } from "@yas/style";
import type { BarProps } from "recharts";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { Bounds } from "@yas/ui";
import { formatCurrency } from "./shared";

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
            width={45}
            style={textStyle("body")}
            axisLine={false}
            tickLine={false}
            tickFormatter={formatCurrency}
          />
          <Bar
            dataKey="value"
            fill={color.primary.base.main}
            radius={barRadius}
          />
        </BarChart>
      )}
    </Bounds>
  );
}

const { radii } = unsafe.tokens;
const { typography, color } = unsafe.vars;
const barRadius = [radii["#1"], radii["#1"], 0, 0] satisfies BarProps["radius"];

const textStyle = (name: keyof typeof typography) => ({
  ...typography[name],
  fill: "currentColor",
});
