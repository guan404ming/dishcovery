import type * as schema from "@/db/schema";

export type SelectUser = typeof schema.users.$inferSelect;

export type SelectCart = typeof schema.carts.$inferSelect;

export type SelectBanner = typeof schema.banners.$inferSelect;

export type SelectCategoryCollection =
  typeof schema.categoryCollections.$inferSelect;

// store

export type SelectStore = typeof schema.stores.$inferSelect;

export type SelectStoreDish = typeof schema.storeDishes.$inferSelect;

export type SelectStoreReservation =
  typeof schema.storeReservations.$inferSelect;

// post

export type SelectPost = typeof schema.posts.$inferSelect;
export type InsertPost = typeof schema.posts.$inferInsert;

export type SelectPostDish = typeof schema.postDishes.$inferSelect;
export type InsertPostDish = typeof schema.postDishes.$inferInsert;

export type SelectPostReservation = typeof schema.postReservations.$inferSelect;
export type InsertPostReservation = typeof schema.postReservations.$inferInsert;
