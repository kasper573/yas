import { styled } from "@yas/style";
import { Paper } from "@yas/ui";
import { card } from "./shared.css";

export const Card = styled(Paper).attrs({ elevation: "0", className: card });

export const formatCurrency = (value: number, maximumFractionDigits = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits,
  }).format(value);

export function todaysDate() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function formatOffset(value: number) {
  if (value === 0) {
    return "0";
  }
  return value > 0 ? `+${value}` : `-${value}`;
}
