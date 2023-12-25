import { unsafe } from "@yas/style";
import type { ComponentProps } from "react";
import type { BarProps } from "recharts";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { formatCurrency } from "./currency";

export function Chart(props: ComponentProps<typeof ResponsiveContainer>) {
  return (
    <ResponsiveContainer width="100%" height="100%" {...props}>
      <BarChart data={data}>
        <XAxis dataKey="name" style={textStyle} />
        <YAxis
          width={45}
          style={textStyle}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatCurrency(value, 0)}
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
const textStyle = {
  ...typography.body,
  fill: "currentColor",
};

const data = [
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
