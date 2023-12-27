import { z } from "@yas/validate";

export const recentSaleSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  amount: z.number(),
  avatarUrl: z.string().url(),
});

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
