import {
  index,
  integer,
  pgTable,
  pgEnum,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "waiting",
  "confirmed",
  "finished",
  "cancelled",
]);
export const categoryEnum = pgEnum("category", [
  "taiwanese",
  "japanese",
  "american",
  "healthy meal",
  "pastry",
  "fruit",
]);

// user
export const userTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 50 }).notNull().unique(),
    name: varchar("name", { length: 50 }).notNull(),
    role: varchar("role", { enum: ["Admin", "User"] }).notNull(),
  },
  (table) => ({
    emailIndex: index("email_index").on(table.email),
  }),
);

export const cartTable = pgTable("carts", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
  dishId: serial("dish_id")
    .notNull()
    .references(() => dishTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  storeId: serial("store_id")
    .notNull()
    .references(() => storeTable.id, { onDelete: "cascade" }),
});

export const commentTable = pgTable(
  "comments",
  {
    id: serial("id").primaryKey(),
    content: varchar("comment_content", { length: 200 }).notNull(),
    createTime: timestamp("create_time").defaultNow().notNull(),
    lastUpdateTime: timestamp("last_update_time").defaultNow().notNull(),
    userId: serial("user_id")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    postId: serial("post_id")
      .notNull()
      .references(() => postTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    userIdIndex: index("user_id_index").on(table.userId),
    postIdIndex: index("post_id_index").on(table.postId),
  }),
);

export const bannerTable = pgTable("banners", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  url: varchar("url").notNull(),
  createTime: timestamp("create_time").defaultNow().notNull(),
});

export const categoryCollectionTable = pgTable("post_collections", {
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  category: categoryEnum("category").notNull(),
});

// store
export const storeTable = pgTable("stores", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull(),
  address: varchar("address", { length: 50 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const dishTable = pgTable("dishes", {
  id: serial("id").primaryKey(),
  quantity: integer("quantity").notNull().default(1),
  category: categoryEnum("category").notNull(),
  storeId: serial("store_id")
    .notNull()
    .references(() => storeTable.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  price: integer("price").notNull(),
  description: varchar("description", { length: 100 }).notNull(),
});

export const storeReservationTable = pgTable("store_reservations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
  storeId: serial("store_id")
    .notNull()
    .references(() => storeTable.id, { onDelete: "cascade" }),
  dishId: serial("dish_id")
    .notNull()
    .references(() => dishTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  status: statusEnum("status").notNull().default("waiting"),
});

export const storeCollectionTable = pgTable("store_collections", {
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  storeId: serial("store_id")
    .notNull()
    .references(() => storeTable.id, { onDelete: "cascade" }),
});

// post
export const postTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 50 }).notNull(),
  description: varchar("description", { length: 100 }).notNull(),
  createTime: timestamp("create_time").defaultNow().notNull(),
  lastUpdateTime: timestamp("last_update_time").defaultNow().notNull(),
  location: varchar("location", { length: 50 }).notNull(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const postDishTable = pgTable("post_dishes", {
  id: serial("id").primaryKey(),
  postId: serial("post_id")
    .notNull()
    .references(() => postTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  category: categoryEnum("category").notNull(),
  dishName: varchar("dishName", { length: 100 }).notNull(),
});

export const postReservationTable = pgTable("post_reservations", {
  id: serial("id").primaryKey(),
  userId: serial("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
  createTime: timestamp("create_time").defaultNow().notNull(),
  postId: serial("post_id")
    .notNull()
    .references(() => postTable.id, { onDelete: "cascade" }),
  dishId: serial("dish_id")
    .notNull()
    .references(() => postDishTable.id, { onDelete: "cascade" }),
  quantity: integer("quantity").notNull().default(1),
  status: statusEnum("status").notNull().default("waiting"),
});
