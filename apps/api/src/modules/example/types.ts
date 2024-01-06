import { z } from "@yas/validate";

export type UserId = z.infer<typeof userIdType>;
export const userIdType = z.number().brand("userId");

export type User = z.infer<typeof userType>;

export const userType = z.object({
  id: userIdType,
  name: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().url(),
});

export const recentSaleType = userType.and(z.object({ amount: z.number() }));

export const dashboardType = z.object({
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
  recentSales: z.array(recentSaleType),
});
