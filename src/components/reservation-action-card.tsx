"use client";

import { useState } from "react";

import { CheckCircle, XCircle } from "lucide-react";

import ReservationActionDialog from "@/components/dialog/reservation-action-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ReservationActionCard({
  status,
  id,
  quantity,
  name,
  isStore,
}: {
  name: string;
  isStore: boolean;
  status: string;
  id: number;
  quantity: number;
}) {
  const [finishDialogOpen, setFinishDialogOpen] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  return (
    <Card className="w-full cursor-pointer p-4">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-x-4">
          <div className="flex items-center gap-x-2 lg:gap-x-8">
            <p className="text-lg font-bold lg:text-2xl">{name}</p>
          </div>
          <div className="text-md pt-2 font-normal text-muted-foreground lg:pt-4 lg:text-lg">
            {status}
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-2">
          <p className="text-md font-semibold lg:text-lg">{quantity} 個</p>

          <div className="flex">
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center justify-center"
              onClick={() => setFinishDialogOpen(!finishDialogOpen)}
            >
              <CheckCircle />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center justify-center"
              onClick={() => setCancelDialogOpen(!cancelDialogOpen)}
            >
              <XCircle />
            </Button>
          </div>
        </div>
      </div>

      <ReservationActionDialog
        open={finishDialogOpen}
        onOpenChange={setFinishDialogOpen}
        type="finish"
        id={id}
        quantity={quantity}
        isStore={isStore}
      />
      <ReservationActionDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        type="cancel"
        id={id}
        quantity={quantity}
        isStore={isStore}
      />
    </Card>
  );
}
