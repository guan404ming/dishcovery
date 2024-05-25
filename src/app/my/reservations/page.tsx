import { getServerSession } from "next-auth/next";

import { eq, desc } from "drizzle-orm";
import { Receipt } from "lucide-react";

import UnauthorizedPage from "@/app/unauthorized";
import GridContainer from "@/components/grid-container";
import Reservation from "@/components/image-card/reservation";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import {
  postReservations,
  postDishes,
  storeReservations,
  storeDishes,
  posts,
  stores,
} from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyReservationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  const postReservationList = await db
    .select({
      postReservations,
      postDishes,
      posts,
    })
    .from(postReservations)
    .innerJoin(postDishes, eq(postReservations.postDishId, postDishes.id))
    .innerJoin(posts, eq(postDishes.postId, posts.id))
    .orderBy(desc(postReservations.createTime))
    .where(eq(postReservations.userId, session?.user.id));

  const uniquePosts = Array.from(
    new Map(
      postReservationList.map((reservation) => [
        reservation.posts.id,
        reservation.posts,
      ]),
    ).values(),
  );

  const storeReservationList = await db
    .select({
      storeReservations,
      storeDishes,
      stores,
    })
    .from(storeReservations)
    .innerJoin(storeDishes, eq(storeReservations.storeDishId, storeDishes.id))
    .innerJoin(stores, eq(storeDishes.storeId, stores.id))
    .orderBy(desc(storeReservations.createTime))
    .where(eq(storeReservations.userId, session?.user.id));

  const uniqueStores = Array.from(
    new Map(
      storeReservationList.map((reservation) => [
        reservation.storeDishes.storeId,
        reservation.stores,
      ]),
    ).values(),
  );

  if (postReservationList.length + storeReservationList.length === 0) {
    return (
      <div className="flex flex-grow flex-col items-center justify-center space-y-4 text-center text-xl font-semibold">
        <Receipt size={40} />
        <p>Reservations is empty</p>
      </div>
    );
  }

  return (
    <>
      {postReservationList.length > 0 && (
        <>
          <h1 className="text-xl font-semibold">Post Reservations</h1>
          {uniquePosts.map((post) => (
            <div
              key={post.id}
              className="space-y-4 rounded border p-5 shadow-sm"
            >
              <div className="text-lg font-semibold">{post.title}</div>
              <Separator />
              <GridContainer>
                {postReservationList.map(
                  (reservation, index) =>
                    reservation.posts.id === post.id && (
                      <Reservation
                        key={index}
                        dishQuantity={reservation.postDishes.quantity}
                        dishId={reservation.postDishes.id}
                        {...reservation.postDishes}
                        {...reservation.postReservations}
                        isPost={true}
                        sellerId={reservation.postDishes.postId}
                      />
                    ),
                )}
              </GridContainer>
            </div>
          ))}
        </>
      )}

      {storeReservationList.length > 0 && (
        <>
          <h1 className="text-xl font-semibold">Store Reservations</h1>
          {uniqueStores.map((store) => (
            <div
              key={store.id}
              className="space-y-4 rounded border p-5 shadow-sm"
            >
              <div className="text-lg font-semibold">{store.name}</div>
              <Separator />
              <GridContainer>
                {storeReservationList.map(
                  (reservation, index) =>
                    reservation.stores.id === store.id && (
                      <Reservation
                        key={index}
                        dishQuantity={reservation.storeDishes.quantity}
                        dishId={reservation.storeDishes.id}
                        {...reservation.storeDishes}
                        {...reservation.storeReservations}
                        isPost={false}
                        sellerId={reservation.storeDishes.storeId}
                      />
                    ),
                )}
              </GridContainer>
            </div>
          ))}
        </>
      )}
    </>
  );
}
