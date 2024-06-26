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
  doublePrecision,
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
  storeCollections: many(storeCollections),
  cart: many(carts),
}));

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
  image: varchar("image").notNull(),
  lat: doublePrecision("lat").notNull().default(10.0001),
  lng: doublePrecision("lng").notNull().default(10.0001),
});

export const storesRelations = relations(stores, ({ many }) => ({
  storeCollections: many(storeCollections),
  storeDishes: many(storeDishes),
}));

export const storeDishes = pgTable("store_dishes", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull().default(1),
  storeId: serial("store_id")
    .notNull()
    .references(() => stores.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  description: varchar("description", { length: 100 }).default("").notNull(),
  image: varchar("image").notNull(),
});

export const storeDishesRelation = relations(storeDishes, ({ many, one }) => ({
  cart: many(carts),
  store: one(stores, {
    fields: [storeDishes.storeId],
    references: [stores.id],
  }),
}));

export const storeReservations = pgTable("store_reservations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
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
  description: varchar("description", { length: 100 }).default("").notNull(),
  createTime: timestamp("create_time").defaultNow().notNull(),
  lastUpdateTime: timestamp("last_update_time").defaultNow().notNull(),
  location: varchar("location", { length: 50 }).notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  lat: doublePrecision("lat").notNull(),
  lng: doublePrecision("lng").notNull(),
});

export const postsRelations = relations(posts, ({ many }) => {
  return {
    postDishes: many(postDishes),
  };
});

export const postDishes = pgTable("post_dishes", {
  id: serial("id").primaryKey(),
  postId: serial("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  name: varchar("name", { length: 1000 }).notNull(),
  description: varchar("description", { length: 1000 }).default("").notNull(),
  price: integer("price").default(0).notNull(),
  image: varchar("image").notNull(),
});

export const postDishesRelations = relations(postDishes, ({ one, many }) => ({
  postCart: many(postCarts),
  post: one(posts, {
    fields: [postDishes.postId],
    references: [posts.id],
  }),
}));

export const postReservations = pgTable("post_reservations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
  postDishId: serial("dish_id")
    .notNull()
    .references(() => postDishes.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  status: statusEnum("status").notNull().default("waiting"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
});

export const categoryRelations = relations(categories, ({ many }) => ({
  categoryCollections: many(categoryCollections),
}));

// collection

export const categoryCollections = pgTable(
  "category_collections",
  {
    id: serial("id").unique(),
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

export const categoryCollectionsRelations = relations(
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

export const storeCollections = pgTable(
  "store_collections",
  {
    id: serial("id").unique(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    storeId: integer("store_id")
      .notNull()
      .references(() => stores.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.storeId] }),
  }),
);

export const storeCollectionsRelations = relations(
  storeCollections,
  ({ one }) => ({
    store: one(stores, {
      fields: [storeCollections.storeId],
      references: [stores.id],
    }),
    user: one(users, {
      fields: [storeCollections.userId],
      references: [users.id],
    }),
  }),
);

export const carts = pgTable(
  "carts",
  {
    id: serial("id"),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    storeDishId: integer("store_id")
      .notNull()
      .references(() => storeDishes.id),
    quantity: integer("quantity").notNull().default(1),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.storeDishId] }),
  }),
);

export const cartsRelations = relations(carts, ({ one }) => ({
  storeDish: one(storeDishes, {
    fields: [carts.storeDishId],
    references: [storeDishes.id],
  }),
  user: one(users, {
    fields: [carts.userId],
    references: [users.id],
  }),
}));

export const postCarts = pgTable(
  "post_carts",
  {
    id: serial("id"),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    postDishId: integer("post_dish_id")
      .notNull()
      .references(() => postDishes.id),
    quantity: integer("quantity").notNull().default(1),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.postDishId] }),
  }),
);

export const postCartsRelations = relations(postCarts, ({ one }) => ({
  postDish: one(postDishes, {
    fields: [postCarts.postDishId],
    references: [postDishes.id],
  }),
  user: one(users, {
    fields: [postCarts.userId],
    references: [users.id],
  }),
}));
