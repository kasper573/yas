import { z } from "@yas/validate";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url(),
});

export const recentSaleSchema = userSchema.and(
  z.object({ amount: z.number() }),
);

export const dashboardSchema = z.object({
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
