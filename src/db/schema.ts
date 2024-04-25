import {
  index,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const userTable = pgTable(
  "USER",
  {
    id: serial("id").primaryKey(),
    username: varchar("username", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);