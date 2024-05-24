import { getServerSession } from "next-auth/next";

import { eq, desc } from "drizzle-orm";
import { Receipt } from "lucide-react";

import UnauthorizedPage from "@/app/unauthorized";
import GridContainer from "@/components/grid-container";
import Reservation from "@/components/image-card/reservation";
import { db } from "@/db";
import {
  postReservations,
  postDishes,
  storeReservations,
  storeDishes,
} from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyReservationsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return <UnauthorizedPage />;

  const postReservationList = await db
    .select({
      postReservations,
      postDishes,
    })
    .from(postReservations)
    .innerJoin(postDishes, eq(postReservations.postDishId, postDishes.id))
    .orderBy(desc(postReservations.createTime))
    .where(eq(postReservations.userId, session?.user.id));

  const storeReservationList = await db
    .select({
      storeReservations,
      storeDishes,
    })
    .from(storeReservations)
    .innerJoin(storeDishes, eq(storeReservations.storeDishId, storeDishes.id))
    .orderBy(desc(storeReservations.createTime))
    .where(eq(storeReservations.userId, session?.user.id));

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
          <GridContainer>
            {postReservationList.map((reservation, index) => (
              <Reservation
                key={index}
                dishQuantity={reservation.postDishes.quantity}
                dishId={reservation.postDishes.id}
                {...reservation.postDishes}
                {...reservation.postReservations}
                isPost={true}
                sellerId={reservation.postDishes.postId}
              />
            ))}
          </GridContainer>
        </>
      )}

      {storeReservationList.length > 0 && (
        <>
          <h1 className="text-xl font-semibold">Store Reservations</h1>
          <GridContainer>
            {storeReservationList.map((reservation, index) => (
              <Reservation
                dishQuantity={reservation.storeDishes.quantity}
                dishId={reservation.storeDishes.id}
                {...reservation.storeDishes}
                {...reservation.storeReservations}
                isPost={false}
                key={index}
                sellerId={reservation.storeDishes.storeId}
              />
            ))}
          </GridContainer>
        </>
      )}
    </>
  );
}
