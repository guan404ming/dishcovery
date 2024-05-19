import { StoreReservationCard } from "../_components/store-reservation-card";
import { eq } from "drizzle-orm";

import StoreDish from "@/app/my/_components/store-dish";
import GridContainer from "@/components/grid-container";
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
    return <div>Page Not Found</div>;
  }

  const reservationList = await db
    .select()
    .from(storeReservations)
    .where(eq(storeReservations.storeDishId, storeDishId))
    .innerJoin(users, eq(users.id, storeReservations.userId))
    .innerJoin(storeDishes, eq(storeDishes.id, storeReservations.storeDishId));

  console.log(reservationList);

  return (
    <>
      <StoreDish storeDish={dish} />

      <h1 className="text-xl font-semibold">
        Reservation({reservationList.length})
      </h1>

      <GridContainer>
        {reservationList.map((reservation, index) => (
          <StoreReservationCard
            key={index}
            {...reservation.store_reservations}
            name={reservation.users.name}
          />
        ))}
      </GridContainer>
    </>
  );
}
