"use client";

import { useState } from "react";

import { MinusCircle } from "lucide-react";

import ResStateDialog from "@/components/dialog/resstate-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SelectStoreReservation } from "@/lib/type";

export function StoreReservationCard({
  status,
  id,
  quantity,
  name,
}: SelectStoreReservation & { name: string }) {
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  return (
    <Card
      className="w-full cursor-pointer p-4"
      onClick={() => setFinishDialogOpen(!finishDialogOpen)}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-x-4">
          <div className="flex items-center gap-x-2 lg:gap-x-8">
            <p className="text-lg font-bold lg:text-2xl">{name}</p>
          </div>
          <div className="text-md pt-2 font-normal text-muted-foreground lg:pt-4 lg:text-lg">
            {status}
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-4">
          <p className="text-md font-semibold lg:text-lg">{quantity} 個</p>
          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center"
            onClick={() => setCancelDialogOpen(!cancelDialogOpen)}
          >
            <MinusCircle />
          </Button>
        </div>
      </div>
      <ResStateDialog
        open={finishDialogOpen}
        onOpenChange={setFinishDialogOpen}
        type="finish"
        id={id}
        quantity={quantity}
        isStore
      />
      <ResStateDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        type="cancel"
        id={id}
        quantity={quantity}
        isStore
      />
    </Card>
  );
}