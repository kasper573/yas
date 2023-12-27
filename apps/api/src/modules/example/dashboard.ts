import { z } from "@yas/validate";
import { t } from "../../definition/trpc";
import { dashboardSchema } from "./types";

export function createDashboardProcedure() {
  return t.procedure
    .input(z.date())
    .output(dashboardSchema)
    .query(({ input }) => {
      const rand = createSeededRandom(input.toISOString());
      return {
        totalRevenue: rand() * 45231.89,
        revenueDeltaSinceLastMonth: rand() * 180.1,
        subscriptions: rand() * 2350,
        subscriptionDeltaSinceLastMonth: rand() * 19,
        sales: rand() * 12234,
        salesDeltaSinceLastMonth: rand() * 20.1,
        activeNow: rand() * 123,
        activeSinceLastHour: rand() * 201,
        yourSalesThisMonth: rand() * 265,
        revenueOverTime: [
          { name: "Jan", value: rand() * 3000 },
          { name: "Feb", value: rand() * 4500 },
          { name: "Mar", value: rand() * 2900 },
          { name: "Apr", value: rand() * 4000 },
          { name: "May", value: rand() * 5000 },
          { name: "Jun", value: rand() * 5200 },
          { name: "Jul", value: rand() * 1400 },
          { name: "Aug", value: rand() * 1300 },
          { name: "Sep", value: rand() * 4100 },
          { name: "Oct", value: rand() * 1350 },
          { name: "Nov", value: rand() * 5600 },
          { name: "Dec", value: rand() * 1337 },
        ],
        recentSales: [
          {
            name: "Olivia Martin",
            email: "olivia.martin@email.com",
            amount: rand() * 1999,
            avatarUrl: randomAvatarUrl(0),
          },
          {
            name: "Jackson Lee",
            email: "jackson.lee@email.com",
            amount: rand() * 39,
            avatarUrl: randomAvatarUrl(1),
          },
          {
            name: "Isabella Nguyen",
            email: "isabella.nguyen@email.com",
            amount: rand() * 299,
            avatarUrl: randomAvatarUrl(2),
          },
          {
            name: "William Kim",
            email: "will@email.com",
            amount: rand() * 99,
            avatarUrl: randomAvatarUrl(3),
          },
          {
            name: "Sofia Davis",
            email: "sofia.davis@email.com",
            amount: rand() * 39,
            avatarUrl: randomAvatarUrl(4),
          },
        ],
      };
    });
}

const randomAvatarUrl = (index: number) =>
  `https://picsum.photos/40/40?grayscale&random=${index}`;

function createSeededRandom(seedStr: string) {
  let seed = Array.from(seedStr).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  return () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}
