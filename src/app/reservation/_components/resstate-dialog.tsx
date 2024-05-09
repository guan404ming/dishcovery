"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

type ResStateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: string;
};

export default function ResStateDialog({
  open,
  onOpenChange,
  type,
}: ResStateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="m-2 flex w-80 flex-col items-center sm:w-screen">
        {type === "cancel" && (
          <div className="flex flex-col items-center gap-y-4">
            <DialogTitle className="text-lg lg:text-xl">
              Cancel Reservation?
            </DialogTitle>
            <div className="lg:text-md flex flex-row items-center justify-center gap-x-4 text-sm">
              數量
              <input
                placeholder="number"
                type="number"
                className="w-1/2 rounded-md border border-gray-300 p-2"
                required
              />
            </div>
          </div>
        )}
        {type === "finish" && (
          <div>
            <DialogTitle className="text-center text-lg lg:text-xl">
              Finish reservation?
            </DialogTitle>
          </div>
        )}

        <div className="flex flex-row items-center gap-x-4">
          <DialogFooter>
            <Button onClick={() => onOpenChange(!open)}>cancel</Button>
          </DialogFooter>
          <DialogFooter>
            <Button onClick={() => onOpenChange(!open)}>confirm</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
