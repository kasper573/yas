import { breakpointQuery, style } from "@yas/style";

export const container = style({
  margin: "auto",
  width: "100%",
  boxSizing: "border-box",
  "@media": Object.fromEntries(
    breakpointQuery.ranges.map(([name, [minWidth, maxWidth = minWidth]]) => [
      breakpointQuery.only(name),
      { maxWidth },
    ]),
  ),
});
