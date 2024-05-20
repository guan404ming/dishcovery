import { StoreReservationCard } from "../_components/store-reservation-card";
import { eq } from "drizzle-orm";

import GridContainer from "@/components/grid-container";
import StoreDish from "@/components/image-card/store-dish";
import { db } from "@/db";
import { storeDishes, storeReservations, users } from "@/db/schema";
import NotFoundPage from "@/app/not-found";

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
    .innerJoin(storeDishes, eq(storeDishes.id, storeReservations.storeDishId));

  return (
    <>
      <StoreDish storeDish={dish} isAuthor isCounter />

      <h1 className="text-xl font-semibold">
        Reservation({reservationList.length})
      </h1>

      <GridContainer>
        {reservationList.map((reservation, index) => (
          <StoreReservationCard
            key={index}
            {...reservation.storeReservations}
            name={reservation.users.name}
          />
        ))}
      </GridContainer>
    </>
  );
}
