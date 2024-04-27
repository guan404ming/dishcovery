import type { userTable, bannerTable } from "@/db/schema";

export type SelectUser = typeof userTable.$inferSelect;

export type SelectBanner = typeof bannerTable.$inferSelect;
