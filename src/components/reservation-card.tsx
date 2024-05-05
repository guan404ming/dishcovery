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

export function ReservationCard({ productId, name, note, price, unit, time }: ReservationCard) {
    return (
        <Card className="m-2 lg:m-4 p-2 lg:p-4">
            <div className="flex flex-col gap-x-4">
                <div className="flex flex-row justify-between items-center">
                    <div className="flex items-center gap-x-2 lg:gap-x-8">
                        <p className="text-lg lg:text-2xl font-bold">{name}</p>
                        <p className="text-md lg:text-lg">$ {price}</p>
                    </div>
                    <p className="text-md lg:text-lg font-semibold">{unit} 個</p>
                </div>
                <div className="text-md lg:text-lg font-normal text-muted-foreground pt-2 lg:pt-4">
                        {note.slice(0, 20)}...
                </div>
                <div className="text-md lg:text-lg font-normal pt-2 lg:pt-4 text-end">
                        {time}
                </div>
            </div>
        </Card>
    );
  }