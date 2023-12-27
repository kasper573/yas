import { z } from "@yas/validate";
import { t } from "../../definition/trpc";

const recentSaleSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  amount: z.number(),
  avatarUrl: z.string().url(),
});

const dashboardSchema = z.object({
  totalRevenue: z.number(),
  subscriptions: z.number(),
  sales: z.number(),
  activeNow: z.number(),
  activeSinceLastHour: z.number(),
  salesDeltaSinceLastMonth: z.number(),
  revenueDeltaSinceLastMonth: z.number(),
  subscriptionDeltaSinceLastMonth: z.number(),
  yourSalesThisMonth: z.number(),
  revenueOverTime: z.array(z.object({ name: z.string(), value: z.number() })),
  recentSales: z.array(recentSaleSchema),
});

export function createDashboardProcedure() {
  return t.procedure
    .input(z.date())
    .output(dashboardSchema)
    .query(({ input }) => {
      return {
        totalRevenue: 45231.89,
        revenueDeltaSinceLastMonth: 180.1,
        subscriptions: 2350,
        subscriptionDeltaSinceLastMonth: 19,
        sales: 12234,
        salesDeltaSinceLastMonth: 20.1,
        activeNow: 123,
        activeSinceLastHour: 201,
        yourSalesThisMonth: 265,
        revenueOverTime: [
          { name: "Jan", value: 3000 },
          { name: "Feb", value: 4500 },
          { name: "Mar", value: 2900 },
          { name: "Apr", value: 4000 },
          { name: "May", value: 5000 },
          { name: "Jun", value: 5200 },
          { name: "Jul", value: 1400 },
          { name: "Aug", value: 1300 },
          { name: "Sep", value: 4100 },
          { name: "Oct", value: 1350 },
          { name: "Nov", value: 5600 },
          { name: "Dec", value: 1337 },
        ],
        recentSales: [
          {
            name: "Olivia Martin",
            email: "olivia.martin@email.com",
            amount: 1999,
            avatarUrl: randomAvatarUrl(0),
          },
          {
            name: "Jackson Lee",
            email: "jackson.lee@email.com",
            amount: 39,
            avatarUrl: randomAvatarUrl(1),
          },
          {
            name: "Isabella Nguyen",
            email: "isabella.nguyen@email.com",
            amount: 299,
            avatarUrl: randomAvatarUrl(2),
          },
          {
            name: "William Kim",
            email: "will@email.com",
            amount: 99,
            avatarUrl: randomAvatarUrl(3),
          },
          {
            name: "Sofia Davis",
            email: "sofia.davis@email.com",
            amount: 39,
            avatarUrl: randomAvatarUrl(4),
          },
        ],
      };
    });
}

const randomAvatarUrl = (index: number) =>
  `https://picsum.photos/40/40?grayscale&random=${index}`;
