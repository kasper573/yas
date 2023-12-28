import { unsafe } from "@yas/style";
import { type ComponentProps } from "react";
import type { BarProps } from "recharts";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useConsoleFilter } from "../../../hooks/useConsoleFilter";
import { formatCurrency } from "./shared";

export interface ChartProps extends ComponentProps<typeof ResponsiveContainer> {
  data: { name: string; value: number }[];
}

export function Chart({
  data,
  ...props
}: ComponentProps<typeof ResponsiveContainer>) {
  useConsoleFilter(isValidRechartsWarning);
  return (
    <ResponsiveContainer width="100%" height="100%" {...props}>
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

function isValidRechartsWarning(...args: unknown[]) {
  // recharts handles react Suspense improperly and throws an invalid warning that we can ignore
  return !args
    .join(" ")
    .includes("The width(0) and height(0) of chart should be greater than 0");
}

const { radii } = unsafe.tokens;
const { typography, color } = unsafe.vars;
const barRadius = [radii["#1"], radii["#1"], 0, 0] satisfies BarProps["radius"];

const textStyle = (name: keyof typeof typography) => ({
  ...typography[name],
  fill: "currentColor",
});
