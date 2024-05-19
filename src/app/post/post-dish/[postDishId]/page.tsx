import { eq } from "drizzle-orm";

import { PostReservationCard } from "@/app/post/post-dish/_components/post-reservation-card";
import PostDish from "@/components/image-card/post-dish";
import { db } from "@/db";
import { postDishes, postReservations, users } from "@/db/schema";

type ReservationPageProps = {
  params: {
    postDishId: number;
  };
};

export default async function ReservationPage({
  params: { postDishId },
}: ReservationPageProps) {
  const dish = await db.query.postDishes.findFirst({
    where: eq(postDishes.id, postDishId),
  });

  if (!dish) {
    return <div>Page Not Found</div>;
  }

  const reservationList = await db
    .select({
      postReservations,
      postDishes,
      users,
    })
    .from(postReservations)
    .where(eq(postReservations.postDishId, postDishId))
    .innerJoin(users, eq(users.id, postReservations.userId))
    .innerJoin(postDishes, eq(postDishes.id, postReservations.postDishId));

  return (
    <>
      <PostDish postDish={dish} isAuthor isCounter />

      <h1 className="text-xl font-semibold">
        Reservation({reservationList.length})
      </h1>

      <div className="flex flex-col space-y-2">
        {reservationList.map((reservation, index) => (
          <PostReservationCard
            key={index}
            name={reservation.users.name}
            {...reservation.postReservations}
          />
        ))}
      </div>
    </>
  );
}
