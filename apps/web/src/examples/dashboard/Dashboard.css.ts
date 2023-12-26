import { createGrid, globalStyle, style, unsafe } from "@yas/style";

const grid = createGrid(
  "totalRevenue",
  "subscriptions",
  "sales",
  "activeNow",
  "chart",
  "recentSales",
);

export const gridContainer = unsafe.style([
  style({
    display: "grid",
    width: "100%",
    gap: "#4",
    gridAutoColumns: "1fr",
    gridAutoRows: "fit-content(1fr)",
  }),
  {
    "@media": {
      "(max-width: 599px)": {
        gridTemplateAreas: grid.template(),
      },
      "(min-width: 600px)": {
        gridTemplateAreas: grid.template([
          ["totalRevenue", "subscriptions"],
          ["sales", "activeNow"],
          ["chart", "chart"],
          ["recentSales", "recentSales"],
        ]),
      },
      "(min-width: 1280px)": {
        gridTemplateAreas: grid.template([
          ["totalRevenue", "subscriptions", "sales", "activeNow"],
          ["chart", "chart", "recentSales", "recentSales"],
        ]),
      },
    },
  },
]);

export const gridAreas = grid.classNames;

for (const className of Object.values(grid.classNames)) {
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
globalStyle(gridAreas.recentSales, { minHeight: 425 });
