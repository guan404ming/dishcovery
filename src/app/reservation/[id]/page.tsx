import { eq } from "drizzle-orm";

import { ReservationCard } from "@/app/reservation/_components/reservation-card";
import { ReservationUpdate } from "@/app/reservation/_components/reservation-update";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { postDishes, postReservations, users } from "@/db/schema";

type ReservationPageProps = {
  params: {
    id: number;
  };
};

export default async function ReservationPage({
  params: { id },
}: ReservationPageProps) {
  const dish = await db.query.postDishes.findFirst({
    where: eq(postDishes.postId, id),
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
    .innerJoin(postDishes, eq(postReservations.postDishId, dish.id))
    .innerJoin(users, eq(postReservations.userId, users.id));

  const uniqueReservationsMap = new Map();
  reservationList.forEach((reservation) => {
    uniqueReservationsMap.set(reservation.postReservations.id, reservation);
  });
  const uniqueReservations = Array.from(uniqueReservationsMap.values());

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-x-4 pl-2 lg:p-4">
        <div className="flex flex-row items-center gap-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={dish.image as string} />
            <AvatarFallback>{dish.name.slice(0, 1) as string}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-md font-bold lg:text-lg">{dish.name}</p>
            <p className="text-md text-muted-foreground">$ {dish.price}</p>
          </div>
        </div>
        <ReservationUpdate {...dish} />
      </div>

      <Separator />

      <div className="flex flex-row items-center justify-between">
        <p className="text-lg font-bold lg:text-2xl">
          Reservation({uniqueReservations.length})
        </p>
      </div>

      <div className="flex flex-col space-y-2">
        {uniqueReservations.map((reservation, index) => (
          <div key={index} className="w-full">
            <ReservationCard
              id={reservation.postReservations.id}
              name={reservation.users?.name}
              price={reservation.postDishes.price}
              quantity={reservation.postReservations.quantity}
              status={reservation.postReservations.status}
            />
          </div>
        ))}
      </div>
    </>
  );
}
