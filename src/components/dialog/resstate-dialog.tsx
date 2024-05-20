"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import usePost from "@/hooks/use-post";
import useStore from "@/hooks/use-store";

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
  isStore = false,
}: ResStateDialogProps & { isStore?: boolean }) {
  const { finishPostReservation, deletePostReservation } = usePost();
  const { finishStoreReservation, deleteStoreReservation } = useStore();

  const handleConfirm = () => {
    onOpenChange(!open);
    if (isStore) {
      if (type === "cancel") {
        deleteStoreReservation(id);
      } else if (type === "finish") {
        finishStoreReservation(id, quantity);
      }
    } else {
      if (type === "cancel") {
        deletePostReservation(id);
      } else if (type === "finish") {
        finishPostReservation(id, quantity);
      }
    }
  };

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
          <Button className="block w-full" onClick={handleConfirm}>
            confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
