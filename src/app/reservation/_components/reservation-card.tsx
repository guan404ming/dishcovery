"use client";

import { Card } from "@/components/ui/card";

import { useState } from "react";

import ResStateDialog from "./resstate-dialog";

type ReservationCard = {
  name: string;
  price: number;
  quantity: number;
  status: string;
};

export function ReservationCard({
  name,
  price,
  quantity,
  status,
}: ReservationCard) {
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);

  return (
    <Card className="w-full cursor-pointer p-4" onClick={() => setFinishDialogOpen(!finishDialogOpen)}>
      <div className="flex flex-col gap-x-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-x-2 lg:gap-x-8">
            <p className="text-lg font-bold lg:text-2xl">{name}</p>
            <p className="text-md lg:text-lg">$ {price}</p>
          </div>
          <p className="text-md font-semibold lg:text-lg">{quantity} 個</p>
        </div>
        <div className="text-md pt-2 font-normal text-muted-foreground lg:pt-4 lg:text-lg">
          {status}...
        </div>
      </div>
      <ResStateDialog
          open={finishDialogOpen}
          onOpenChange={setFinishDialogOpen}
          type="finish"
        />
    </Card>
  );
}
