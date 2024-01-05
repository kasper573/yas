import { breakpointQueries, unsafe } from "@yas/style";

const { breakpoints } = unsafe.tokens;
const breakpointList = Object.entries(breakpoints);

export const container = unsafe.style({
  margin: "auto",
  width: "100%",
  boxSizing: "border-box",
  "@media": {
    ...Object.fromEntries(
      Object.entries(breakpointQueries(breakpoints)).map(([name, query]) => {
        const index = breakpointList.findIndex(([n]) => n === name);
        const current = breakpointList[index]?.[1];
        const next = index !== -1 ? breakpointList[index + 1]?.[1] : undefined;
        return [query, { maxWidth: next ?? current }];
      }),
    ),
  },
});
