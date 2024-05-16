"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import useReservation from "@/hooks/use-reservation";

type ResStateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
  id: number;
  quantity: number;
};

export default function ResStateDialog({
  open,
  onOpenChange,
  type,
  id,
  quantity,
}: ResStateDialogProps) {
  const { finishRservation, cancelRservation } = useReservation();

  const handleCancel = () => {
    cancelRservation(id);
  }
  const handleFinish = () => {
    finishRservation(id, quantity);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80%] max-w-[400px] rounded">
        {type === "cancel" && (
          <div className="flex flex-col items-center gap-y-4">
            <DialogTitle className="text-lg lg:text-xl">
              Cancel Reservation?
            </DialogTitle>
          </div>
        )}
        {type === "finish" && (
          <div className="flex flex-col items-center gap-y-4">
            <DialogTitle className="text-center text-lg lg:text-xl">
              Finish reservation?
            </DialogTitle>
          </div>
        )}
        <DialogFooter className="gap-2">
            <Button className="block w-full" onClick={() => {
                onOpenChange(!open); 
                if (type === 'cancel') {
                  handleCancel(); 
                } else if (type === 'finish') {
                  handleFinish();
                }
              }}>
              confirm
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
