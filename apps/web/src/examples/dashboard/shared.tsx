import { styled } from "@yas/style";
import { Paper } from "@yas/ui";
import { card } from "./shared.css";

export const Card = styled(Paper).attrs({ elevation: 0, className: card });

const maxFractions = 0;

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxFractions,
  }).format(value);
}

export function formatNumber(
  value: number,
  formats: Array<"sign" | "currency">,
) {
  let output = formats.includes("currency")
    ? formatCurrency(value)
    : value.toFixed(maxFractions);
  if (formats.includes("sign")) {
    output = sign(value) + output;
  }
  return output;
}

export function sign(value: number) {
  if (value === 0) {
    return "";
  }
  return value > 0 ? `+` : `-`;
}
