import { getServerSession } from "next-auth/next";

import { ReservationCard } from "../_components/reservation-card";
import { eq } from "drizzle-orm";

import GridContainer from "@/components/grid-container";
import { db } from "@/db";
import {
  postReservations,
  postDishes,
  storeReservations,
  storeDishes,
} from "@/db/schema";
import { authOptions } from "@/lib/auth-options";

export default async function MyReservations() {
  const session = await getServerSession(authOptions);
  if (!session) return <div>Unauthorized</div>;

  const postReservationList = await db
    .select({
      postReservations,
      postDishes,
    })
    .from(postReservations)
    .innerJoin(postDishes, eq(postReservations.postDishId, postDishes.id))
    .where(eq(postReservations.userId, session?.user.id));

  const storeReservationList = await db
    .select({
      storeReservations,
      storeDishes,
    })
    .from(storeReservations)
    .innerJoin(storeDishes, eq(storeReservations.storeDishId, storeDishes.id))
    .where(eq(storeReservations.userId, session?.user.id));

  return (
    <>
      {postReservationList.length > 0 && (
        <>
          <h1 className="text-xl font-semibold">Post Reservations</h1>
          <GridContainer>
            {postReservationList.map((reservation, index) => (
              <ReservationCard
                key={index}
                {...reservation.postDishes}
                {...reservation.postReservations}
                isPost={true}
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
              <ReservationCard
                {...reservation.storeDishes}
                {...reservation.storeReservations}
                isPost={false}
                key={index}
              />
            ))}
          </GridContainer>
        </>
      )}
    </>
  );
}
