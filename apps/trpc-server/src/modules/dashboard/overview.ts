import { t } from "../../definition/trpc";
import type { RecentSale } from "./types";
import { dashboardFilterType, dashboardType } from "./types";
import { createSeededRandom } from "./random";

export function createOverviewProcedure() {
  return t.procedure
    .input(dashboardFilterType)
    .output(dashboardType)
    .query(async ({ input: { date, userId }, ctx }) => {
      const rand = createSeededRandom(userId + "_" + date.toISOString());
      const users = await ctx.userRepository.all();
      const selectedUser =
        userId !== undefined ? await ctx.userRepository.get(userId) : undefined;

      const recentSales = [1, 2, 3, 4, 5].map((): RecentSale => {
        const user =
          selectedUser ?? users[Math.round(rand() * (users.length - 1))];
        return {
          ...user,
          amount: rand() * 1999,
        };
      });

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
        recentSales,
      };
    });
}
