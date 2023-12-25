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
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: "auto auto auto auto",
      },
      "(min-width: 1280px)": {
        gridTemplateAreas: grid.template([
          ["totalRevenue", "subscriptions", "sales", "activeNow"],
          ["chart", "chart", "recentSales", "recentSales"],
        ]),
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gridTemplateRows: "1fr auto",
      },
    },
  },
]);

export const gridAreas = grid.styles;
