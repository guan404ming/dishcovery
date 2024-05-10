import { relations } from "drizzle-orm";
import {
  index,
  integer,
  pgTable,
  pgEnum,
  serial,
  timestamp,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "waiting",
  "confirmed",
  "finished",
  "cancelled",
]);

// user
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 50 }).notNull(),
    role: varchar("role", { enum: ["admin", "user"] }).notNull(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  categoryCollections: many(categoryCollections),
}));

export const carts = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
  dishId: serial("dish_id")
    .notNull()
    .references(() => storeDishes.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  storeId: serial("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
});

export const banners = pgTable("banners", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  url: varchar("url").notNull(),
  createTime: timestamp("create_time").defaultNow().notNull(),
});

// store
export const stores = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  address: varchar("address").notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const storeDishes = pgTable("store_dishes", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull().default(1),
  categoryId: serial("category_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  storeId: serial("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  description: varchar("description", { length: 100 }).notNull(),
});

export const storeReservations = pgTable("store_reservations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
  storeId: serial("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  storeDishId: serial("store_dish_id")
    .notNull()
    .references(() => storeDishes.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  status: statusEnum("status").notNull().default("waiting"),
});

// post
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 100 }).notNull(),
  createTime: timestamp("create_time").defaultNow().notNull(),
  lastUpdateTime: timestamp("last_update_time").defaultNow().notNull(),
  location: varchar("location", { length: 50 }).notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const postDishes = pgTable("post_dishes", {
  id: serial("id").primaryKey(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  categoryId: serial("category_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
});

export const postReservations = pgTable("post_reservations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
  postId: serial("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  dishId: serial("dish_id")
    .notNull()
    .references(() => postDishes.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  status: statusEnum("status").notNull().default("waiting"),
});

// collection
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  categoryCollections: many(categoryCollections),
}));

export const categoryCollections = pgTable(
  "category_collections",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.categoryId] }),
  }),
);

export const userToCategoryRelations = relations(
  categoryCollections,
  ({ one }) => ({
    category: one(categories, {
      fields: [categoryCollections.categoryId],
      references: [categories.id],
    }),
    user: one(users, {
      fields: [categoryCollections.userId],
      references: [users.id],
    }),
  }),
);
