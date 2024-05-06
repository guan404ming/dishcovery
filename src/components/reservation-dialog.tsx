"use client";

import { useEffect,  useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function ReservationDialog({ open, onOpenChange }: DialogProps) {
  const [dialogOpen, setDialogOpen] = useState(open);

  useEffect(() => {
    onOpenChange(dialogOpen);
  }, [dialogOpen, onOpenChange]);

  const handleSave = async () => {
    setDialogOpen(false);
    return true;
  };

  const handleCancel = async () => {
    setDialogOpen(false);
    return true;
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="m-2 w-80 sm:w-screen">
        <DialogHeader>
          <DialogTitle className="flex justify-start text-lg lg:text-xl">
            Reservation
          </DialogTitle>
          <DialogDescription className="text-md lg:text-md flex justify-start">
            請選擇領取時間與商品數量
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            領取時間
            <input
              type="time"
              className="w-1/2 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
          <div className="lg:text-md flex flex-row items-center gap-x-4 text-sm">
            預定數量
            <input
              placeholder="number"
              type="number"
              className="w-1/2 rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <DialogFooter>
            <Button onClick={handleCancel}>cancel</Button>
          </DialogFooter>
          <DialogFooter>
            <Button onClick={handleSave}>confirm</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
