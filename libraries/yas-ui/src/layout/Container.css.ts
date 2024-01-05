import { breakpointMediaQueries, unsafe } from "@yas/style";

const breakpointList = Object.entries(unsafe.tokens.breakpoints);

export const container = unsafe.style({
  margin: "auto",
  width: "100%",
  boxSizing: "border-box",
  "@media": {
    ...Object.fromEntries(
      Object.entries(breakpointMediaQueries).map(([name, query]) => {
        const index = breakpointList.findIndex(([n]) => n === name);
        const current = breakpointList[index]?.[1];
        const next = index !== -1 ? breakpointList[index + 1]?.[1] : undefined;
        return [query, { maxWidth: next ?? current }];
      }),
    ),
  },
});
