"use client";

import ImageCard from "@/components/supplier/image-card";
import type { SelectPostDish, SelectPostReservation } from "@/lib/type";

export function ReservationCard({
  reservation,
  isCounter,
}: {
  reservation: {
    postReservations: SelectPostReservation;
    postDishes: SelectPostDish;
  };
  isCounter?: boolean;
}) {
  return (
    <ImageCard isCounter={isCounter} href="#">
      <div className="mb-1 flex items-baseline space-x-3">
        <div className="text-lg font-semibold">
          {reservation.postDishes.name}
        </div>
        <div className="text-xs font-light text-muted-foreground">
          $
          {reservation.postDishes.price * reservation.postReservations.quantity}
        </div>
      </div>
      <span className="w-full overflow-hidden text-ellipsis text-wrap text-xs font-normal text-muted-foreground">
        {reservation.postReservations.status}
      </span>
    </ImageCard>
  );
}
