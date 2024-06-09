import {
  GridAreas,
  atoms,
  breakpointQuery,
  globalStyle,
  style,
} from "@yas/style";

const grid = new GridAreas([
  "totalRevenue",
  "subscriptions",
  "sales",
  "activeNow",
  "chart",
  "recentSales",
]);

export const gridContainer = style([
  atoms({
    display: "grid",
    width: "100%",
    gap: "l",
  }),
  {
    gridAutoColumns: "1fr",
    gridAutoRows: "fit-content(1fr)",
    "@media": {
      [breakpointQuery.down("s")]: {
        gridTemplateAreas: grid.template(),
      },
      [breakpointQuery.between("s", "m")]: {
        gridTemplateAreas: grid.template([
          ["totalRevenue", "subscriptions"],
          ["sales", "activeNow"],
          ["chart", "chart"],
          ["recentSales", "recentSales"],
        ]),
      },
      [breakpointQuery.up("m")]: {
        gridTemplateAreas: grid.template([
          ["totalRevenue", "subscriptions", "sales", "activeNow"],
          ["chart", "chart", "recentSales", "recentSales"],
        ]),
      },
    },
  },
]);

export const gridAreas = grid.createClassNames();

for (const className of Object.values(gridAreas)) {
  globalStyle(className, {
    boxSizing: "border-box",
  });
}

// grid row height doesn't work properly in safari, so we need to ensure minimum heights
globalStyle(gridAreas.totalRevenue, { minHeight: 138.5 });
globalStyle(gridAreas.subscriptions, { minHeight: 138.5 });
globalStyle(gridAreas.sales, { minHeight: 138.5 });
globalStyle(gridAreas.activeNow, { minHeight: 138.5 });
globalStyle(gridAreas.chart, { minHeight: 300 });
globalStyle(gridAreas.recentSales, { minHeight: 394 });
