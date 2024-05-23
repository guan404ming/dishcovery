import { eq, asc } from "drizzle-orm";

import NotFoundPage from "@/app/not-found";
import GridContainer from "@/components/grid-container";
import StoreDish from "@/components/image-card/store-dish";
import { ReservationActionCard } from "@/components/reservation-action-card";
import { db } from "@/db";
import { storeDishes, storeReservations, users } from "@/db/schema";

export default async function StoreDishPage({
  params: { storeDishId },
}: {
  params: {
    storeDishId: number;
  };
}) {
  const dish = await db.query.storeDishes.findFirst({
    where: eq(storeDishes.id, storeDishId),
  });

  if (!dish) {
    return <NotFoundPage />;
  }

  const reservationList = await db
    .select({
      storeReservations,
      storeDishes,
      users,
    })
    .from(storeReservations)
    .where(eq(storeReservations.storeDishId, storeDishId))
    .innerJoin(users, eq(users.id, storeReservations.userId))
    .innerJoin(storeDishes, eq(storeDishes.id, storeReservations.storeDishId))
    .orderBy(asc(storeReservations.status));

  return (
    <>
      <StoreDish storeDish={dish} isAuthor isCounter />

      <h1 className="text-xl font-semibold">
        Reservation({reservationList.length})
      </h1>

      <GridContainer>
        {reservationList.map((reservation, index) => (
          <ReservationActionCard
            key={index}
            {...reservation.storeReservations}
            name={reservation.users.name}
            isStore={true}
          />
        ))}
      </GridContainer>
    </>
  );
}
