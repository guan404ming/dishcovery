"use client";

import { Card } from "@/components/ui/card";

type ReservationCard = {
  productId: number;
  name: string;
  note: string;
  price: number;
  unit: number;
  time: string;
};

export function ReservationCard({
  name,
  note,
  price,
  unit,
  time,
}: ReservationCard) {
  return (
    <Card className="m-2 p-2 lg:m-4 lg:p-4">
      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-x-2 lg:gap-x-8">
            <p className="text-lg font-bold lg:text-2xl">{name}</p>
            <p className="text-md lg:text-lg">$ {price}</p>
          </div>
          <p className="text-md font-semibold lg:text-lg">{unit} 個</p>
        </div>
        <div className="text-md pt-2 font-normal text-muted-foreground lg:pt-4 lg:text-lg">
          {note.slice(0, 20)}...
        </div>
        <div className="text-md pt-2 text-end font-normal lg:pt-4 lg:text-lg">
          {time}
        </div>
      </div>
    </Card>
  );
}
