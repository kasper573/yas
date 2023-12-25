import { createGrid, style, unsafe } from "@yas/style";

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
        height: 1450,
      },
      "(min-width: 600px)": {
        gridTemplateAreas: grid.template([
          ["totalRevenue", "subscriptions"],
          ["sales", "activeNow"],
          ["chart", "chart"],
          ["recentSales", "recentSales"],
        ]),
        height: 1150,
      },
      "(min-width: 1280px)": {
        gridTemplateAreas: grid.template([
          ["totalRevenue", "subscriptions", "sales", "activeNow"],
          ["chart", "chart", "recentSales", "recentSales"],
        ]),
        height: 580,
      },
    },
  },
]);

export const gridAreas = grid.styles;
