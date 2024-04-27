import type { userTable } from "@/db/schema";

export type SelectUser = typeof userTable.$inferSelect;
