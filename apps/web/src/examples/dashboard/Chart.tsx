import { unsafe } from "@yas/style";
import { type ComponentProps } from "react";
import type { BarProps } from "recharts";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { formatCurrency } from "./shared";

export interface ChartProps
  extends Omit<ComponentProps<typeof ResponsiveContainer>, "data"> {
  data: { name: string; value: number }[];
}

export function Chart({ data, ...props }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%" minWidth={0} {...props}>
      <BarChart data={data}>
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
    </ResponsiveContainer>
  );
}

const { radii } = unsafe.tokens;
const { typography, color } = unsafe.vars;
const barRadius = [radii["#1"], radii["#1"], 0, 0] satisfies BarProps["radius"];

const textStyle = (name: keyof typeof typography) => ({
  ...typography[name],
  fill: "currentColor",
});
