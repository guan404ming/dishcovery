import type { 
    userTable, 
    bannerTable, 
    cartTable, 
    commentTable, 
    categoryCollectionTable, 
    storeTable, 
    dishTable,
    storeReservationTable,
    storeCollectionTable,
    postTable,
    postDishTable,
    postReservationTable
} from "@/db/schema";

export type SelectUser = typeof userTable.$inferSelect;

export type SelectCart = typeof cartTable.$inferSelect;

export type SelectComment = typeof commentTable.$inferSelect;

export type SelectBanner = typeof bannerTable.$inferSelect;

export type SelectCategoryCollection = typeof categoryCollectionTable.$inferSelect;

export type SelectStore = typeof storeTable.$inferSelect;

export type SelectDish = typeof dishTable.$inferSelect;

export type SelectStoreReservation = typeof storeReservationTable.$inferSelect;

export type SelectStoreCollection = typeof storeCollectionTable.$inferSelect;

export type SelectPost = typeof postTable.$inferSelect;

export type SelectPostDish = typeof postDishTable.$inferSelect;

export type SelectPostReservation = typeof postReservationTable.$inferSelect;
