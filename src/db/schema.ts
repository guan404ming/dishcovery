import { index, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    username: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

export const bannerTable = pgTable("banners", {
  id: serial("id").primaryKey(),
  url: varchar("url").notNull(),
});
